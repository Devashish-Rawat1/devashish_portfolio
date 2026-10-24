(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('#side a'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
  var side = document.getElementById('side');

  function show(id) {
    if (!document.getElementById(id) || sections.every(function (s) { return s.id !== id; })) id = 'about';
    sections.forEach(function (s) { s.classList.toggle('show', s.id === id); });
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    window.scrollTo(0, 0);
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('href').slice(1);
      try { history.replaceState(null, '', '#' + id); } catch (err) {}
      show(id);
      side.classList.remove('open');
    });
  });

  document.getElementById('menu').addEventListener('click', function () { side.classList.toggle('open'); });
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  Array.prototype.forEach.call(document.querySelectorAll('.gallery button'), function (b) {
    b.addEventListener('click', function () { lbImg.src = b.getAttribute('data-full'); lb.hidden = false; });
  });
  lb.addEventListener('click', function () { lb.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });

  document.getElementById('year').textContent = new Date().getFullYear();
  show(location.hash.slice(1) || 'about');
})();
