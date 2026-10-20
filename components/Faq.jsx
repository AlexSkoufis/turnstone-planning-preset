import { Plus } from "./Icons";
import styles from "./Faq.module.css";

export default function Faq({ content }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="faq-title" className="h2" data-reveal>
            {content.title}
          </h2>
        </header>

        <div className={styles.list}>
          {content.items.map((item, i) => (
            <details key={item.q} className={styles.item} name="faq" open={i === 0} data-reveal>
              <summary className={styles.q}>
                {item.q}
                <span className={styles.icon} aria-hidden="true">
                  <Plus />
                </span>
              </summary>
              <p className={styles.a}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
