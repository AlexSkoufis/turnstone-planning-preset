// Holds the active Lenis instance so components (menu, anchors) can pause or drive scrolling.
let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
