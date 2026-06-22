/* ============================================================
   Tecnologias & ferramentas: recolhível por CONTEÚDO (não por largura).
   A partir do momento em que ALGUM card passa de 3 linhas de chips
   (ícone+nome), TODOS os grupos passam a ser recolhíveis — o título
   vira um toggle com seta e os chips ficam ocultos até tocar/clicar.
   Enquanto todos couberem em até 3 linhas, fica tudo aberto (web normal).
   A medição é refeita ao redimensionar e quando as fontes carregam.
   ============================================================ */
(function () {
    'use strict';

    var container = document.querySelector('.tech-groups');
    if (!container) return;
    var groups = container.querySelectorAll('.tech-group');
    if (!groups.length) return;

    var MAX_LINES = 3;   // acima disso → vira recolhível
    var items = [];

    Array.prototype.forEach.call(groups, function (group, i) {
        var h3 = group.querySelector('h3');
        var badges = group.querySelector('.badges');
        if (!h3 || !badges) return;

        var id = 'tg-desc-' + i;

        // cabeçalho vira botão + chevron; o texto do título vai num .tg-label
        // (permite quebrar/hifenizar palavras longas sem empurrar a seta)
        var ico = h3.querySelector('.tg-ico');
        var labelText = h3.textContent.trim();
        h3.innerHTML = '';                       // limpa o título original (evita duplicar)
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tg-toggle';
        btn.setAttribute('aria-controls', id);
        if (ico) btn.appendChild(ico);
        var label = document.createElement('span');
        label.className = 'tg-label';
        label.textContent = labelText;
        btn.appendChild(label);
        btn.insertAdjacentHTML('beforeend',
            '<svg class="tg-chevron" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" stroke-linejoin="round"/></svg>');
        h3.appendChild(btn);

        // chips em .tg-desc > .tg-desc-inner (anima a altura no modo recolhível)
        var desc = document.createElement('div');
        desc.className = 'tg-desc';
        desc.id = id;
        var inner = document.createElement('div');
        inner.className = 'tg-desc-inner';
        badges.parentNode.insertBefore(desc, badges);
        inner.appendChild(badges);
        desc.appendChild(inner);

        btn.addEventListener('click', function () {
            // só tem efeito visual quando o modo recolhível está ativo
            var open = desc.classList.toggle('open');
            btn.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        items.push({ badges: badges, desc: desc, btn: btn });
    });

    if (!items.length) return;

    // conta quantas linhas os chips ocupam (agrupando pelos topos)
    function countLines(badges) {
        var chips = badges.querySelectorAll('.badge');
        if (!chips.length) return 0;
        var tops = [];
        Array.prototype.forEach.call(chips, function (c) {
            tops.push(c.getBoundingClientRect().top);
        });
        tops.sort(function (a, b) { return a - b; });
        var lines = 1;
        for (var k = 1; k < tops.length; k++) {
            if (tops[k] - tops[k - 1] > 6) lines++;   // novo "andar" de chips
        }
        return lines;
    }

    // Iguala a ALTURA dos cabeçalhos (toggles) no modo recolhível, para que a
    // quebra de linha de um título não deixe um card mais alto que o outro.
    // Como o min-height fica só no cabeçalho, expandir um card NÃO estica os
    // vizinhos (eles continuam recolhidos na altura do cabeçalho).
    function equalizeHeaders() {
        items.forEach(function (it) { it.btn.style.minHeight = ''; });   // reset
        if (!container.classList.contains('is-collapsible')) return;     // desktop: sem igualar
        var max = 0;
        items.forEach(function (it) {
            var h = it.btn.getBoundingClientRect().height;               // força reflow já limpo
            if (h > max) max = h;
        });
        if (max > 0) {
            items.forEach(function (it) { it.btn.style.minHeight = max + 'px'; });
        }
    }

    function evaluate() {
        // mede no estado expandido (sem animar a troca de modo)
        container.classList.add('tg-no-anim');
        container.classList.remove('is-collapsible');

        var collapsible = false;
        items.forEach(function (it) {
            if (countLines(it.badges) > MAX_LINES) collapsible = true;
        });

        if (collapsible) container.classList.add('is-collapsible');

        // aria coerente: visível (true) quando NÃO recolhível, ou quando aberto
        items.forEach(function (it) {
            var effOpen = !collapsible || it.desc.classList.contains('open');
            it.btn.setAttribute('aria-expanded', effOpen ? 'true' : 'false');
        });

        requestAnimationFrame(function () { container.classList.remove('tg-no-anim'); });
        equalizeHeaders();
    }

    evaluate();

    var t;
    window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(evaluate, 150);
    });
    window.addEventListener('load', evaluate);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(evaluate);
})();