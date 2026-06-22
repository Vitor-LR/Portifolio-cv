/* ============================================================
   TELEFONE — seletor de país + formatação automática
   - Padrão Brasil (sem +55: começa no DDD).
   - Formata enquanto digita, no formato de cada país:
       BR (31) 91234-6789   ·   US +1 (555) 123-4567   ·   PT +351 912 345 678 …
   - O código (+1, +351…) fica à esquerda; só os dígitos vão no input.
   - Autônomo: o input visível guarda só o número formatado e um campo
     oculto (name="Telefone") envia "<PAÍS> <código> <número>", ex.:
       "US +1 (555) 123-4567"  ·  "BR (31) 91234-6789"
     → o contact-form.js não precisa de nenhuma alteração.
   ============================================================ */
(function () {
    'use strict';

    var group = document.getElementById('phone-group');
    if (!group) return;

    var input = document.getElementById('telefone-input');
    var codeSpan = document.getElementById('phone-code');
    var flagBtn = document.getElementById('phone-flag');
    var flagUse = document.getElementById('phone-flag-use');
    var menu = document.getElementById('phone-menu');
    var hidden = document.getElementById('telefone-out');
    if (!input || !codeSpan || !flagBtn || !flagUse || !menu || !hidden) return;

    var opts = Array.prototype.slice.call(menu.querySelectorAll('.phone-opt'));
    if (!opts.length) return;

    /* Máscaras por país ('#' = dígito). BR depende do tamanho (fixo x celular). */
    var MASKS = {
        PT: '### ### ###',
        US: '(###) ###-####',
        CA: '(###) ###-####',
        DE: '#### ########',
        FR: '# ## ## ## ##',
        GB: '#### ######',
        ES: '### ## ## ##',
        NL: '# ########',
        AU: '### ### ###'
    };
    function maskFor(iso, digits) {
        if (iso === 'BR') return digits.length > 10 ? '(##) #####-####' : '(##) ####-####';
        return MASKS[iso] || '';
    }
    function maxDigits(iso) {
        if (iso === 'BR') return 11;
        var p = MASKS[iso] || '';
        var n = (p.match(/#/g) || []).length;
        return n || 15;
    }
    function format(iso, digits) {
        var pattern = maskFor(iso, digits);
        if (!pattern) return digits;
        var out = '', di = 0;
        for (var i = 0; i < pattern.length && di < digits.length; i++) {
            out += pattern.charAt(i) === '#' ? digits.charAt(di++) : pattern.charAt(i);
        }
        if (di < digits.length) out += digits.slice(di);
        return out.replace(/[\s\-]+$/, '');   // sem separador sobrando no fim
    }

    var current = { iso: 'BR', code: '' };

    function syncHidden() {
        var num = input.value.trim();
        if (!num) { hidden.value = ''; return; }
        hidden.value = current.iso + ' ' + (current.code ? current.code + ' ' : '') + num;
    }

    /* reformata preservando a posição do cursor (conta dígitos à esquerda) */
    function reformat() {
        var iso = current.iso;
        var oldVal = input.value;
        var caret = input.selectionStart;
        if (caret == null) caret = oldVal.length;

        var digitsBeforeCaret = (oldVal.slice(0, caret).match(/\d/g) || []).length;
        var digits = (oldVal.match(/\d/g) || []).join('').slice(0, maxDigits(iso));
        var formatted = format(iso, digits);
        input.value = formatted;

        var pos = 0, seen = 0;
        while (pos < formatted.length && seen < digitsBeforeCaret) {
            if (/\d/.test(formatted.charAt(pos))) seen++;
            pos++;
        }
        try { input.setSelectionRange(pos, pos); } catch (e) {}
        syncHidden();
    }

    function select(li) {
        opts.forEach(function (o) {
            var on = o === li;
            o.classList.toggle('is-active', on);
            o.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        current.iso = li.getAttribute('data-iso') || 'BR';
        current.code = li.getAttribute('data-code') || '';
        var ref = '#fl-' + current.iso.toLowerCase();
        flagUse.setAttribute('href', ref);
        flagUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ref); // Safari antigo
        codeSpan.textContent = current.code;            // vazio = Brasil (sem +55)
        var ph = li.getAttribute('data-ph');
        if (ph) input.placeholder = ph;

        // re-formata o que já estava digitado no novo formato do país
        var digits = (input.value.match(/\d/g) || []).join('').slice(0, maxDigits(current.iso));
        input.value = format(current.iso, digits);
        syncHidden();
    }

    /* ---------- abrir / fechar ---------- */
    function openMenu(focusList) {
        menu.classList.add('is-open');
        flagBtn.setAttribute('aria-expanded', 'true');
        // ao abrir via teclado, leva o foco para a opção atualmente selecionada
        if (focusList) {
            var sel = menu.querySelector('.phone-opt.is-active');
            focusOption(sel ? opts.indexOf(sel) : 0);
        }
    }
    function closeMenu(returnFocus) {
        menu.classList.remove('is-open');
        flagBtn.setAttribute('aria-expanded', 'false');
        if (returnFocus) flagBtn.focus();
    }
    function isOpen() { return menu.classList.contains('is-open'); }

    /* ---------- foco entre opções (roving tabindex) ----------
       Só a opção "ativa" fica tabbável; as setas movem o foco entre elas.
       Isso torna o listbox utilizável 100% por teclado, como o ARIA promete. */
    var activeIndex = opts.indexOf(menu.querySelector('.phone-opt.is-active'));
    if (activeIndex < 0) activeIndex = 0;
    opts.forEach(function (o) { o.setAttribute('tabindex', '-1'); });

    function focusOption(i) {
        activeIndex = Math.max(0, Math.min(opts.length - 1, i));
        opts.forEach(function (o, idx) { o.setAttribute('tabindex', idx === activeIndex ? '0' : '-1'); });
        opts[activeIndex].focus();
    }

    /* ---------- mouse ---------- */
    flagBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isOpen()) closeMenu(); else openMenu(false);
    });

    opts.forEach(function (li, idx) {
        li.addEventListener('click', function () {
            activeIndex = idx;          // mantém o índice sincronizado com o mouse
            select(li);
            closeMenu();
            input.focus();
        });
    });

    /* ---------- teclado no botão (abre e entra na lista) ---------- */
    flagBtn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isOpen()) openMenu(true);
            else focusOption(activeIndex);
        }
    });

    /* ---------- teclado dentro da lista ---------- */
    menu.addEventListener('keydown', function (e) {
        if (!isOpen()) return;
        switch (e.key) {
            case 'ArrowDown': e.preventDefault(); focusOption(activeIndex + 1); break;
            case 'ArrowUp':   e.preventDefault(); focusOption(activeIndex - 1); break;
            case 'Home':      e.preventDefault(); focusOption(0); break;
            case 'End':       e.preventDefault(); focusOption(opts.length - 1); break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                select(opts[activeIndex]);
                closeMenu(true);        // confirma e devolve o foco ao botão
                break;
            case 'Tab':
                closeMenu(false);       // sai naturalmente para o próximo campo
                break;
            // Escape é tratado pelo listener global abaixo
        }
    });

    input.addEventListener('input', reformat);

    /* ---------- fechar clicando fora / Escape ---------- */
    document.addEventListener('click', function (e) {
        if (isOpen() && !group.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) closeMenu(true);
    });

    // estado inicial (Brasil)
    select(menu.querySelector('.phone-opt.is-active') || opts[0]);
})();