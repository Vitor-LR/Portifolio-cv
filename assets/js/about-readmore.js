/* ============================================================
   "Ler mais" na seção Sobre.
   Quando a tela reduz a ponto do texto passar de MAX_LINES (7), o texto é
   recortado nessas linhas (com um leve fade) e aparece um botão
   "ler mais" para abrir o restante. Cabendo em até MAX_LINES, mostra tudo
   e o botão some. Reavalia ao redimensionar e quando as fontes carregam.
   ============================================================ */
(function () {
    'use strict';

    var box = document.querySelector('.about-text');
    if (!box) return;

    var MAX_LINES = 7;

    // move o conteúdo atual para um "body" recortável
    var body = document.createElement('div');
    body.className = 'about-text-body';
    while (box.firstChild) body.appendChild(box.firstChild);
    box.appendChild(body);

    // botão "ler mais" (estilo do site: mono + accent + chevron)
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'about-more';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML =
        '<span class="about-more-label">ler mais</span>' +
        '<svg class="about-chevron" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>';
    box.appendChild(btn);

    var expanded = false;
    var mqStack = window.matchMedia('(max-width: 980px)');   // largura em que a seção empilha

    function lineHeightPx() {
        var ref = body.querySelector('p') || body;
        var cs = getComputedStyle(ref);
        var lh = parseFloat(cs.lineHeight);
        if (!lh || isNaN(lh)) lh = parseFloat(cs.fontSize) * 1.65;
        return lh;
    }

    var DURATION = 450;   // casa com a transição do CSS (max-height)

    function maxHpx() { return lineHeightPx() * MAX_LINES; }

    // roda cb quando a transição de max-height termina (com fallback de tempo)
    function onEnd(cb) {
        var done = false;
        function h(e) {
            if (e && e.propertyName && e.propertyName !== 'max-height') return;
            if (done) return;
            done = true;
            body.removeEventListener('transitionend', h);
            cb();
        }
        body.addEventListener('transitionend', h);
        setTimeout(h, DURATION + 80);
    }

    function evaluate() {
        // mede no estado completo, SEM animar (resize / carregamento de fontes)
        body.style.transition = 'none';
        body.classList.remove('clamped');
        body.style.maxHeight = '';

        // no layout largo (texto ao lado do card) não recorta
        if (!mqStack.matches) {
            btn.style.display = 'none';
            body.style.transition = '';
            return;
        }

        var maxH = maxHpx();
        var needsClamp = body.scrollHeight > maxH + 4;

        if (!needsClamp) {
            btn.style.display = 'none';      // cabe em ≤MAX_LINES: sem "ler mais"
            body.style.transition = '';
            return;
        }

        btn.style.display = '';
        if (!expanded) {
            body.style.maxHeight = maxH + 'px';
            body.classList.add('clamped');
        } else {
            body.style.maxHeight = 'none';
        }
        body.offsetHeight;               // reflow
        body.style.transition = '';      // reativa a animação p/ os próximos cliques
    }

    function expand() {
        body.classList.remove('clamped');            // tira o fade ao abrir
        body.style.maxHeight = maxHpx() + 'px';      // ponto de partida
        body.offsetHeight;                           // reflow
        body.style.maxHeight = body.scrollHeight + 'px';
        onEnd(function () {
            if (expanded) body.style.maxHeight = 'none';   // libera p/ reflow/resize
        });
    }

    function collapse() {
        body.style.maxHeight = body.scrollHeight + 'px';   // fixa ponto de partida
        body.classList.add('clamped');                     // fade ao fechar
        body.offsetHeight;                                  // reflow
        body.style.maxHeight = maxHpx() + 'px';
    }

    btn.addEventListener('click', function () {
        expanded = !expanded;
        btn.classList.toggle('is-open', expanded);
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        var label = btn.querySelector('.about-more-label');
        if (label) label.textContent = expanded ? 'ler menos' : 'ler mais';
        if (expanded) expand(); else collapse();
    });

    evaluate();

    var t;
    window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(evaluate, 150);
    });
    window.addEventListener('load', evaluate);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(evaluate);
})();