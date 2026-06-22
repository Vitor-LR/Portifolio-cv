/* ============================================================
   CONTRIBUIÇÕES DO GITHUB — calendário próprio
   Monta o "heatmap" de contribuições com quadrados arredondados,
   rótulos de dia (Seg/Qua/Sex) e mês, centralizado no card.

   - Busca os dados ao vivo na API pública do jogruber
     (https://github-contributions-api.jogruber.de) → atualiza
     sozinho a cada carregamento da página.
   - As cores usam a variável --particle-rgb (mesma do tema), então
     mudam junto com o modo claro/escuro automaticamente.
   - Mostra as últimas N semanas (data-weeks, padrão 39 ≈ 9 meses).
   ============================================================ */
(function () {
    'use strict';

    var mount = document.getElementById('gh-contrib');
    if (!mount) return;

    var rawUser = (mount.dataset.user || '').trim();
    // normaliza: aceita "Vitor-LR", "@Vitor-LR", "github.com/Vitor-LR" ou a URL completa
    var user = rawUser
        .replace(/^https?:\/\//i, '')
        .replace(/^github\.com\//i, '')
        .replace(/^@/, '')
        .replace(/\/.*$/, '')
        .trim();
    var WEEKS = parseInt(mount.dataset.weeks, 10) || 39;

    // preenche o link do card a partir do usuário (fonte única da verdade)
    var link = document.getElementById('gh-contrib-link');
    if (link && user) link.setAttribute('href', 'https://github.com/' + user);

    if (!user || user === 'seu-usuario') {
        msg('defina seu usuário do GitHub (data-user)');
        return;
    }

    // ---- layout ----
    var CELL = 14, GAP = 3, RADIUS = 3;
    var LEFT = 30;   // espaço p/ rótulos de dia
    var TOP = 16;    // espaço p/ rótulos de mês
    var STEP = CELL + GAP;
    var MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var DAY_ROWS = { 1: 'Seg', 3: 'Qua', 5: 'Sex' };
    var SVGNS = 'http://www.w3.org/2000/svg';

    function msg(text) {
        mount.innerHTML = '<span class="gc-msg">' + text + '</span>';
    }

    function ymd(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    msg('carregando contribuições…');

    fetch('https://github-contributions-api.jogruber.de/v4/' + encodeURIComponent(user) + '?y=last')
        .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
        .then(function (data) { render(data && data.contributions ? data.contributions : []); })
        .catch(function () { msg('não foi possível carregar as contribuições'); });

    function render(list) {
        if (!list.length) { msg('sem dados de contribuição'); return; }

        // mapa data -> nível
        var byDate = {};
        for (var i = 0; i < list.length; i++) byDate[list[i].date] = list[i];

        // alinhamento por semanas (coluna = semana começando no domingo)
        var today = new Date(); today.setHours(0, 0, 0, 0);
        var endSunday = new Date(today);
        endSunday.setDate(endSunday.getDate() - endSunday.getDay()); // domingo desta semana
        var start = new Date(endSunday);
        start.setDate(start.getDate() - (WEEKS - 1) * 7);

        var width = LEFT + WEEKS * STEP;
        var height = TOP + 7 * STEP;

        var svg = document.createElementNS(SVGNS, 'svg');
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        svg.setAttribute('class', 'gc-svg');
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', 'Calendário de contribuições do GitHub');

        // rótulos de dia da semana
        for (var row in DAY_ROWS) {
            if (!DAY_ROWS.hasOwnProperty(row)) continue;
            var t = document.createElementNS(SVGNS, 'text');
            t.setAttribute('x', 0);
            t.setAttribute('y', TOP + row * STEP + CELL - 2);
            t.setAttribute('class', 'gc-label');
            t.textContent = DAY_ROWS[row];
            svg.appendChild(t);
        }

        var lastMonth = -1;

        for (var c = 0; c < WEEKS; c++) {
            for (var d = 0; d < 7; d++) {
                var date = new Date(start);
                date.setDate(start.getDate() + c * 7 + d);
                if (date > today) continue; // dias futuros: não desenha

                var key = ymd(date);
                var entry = byDate[key];
                var level = entry ? (entry.level || 0) : 0;
                var count = entry ? (entry.count || 0) : 0;

                var rect = document.createElementNS(SVGNS, 'rect');
                rect.setAttribute('x', LEFT + c * STEP);
                rect.setAttribute('y', TOP + d * STEP);
                rect.setAttribute('width', CELL);
                rect.setAttribute('height', CELL);
                rect.setAttribute('rx', RADIUS);
                rect.setAttribute('ry', RADIUS);
                rect.setAttribute('class', 'gc-cell l' + level);
                var titleTxt = count + (count === 1 ? ' contribuição' : ' contribuições') + ' em ' + key;
                var title = document.createElementNS(SVGNS, 'title');
                title.textContent = titleTxt;
                rect.appendChild(title);
                svg.appendChild(rect);

                // rótulo de mês: na primeira linha, quando muda o mês
                if (d === 0) {
                    var m = date.getMonth();
                    if (m !== lastMonth) {
                        lastMonth = m;
                        // não rotula o primeiro mês (coluna 0): ele é parcial e
                        // ficaria espremido na borda esquerda — ex.: o "Dez".
                        if (c > 0) {
                            var mt = document.createElementNS(SVGNS, 'text');
                            mt.setAttribute('x', LEFT + c * STEP);
                            mt.setAttribute('y', TOP - 5);
                            mt.setAttribute('class', 'gc-label');
                            mt.textContent = MONTHS[m];
                            svg.appendChild(mt);
                        }
                    }
                }
            }
        }

        mount.innerHTML = '';
        mount.appendChild(svg);
    }
})();