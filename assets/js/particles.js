/* ============================================================
   PARTÍCULAS DE FUNDO — "constelação"
   Pequenos pontos flutuando devagar e se conectando por linhas
   quando ficam próximos. Discreto, de baixo custo e desligável.

   Cuidados de performance:
   - Densidade proporcional à área da tela (menos pontos no mobile).
   - Pausa o loop quando a aba não está visível.
   - Recalcula no resize (com debounce) e respeita devicePixelRatio.
   - Desliga totalmente se o usuário pediu "menos movimento".
   ============================================================ */
(function () {
    'use strict';

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // acessibilidade: nada de movimento

    const ctx = canvas.getContext('2d', { alpha: true });

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let rafId = null;

    // Cor lida da variável CSS --particle-rgb (muda com o tema).
    let COLOR = 'rgba(56, 189, 248,';     // fallback (ciano do tema escuro)
    const LINK_DIST = 130;                // distância máx. para desenhar linha
    const SPEED = 0.18;                   // velocidade base (bem lenta)

    function readParticleColor() {
        const rgb = getComputedStyle(document.documentElement)
            .getPropertyValue('--particle-rgb').trim();
        if (rgb) COLOR = 'rgba(' + rgb + ',';
    }
    readParticleColor();

    // Recolore quando o tema muda (evento disparado pelo main.js)
    window.addEventListener('themechange', readParticleColor);

    function countForArea() {
        // ~1 ponto a cada 16.000px², limitado para telas grandes/pequenas
        const target = Math.round((width * height) / 16000);
        return Math.max(24, Math.min(target, 90));
    }

    function rand(min, max) { return Math.random() * (max - min) + min; }

    function makeParticles() {
        const n = countForArea();
        particles = [];
        for (let i = 0; i < n; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: rand(-SPEED, SPEED),
                vy: rand(-SPEED, SPEED),
                r: rand(0.8, 1.9)
            });
        }
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        makeParticles();
    }

    function step() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // move
            p.x += p.vx;
            p.y += p.vy;

            // rebate nas bordas
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // desenha o ponto
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = COLOR + '0.55)';
            ctx.fill();

            // linhas até vizinhos próximos
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.hypot(dx, dy);
                if (dist < LINK_DIST) {
                    const alpha = (1 - dist / LINK_DIST) * 0.18;
                    ctx.strokeStyle = COLOR + alpha.toFixed(3) + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(step);
    }

    function start() {
        if (rafId == null) rafId = requestAnimationFrame(step);
    }

    function stop() {
        if (rafId != null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    // Pausa quando a aba sai de foco (economiza CPU/bateria)
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop();
        else start();
    });

    // Resize com debounce
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    resize();
    start();
})();