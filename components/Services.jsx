"use client";

import { useRef, useState } from "react";
import { serviceIcons } from "./Icons";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import styles from "./Services.module.css";

const NODES = [
  { x: 22, y: 22 },
  { x: 78, y: 22 },
  { x: 78, y: 78 },
  { x: 22, y: 78 },
];

export default function Services({ content }) {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Highlight the node for whichever card is crossing the middle of the screen.
      gsap.utils.toArray("[data-service]").forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, root);

    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        const lines = gsap.utils.toArray("[data-link]");
        lines.forEach((line) => {
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-diagram]", start: "top 75%" },
        });
        tl.from("[data-core]", { scale: 0.6, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" })
          .to(lines, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: "power2.out" }, "-=0.5")
          .from(
            "[data-node]",
            { scale: 0.4, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "back.out(2)" },
            "-=0.8",
          );
      },
      root,
    );

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} className={`section ${styles.section}`} aria-labelledby="services-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.diagramCol}>
          <div className={styles.sticky}>
            <p className="eyebrow" data-reveal>
              {content.eyebrow}
            </p>
            <h2 id="services-title" className="h2" data-reveal>
              {content.title}
            </h2>
            <p className={`lead ${styles.intro}`} data-reveal>
              {content.intro}
            </p>

            <div className={styles.diagram} data-diagram aria-hidden="true">
              <span className={styles.orbit} />
              <svg viewBox="0 0 100 100" className={styles.links}>
                {NODES.map((n, i) => (
                  <line
                    key={i}
                    data-link
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    className={active === i ? styles.linkActive : styles.link}
                  />
                ))}
              </svg>
              <span className={styles.core} data-core>
                {content.centerLabel}
              </span>
              {content.items.map((item, i) => {
                const Icon = serviceIcons[item.key];
                return (
                  <span
                    key={item.key}
                    data-node
                    className={`${styles.node} ${active === i ? styles.nodeActive : ""}`}
                    style={{ left: `${NODES[i].x}%`, top: `${NODES[i].y}%` }}
                  >
                    <Icon />
                    <span className={styles.nodeLabel}>{item.title}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <ol role="list" className={styles.cards}>
          {content.items.map((item, i) => {
            const Icon = serviceIcons[item.key];
            return (
              <li
                key={item.key}
                data-service
                className={`${styles.card} ${active === i ? styles.cardActive : ""}`}
                onPointerEnter={() => setActive(i)}
              >
                <span className={styles.cardIcon}>
                  <Icon />
                </span>
                <span className={styles.cardNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
