/* ============================================================
   Lightbox das screenshots da galeria (páginas de projeto).

   Duas formas de usar:
   1. CLIQUE normal (pressionar e soltar rápido) → abre a janela e
      PERMANECE aberta. Fecha no X, clicando no fundo, ou tecla Esc.
   2. PRESSIONAR e SEGURAR → após um pequeno DELAY a janela abre
      (modo "espiar") e FECHA assim que você solta.

   >>> Tempo configurável: ajuste HOLD_DELAY abaixo. <<<
   Solte ANTES do delay  = clique (abre e permanece).
   Segure ALÉM do delay  = espiar (abre e fecha ao soltar).
   ============================================================ */
(function () {
    'use strict';

    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var lbImg = lb.querySelector('img');
    var closeBtn = lb.querySelector('.lightbox-close');
    if (lbImg) lbImg.draggable = false;

    /* ===== TEMPO CONFIGURÁVEL =====
       Quantos milissegundos é preciso SEGURAR antes do modo "espiar"
       abrir. Aumente p/ exigir um segurar mais longo; diminua p/ abrir
       mais rápido ao segurar. (clique normal = soltar antes disso) */
    var HOLD_DELAY = 450;

    var holdTimer = null;
    var pressing = false;   // ponteiro pressionado sobre uma figure
    var peeking = false;    // abriu via "segurar" (deve fechar ao soltar)
    var lastType = '';      // tipo do último ponteiro (mouse/touch/pen)
    var currentImg = null;  // imagem da figure pressionada
    var startX = 0, startY = 0;   // posição inicial do toque (p/ detectar arraste)

    function open(img) {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || '';
        lb.classList.add('open');
        lb.setAttribute('aria-hidden', 'false');
        document.documentElement.style.overflow = 'hidden';
    }
    function close() {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
        document.documentElement.style.overflow = '';
    }
    function isOpen() { return lb.classList.contains('open'); }

    var figs = document.querySelectorAll('.gallery figure');
    Array.prototype.forEach.call(figs, function (fig) {
        var img = fig.querySelector('img');
        if (!img) return;
        fig.tabIndex = 0;
        fig.setAttribute('role', 'button');
        fig.setAttribute('aria-label', 'Ampliar: ' + (img.alt || 'screenshot'));

        img.draggable = false;

        // PRESSIONAR e SEGURAR (mouse, TOQUE ou caneta): um timer abre o modo
        // "espiar" após o delay. Soltar antes do delay = clique (abre e permanece).
        fig.addEventListener('pointerdown', function (e) {
            lastType = e.pointerType;
            if (e.pointerType === 'mouse' && e.button !== 0) return;   // só botão principal
            if (e.pointerType === 'mouse') e.preventDefault();         // mouse: evita seleção/arraste
            // (no toque NÃO usamos preventDefault, senão a rolagem da página trava)
            pressing = true;
            peeking = false;
            currentImg = img;
            startX = e.clientX;
            startY = e.clientY;
            clearTimeout(holdTimer);
            holdTimer = setTimeout(function () {
                if (pressing) { peeking = true; open(img); }   // segurou parado → espiar
            }, HOLD_DELAY);
        });

        // se arrastar/sair antes de abrir, cancela (mouse; no toque há captura implícita)
        fig.addEventListener('pointerleave', function () {
            if (pressing && !peeking) { clearTimeout(holdTimer); pressing = false; }
        });

        // TECLADO: Enter/Espaço abre (permanece)
        fig.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
        });

        // nunca mostra o menu nativo (abrir em nova guia / copiar / baixar) na miniatura
        fig.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });

    function endPress() {
        if (!pressing) return;
        clearTimeout(holdTimer);
        if (peeking) {
            close();                       // estava espiando (segurou) → fecha ao soltar
        } else if (currentImg) {
            open(currentImg);              // soltou antes do delay → clique → abre e permanece
        }
        pressing = false;
        peeking = false;
    }
    // se o dedo se mover além de um limiar antes de abrir, é ROLAGEM/arraste →
    // cancela o "segurar" (não abre o screenshot ao descer a página)
    window.addEventListener('pointermove', function (e) {
        if (!pressing || peeking) return;
        var dx = e.clientX - startX, dy = e.clientY - startY;
        if (dx * dx + dy * dy > 100) {        // ~10px de tolerância
            clearTimeout(holdTimer);
            pressing = false;
        }
    }, { passive: true });

    window.addEventListener('pointerup', endPress);
    window.addEventListener('pointercancel', function () {
        if (!pressing) return;
        clearTimeout(holdTimer);
        if (peeking) close();
        pressing = false;
        peeking = false;
    });

    // fechar: X, fundo e Esc
    closeBtn.addEventListener('click', close);
    lb.addEventListener('pointerdown', function (e) {
        if (e.target === lb) close();                // clicou fora da moldura
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) close();
    });

    // bloqueia o menu nativo (abrir em nova guia / copiar / baixar imagem) tanto
    // na miniatura quanto na imagem ampliada — em qualquer navegador/dispositivo
    document.addEventListener('contextmenu', function (e) {
        var t = e.target;
        if (t && t.closest && (t.closest('.gallery figure') || t.closest('.lightbox'))) {
            e.preventDefault();
        }
    });
})();