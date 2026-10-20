"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis-store";

/**
 * Site-wide motion: Lenis smooth scrolling wired to GSAP's ticker, plus a
 * generic scroll reveal for any element marked with [data-reveal].
 * Nothing is hidden in CSS: elements are only set to their start state here,
 * and only when they are still below the fold, so content stays visible without JS.
 */
export default function MotionProvider() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: { offset: -88 },
      });
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const vh = window.innerHeight;
      const targets = gsap.utils.toArray("[data-reveal]").filter((el) => el.getBoundingClientRect().top > vh * 0.92);

      gsap.set(targets, { autoAlpha: 0, y: 36 });

      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

      // Honour a hash in the URL on first load (e.g. /#contact).
      const hashTarget = window.location.hash && document.getElementById(window.location.hash.slice(1));
      if (hashTarget) lenis.scrollTo(hashTarget, { offset: -88, immediate: true });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
