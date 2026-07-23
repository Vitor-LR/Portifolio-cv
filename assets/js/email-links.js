/* ============================================================
   Links de e-mail — roteia conforme o aparelho
   ------------------------------------------------------------
   Os dois métodos de abrir um e-mail falham em lugares opostos:

     mailto:      no celular abre o app nativo (ótimo), mas no PC
                  depende de um cliente instalado. Quem usa webmail
                  não tem nenhum, e o clique simplesmente não faz
                  nada — sem erro, sem aviso.

     Gmail web    no PC funciona sempre, mas no celular abre o
                  navegador em vez do aplicativo do Gmail.

   Por isso o destino é decidido aqui, e não fixo no HTML: toque
   recebe mailto:, ponteiro fino recebe o Gmail na web.

   O HTML mantém href="mailto:..." como base. Sem JavaScript o
   link continua válido — só perde o roteamento.
   ============================================================ */
(function () {
    'use strict';

    var GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=';

    /* Aparelho de toque sem cursor: celular ou tablet. Ali o sistema
       sempre tem um app de e-mail registrado, então mailto: abre o
       aplicativo — que é o que a pessoa espera.

       A consulta é por capacidade, não por userAgent: string de
       navegador mente, mente sempre, e quebra a cada versão nova. */
    function preferirAppNativo() {
        if (!window.matchMedia) return false;
        return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    }

    function aplicar() {
        var usarApp = preferirAppNativo();
        var links = document.querySelectorAll('[data-email]');

        Array.prototype.forEach.call(links, function (a) {
            var endereco = a.getAttribute('data-email');
            if (!endereco) return;

            if (usarApp) {
                a.setAttribute('href', 'mailto:' + endereco);
                // mailto: em nova aba deixa uma aba em branco para trás.
                a.removeAttribute('target');
                a.removeAttribute('rel');
                return;
            }

            a.setAttribute('href', GMAIL + encodeURIComponent(endereco));
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
        });
    }

    aplicar();

    /* Tablet com teclado acoplado, ou janela arrastada para outra
       tela, mudam a capacidade de ponteiro no meio da sessão. */
    if (window.matchMedia) {
        var mq = window.matchMedia('(hover: none) and (pointer: coarse)');
        if (mq.addEventListener) mq.addEventListener('change', aplicar);
        else if (mq.addListener) mq.addListener(aplicar);
    }
})();
