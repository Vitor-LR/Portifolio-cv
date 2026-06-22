/* ============================================================
   PROJETOS — LISTA ÚNICA (fonte única da verdade)
   ------------------------------------------------------------
   Edite SÓ este arquivo para adicionar/editar/remover projetos.

   - A HOME (index.html) mostra automaticamente apenas os
     PRIMEIROS 4 da lista (os "mais importantes").
   - A página TODOS OS PROJETOS (todos-projetos.html) mostra TODOS.

   COMO ADICIONAR UM PROJETO:
   1. Copie um bloco { ... } abaixo e cole no fim da lista.
   2. Preencha os campos.
   3. Pronto: ele aparece em "todos os projetos". Se quiser que
      apareça também na home, coloque-o entre os 4 primeiros
      (basta mover o bloco para cima).

   CAMPOS:
   - titulo      → nome do projeto
   - categoria   → etiqueta da capa (ex.: "API · Backend")
   - glyph       → texto/ícone grande da capa (ex.: "{ } GoTask API")
   - descricao   → resumo curto do card
   - tags        → lista de tecnologias (aparecem como chips)
   - pagina      → caminho do estudo de caso (ex.: "projetos/gotask-api.html")
   - imagem      → capa do card + topo do estudo de caso (ex.: "assets/img/gotask/banner.png").
                   Se vazio/omitido, mostra o `glyph` de texto como antes.
   - codigo      → URL do repositório no GitHub
   - demo        → URL do projeto publicado (live). Controla o botão
                   "Ver projeto" do card:
                   • com URL  → "Ver projeto" abre o projeto em nova aba;
                   • "#" ou "" → "Ver projeto" abre a página do estudo de caso.
   ============================================================ */
window.PROJETOS = [

    {
        titulo: 'GoTask API',
        categoria: 'API · Backend',
        glyph: '{ } GoTask API',
        descricao: 'API REST de gerenciamento de tarefas em Go, com autenticação JWT, PostgreSQL e deploy containerizado.',
        tags: ['Go', 'PostgreSQL', 'JWT', 'Docker'],
        pagina: 'projetos/gotask-api.html',
        imagem: 'assets/img/gotask/banner.png',
        codigo: 'https://github.com/',
        demo: '#'
    },

    {
        titulo: 'ObservaStack',
        categoria: 'Observabilidade',
        glyph: '▦ ObservaStack',
        descricao: 'Stack de monitoramento com métricas expostas em Go, coletadas via Prometheus e visualizadas em dashboards Grafana.',
        tags: ['Go', 'Prometheus', 'Grafana', 'Docker'],
        pagina: 'projetos/observastack.html',
        imagem: 'assets/img/observastack/banner.png',
        codigo: 'https://github.com/',
        demo: '#'
    },

    {
        titulo: 'DataMart SQL',
        categoria: 'Dados · Análise',
        glyph: '⊞ DataMart SQL',
        descricao: 'Pipeline de ingestão e análise de dados em Python e SQL, com consultas otimizadas e relatórios sobre PostgreSQL.',
        tags: ['Python', 'SQL', 'PostgreSQL', 'Pandas'],
        pagina: 'projetos/datamart-sql.html',
        imagem: 'assets/img/datamart/banner.png',
        codigo: 'https://github.com/',
        demo: '#'
    },

    {
        titulo: 'Sites para marcas parceiras',
        categoria: 'Web · Sites',
        glyph: '</> Sites de marcas',
        descricao: 'Criação e implementação de sites responsivos para marcas parceiras, com foco em performance e SEO.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        pagina: 'projetos/sites-marcas.html',
        imagem: 'assets/img/sites/banner.png',
        codigo: 'https://github.com/',
        demo: '#'
    },

    {
        titulo: 'URLShort',
        categoria: 'API · Backend',
        glyph: '⇄ URLShort',
        descricao: 'API encurtadora de URLs em Go, com cache em Redis, PostgreSQL e redirecionamento de baixa latência.',
        tags: ['Go', 'Redis', 'PostgreSQL', 'Docker'],
        pagina: 'projetos/urlshort.html',
        imagem: 'assets/img/urlshort/banner.png',
        codigo: 'https://github.com/',
        demo: '#'
    },

    // ⬇️ Novos projetos entram aqui. Os que ficarem após o 4º
    //    aparecem APENAS na página "todos os projetos".
    // ,{
    //     titulo: 'Meu Novo Projeto',
    //     categoria: 'Categoria',
    //     glyph: '★ Meu Novo Projeto',
    //     descricao: 'Descrição curta do projeto.',
    //     tags: ['Tag1', 'Tag2'],
    //     pagina: 'projetos/meu-novo-projeto.html',
    //     codigo: 'https://github.com/seu-usuario/repo',
    //     demo: '#'
    // }

];

/* ============================================================
   RENDERIZAÇÃO — não precisa mexer daqui para baixo.
   ============================================================ */
