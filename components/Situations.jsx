"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Phone } from "./Icons";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { getLenis } from "@/lib/lenis-store";
import styles from "./Situations.module.css";

export const SITUATION_EVENT = "fcm:situation";

export default function Situations({ content, contact }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const panelRef = useRef(null);
  const firstRender = useRef(true);
  const item = content.items[active];

  // Animate the panel contents each time the tab changes.
  useIsoLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        gsap.fromTo(
          "[data-anim]",
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.05 },
        );
      },
      panelRef,
    );
    return () => mm.revert();
  }, [active]);

  const onKeyDown = (event) => {
    const count = content.items.length;
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (active + keys[event.key] + count) % count;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  // Pre-select the situation in the contact form, then scroll to it.
  const goToContact = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(SITUATION_EVENT, { detail: active }));
    const target = document.querySelector("#contact");
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: -88 });
    else target?.scrollIntoView();
  };

  return (
    <section id={content.id} className={`section ${styles.section}`} aria-labelledby="situations-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="situations-title" className="h2" data-reveal>
            {content.title}
          </h2>
          <p className="lead" data-reveal>
            {content.intro}
          </p>
        </header>

        <div className={styles.layout} data-reveal>
          <div className={styles.side}>
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={content.title}
              className={styles.tabs}
              onKeyDown={onKeyDown}
            >
              {content.items.map((it, i) => (
                <button
                  key={it.key}
                  ref={(el) => (tabsRef.current[i] = el)}
                  id={`tab-${it.key}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls={`panel-${it.key}`}
                  tabIndex={active === i ? 0 : -1}
                  className={`${styles.tab} ${active === i ? styles.tabActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.tabLabel}>{it.tab}</span>
                  <span className={styles.tabArrow} aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.unsure}>
              <p className={styles.unsureTitle}>{content.unsure.title}</p>
              <p className={styles.unsureBody}>{content.unsure.body}</p>
              <a href={contact.phoneHref} className={styles.unsureCall}>
                <Phone size={16} />
                {content.unsure.callLabel} {contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div
            ref={panelRef}
            id={`panel-${item.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.key}`}
            className={styles.panel}
            tabIndex={0}
          >
            <span className={styles.panelBg} aria-hidden="true">
              {item.short}
            </span>
            <h3 className={styles.panelTitle} data-anim>
              {item.title}
            </h3>

            <div className={styles.cols}>
              <div>
                <p className={styles.colLabel} data-anim>
                  {content.worriesLabel}
                </p>
                <ul role="list" className={styles.worries}>
                  {item.worries.map((w) => (
                    <li key={w} data-anim>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.colLabel} data-anim>
                  {content.helpLabel}
                </p>
                <ul role="list" className={styles.help}>
                  {item.help.map((h) => (
                    <li key={h} data-anim>
                      <span className={styles.check}>
                        <Check size={13} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href="#contact" className={`btn ${styles.panelCta}`} onClick={goToContact} data-anim>
              {item.cta}
              <span className="btn-icon">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
