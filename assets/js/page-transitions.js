/* ============================================================
   Transição entre páginas — define um "tipo" para as navegações de/para
   as páginas de projeto (em /projetos/), pra elas deslizarem em vez de
   só fazer fade. O index ↔ todos-projetos continua no fade padrão.

   Usa a View Transitions API multi-página (eventos pageswap/pagereveal)
   e tipos de transição (CSS :active-view-transition-type). Onde não há
   suporte, nada acontece (degradação graciosa: cai no fade padrão).
   ============================================================ */
(function () {
    'use strict';

    function isProject(url) {
        try { return new URL(url, location.href).pathname.indexOf('/projetos/') !== -1; }
        catch (e) { return false; }
    }

    function setType(vt, fromUrl, toUrl) {
        if (!vt || !vt.types || typeof vt.types.add !== 'function') return;
        var fromP = isProject(fromUrl), toP = isProject(toUrl);
        if (toP && !fromP) vt.types.add('to-detail');       // entrando num projeto
        else if (fromP && !toP) vt.types.add('to-list');    // voltando de um projeto
        // projeto → projeto ou lista → lista: mantém o fade padrão
    }

    // saindo da página atual
    window.addEventListener('pageswap', function (e) {
        if (!e.viewTransition) return;
        var toUrl = e.activation && e.activation.entry && e.activation.entry.url;
        setType(e.viewTransition, location.href, toUrl || location.href);
    });

    // chegando na nova página
    window.addEventListener('pagereveal', function (e) {
        if (!e.viewTransition) return;
        var fromUrl = (window.navigation && navigation.activation &&
            navigation.activation.from && navigation.activation.from.url) || document.referrer;
        setType(e.viewTransition, fromUrl || '', location.href);
    });
})();
