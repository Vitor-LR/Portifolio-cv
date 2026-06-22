/* ============================================================
   LEETCODE — card ao vivo (mesmo estilo dos cards do GitHub)
   Monta um card com o total de problemas resolvidos, a taxa de
   aceitação e a divisão Easy / Medium / Hard (com barras de progresso).

   - Faz UMA chamada à API pública leetcode-stats.tashif.codes
     (CORS liberado) → atualiza sozinho a cada carregamento.
   - Cores das dificuldades no padrão do LeetCode (verde/amarelo/vermelho).
   - Usuário definido no data-user de #lc-stats (= "Vitor-LR").

   TROCAR a fonte de dados: mude a URL em ENDPOINT abaixo. A resposta
   precisa ter o mesmo formato (totalSolved, easySolved/totalEasy,
   mediumSolved/totalMedium, hardSolved/totalHard, ranking).
   ============================================================ */
(function () {
    'use strict';

    var mount = document.getElementById('lc-stats');
    if (!mount) return;

    var rawUser = (mount.dataset.user || '').trim();
    // aceita "Vitor-LR", "@Vitor-LR", "leetcode.com/u/Vitor-LR" ou a URL completa
    var user = rawUser
        .replace(/^https?:\/\//i, '')
        .replace(/^leetcode\.com\/(u\/)?/i, '')
        .replace(/^@/, '')
        .replace(/\/.*$/, '')
        .trim();

    // preenche o link do card a partir do usuário (fonte única da verdade)
    var link = document.getElementById('lc-link');
    if (link && user) link.setAttribute('href', 'https://leetcode.com/u/' + user + '/');

    function msg(text) { mount.innerHTML = '<span class="gc-msg">' + text + '</span>'; }

    if (!user || user === 'seu-usuario') {
        msg('defina seu usuário do LeetCode (data-user)');
        return;
    }

    // cores oficiais de dificuldade do LeetCode
    var COLORS = { easy: '#00B8A3', medium: '#FFC01E', hard: '#FF375F' };

    var ENDPOINT = 'https://leetcode-stats.tashif.codes/';

    function nfmt(n) { return (n == null ? 0 : n).toLocaleString('pt-BR'); }

    /* ---- cache em localStorage (endpoint de terceiros pode instabilizar) ----
       1) cache fresco (< TTL)  → usa direto;
       2) API falhou            → usa o último cache salvo (mesmo vencido);
       3) sem cache             → mostra a mensagem de erro. */
    var CACHE_KEY = 'lcStats:v1:' + user;
    var TTL = 6 * 60 * 60 * 1000;   // 6 horas

    function readCache() {
        try {
            var obj = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
            if (obj && obj.t && obj.data) return obj;
        } catch (e) {}
        return null;
    }
    function writeCache(data) {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data: data })); } catch (e) {}
    }

    msg('carregando estatísticas…');

    // 1) cache ainda fresco → usa direto
    var cached = readCache();
    if (cached && (Date.now() - cached.t) < TTL) { render(cached.data); return; }

    // 2) busca na API; em falha usa o cache (mesmo vencido), se houver
    fetch(ENDPOINT + encodeURIComponent(user))
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(function (d) {
            if (!d || d.status === 'error' || d.totalSolved == null) throw new Error('sem dados');
            writeCache(d);
            render(d);
        })
        .catch(function () {
            var c = readCache();                       // último cache salvo (mesmo vencido)
            if (c) { render(c.data); return; }
            msg('não foi possível carregar o LeetCode');
        });

    function bar(solved, total, color) {
        var pct = total > 0 ? Math.min(100, solved / total * 100) : 0;
        return '<span class="lc-d-bar"><span style="width:' + pct.toFixed(1) +
            '%;background:' + color + '"></span></span>';
    }

    function diff(name, solved, total, color) {
        return '<div class="lc-diff">' +
            '<div class="lc-d-head">' +
            '<span class="lc-d-name">' + name + '</span>' +
            '<span class="lc-d-count">' + nfmt(solved) + ' / ' + nfmt(total) + '</span>' +
            '</div>' +
            bar(solved, total, color) +
            '</div>';
    }

    function render(d) {
        // taxa de aceitação (acceptance) — substitui o ranking
        var accTxt = '';
        if (d.acceptanceRate != null && !isNaN(d.acceptanceRate)) {
            var a = Number(d.acceptanceRate).toFixed(1);
            if (a.slice(-2) === '.0') a = a.slice(0, -2);   // 50.0 → 50
            accTxt = 'aceitação ' + a + '%';
        }
        mount.innerHTML =
            '<div class="lc-top">' +
            '<span class="lc-total"><strong>' + nfmt(d.totalSolved) + '+</strong> resolvidos</span>' +
            (accTxt ? '<span class="lc-accept">' + accTxt + '</span>' : '') +
            '</div>' +
            '<div class="lc-diffs">' +
            diff('Easy', d.easySolved, d.totalEasy, COLORS.easy) +
            diff('Medium', d.mediumSolved, d.totalMedium, COLORS.medium) +
            diff('Hard', d.hardSolved, d.totalHard, COLORS.hard) +
            '</div>';
    }
})();