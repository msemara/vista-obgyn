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
