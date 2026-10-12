/*
  Cadangan animasi muncul-saat-di-scroll.
  Browser modern (Chrome, Edge, Safari terbaru) memakai CSS murni di style.css,
  sehingga skrip ini tidak melakukan apa-apa di sana. Skrip ini hanya aktif di
  browser yang belum mendukung "animation-timeline", misalnya Firefox.
*/
(function () {
  var nativeSupport = window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()');
  if (nativeSupport || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');

  var items = Array.prototype.slice.call(document.querySelectorAll('.rv'));

  // Beri jeda bertahap pada elemen bersaudara (mis. kotak-kotak keahlian)
  items.forEach(function (el) {
    var urutan = 0;
    var saudara = el.parentNode.children;
    for (var i = 0; i < saudara.length; i++) {
      if (saudara[i] === el) break;
      if (saudara[i].classList.contains('rv')) urutan++;
    }
    el.style.setProperty('--i', Math.min(urutan, 6));
  });

  var pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        pengamat.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { pengamat.observe(el); });
})();
