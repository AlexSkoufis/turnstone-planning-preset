"use client";

import { useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import styles from "./Belief.module.css";

export default function Belief({ content }) {
  const root = useRef(null);
  // Second sentence is set in italic as the answer to the first.
  const sentences = content.statement.split(/(?<=\.)\s+/);

  // Words brighten one by one as the statement scrolls through the viewport.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from("[data-belief-body]", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-belief-body]", start: "top 88%" },
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className={`section ${styles.section}`} aria-labelledby="belief-title">
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{content.eyebrow}</p>
        <h2 id="belief-title" className={styles.statement} data-statement>
          {sentences.map((sentence, s) => (
            <span key={sentence} className={s > 0 ? styles.accent : undefined}>
              {sentence.split(" ").map((word, i) => (
                <span key={`${word}-${i}`} data-word>
                  {word}{" "}
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p className={styles.body} data-belief-body>
          {content.body}
        </p>
      </div>
    </section>
  );
}
