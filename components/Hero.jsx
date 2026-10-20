"use client";

import { useEffect, useRef } from "react";
import MagneticLink from "./MagneticLink";
import { ArrowRight, Check } from "./Icons";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import styles from "./Hero.module.css";

function TitleLine({ text, accent }) {
  if (!accent || !text.includes(accent)) return text;
  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <em>{accent}</em>
      {after}
    </>
  );
}

export default function Hero({ content }) {
  const { visual } = content;
  const root = useRef(null);
  const wordRef = useRef(null);

  // Entrance + scroll parallax
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        const path = root.current.querySelector("[data-path]");
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-line-inner]", { yPercent: 115, duration: 1.2, stagger: 0.09 })
          .from("[data-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 }, "-=0.85")
          .from("[data-card]", { y: 60, scale: 0.94, autoAlpha: 0, duration: 1.3 }, 0.15)
          .to(path, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.6)
          .from(
            "[data-dot]",
            { scale: 0, transformOrigin: "50% 50%", duration: 0.6, stagger: 0.25, ease: "back.out(2.5)" },
            1,
          )
          .from("[data-chip]", { y: 30, autoAlpha: 0, duration: 0.9, stagger: 0.12 }, 0.9);

        gsap.to("[data-card-wrap]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  // Rotating word inside the plan card: one looping timeline, text swapped while hidden.
  useEffect(() => {
    const words = visual.rotating;
    const el = wordRef.current;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      let index = 0;
      const tl = gsap.timeline({ repeat: -1, delay: 2.4 });
      words.forEach(() => {
        tl.to(el, { yPercent: -100, autoAlpha: 0, duration: 0.45, ease: "power2.in" })
          .call(() => {
            index = (index + 1) % words.length;
            el.textContent = words[index];
          })
          .fromTo(el, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" })
          .to({}, { duration: 2.2 });
      });
      return () => {
        el.textContent = words[0];
      };
    });
    return () => mm.revert();
  }, [visual.rotating]);

  // Chips follow the pointer slightly (fine pointers only)
  const handlePointer = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = root.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    root.current.querySelectorAll("[data-depth]").forEach((el) => {
      const depth = Number(el.dataset.depth);
      gsap.to(el, { x: nx * depth, y: ny * depth, duration: 1.2, ease: "power3.out" });
    });
  };

  return (
    <section ref={root} className={styles.hero} onPointerMove={handlePointer} aria-labelledby="hero-title">
      <svg className={styles.arcs} viewBox="0 0 1200 1200" aria-hidden="true">
        {[220, 340, 460, 580].map((r) => (
          <circle key={r} cx="1050" cy="600" r={r} />
        ))}
      </svg>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-fade>
            {content.eyebrow}
          </p>
          <h1 id="hero-title" className={`display ${styles.title}`}>
            {content.titleLines.map((line) => (
              <span key={line} className={styles.line}>
                <span data-line-inner className={styles.lineInner}>
                  <TitleLine text={line} accent={content.titleAccent} />
                </span>
              </span>
            ))}
          </h1>
          <p className={`lead ${styles.lead}`} data-fade>
            {content.lead}
          </p>
          <div className={styles.ctas} data-fade>
            <MagneticLink href={content.primaryCta.href} className="btn">
              {content.primaryCta.label}
              <span className="btn-icon">
                <ArrowRight size={14} />
              </span>
            </MagneticLink>
            <a href={content.secondaryCta.href} className="btn btn--ghost">
              {content.secondaryCta.label}
            </a>
          </div>
          <ul role="list" className={styles.creds} data-fade>
            {content.credentials.map((c) => (
              <li key={c}>
                <Check size={14} />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} data-card-wrap>
          <div className={styles.card} data-card>
            <div className={styles.cardTop}>
              <span className={styles.badge}>
                <span className={styles.pulse} />
                {visual.label}
              </span>
            </div>

            <p className={styles.ready}>
              <span className="visually-hidden">
                {visual.rotatingPrefix} {visual.rotating.join(", ")}
              </span>
              <span aria-hidden="true">
                {visual.rotatingPrefix}
                <span className={styles.wordMask}>
                  <span ref={wordRef} className={styles.word}>
                    {visual.rotating[0]}
                  </span>
                </span>
              </span>
            </p>

            <svg className={styles.path} viewBox="0 0 480 220" aria-hidden="true">
              <path className={styles.pathGhost} d="M20 200 C 140 200, 170 120, 250 110 S 380 40, 460 24" />
              <path data-path className={styles.pathLine} d="M20 200 C 140 200, 170 120, 250 110 S 380 40, 460 24" />
              <circle data-dot className={styles.dotStart} cx="20" cy="200" r="7" />
              <circle data-dot className={styles.dotMid} cx="152" cy="168" r="5" />
              <circle data-dot className={styles.dotMid} cx="250" cy="110" r="5" />
              <circle data-dot className={styles.dotMid} cx="356" cy="64" r="5" />
              <circle data-dot className={styles.dotEnd} cx="460" cy="24" r="9" />
            </svg>
            <div className={styles.pathLabels} aria-hidden="true">
              <span>{visual.pathStart}</span>
              <span>{visual.pathEnd}</span>
            </div>

            <p className={styles.note}>{visual.note}</p>
          </div>

          <ul role="list" className={styles.chips}>
            {visual.pillars.map((p, i) => (
              <li key={p} className={styles.chipWrap} data-depth={[26, -18, 34][i % 3]} style={{ "--i": i }}>
                <span className={styles.chip} data-chip>
                  <span className={styles.chipCheck}>
                    <Check size={12} />
                  </span>
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
