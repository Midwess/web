import "@testing-library/jest-dom";

// jsdom has no IntersectionObserver; motion's `whileInView` needs it.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

if (!("IntersectionObserver" in globalThis)) {
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: IntersectionObserverStub,
  });
}
