import { whyIcons } from "./Icons";
import styles from "./WhyUs.module.css";

export default function WhyUs({ content }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="why-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="why-title" className="h2" data-reveal>
            {content.title}
          </h2>
        </header>

        <ul role="list" className={styles.grid}>
          {content.items.map((item, i) => {
            const Icon = whyIcons[item.key];
            return (
              <li key={item.key} className={styles.card} data-reveal>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.icon}>
                  <Icon />
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
