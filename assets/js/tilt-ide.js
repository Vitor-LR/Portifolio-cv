/* ============================================================
   Tilt 3D do IDE (terminal do hero).
   - O card inclina sutilmente na direção do mouse (mouse tracking).
   - O movimento é suavizado (lerp) — segue o mouse de forma macia,
     durante e depois da animação de digitação.
   - O traqueamento SÓ roda enquanto o IDE está visível na tela
     (IntersectionObserver). Saiu da tela: para. Voltou: retoma.
   - prefers-reduced-motion: sem tilt.
   ============================================================ */
(function () {
    'use strict';

    var stage = document.querySelector('.ide-stage[data-tilt]');
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var MAX = 4;        // inclinação máxima (graus) — sutil
    var EASE = 0.12;    // suavização (menor = mais macio)

    var mx = window.innerWidth / 2;   // posição do mouse
    var my = window.innerHeight / 2;
    var curX = 0, curY = 0;           // rotação atual (suavizada)
    var active = false;               // true só quando visível

    function clamp(v) { return v < -1 ? -1 : (v > 1 ? 1 : v); }

    function loop() {
        if (!active) return;

        var rect = stage.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;

        // posição do mouse relativa ao centro do card, normalizada (-1..1)
        var nx = clamp((mx - cx) / (window.innerWidth / 2));
        var ny = clamp((my - cy) / (window.innerHeight / 2));

        // inclina na direção do mouse (invertido conforme preferência)
        var targetX = -ny * MAX;    // mouse abaixo → tomba o topo para frente
        var targetY = nx * MAX;     // mouse à direita → borda esquerda para frente

        curX += (targetX - curX) * EASE;
        curY += (targetY - curY) * EASE;

        stage.style.transform = 'rotateX(' + curX.toFixed(2) + 'deg) rotateY(' + curY.toFixed(2) + 'deg)';
        requestAnimationFrame(loop);
    }

    function start() {
        if (active) return;
        active = true;
        stage.style.willChange = 'transform';
        requestAnimationFrame(loop);
    }
    function stop() {
        active = false;                 // o loop para no próximo frame
        stage.style.willChange = '';    // libera a GPU enquanto fora da tela
    }

    window.addEventListener('mousemove', function (e) {
        mx = e.clientX;
        my = e.clientY;
    }, { passive: true });

    // só segue o mouse quando o IDE está na tela
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) start();
                else stop();
            });
        }, { threshold: 0 });
        io.observe(stage);
    } else {
        start();   // fallback: sempre ativo
    }
})();