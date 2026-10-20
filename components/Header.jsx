"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import DeadLink from "./DeadLink";
import { ArrowRight, Lock, Phone } from "./Icons";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis-store";
import styles from "./Header.module.css";

export default function Header({ site }) {
  const { header, brand, contact } = site;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Solid background after leaving the top, hide on scroll down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y <= 480 || y < lastY - 2) setHidden(false);
      else if (y > lastY + 2) setHidden(true);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, animate items, close on Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const mm = gsap.matchMedia();
    mm.add(
      MOTION_OK,
      () => {
        gsap.from("[data-menu-item]", {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.1,
        });
      },
      panelRef,
    );

    const firstLink = panelRef.current?.querySelector("a");
    firstLink?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      mm.revert();
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  const close = () => setOpen(false);

  // Lenis is paused while the menu is open, so jump to the anchor after it resumes.
  const goTo = (event) => {
    const hash = event.currentTarget.getAttribute("href");
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (!target) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { offset: -88 });
      else target.scrollIntoView();
    });
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {header.skipLink}
      </a>
      <header
        className={[
          styles.header,
          scrolled ? styles.scrolled : "",
          hidden && !open ? styles.hidden : "",
          open ? styles.isOpen : "",
        ].join(" ")}
      >
        <div className={`container ${styles.inner}`}>
          <Link href="/" className={styles.logo} aria-label={brand.logo.alt}>
            <Logo />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul role="list">
              {header.nav.map((item) => (
                <li key={item.label}>
                  <DeadLink href={item.href} className={styles.navLink}>
                    <span className={styles.navMask}>
                      <span data-text={item.label}>{item.label}</span>
                    </span>
                  </DeadLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <DeadLink href={header.clientLogin.href} className={styles.login}>
              <Lock size={15} />
              {header.clientLogin.label}
            </DeadLink>
            <a href={header.cta.href} className={`btn btn--sm ${styles.cta}`}>
              {header.cta.label}
              <span className="btn-icon">
                <ArrowRight size={14} />
              </span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? header.menuClose : header.menuOpen}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" ref={panelRef} className={`${styles.panel} ${open ? styles.panelOpen : ""}`} hidden={!open}>
        <nav aria-label="Mobile" className={styles.panelNav}>
          <ul role="list">
            {header.nav.map((item) => (
              <li key={item.label} data-menu-item>
                <DeadLink href={item.href} onClick={close}>
                  {item.label}
                </DeadLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.panelFooter}>
          <a data-menu-item href={header.cta.href} className="btn btn--light" onClick={goTo}>
            {header.cta.label}
            <span className="btn-icon">
              <ArrowRight size={14} />
            </span>
          </a>
          <a data-menu-item href={contact.phoneHref} className={styles.panelPhone}>
            <Phone size={18} />
            {header.mobileCallLabel}: {contact.phoneDisplay}
          </a>
          <DeadLink data-menu-item href={header.clientLogin.href} className={styles.panelLogin} onClick={close}>
            <Lock size={15} />
            {header.clientLogin.label}
          </DeadLink>
        </div>
      </div>
    </>
  );
}
