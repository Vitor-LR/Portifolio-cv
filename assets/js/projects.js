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
        titulo: 'Fake Shop',
        categoria: 'DevOps · Kubernetes',
        glyph: '⎈ Fake Shop',
        descricao: 'E-commerce Flask + PostgreSQL usado como laboratório DevOps: CI/CD no GitHub Actions, imagem no Docker Hub e deploy no Kubernetes com 10 réplicas.',
        tags: ['Kubernetes', 'Docker', 'GitHub Actions', 'PostgreSQL'],
        pagina: 'projetos/fake-shop.html',
        imagem: 'assets/img/fake-shop/banner.png',
        codigo: 'https://github.com/Vitor-LR/Fake-Shop',
        demo: 'https://vitor-lr.github.io/Fake-Shop/'
    },

    {
        titulo: 'DevBook',
        categoria: 'Fullstack · Go',
        glyph: '</> DevBook',
        descricao: 'Rede social para devs no estilo Twitter/X, 100% em Go: API REST com JWT, bcrypt e MySQL + webapp com templates server-side e cookies criptografados.',
        tags: ['Go', 'MySQL', 'JWT', 'Docker'],
        pagina: 'projetos/devbook.html',
        imagem: 'assets/img/devbook/banner.png',
        codigo: 'https://github.com/Vitor-LR/DevBook',
        demo: 'https://vitor-lr.github.io/DevBook/'
    },

    {
        titulo: 'pulso.app',
        categoria: 'Fullstack · Produtividade',
        glyph: '∿ pulso.app',
        descricao: 'Rastreador e análise de hábitos: React/Next.js com heatmaps, streaks, metas, finanças e temporizador, servido por uma API em Go sem dependências.',
        tags: ['React', 'Next.js', 'Go', 'Tailwind'],
        pagina: 'projetos/pulso-app.html',
        imagem: 'assets/img/pulso-app/banner.png',
        codigo: 'https://github.com/Vitor-LR/Habit-Tracker',
        demo: 'https://vitor-lr.github.io/Habit-Tracker/'
    },

    {
        titulo: 'luizalombard.com.br',
        categoria: 'Site · Landing Page',
        glyph: '§ luizalombard',
        descricao: 'Site profissional de advocacia no ar com domínio próprio: vanilla JS, tema claro/escuro, SEO com dados estruturados e conformidade com a LGPD.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SEO'],
        pagina: 'projetos/luizalombard.html',
        imagem: 'assets/img/luizalombard/banner.png',
        codigo: 'https://github.com/Vitor-LR/portifolio-luiza',
        demo: 'https://luizalombard.com.br/'
    },

    {
        titulo: 'Calculadora em C',
        categoria: 'C · WebAssembly',
        glyph: '± calculadora.c',
        descricao: 'Calculadora com motor 100% em C freestanding compilado para WebAssembly: máquina de estados, porcentagem contextual e formatação pt-BR, em 12 KB.',
        tags: ['C', 'WebAssembly', 'Clang', 'Make'],
        pagina: 'projetos/calculadora-c.html',
        imagem: 'assets/img/calculadora-c/banner.png',
        codigo: 'https://github.com/Vitor-LR/calculadora-c',
        demo: 'https://vitor-lr.github.io/calculadora-c/'
    },

    {
        titulo: 'LinkQ',
        categoria: 'Go · WebAssembly',
        glyph: '⇢ LinkQ',
        descricao: 'Encurtador de URL com gerador de QR Code escrito em Go e compilado para WebAssembly — toda a lógica roda no navegador, publicado no GitHub Pages.',
        tags: ['Go', 'WebAssembly', 'QR Code'],
        pagina: 'projetos/linkq.html',
        imagem: 'assets/img/linkq/banner.png',
        codigo: 'https://github.com/Vitor-LR/LinkQ',
        demo: 'https://vitor-lr.github.io/LinkQ/'
    },

    {
        titulo: 'DevBurguer',
        categoria: 'Web · Node.js',
        glyph: '≡ DevBurguer',
        descricao: 'Site de hamburgueria com servidor Node/Express: cardápio dinâmico lido de JSON, rota de API, formulário de contato e páginas de resposta estilizadas.',
        tags: ['Node.js', 'Express', 'JavaScript', 'CSS'],
        pagina: 'projetos/devburguer.html',
        imagem: 'assets/img/devburguer/banner.png',
        codigo: 'https://github.com/Vitor-LR/DevBurguer',
        demo: 'https://vitor-lr.github.io/DevBurguer/'
    },

    {
        titulo: 'Conversor de Distância',
        categoria: 'Python · Docker',
        glyph: '⇄ conversor',
        descricao: 'Conversor de unidades em Flask com formatação pt-BR, empacotado como imagem Docker pública e com demo funcional em JavaScript no GitHub Pages.',
        tags: ['Python', 'Flask', 'Docker', 'JavaScript'],
        pagina: 'projetos/conversor-distancia.html',
        imagem: 'assets/img/conversor-distancia/banner.png',
        codigo: 'https://github.com/Vitor-LR/ConversorDistancia',
        demo: 'https://vitor-lr.github.io/ConversorDistancia/'
    }

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