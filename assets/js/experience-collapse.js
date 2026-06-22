/* ============================================================
   Experiências: torna a DESCRIÇÃO (a lista <ul>) recolhível.

   Monta, em cada experiência que tem <ul>, um botão "detalhes" com
   uma seta logo abaixo da empresa/cargo, e envolve a lista num card.
   Recolher/expandir é controlado SÓ no mobile via CSS (@media 760px):
   no desktop o toggle some e a descrição aparece normalmente.

   A educação não tem <ul>, então é ignorada automaticamente.
   ============================================================ */
(function () {
    'use strict';

    var items = document.querySelectorAll('#trajetoria .timeline-item');

    Array.prototype.forEach.call(items, function (item, i) {
        // só a lista de descrição (filha direta do item) — educação não tem
        var ul = item.querySelector(':scope > ul');
        if (!ul) return;

        var id = 'exp-desc-' + i;

        // wrappers: .exp-desc (anima a altura) > .exp-desc-inner (clipa) > .exp-card
        var wrap = document.createElement('div');
        wrap.className = 'exp-desc';
        wrap.id = id;

        var inner = document.createElement('div');
        inner.className = 'exp-desc-inner';

        var card = document.createElement('div');
        card.className = 'exp-card';

        // botão toggle (seta) — fica abaixo de cargo/empresa
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'exp-toggle';
        btn.setAttribute('aria-controls', id);
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML =
            '<span class="exp-toggle-label">detalhes</span>' +
            '<svg class="exp-chevron" viewBox="0 0 24 24" aria-hidden="true">' +
            '<path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" ' +
            'stroke-linecap="round" stroke-linejoin="round"/></svg>';

        // insere o botão e o wrapper no lugar da <ul>, e move a <ul> para dentro do card
        ul.parentNode.insertBefore(btn, ul);
        ul.parentNode.insertBefore(wrap, ul);
        card.appendChild(ul);
        inner.appendChild(card);
        wrap.appendChild(inner);

        btn.addEventListener('click', function () {
            var open = wrap.classList.toggle('open');
            btn.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            var label = btn.querySelector('.exp-toggle-label');
            if (label) label.textContent = open ? 'ocultar' : 'detalhes';
        });
    });
})();
