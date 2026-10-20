"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "./Icons";
import styles from "./MobileBar.module.css";

/** Sticky call-to-action bar on phones: appears after the hero, steps aside at the contact form. */
export default function MobileBar({ content, contact }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.querySelector(content.ctaHref);
    let atContact = false;
    const observer = target
      ? new IntersectionObserver(([entry]) => {
          atContact = entry.isIntersecting;
          update();
        })
      : null;
    observer?.observe(target);

    function update() {
      setVisible(window.scrollY > window.innerHeight * 0.7 && !atContact);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      observer?.disconnect();
    };
  }, [content.ctaHref]);

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} aria-hidden={!visible} inert={!visible}>
      <a href={contact.phoneHref} className={styles.call}>
        <Phone size={18} />
        {content.call}
      </a>
      <a href={content.ctaHref} className={styles.cta}>
        {content.cta}
        <ArrowRight size={16} />
      </a>
    </div>
  );
}
