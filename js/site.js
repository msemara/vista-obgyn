// Nav dropdowns: click/Enter toggles, Escape or clicking elsewhere closes.
(function () {
  var groups = document.querySelectorAll('.nav-group');
  function close(g) {
    g.classList.remove('open');
    var b = g.querySelector('.nav-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  groups.forEach(function (g) {
    var btn = g.querySelector('.nav-toggle');
    btn.addEventListener('click', function () {
      var open = !g.classList.contains('open');
      groups.forEach(close);
      if (open) { g.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && g.classList.contains('open')) { close(g); btn.focus(); }
    });
    g.addEventListener('focusout', function (e) {
      if (!g.contains(e.relatedTarget)) close(g);
    });
  });
  document.addEventListener('click', function (e) {
    groups.forEach(function (g) { if (!g.contains(e.target)) close(g); });
  });
})();

// Phone / tablet menu: built from the main nav so the two never drift apart.
(function () {
  var nav = document.querySelector('.site-head .nav');
  var bar = document.querySelector('.site-head .wrap');
  if (!nav || !bar) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-menu');
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg><span>Menu</span>';
  bar.appendChild(btn);

  var panel = document.createElement('div');
  panel.className = 'mmenu';
  panel.id = 'mobile-menu';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Site menu');
  panel.hidden = true;

  function link(a, cls) {
    var l = document.createElement('a');
    l.href = a.getAttribute('href');
    l.textContent = a.textContent;
    if (cls) l.className = cls;
    if (a.getAttribute('aria-current')) l.setAttribute('aria-current', 'page');
    return l;
  }

  var list = document.createElement('ul');
  list.className = 'mmenu-list';
  var portal, book;
  Array.prototype.forEach.call(nav.children, function (el, i) {
    if (el.classList.contains('btn-outline')) { portal = el; return; }
    if (el.classList.contains('btn-primary')) { book = el; return; }
    var li = document.createElement('li');
    if (el.classList.contains('nav-group')) {
      li.className = 'mmenu-group';
      var id = 'mmenu-label-' + i;
      var label = document.createElement('p');
      label.className = 'mmenu-label';
      label.id = id;
      label.textContent = el.querySelector('.nav-toggle').textContent;
      var sub = document.createElement('ul');
      sub.setAttribute('aria-labelledby', id);
      el.querySelectorAll('.nav-menu a').forEach(function (a) {
        var sli = document.createElement('li');
        sli.appendChild(link(a));
        sub.appendChild(sli);
      });
      li.appendChild(label);
      li.appendChild(sub);
    } else {
      li.appendChild(link(el, 'mmenu-top-link'));
    }
    list.appendChild(li);
  });

  var top = document.createElement('div');
  top.className = 'mmenu-top';
  top.innerHTML = '<a class="brand" href="/">Vista Women’s Health</a>' +
    '<button type="button" class="mmenu-close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg><span>Close</span></button>';

  var menuNav = document.createElement('nav');
  menuNav.className = 'mmenu-nav';
  menuNav.setAttribute('aria-label', 'Main');
  menuNav.appendChild(list);

  var actions = document.createElement('div');
  actions.className = 'mmenu-actions';
  if (book) actions.appendChild(link(book, 'btn btn-primary'));
  if (portal) actions.appendChild(link(portal, 'btn btn-ghost'));
  var call = document.createElement('a');
  call.className = 'btn btn-ghost';
  call.href = 'tel:+19736559662';
  call.textContent = 'Call (973) 655-9662';
  actions.appendChild(call);
  var addr = document.createElement('p');
  addr.className = 'mmenu-addr';
  addr.textContent = '1 Bay Avenue, Harries Pavilion, 2nd Floor, Suite 5, Montclair, NJ 07042';
  actions.appendChild(addr);

  panel.appendChild(top);
  panel.appendChild(menuNav);
  panel.appendChild(actions);
  document.body.appendChild(panel);

  var closeBtn = panel.querySelector('.mmenu-close');
  function focusables() {
    return panel.querySelectorAll('a[href], button:not([disabled])');
  }
  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('menu-open');
    closeBtn.focus();
  }
  function close(returnFocus) {
    if (panel.hidden) return;
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('menu-open');
    if (returnFocus) btn.focus();
  }
  btn.addEventListener('click', open);
  closeBtn.addEventListener('click', function () { close(true); });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { close(true); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) close(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) close(false);
  });
})();