(function () {
    'use strict';

    var MAX_HOME = 4; // quantos projetos aparecem na home
    var data = window.PROJETOS || [];

    var PAGE = 6; // projetos por "página" no carrossel do todos-projetos (grade 3x2)
    var grid = document.querySelector('.projects-grid');     // home (index.html)
    var carousel = document.querySelector('.proj-carousel'); // todos-projetos.html

    if (grid) grid.innerHTML = data.slice(0, MAX_HOME).map(cardHTML).join('');
    if (carousel) buildCarousel(carousel, data);

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function cardHTML(p) {
        var tags = (p.tags || []).map(function (t) {
            return '<span>' + esc(t) + '</span>';
        }).join('');

        // Botão "Ver projeto" (à direita do "Código"):
        // - se houver link de demo/projeto publicado, abre esse link em nova aba;
        // - se não houver (demo "#" ou vazio), abre a página do estudo de caso.
        var temDemo = p.demo && String(p.demo).trim() && String(p.demo).trim() !== '#';
        var verHref = temDemo ? p.demo : p.pagina;
        var verExtra = temDemo ? ' target="_blank" rel="noopener"' : '';

        return '' +
            '<article class="project-card">' +
            '<a class="project-cover-link" href="' + esc(p.pagina) + '" aria-label="Ver estudo de caso: ' + esc(p.titulo) + '"></a>' +
            '<div class="project-thumb">' +
            (p.imagem ? '<img src="' + esc(p.imagem) + '" alt="Capa do projeto ' + esc(p.titulo) + '" loading="lazy">' : '') +
            '<span class="project-cat">' + esc(p.categoria) + '</span>' +
            (p.imagem ? '' : '<span class="thumb-glyph">' + esc(p.glyph) + '</span>') +
            '</div>' +
            '<div class="project-body">' +
            '<h3><a href="' + esc(p.pagina) + '">' + esc(p.titulo) + '</a></h3>' +
            '<p>' + esc(p.descricao) + '</p>' +
            '<div class="project-tags">' + tags + '</div>' +
            '<div class="project-actions">' +
            '<a href="' + esc(p.codigo) + '" target="_blank" rel="noopener" class="btn btn--ghost btn--sm proj-code">' +
            '<svg class="icon"><use href="#i-github"></use></svg> Código</a>' +
            '<a href="' + esc(verHref) + '"' + verExtra + ' class="btn btn--ghost btn--sm proj-view">' +
            '<svg class="icon"><use href="#i-arrow-up-right"></use></svg> Ver projeto</a>' +
            '</div>' +
            '</div>' +
            '</article>';
    }

    /* ---- Carrossel do "todos os projetos": páginas de 6 (grade 3 col = 3x2) ----
       Mostra todos os projetos em páginas. Com 1 página, sem controles. Com mais,
       aparecem setas + indicadores (no design do site) e dá pra arrastar/swipe. */
    function chunk(arr, n) {
        var out = [];
        for (var i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
        return out;
    }

    function buildCarousel(root, list) {
        var pages = chunk(list, PAGE);
        if (pages.length === 0) pages = [[]];

        var slides = pages.map(function (group) {
            return '<div class="pc-slide"><div class="projects-grid">' +
                group.map(cardHTML).join('') + '</div></div>';
        }).join('');

        var controls = '';
        if (pages.length > 1) {
            var dots = '';
            for (var i = 0; i < pages.length; i++) {
                dots += '<button class="pc-dot' + (i === 0 ? ' is-active' : '') +
                    '" type="button" aria-label="Página ' + (i + 1) + '"></button>';
            }
            controls =
                '<div class="pc-controls">' +
                '<button class="pc-arrow pc-prev" type="button" aria-label="Projetos anteriores">' +
                '<svg class="icon"><use href="#i-arrow-left"></use></svg></button>' +
                '<div class="pc-dots">' + dots + '</div>' +
                '<button class="pc-arrow pc-next" type="button" aria-label="Próximos projetos">' +
                '<svg class="icon"><use href="#i-arrow-left"></use></svg></button>' +
                '</div>';
        }

        root.innerHTML =
            controls + '<div class="pc-viewport"><div class="pc-track">' + slides + '</div></div>';

        if (pages.length > 1) initCarousel(root, pages.length);
    }

    function initCarousel(root, count) {
        var viewport = root.querySelector('.pc-viewport');
        var track = root.querySelector('.pc-track');
        var dots = Array.prototype.slice.call(root.querySelectorAll('.pc-dot'));
        var prev = root.querySelector('.pc-prev');
        var next = root.querySelector('.pc-next');
        var EASE = 'transform 0.45s cubic-bezier(.22,.61,.36,1)';
        var index = 0;

        function update() {
            track.style.transition = EASE;
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
            dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
            prev.disabled = index === 0;
            next.disabled = index === count - 1;
        }
        function go(i) { index = Math.max(0, Math.min(count - 1, i)); update(); }

        prev.addEventListener('click', function () { go(index - 1); });
        next.addEventListener('click', function () { go(index + 1); });
        dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

        // arrastar / swipe (segue o dedo/mouse e dá "snap" ao soltar)
        var startX = 0, dragging = false, moved = false, width = 0;
        track.addEventListener('pointerdown', function (e) {
            dragging = true; moved = false; startX = e.clientX;
            width = viewport.offsetWidth || 1;
            track.style.transition = 'none';
        });
        track.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var dx = e.clientX - startX;
            if (Math.abs(dx) > 6) moved = true;
            track.style.transform = 'translateX(' + (-index * 100 + (dx / width) * 100) + '%)';
        });
        function endDrag(e) {
            if (!dragging) return;
            dragging = false;
            var dx = ((e && e.clientX) || startX) - startX;
            if (Math.abs(dx) > width * 0.18) go(index + (dx < 0 ? 1 : -1));
            else update();
        }
        track.addEventListener('pointerup', endDrag);
        track.addEventListener('pointercancel', endDrag);
        track.addEventListener('pointerleave', endDrag);
        // se houve arrasto, cancela o clique no card (evita navegar sem querer)
        track.addEventListener('click', function (e) {
            if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
        }, true);

        update();
    }
})();