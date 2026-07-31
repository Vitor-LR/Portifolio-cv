/* ============================================================
   FORMULÁRIO DE CONTATO — envio por AJAX + popup de confirmação
   - Ao enviar, abre um modal "Não sou um robô" na própria página
     (sem ir para a página externa do FormSubmit).
   - Confirmando, manda os dados via AJAX para o FormSubmit e, no
     sucesso, abre o popup de agradecimento (sem mudar de página).
   - Proteção anti-spam: honeypot (_honey), portão de tempo
     (envios rápidos demais são de robô) e endpoint por random
     string do FormSubmit — o e-mail de destino não existe em
     lugar nenhum do código do formulário.

   O random string abaixo é o apelido que o FormSubmit dá ao
   e-mail confirmado. Se um dia trocar o e-mail de destino:
   ative o novo endereço (1º envio + link de confirmação), copie
   o novo string da página de confirmação e substitua aqui.
   ============================================================ */
(function () {
    'use strict';

    var form = document.querySelector('.contact-form');
    var modal = document.getElementById('cf-modal');

    if (!form || !modal) return;

    var KEY = 'b47b7ea7cf41dc546eea03559f608e0f';   // random string (FormSubmit)
    var ENDPOINT = 'https://formsubmit.co/ajax/' + KEY;

    // A action do <form> também é definida aqui (fallback pós-JS).
    form.setAttribute('action', 'https://formsubmit.co/' + KEY);

    /* Portão de tempo: humano leva vários segundos para ler a
       página, preencher e confirmar o modal. Robô que executa JS
       envia em fração de segundo. Envios feitos antes de MIN_MS
       desde o carregamento são descartados em silêncio (o robô
       recebe o popup de "sucesso" e vai embora achando que enviou). */
    var carregadoEm = Date.now();
    var MIN_MS = 4000;
    function rapidoDemais() { return (Date.now() - carregadoEm) < MIN_MS; }

    var robot = document.getElementById('cf-robot');
    var sendBtn = document.getElementById('cf-send');
    var errEl = document.getElementById('cf-error');
    var closers = modal.querySelectorAll('[data-cf-close]');
    var lastFocus = null;

    // Popup de agradecimento (sucesso)
    var success = document.getElementById('cf-success');
    var successBack = document.getElementById('cf-success-back');
    var successClosers = success ? success.querySelectorAll('[data-cf-success-close]') : [];

    function openSuccess() {
        if (!success) return;
        success.hidden = false;
        void success.offsetWidth;            // força reflow p/ animar a entrada
        success.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (successBack) successBack.focus();
    }

    function closeSuccess() {
        if (!success) return;
        success.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(function () { success.hidden = true; }, 250);   // espera a animação de saída
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // Passa pelo tradutor quando o site está em inglês (i18n.js).
    function t(msg) { return (window.I18N && window.I18N.t) ? window.I18N.t(msg) : msg; }

    function setSending(on) {
        sendBtn.disabled = on || !robot.checked;
        sendBtn.textContent = on ? t('Enviando…') : t('Enviar mensagem');
    }

    function openModal() {
        errEl.hidden = true;
        robot.checked = false;
        setSending(false);
        sendBtn.disabled = true;
        lastFocus = document.activeElement;
        modal.hidden = false;
        // força reflow p/ animar
        void modal.offsetWidth;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        robot.focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setSending(false);
        setTimeout(function () { modal.hidden = true; }, 200);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // intercepta o envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // respeita as validações nativas (campos obrigatórios, e-mail válido…)
        if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;
        openModal();
    });

    robot.addEventListener('change', function () {
        sendBtn.disabled = !robot.checked;
    });

    closers.forEach(function (el) { el.addEventListener('click', closeModal); });
    successClosers.forEach(function (el) { el.addEventListener('click', closeSuccess); });

    // Elementos focáveis dentro do card do modal (para o focus trap)
    var card = modal.querySelector('.cf-modal__card');
    function focusables() {
        if (!card) return [];
        var sel = 'a[href], button:not([disabled]), input:not([disabled]), ' +
            '[tabindex]:not([tabindex="-1"])';
        return Array.prototype.filter.call(
            card.querySelectorAll(sel),
            function (el) { return el.offsetParent !== null; } // só os visíveis
        );
    }

    document.addEventListener('keydown', function (e) {
        if (modal.hidden) return;
        if (e.key === 'Escape') { closeModal(); return; }
        if (e.key !== 'Tab') return;

        // Prende o foco dentro do modal (não deixa o Tab sair do diálogo)
        var items = focusables();
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        var active = document.activeElement;

        if (e.shiftKey && (active === first || !card.contains(active))) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // Teclado do popup de agradecimento: Esc fecha; Tab fica preso no botão
    document.addEventListener('keydown', function (e) {
        if (!success || success.hidden) return;
        if (e.key === 'Escape') { closeSuccess(); return; }
        if (e.key === 'Tab') {
            e.preventDefault();
            if (successBack) successBack.focus();
        }
    });

    sendBtn.addEventListener('click', function () {
        if (!robot.checked) return;

        /* Anti-spam: honeypot preenchido ou envio rápido demais →
           finge sucesso sem mandar nada ao servidor. */
        var honey = form.querySelector('[name="_honey"]');
        if ((honey && honey.value) || rapidoDemais()) {
            closeModal();
            form.reset();
            openSuccess();
            return;
        }

        setSending(true);
        errEl.hidden = true;

        /* No HTML, _captcha=true protege o envio clássico (sem JS).
           A rota AJAX não renderiza captcha, então aqui ele é
           desligado só neste payload — a página não muda. */
        var dados = new FormData(form);
        dados.set('_captcha', 'false');

        fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: dados
        })
            .then(function (r) { return r.json().catch(function () { return {}; }); })
            .then(function (res) {
                var ok = res && (res.success === 'true' || res.success === true);
                if (ok) {
                    closeModal();        // fecha o "não sou robô"
                    form.reset();        // limpa o formulário
                    openSuccess();       // abre o agradecimento
                } else {
                    throw new Error((res && res.message) || 'falha no envio');
                }
            })
            .catch(function () {
                setSending(false);
                errEl.textContent = t('Não foi possível enviar agora. Tente novamente em instantes.');
                errEl.hidden = false;
            });
    });
})();