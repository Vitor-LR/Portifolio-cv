/* ============================================================
   Links de e-mail — ofuscação + roteamento conforme o aparelho
   ------------------------------------------------------------
   OFUSCAÇÃO: o endereço NÃO existe em texto no HTML. Ele fica
   em Base64 no atributo data-e64 e só é decodificado aqui, em
   tempo de execução. Coletores de e-mail varrem o HTML estático
   atrás de "mailto:" e de padrões usuario@dominio — não executam
   este script, então não encontram nada.

   Para trocar o endereço: btoa('novo@email.com') no console do
   navegador gera o novo valor de data-e64.

   ROTEAMENTO (mesma lógica de antes): os dois métodos de abrir
   um e-mail falham em lugares opostos:

     mailto:      no celular abre o app nativo (ótimo), mas no PC
                  depende de um cliente instalado. Quem usa webmail
                  não tem nenhum, e o clique simplesmente não faz
                  nada — sem erro, sem aviso.

     Gmail web    no PC funciona sempre, mas no celular abre o
                  navegador em vez do aplicativo do Gmail.

   Por isso o destino é decidido aqui, e não fixo no HTML: toque
   recebe mailto:, ponteiro fino recebe o Gmail na web.

   Sem JavaScript, o link cai no href="#contato" do HTML (leva a
   pessoa ao formulário) e o card mostra "use o formulário ao lado".
   ============================================================ */
(function () {
    'use strict';

    var GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=';

    function decodificar(b64) {
        try { return atob(b64); } catch (e) { return ''; }
    }

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
        var links = document.querySelectorAll('[data-e64]');

        Array.prototype.forEach.call(links, function (a) {
            var endereco = decodificar(a.getAttribute('data-e64'));
            if (!endereco || endereco.indexOf('@') === -1) return;

            // Escreve o endereço visível no card (se houver o slot)
            var alvo = a.querySelector('[data-e64-text]');
            if (alvo) alvo.textContent = endereco;

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
