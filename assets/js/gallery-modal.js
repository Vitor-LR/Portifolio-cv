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

    /* ===== TEMPO CONFIGURÁVEL =====
       Quantos milissegundos é preciso SEGURAR antes do modo "espiar"
       abrir. Aumente p/ exigir um segurar mais longo; diminua p/ abrir
       mais rápido ao segurar. (clique normal = soltar antes disso) */
    var HOLD_DELAY = 450;

    var holdTimer = null;
    var pressing = false;   // botão do mouse pressionado sobre uma figure
    var peeking = false;    // abriu via "segurar" (deve fechar ao soltar)
    var lastType = '';      // tipo do último ponteiro (mouse/touch/pen)
    var currentImg = null;  // imagem da figure pressionada

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

        // MOUSE: nada abre no pressionar; um timer abre o "espiar" após o delay
        fig.addEventListener('pointerdown', function (e) {
            lastType = e.pointerType;
            if (e.pointerType !== 'mouse') return;   // toque/caneta → tratados no click
            if (e.button !== 0) return;              // só botão principal
            e.preventDefault();
            pressing = true;
            peeking = false;
            currentImg = img;
            clearTimeout(holdTimer);
            holdTimer = setTimeout(function () {
                if (pressing) { peeking = true; open(img); }   // segurou → espiar
            }, HOLD_DELAY);
        });

        // se arrastar pra fora antes de abrir, cancela (não é clique nem espiar)
        fig.addEventListener('pointerleave', function () {
            if (pressing && !peeking) { clearTimeout(holdTimer); pressing = false; }
        });

        // TOQUE / CANETA: um toque abre e permanece
        fig.addEventListener('click', function () {
            if (lastType === 'mouse') return;        // mouse já tratado nos pointer events
            open(img);
        });

        // TECLADO: Enter/Espaço abre (permanece)
        fig.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
        });

        // evita menu de contexto / "salvar imagem" durante o segurar
        fig.addEventListener('contextmenu', function (e) {
            if (pressing || isOpen()) e.preventDefault();
        });
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
})();