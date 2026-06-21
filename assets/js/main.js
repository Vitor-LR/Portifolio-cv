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

    /* ========================================================
       4. NAV ATIVO — destaca o item da seção visível
       ======================================================== */
    const sections = document.querySelectorAll('main section[id]');
    const navAnchors = document.querySelectorAll('.nav a[href^="#"]');

    if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
        const map = {};
        navAnchors.forEach(a => { map[a.getAttribute('href').slice(1)] = a; });

        const navObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navAnchors.forEach(a => a.classList.remove('active'));
                    const active = map[entry.target.id];
                    if (active) active.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(s => navObs.observe(s));
    }

    /* ========================================================
       5. TERMINAL DO HERO — digitação linha a linha
       Lê as linhas de #term-script (data-attrs) e "digita".
       Pula a animação no prefers-reduced-motion.
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

        function renderAll() {
            term.innerHTML = lines.map(([cls, txt]) =>
                `<div class="line ${cls}">${txt || '&nbsp;'}</div>`
            ).join('');
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

                if (!txt) { div.innerHTML = '&nbsp;'; li++; setTimeout(typeLine, 120); return; }

                let ci = 0;
                (function typeChar() {
                    if (finished) return;
                    div.textContent = txt.slice(0, ci);
                    ci++;
                    if (ci <= txt.length) {
                        setTimeout(typeChar, 16 + Math.random() * 26);
                    } else {
                        li++;
                        setTimeout(typeLine, 170);
                    }
                })();
            }

            // Ao voltar a ficar visível, garante o terminal completo.
            document.addEventListener('visibilitychange', function () {
                if (document.visibilityState === 'visible') finishNow();
            });

            // começa quando o hero estiver visível (ou logo após carregar)
            setTimeout(typeLine, 600);
        }
    }

    /* ========================================================
       6. CONTADORES — anima os números das estatísticas
       ======================================================== */
    const counters = document.querySelectorAll('[data-count]');
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

        if (prefersReduced || !('IntersectionObserver' in window)) {
            counters.forEach(el => { el.textContent = el.dataset.count; });
        } else {
            const cObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCount(entry.target);
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