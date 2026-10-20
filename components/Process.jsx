"use client";

import { useRef } from "react";
import MagneticLink from "./MagneticLink";
import { ArrowRight } from "./Icons";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import styles from "./Process.module.css";

export default function Process({ content }) {
  const root = useRef(null);

  // The rail fills as you scroll; each step lights up when the fill reaches it.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 65%", scrub: true },
          },
        );
        gsap.utils.toArray("[data-step]").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.35 },
            {
              opacity: 1,
              duration: 0.5,
              scrollTrigger: {
                trigger: step,
                start: "top 65%",
                toggleActions: "play none none reverse",
                toggleClass: { targets: step, className: styles.stepOn },
              },
            },
          );
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={`section ${styles.section}`} aria-labelledby="process-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`} data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="process-title" className="h2" data-reveal>
            {content.title}
          </h2>
          <div data-reveal>
            <MagneticLink href={content.cta.href} className="btn btn--light">
              {content.cta.label}
              <span className="btn-icon">
                <ArrowRight size={14} />
              </span>
            </MagneticLink>
          </div>
        </div>

        <div className={styles.steps} data-steps>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} data-rail-fill />
          </span>
          <ol role="list" className={styles.list}>
            {content.steps.map((step) => (
              <li key={step.number} className={styles.step} data-step>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.num}>{step.number}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.body}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
