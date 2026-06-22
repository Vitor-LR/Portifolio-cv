/* ============================================================
   VITOR LOMBARD ROCHA — PORTFÓLIO
   Script principal (sem dependências)

   Módulos:
   1. Header — linha sutil ao rolar
   2. Menu mobile
   2b. Tema claro / escuro (com evento 'themechange')
   3. Scroll reveal (IntersectionObserver) com stagger
   4. Nav ativo conforme a seção visível
   5. Terminal do hero — efeito de digitação
   6. Contadores (data-count)
   7. Ano automático no rodapé
   8. Canais de contato — copiar texto sem disparar o link
   ============================================================ */
(function () {
    'use strict';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ========================================================
       1. HEADER — adiciona .scrolled após rolar um pouco
       ======================================================== */
    const header = document.querySelector('.header');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ========================================================
       2. MENU MOBILE
       ======================================================== */
    const menuToggle = document.getElementById('menu-icon');
    const nav = document.getElementById('navbar');

    if (menuToggle && nav) {
        const useEl = menuToggle.querySelector('use');
        const navLinks = nav.querySelectorAll('a');

        function setIcon(open) {
            if (useEl) useEl.setAttribute('href', open ? '#i-x' : '#i-list');
        }

        function toggleMenu() {
            const open = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(open));
            setIcon(open);
        }

        function closeMenu() {
            if (!nav.classList.contains('open')) return;
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            setIcon(false);
        }

        menuToggle.addEventListener('click', toggleMenu);
        navLinks.forEach(a => a.addEventListener('click', closeMenu));

        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

        document.addEventListener('click', e => {
            if (nav.classList.contains('open') &&
                !nav.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        let rt;
        window.addEventListener('resize', () => {
            clearTimeout(rt);
            rt = setTimeout(() => { if (window.innerWidth > 980) closeMenu(); }, 150);
        });
    }

    /* ========================================================
       2b. TEMA CLARO / ESCURO
       O bootstrap inline no <head> já aplica o tema salvo antes
       da pintura (evita "flash"). Aqui só tratamos o botão e
       avisamos as partículas via evento 'themechange'.
       ======================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    const THEME_COLORS = { light: '#F4F7FB', dark: '#0A0F1E' };

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        if (themeMeta) themeMeta.setAttribute('content', isLight ? THEME_COLORS.light : THEME_COLORS.dark);
        if (themeToggle) themeToggle.setAttribute('aria-pressed', String(isLight));
        window.dispatchEvent(new Event('themechange'));
    }

    (function initTheme() {
        let saved = null;
        try { saved = localStorage.getItem('theme'); } catch (e) {}
        const current = saved
            || (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
        applyTheme(current);
    })();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const next = isLight ? 'dark' : 'light';
            try { localStorage.setItem('theme', next); } catch (e) {}
            applyTheme(next);
        });
    }

    /* ========================================================
       3. SCROLL REVEAL com stagger
       Mesma técnica do projeto de referência: o atraso fica em
       data-reveal-delay e é aplicado via setTimeout (e não em
       transition-delay inline), pra não "vazar" o delay para os
       hovers futuros do elemento.
       ======================================================== */
    const REVEAL_SELECTOR = [
        '.section > .container > .section-head',
        '.section-head > *',
        '.about-text > *',
        '.about-card',
        '.tech-group',
        '.projects-grid > *',
        '.timeline-item',
        '.cert-item',
        '.contact-info > *',
        '.contact-form',
        '.case-content > *',
        '.gallery figure'
    ].join(',');

    const revealItems = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    revealItems.forEach(el => el.classList.add('reveal'));

    function staggerChildren(parentSelector, stepMs) {
        document.querySelectorAll(parentSelector).forEach(parent => {
            Array.from(parent.children).forEach((child, i) => {
                if (child.classList.contains('reveal')) {
                    child.dataset.revealDelay = i * stepMs;
                }
            });
        });
    }

    staggerChildren('.tech-groups', 90);
    staggerChildren('.projects-grid', 110);
    staggerChildren('.timeline', 90);
    staggerChildren('.cert-list', 70);
    staggerChildren('.gallery', 90);

    if (prefersReduced || !('IntersectionObserver' in window)) {
        revealItems.forEach(el => el.classList.add('is-visible'));
    } else {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = parseInt(el.dataset.revealDelay, 10) || 0;
                if (delay > 0) setTimeout(() => el.classList.add('is-visible'), delay);
                else el.classList.add('is-visible');
                obs.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        revealItems.forEach(el => obs.observe(el));
    }

    /* O card "// detalhes" (.case-aside) é sticky e alto: o observador padrão
       (12% de área visível) o revelaria bem depois dos títulos curtos ao lado.
       Aqui ele tem gatilho próprio (threshold 0, mesma rootMargin) pra revelar
       assim que o topo entra — em sincronia com o topo do conteúdo do case.
       O reveal termina em transform:none, então o sticky volta ao normal. */
    const caseAside = document.querySelector('.case-aside');
    if (caseAside) {
        caseAside.classList.add('reveal');
        if (prefersReduced || !('IntersectionObserver' in window)) {
            caseAside.classList.add('is-visible');
        } else {
            const asideObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    asideObs.unobserve(entry.target);
                });
            }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
            asideObs.observe(caseAside);
        }
    }

    /* ========================================================
       4. NAV ATIVO — destaca o item da seção visível
       ======================================================== */
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav a[href^="#"]');

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
        const map = {};
        navAnchors.forEach(a => { map[a.getAttribute('href').slice(1)] = a; });

        // Em vez de reagir a cada entrada isolada (que pisca quando duas seções
        // cruzam o limite ao mesmo tempo), mantemos o conjunto de seções visíveis
        // e destacamos sempre a primeira na ordem do documento — resultado estável.
        const orderedIds = Array.prototype.map.call(sections, s => s.id);
        const visible = new Set();

        function setActive() {
            let activeId = null;
            for (const id of orderedIds) {
                if (visible.has(id)) { activeId = id; break; }
            }
            navAnchors.forEach(a => a.classList.remove('active'));
            if (activeId && map[activeId]) map[activeId].classList.add('active');
        }

        const navObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
            });
            setActive();
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(s => navObs.observe(s));
    }

    /* ========================================================
       5. TERMINAL DO HERO — digitação linha a linha
       As linhas ficam no array `lines` abaixo (conteúdo fixo); o
       efeito "digita" cada uma. Pula a animação no prefers-reduced-motion.
       ======================================================== */
    const term = document.getElementById('terminal-out');
    if (term) {
        // Linhas: cada uma é [classeCSS, texto]. O \n quebra linha.
        const lines = [
            ['term-comment', '// perfil do desenvolvedor'],
            ['', ''],
            ['term-prompt', '$ whoami'],
            ['term-out', 'vitor lombard rocha'],
            ['', ''],
            ['term-prompt', '$ cat stack.json'],
            ['term-key', '{'],
            ['term-out', '  "foco": ['],
            ['term-str', '    "backend", "dados", "infra"'],
            ['term-out', '  ],'],
            ['term-out', '  "linguagens": ['],
            ['term-str', '    "Go", "Python", "JavaScript"'],
            ['term-out', '  ],'],
            ['term-out', '  "infra": ['],
            ['term-str', '    "Docker", "CI/CD", "Cloud"'],
            ['term-out', '  ]'],
            ['term-key', '}'],
            ['', ''],
            ['term-prompt', '$ status --disponivel'],
            ['term-str', '✓ aberto a novas oportunidades']
        ];

        // Monta tudo de uma vez. Usa textContent (igual à digitação) — sem
        // innerHTML — para tratar o conteúdo sempre como texto, de forma
        // consistente. Linha vazia recebe um espaço não-quebrável.
        function renderAll() {
            term.innerHTML = '';
            const frag = document.createDocumentFragment();
            lines.forEach(([cls, txt]) => {
                const div = document.createElement('div');
                div.className = 'line ' + cls;
                div.textContent = txt || '\u00A0';
                frag.appendChild(div);
            });
            term.appendChild(frag);
        }

        if (prefersReduced) {
            renderAll();
        } else {
            let li = 0;
            let finished = false;
            term.innerHTML = '';

            function appendCursor() {
                const cur = document.createElement('span');
                cur.className = 'term-cursor';
                term.appendChild(cur);
            }

            // Rede de segurança: se a digitação for interrompida (aba ou
            // painel de preview que pausa os timers em segundo plano),
            // completa o terminal de uma vez — evita ele ficar "cortado".
            function finishNow() {
                if (finished) return;
                finished = true;
                renderAll();
                appendCursor();
            }

            function typeLine() {
                if (finished) return;
                if (li >= lines.length) { appendCursor(); return; }

                const [cls, txt] = lines[li];
                const div = document.createElement('div');
                div.className = 'line ' + cls;
                term.appendChild(div);

                if (!txt) { div.innerHTML = '&nbsp;'; li++; setTimeout(typeLine, 60); return; }

                let ci = 0;
                (function typeChar() {
                    if (finished) return;
                    div.textContent = txt.slice(0, ci);
                    ci++;
                    if (ci <= txt.length) {
                        setTimeout(typeChar, 8 + Math.random() * 13);
                    } else {
                        li++;
                        setTimeout(typeLine, 85);
                    }
                })();
            }

            // Ao voltar a ficar visível (troca de aba), garante o terminal completo.
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'visible') finishNow();
            });

            // Começa a digitar só quando o terminal aparece na tela; se o usuário
            // rolar para fora antes de terminar, completa na hora. Assim o terminal
            // não fica "crescendo" enquanto ele lê outra seção (no mobile isso fazia
            // o conteúdo de baixo ficar descendo até a animação acabar).
            let started = false;
            function startTyping() {
                if (started || finished) return;
                started = true;
                setTimeout(typeLine, 250);
            }

            if ('IntersectionObserver' in window) {
                const termObs = new IntersectionObserver(function (entries) {
                    entries.forEach(function (e) {
                        if (e.isIntersecting) startTyping();
                        else if (started) finishNow();   // saiu da tela → completa já
                    });
                });
                termObs.observe(term);
            } else {
                setTimeout(startTyping, 600);   // fallback sem observer
            }
        }
    }

    /* ========================================================
       6. CONTADORES — anima os números das estatísticas
       ======================================================== */
    const counters = document.querySelectorAll('[data-count], [data-levels]');
    if (counters.length) {
        function animateCount(el) {
            const target = parseFloat(el.dataset.count);
            const dur = 1400;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                // easeOutCubic
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            }
            requestAnimationFrame(tick);
        }

        // anima através de níveis (ex.: A1 → A2 → B1 → B2 → C1), no mesmo ritmo
        function animateLevels(el) {
            const levels = el.dataset.levels.split(',');
            const dur = 1400;
            const start = performance.now();
            function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const idx = Math.min(levels.length - 1, Math.floor(eased * levels.length));
                el.textContent = levels[idx];
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = levels[levels.length - 1];
            }
            requestAnimationFrame(tick);
        }

        function run(el) {
            if (el.dataset.levels) animateLevels(el);
            else animateCount(el);
        }

        if (prefersReduced || !('IntersectionObserver' in window)) {
            counters.forEach(el => {
                el.textContent = el.dataset.levels
                    ? el.dataset.levels.split(',').pop()
                    : el.dataset.count;
            });
        } else {
            const cObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        run(entry.target);
                        cObs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.6 });
            counters.forEach(el => cObs.observe(el));
        }
    }

    /* ========================================================
       7. ANO AUTOMÁTICO no rodapé
       ======================================================== */
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    /* ========================================================
       8. CANAIS DE CONTATO — copiar texto sem disparar o link
       Se houver texto selecionado ao soltar o clique, cancela a
       navegação (deixa o usuário arrastar p/ selecionar e copiar).
       ======================================================== */
    document.querySelectorAll('.channel').forEach(ch => {
        ch.addEventListener('click', e => {
            const sel = window.getSelection();
            if (sel && sel.toString().trim().length > 0) e.preventDefault();
        });
    });

})();