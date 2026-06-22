/* ============================================================
   LINGUAGENS MAIS USADAS DO GITHUB — card ao vivo
   Monta uma barra horizontal + legenda com a distribuição de
   linguagens do perfil, no mesmo estilo do card de contribuições.

   - Faz UMA chamada à API pública do GitHub (lista de repositórios)
     e soma o "tamanho" de cada repo pela sua linguagem principal,
     ignorando forks.
   - A API pública do GitHub tem limite de 60 req/hora POR IP (sem
     autenticação). Para não esbarrar nisso (e não mostrar erro), o
     resultado é GUARDADO em cache (localStorage) por algumas horas:
       1) cache fresco  → usa direto, sem nova requisição;
       2) API falhou    → usa o último cache salvo (mesmo vencido);
       3) sem cache     → usa um fallback estático (abaixo).
   - Cores no padrão do GitHub Linguist; o restante vira "Outros".
   - Usuário definido no data-user de #gh-langs (= "Vitor-LR").
   ============================================================ */
(function () {
    'use strict';

    var mount = document.getElementById('gh-langs');
    if (!mount) return;

    var rawUser = (mount.dataset.user || '').trim();
    // aceita "Vitor-LR", "@Vitor-LR", "github.com/Vitor-LR" ou URL completa
    var user = rawUser
        .replace(/^https?:\/\//i, '')
        .replace(/^github\.com\//i, '')
        .replace(/^@/, '')
        .replace(/\/.*$/, '')
        .trim();

    // preenche o link do card a partir do usuário (fonte única da verdade)
    var link = document.getElementById('gh-langs-link');
    if (link && user) link.setAttribute('href', 'https://github.com/' + user + '?tab=repositories');

    function msg(text) {
        mount.innerHTML = '<span class="gc-msg">' + text + '</span>';
    }

    if (!user || user === 'seu-usuario') {
        msg('defina seu usuário do GitHub (data-user)');
        return;
    }

    // cores oficiais do GitHub Linguist para as linguagens mais comuns
    var COLORS = {
        'JavaScript': '#F1E05A', 'TypeScript': '#3178C6', 'Python': '#3572A5',
        'HTML': '#E34C26', 'CSS': '#563D7C', 'SCSS': '#C6538C', 'Go': '#00ADD8',
        'Java': '#B07219', 'Kotlin': '#A97BFF', 'C': '#555555', 'C++': '#F34B7D',
        'C#': '#178600', 'PHP': '#4F5D95', 'Ruby': '#701516', 'Shell': '#89E051',
        'Dockerfile': '#384D54', 'Vue': '#41B883', 'Swift': '#F05138', 'Rust': '#DEA584',
        'Dart': '#00B4AB', 'SQL': '#E38C00', 'PLpgSQL': '#336790', 'Makefile': '#427819',
        'Jupyter Notebook': '#DA5B0B', 'TeX': '#3D6117'
    };
    var FALLBACK = ['#7C8AA5', '#9AA7BF', '#5C6B82', '#46506A'];
    var OUTROS = '#46506A';

    function colorFor(name, i) { return COLORS[name] || FALLBACK[i % FALLBACK.length]; }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    /* ---- cache em localStorage (evita esbarrar no rate-limit) ---- */
    var CACHE_KEY = 'ghLangs:v1:' + user;
    var TTL = 6 * 60 * 60 * 1000;   // 6 horas

    function readCache() {
        try {
            var obj = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
            if (obj && obj.t && Array.isArray(obj.arr) && obj.grand) return obj;
        } catch (e) {}
        return null;
    }
    function writeCache(arr, grand) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), arr: arr, grand: grand }));
        } catch (e) {}
    }

    /* ---- fallback estático (último recurso: API indisponível/limitada
       e sem nenhum cache). Ajuste à vontade — são as suas linguagens. ---- */
    var STATIC = [
        { name: 'Go', weight: 38 },
        { name: 'Python', weight: 24 },
        { name: 'JavaScript', weight: 16 },
        { name: 'HTML', weight: 10 },
        { name: 'CSS', weight: 8 },
        { name: 'SQL', weight: 4 }
    ];
    var STATIC_GRAND = STATIC.reduce(function (s, x) { return s + x.weight; }, 0);

    msg('carregando linguagens…');

    // 1) cache ainda fresco → usa direto, sem bater na API
    var cached = readCache();
    if (cached && (Date.now() - cached.t) < TTL) {
        render(cached.arr, cached.grand);
        return;
    }

    // 2) busca na API; em falha usa cache (mesmo vencido) ou o fallback estático
    fetch('https://api.github.com/users/' + encodeURIComponent(user) + '/repos?per_page=100&type=owner&sort=pushed')
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(function (repos) {
            if (!Array.isArray(repos) || !repos.length) throw new Error('vazio');

            var totals = {}, grand = 0;
            repos.forEach(function (repo) {
                if (!repo || repo.fork || !repo.language) return;
                var weight = (repo.size && repo.size > 0) ? repo.size : 1; // tamanho do repo (KB) como peso
                totals[repo.language] = (totals[repo.language] || 0) + weight;
                grand += weight;
            });

            if (!grand) throw new Error('sem linguagens');

            var arr = Object.keys(totals)
                .map(function (k) { return { name: k, weight: totals[k] }; })
                .sort(function (a, b) { return b.weight - a.weight; });

            writeCache(arr, grand);
            render(arr, grand);
        })
        .catch(function () {
            var c = readCache();                       // tenta o último cache salvo
            if (c) { render(c.arr, c.grand); return; }
            render(STATIC, STATIC_GRAND);              // último recurso: estático
        });

    function render(arr, grand) {
        var TOP = 6;   // sempre as 6 mais usadas → legenda 2×3 (mesmo layout do estático)

        // top 6 por peso (arr já vem ordenado do maior p/ o menor)
        var top = arr.slice(0, TOP).map(function (x) {
            return { name: x.name, pct: x.weight / grand * 100 };
        });

        // normaliza os mostrados p/ somar 100% (preenche a barra; ignora a cauda)
        var sum = top.reduce(function (s, x) { return s + x.pct; }, 0) || 1;

        var segs = top.map(function (x, i) {
            return { name: x.name, pct: x.pct / sum * 100, color: colorFor(x.name, i) };
        });

        // barra empilhada
        var bar = '<div class="gl-bar" role="img" aria-label="Distribuição de linguagens">';
        segs.forEach(function (s) {
            bar += '<span style="width:' + s.pct.toFixed(2) + '%;background:' + s.color + '"></span>';
        });
        bar += '</div>';

        // legenda (2 colunas)
        var legend = '<div class="gl-legend">';
        segs.forEach(function (s) {
            legend += '<span class="gl-item">'
                + '<span class="gl-dot" style="background:' + s.color + '"></span>'
                + '<span class="gl-name">' + escapeHtml(s.name) + '</span>'
                + '<span class="gl-pct">' + s.pct.toFixed(1) + '%</span>'
                + '</span>';
        });
        legend += '</div>';

        mount.innerHTML = bar + legend;
    }
})();