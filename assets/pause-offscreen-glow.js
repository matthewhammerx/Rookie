// Pauses any element's CSS animation while it's scrolled off-screen, and
// resumes it once back in view. Used for decorative "infinite" pulsing
// glow effects (badges, promo cards, popup triggers, etc.) that would
// otherwise keep animating -- and repainting -- forever, even when the
// visitor can't see them. Purely a performance optimization: elements
// look identical whenever they're actually on screen.
(function () {
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        entry.target.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    },
    { rootMargin: '200px 0px' }
  );

  function observeAll() {
    document.querySelectorAll('[data-pause-offscreen]').forEach(function (el) {
      if (el.dataset.pauseOffscreenBound) return;
      el.dataset.pauseOffscreenBound = 'true';
      observer.observe(el);
    });
  }

  observeAll();
  document.addEventListener('shopify:section:load', observeAll);
})();
