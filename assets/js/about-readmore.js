/* ============================================================
   "Ler mais" na seção Sobre.
   Quando a tela reduz a ponto do texto passar de 10 linhas, o texto é
   recortado nessas 10 linhas (com um leve fade) e aparece um botão
   "ler mais" para abrir o restante. Cabendo em até 10 linhas, mostra tudo
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

    function evaluate() {
        // mede no estado completo
        body.classList.remove('clamped');
        body.style.maxHeight = '';

        // no layout largo (texto ao lado do card) não recorta
        if (!mqStack.matches) {
            btn.style.display = 'none';
            return;
        }

        var maxH = lineHeightPx() * MAX_LINES;
        var needsClamp = body.scrollHeight > maxH + 4;

        if (!needsClamp) {
            btn.style.display = 'none';      // cabe em ≤10 linhas: sem "ler mais"
            return;
        }

        btn.style.display = '';
        if (!expanded) {
            body.style.maxHeight = maxH + 'px';
            body.classList.add('clamped');
        }
    }

    btn.addEventListener('click', function () {
        expanded = !expanded;
        btn.classList.toggle('is-open', expanded);
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        var label = btn.querySelector('.about-more-label');
        if (label) label.textContent = expanded ? 'ler menos' : 'ler mais';
        evaluate();
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