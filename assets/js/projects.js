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
        codigo: 'https://github.com/',
        demo: '#'
    }

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

    var grid = document.querySelector('.projects-grid');   // home (index.html)
    var stack = document.querySelector('.projects-stack');  // todos-projetos.html

    if (grid) renderInto(grid, data.slice(0, MAX_HOME));
    if (stack) renderInto(stack, data);

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
            '<span class="project-cat">' + esc(p.categoria) + '</span>' +
            '<span class="thumb-glyph">' + esc(p.glyph) + '</span>' +
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

    function renderInto(el, list) {
        el.innerHTML = list.map(cardHTML).join('');
    }
})();