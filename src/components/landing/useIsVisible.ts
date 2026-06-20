import { useEffect, useState, type RefObject } from "react";

// One shared IntersectionObserver for every caller (mirrors fumadocs'
// page.client.tsx). Cheaper than spinning up an observer per element.
let observer: IntersectionObserver | undefined;
const targets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

/**
 * Tracks whether `ref`'s element is in the viewport.
 *
 * Used to pause offscreen WebGL shaders: feeding `speed={visible ? n : 0}` makes
 * @paper-design/shaders cancel its requestAnimationFrame loop the moment the
 * element scrolls out of view, so a decorative shader costs nothing while the
 * user is reading the rest of the page.
 */
export function useIsVisible<T extends Element>(ref: RefObject<T | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) targets.get(entry.target)?.(entry);
    });

    const el = ref.current;
    if (!el) return;

    targets.set(el, (entry) => setVisible(entry.isIntersecting));
    observer.observe(el);

    return () => {
      observer?.unobserve(el);
      targets.delete(el);
    };
  }, [ref]);

  return visible;
}
