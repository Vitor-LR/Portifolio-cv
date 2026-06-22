/* ============================================================
   Elastic Scroll Boundary — efeito "rubber-band" nos limites.
   Ao chegar no topo (puxando p/ cima) ou no fim (puxando p/ baixo),
   o conteúdo estica um pouco e volta com mola — de forma SUAVE.

   Um único loop (requestAnimationFrame) move o conteúdo:
   - "target" = quanto se quer esticar (cresce ao puxar no limite);
   - "rendered" = o que está aplicado, que segue o target suavemente;
   - solto, o target volta a 0 (mola) e o rendered acompanha.
   Sem timers competindo => sem tremor.

   Envolve só <main> + <footer>; header (fixo) e canvas de fundo ficam
   de fora. Desativado com prefers-reduced-motion.

   >>> INTERAÇÃO COM position: sticky (ex.: .case-aside nas páginas de
   projeto): durante o overscroll o wrapper recebe um translate, então a
   sidebar sticky "balança junto" com a página — que é o efeito desejado
   (tudo se move como um bloco coeso). O ponto crítico é NÃO deixar um
   transform/will-change PERMANENTE no wrapper: isso, sim, faria o sticky
   parar de grudar. Por isso, em repouso, `settle()` limpa transform e
   will-change por completo — o wrapper volta a ser um bloco comum e o
   sticky funciona normalmente. <<<
   ============================================================ */
(function () {
    'use strict';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var main = document.querySelector('main');
    if (!main) return;
    var footer = document.querySelector('.footer');

    var wrap = document.createElement('div');
    wrap.className = 'elastic-wrap';
    main.parentNode.insertBefore(wrap, main);
    wrap.appendChild(main);
    if (footer) wrap.appendChild(footer);

    var MAX = 38;          // deslocamento máximo (px) — gentil
    var EASE = 0.16;       // suavização do rendered → target (menor = mais macio)
    var SPRING = 0.88;     // quão devagar o target volta a 0 (maior = mais lento/suave)

    var target = 0;        // overscroll desejado
    var rendered = 0;      // overscroll aplicado
    var holding = false;   // true enquanto segura o toque (não aplica mola)
    var ticking = false;

    function clamp(v) { return v < -MAX ? -MAX : (v > MAX ? MAX : v); }
    function atTop() { return window.scrollY <= 0; }
    function atBottom() {
        return Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 1;
    }
    function apply(v) {
        wrap.style.transform = 'translate3d(0,' + v.toFixed(2) + 'px,0)';
    }

    /* Em repouso: zera o deslocamento e REMOVE transform + will-change.
       Sem nenhuma dessas propriedades, o wrapper deixa de ser "containing
       block", e qualquer position: sticky descendente volta a se referenciar
       na viewport normalmente. */
    function settle() {
        rendered = 0;
        target = 0;
        wrap.style.transform = '';
        wrap.style.willChange = '';
        ticking = false;
    }

    function loop() {
        if (!holding) target *= SPRING;            // mola: volta a 0
        rendered += (target - rendered) * EASE;    // segue o alvo suavemente
        if (!holding && Math.abs(target) < 0.25 && Math.abs(rendered) < 0.25) {
            settle();                              // libera a GPU e destrava o sticky
            return;
        }
        apply(rendered);
        requestAnimationFrame(loop);
    }
    function start() {
        if (!ticking) {
            ticking = true;
            wrap.style.willChange = 'transform';   // promove só enquanto dura o efeito
            requestAnimationFrame(loop);
        }
    }

    // MOUSE / TRACKPAD: cada "tick" no limite empurra um pouco o alvo
    window.addEventListener('wheel', function (e) {
        var dy = e.deltaY;
        var pulling = (atTop() && dy < 0) || (atBottom() && dy > 0);
        if (!pulling) return;                       // longe do limite: o loop cuida de voltar
        var resist = 1 - Math.min(Math.abs(target) / MAX, 1);
        target = clamp(target + (-dy * 0.08 * resist));
        start();
    }, { passive: true });

    // TOQUE: segue o dedo (com resistência) e solta com mola
    var startY = 0;
    window.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
        var dy = e.touches[0].clientY - startY;
        if ((atTop() && dy > 0) || (atBottom() && dy < 0)) {
            holding = true;
            var resist = 1 - Math.min(Math.abs(dy) / 600, 0.8);
            target = clamp(dy * 0.16 * resist);
            start();
        } else if (holding) {
            holding = false;                        // saiu do limite: deixa voltar
        }
    }, { passive: true });
    window.addEventListener('touchend', function () {
        holding = false;
        start();
    }, { passive: true });
})();
