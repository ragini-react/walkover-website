/**
 * Inline bootstrap for scroll-reveal motion.
 *
 * Runs before hydration so revealed content never waits on React. It:
 *  1. opts the document into motion (adds `.js-motion`) unless the visitor
 *     prefers reduced motion or IntersectionObserver is unavailable;
 *  2. observes every `[data-reveal]` element, marking it `.is-visible`
 *     once it enters the viewport (one shared observer, unobserved after);
 *  3. watches the DOM for elements added by client-side navigation.
 *
 * Kept as a plain string so it can be inlined in <head> with zero bundle cost.
 */
export const motionBootstrap = `(() => {
  var d = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  d.classList.add('js-motion');
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  var scan = function (root) {
    var nodes = (root || document).querySelectorAll('[data-reveal]:not(.is-visible)');
    for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);
  };
  var start = function () {
    scan();
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].addedNodes.length) { scan(); return; }
      }
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();`;
