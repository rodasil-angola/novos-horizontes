/* IMP NH — interações do website (sem dependências). Cada módulo é independente. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('nh-js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Header: transparente → sólido ---- */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 24 || header.classList.contains('is-open')); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Menu mobile ---- */
  var toggle = $('[data-menu-toggle]'), menu = $('[data-menu]');
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nh-sr').textContent = open ? 'Fechar menu' : 'Abrir menu';
      menu.hidden = !open;
      header.classList.toggle('is-open', open);
      header.classList.toggle('is-solid', open || window.scrollY > 24);
    };
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1199 && !menu.hidden) setMenu(false); });
  }

  /* ---- Animações de entrada ---- */
  var reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('is-in'); }); }

  /* ---- Dados dos cursos (embutidos na página) ---- */
  var dataEl = $('#nh-cursos');
  var DATA = dataEl ? JSON.parse(dataEl.textContent) : null;
  var CAT = { administracao: '#641C32', saude: '#8a2a45', mecanica: '#101D38', informatica: '#23396b', construcao: '#6b5222', electricidade: '#1d4a5c' };

  /* ---- Filtro de cursos ---- */
  var filter = $('[data-filter]'), grid = $('[data-course-grid]');
  if (filter && grid) {
    var cards = $$('[data-course]', grid), countEl = $('[data-count]');
    var apply = function (key, fromHash) {
      var btns = $$('[data-filter-key]', filter), found = false;
      btns.forEach(function (b) { var on = b.getAttribute('data-filter-key') === key; b.setAttribute('aria-pressed', String(on)); if (on) found = true; });
      if (!found) { key = 'todos'; btns[0].setAttribute('aria-pressed', 'true'); }
      var parts = key.split(':'), n = 0;
      cards.forEach(function (c) {
        var show = key === 'todos' || c.getAttribute('data-' + parts[0]) === parts[1];
        c.classList.toggle('is-hidden', !show);
        c.classList.remove('is-entering');
        if (show) { void c.offsetWidth; c.classList.add('is-entering'); n++; }
      });
      if (countEl) countEl.textContent = n + (n === 1 ? ' curso encontrado' : ' cursos encontrados');
      if (!fromHash) history.replaceState(null, '', key === 'todos' ? location.pathname : '#' + key);
    };
    filter.addEventListener('click', function (e) { var b = e.target.closest('[data-filter-key]'); if (b) apply(b.getAttribute('data-filter-key')); });
    apply(decodeURIComponent(location.hash.slice(1)) || 'todos', true);
    window.addEventListener('hashchange', function () { apply(decodeURIComponent(location.hash.slice(1)) || 'todos', true); });
  }

  /* ---- Modal de curso ---- */
  var modal = $('[data-modal]');
  if (modal && DATA) {
    var dialog = $('.nh-modal__dialog', modal), lastFocus = null;
    var m = function (k) { return $('[data-m="' + k + '"]', modal); };
    var openModal = function (id) {
      var c = DATA.cursos.filter(function (x) { return x.id === id; })[0];
      if (!c) return;
      lastFocus = document.activeElement;
      dialog.style.setProperty('--cat', CAT[c.area] || '#641C32');
      m('icon').innerHTML = c.icon;
      m('meta').textContent = c.poloNome + ' · ' + c.areaNome;
      m('title').textContent = c.nome;
      m('desc').textContent = c.desc;
      m('badge').hidden = !!c.confirmado;
      var f = DATA.fees[c.polo];
      m('fees').innerHTML = '<div><span>Inscrição e matrícula</span><strong>' + f.matricula + '</strong></div>' +
        '<div><span>Propina 10ª classe</span><strong>' + f.propina10 + '</strong></div>' +
        '<div><span>Propina 13ª classe</span><strong>' + f.propina13 + '</strong></div>';
      var pre = m('pre'); pre.href = pre.href.split('?')[0] + '?polo=' + c.polo + '&curso=' + c.id;
      var wa = m('wa'); wa.href = wa.href.split('?')[0] + '?text=' + encodeURIComponent('Olá! Gostaria de obter informações sobre o curso de ' + c.nome + ' (' + c.poloNome + ') do Instituto Politécnico Privado Novos Horizontes.');
      modal.hidden = false; document.body.classList.add('nh-lock'); dialog.focus();
    };
    var closeModal = function () { modal.hidden = true; document.body.classList.remove('nh-lock'); if (lastFocus) lastFocus.focus(); };
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-course-open]'); if (o) { openModal(o.getAttribute('data-course-open')); return; }
      if (e.target.closest('[data-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') trap(e, dialog);
    });
  }

  function trap(e, box) {
    var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', box).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === box)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---- Galeria: filtro + lightbox ---- */
  var gal = $('[data-gallery]');
  if (gal) {
    var items = $$('.nh-gallery__item', gal), gf = $('[data-gallery-filter]');
    if (gf) gf.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter-key]'); if (!b) return;
      var k = b.getAttribute('data-filter-key');
      $$('[data-filter-key]', gf).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      items.forEach(function (it) {
        var show = k === 'todos' || it.getAttribute('data-cat') === k;
        it.classList.toggle('is-hidden', !show);
        if (show) { it.style.animation = 'none'; void it.offsetWidth; it.style.animation = ''; }
      });
    });
    var lb = $('[data-lb]'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]'), cur = 0, lbLast = null;
    var visible = function () { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); };
    var show = function (it) {
      var img = $('img', it);
      lbImg.src = img.src; lbImg.alt = img.alt; lbCap.textContent = $('figcaption', it).textContent;
      cur = visible().indexOf(it);
    };
    var step = function (d) { var v = visible(); if (!v.length) return; show(v[(cur + d + v.length) % v.length]); };
    var closeLb = function () { lb.hidden = true; document.body.classList.remove('nh-lock'); if (lbLast) lbLast.focus(); };
    gal.addEventListener('click', function (e) {
      var b = e.target.closest('[data-lightbox]'); if (!b) return;
      lbLast = b; show(b.closest('.nh-gallery__item')); lb.hidden = false; document.body.classList.add('nh-lock'); $('[data-lb-close]', lb).focus();
    });
    $('[data-lb-close]', lb).addEventListener('click', closeLb);
    $('[data-lb-prev]', lb).addEventListener('click', function () { step(-1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'Tab') trap(e, lb);
    });
  }

  /* ---- Pré-inscrição: polo → área → curso ---- */
  var poloSel = $('[data-polo-select]');
  if (poloSel && DATA) {
    var areaSel = $('[data-area-select]'), cursoSel = $('[data-curso-select]'), note = $('[data-curso-note]');
    var opts = function (sel, list, ph) {
      sel.innerHTML = '<option value="">' + ph + '</option>' + list.map(function (o) { return '<option value="' + o.v + '">' + o.l + '</option>'; }).join('');
      sel.disabled = !list.length;
    };
    var fillAreas = function () {
      var p = poloSel.value;
      opts(areaSel, p ? DATA.areas.filter(function (a) { return a.polo === p; }).map(function (a) { return { v: a.id, l: a.nome }; }) : [], p ? 'Escolha a área' : 'Escolha primeiro o polo');
      fillCursos();
    };
    var fillCursos = function () {
      var a = areaSel.value;
      opts(cursoSel, a ? DATA.cursos.filter(function (c) { return c.area === a; }).map(function (c) { return { v: c.id, l: c.nome + (c.confirmado ? '' : ' (oferta a confirmar)') }; }) : [], a ? 'Escolha o curso' : 'Escolha primeiro a área');
      note.hidden = true;
    };
    poloSel.addEventListener('change', fillAreas);
    areaSel.addEventListener('change', fillCursos);
    cursoSel.addEventListener('change', function () {
      var c = DATA.cursos.filter(function (x) { return x.id === cursoSel.value; })[0];
      note.hidden = !c || c.confirmado;
    });
    // Períodos: só aparecem quando a instituição os confirmar (data.js → PERIODOS)
    if (DATA.periodos && DATA.periodos.length) {
      var pf = $('[data-periodo-field]'); pf.hidden = false;
      opts($('select', pf), DATA.periodos.map(function (p) { return { v: p, l: p }; }), 'Escolha o período');
    }
    // Pré-seleção vinda do modal do curso (?polo=&curso=)
    var q = new URLSearchParams(location.search), qc = q.get('curso');
    var pc = qc && DATA.cursos.filter(function (x) { return x.id === qc; })[0];
    if (pc) {
      poloSel.value = pc.polo; fillAreas(); areaSel.value = pc.area; fillCursos(); cursoSel.value = pc.id;
      cursoSel.dispatchEvent(new Event('change'));
    } else if (q.get('polo')) { poloSel.value = q.get('polo'); fillAreas(); }
  }

  /* ---- Formulários de demonstração (sem envio real) ---- */
  $$('[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      $$('.nh-field', form).forEach(function (f) {
        var el = $('input, select, textarea', f); if (!el) return;
        var err = $('.nh-field__err', f); if (err) err.remove();
        var ok = el.checkValidity();
        f.classList.toggle('is-invalid', !ok);
        el.setAttribute('aria-invalid', String(!ok));
        if (!ok) {
          var p = document.createElement('p'); p.className = 'nh-field__err'; p.id = el.id + '-err';
          p.textContent = el.validity.valueMissing ? 'Campo obrigatório.' : 'Verifique este campo.';
          f.appendChild(p); el.setAttribute('aria-describedby', p.id);
          if (!firstBad) firstBad = el;
        } else { el.removeAttribute('aria-describedby'); }
      });
      if (firstBad) { firstBad.focus(); return; }
      // Integração futura: enviar FormData(form) para o endpoint do WordPress aqui.
      var okBox = $('.nh-form__ok', form);
      okBox.hidden = false; okBox.focus();
      $('button[type="submit"]', form).disabled = true;
    });
  });

  /* ---- WhatsApp flutuante ---- */
  var wa = $('[data-wa]');
  if (wa) {
    var wt = $('[data-wa-toggle]', wa), wp = $('[data-wa-panel]', wa);
    var setWa = function (open) { wp.hidden = !open; wt.setAttribute('aria-expanded', String(open)); };
    wt.addEventListener('click', function (e) { e.stopPropagation(); setWa(wp.hidden); });
    document.addEventListener('click', function (e) { if (!wp.hidden && !wa.contains(e.target)) setWa(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !wp.hidden) { setWa(false); wt.focus(); } });
  }
})();
