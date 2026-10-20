import Logo from "./Logo";
import Link from "next/link";
import DeadLink from "./DeadLink";
import { Phone, Pin } from "./Icons";
import styles from "./Footer.module.css";

export default function Footer({ site }) {
  const { footer, brand, contact } = site;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label={brand.logo.alt}>
              <Logo />
            </Link>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className={styles.colTitle}>{col.title}</h2>
                <ul role="list" className={styles.links}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <DeadLink href={link.href}>{link.label}</DeadLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className={styles.colTitle}>{footer.contactTitle}</h2>
              <ul role="list" className={styles.links}>
                <li>
                  <a href={contact.phoneHref} className={styles.iconLink}>
                    <Phone size={16} />
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={contact.mapHref} className={styles.iconLink} target="_blank" rel="noopener noreferrer">
                    <Pin size={16} />
                    <span>
                      {contact.addressLines.map((line) => (
                        <span key={line} className={styles.block}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              </ul>
              <ul role="list" className={styles.social}>
                {footer.social.map((s) => (
                  <li key={s.label}>
                    <DeadLink href={s.href}>{s.label}</DeadLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.compliance}>
          <div className={styles.disclosures}>
            {footer.disclosures.map((d) => (
              <p key={d}>{d}</p>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright}</p>
          <ul role="list" className={styles.legal}>
            {footer.legalLinks.map((l) => (
              <li key={l.label}>
                <DeadLink href={l.href}>{l.label}</DeadLink>
              </li>
            ))}
          </ul>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
