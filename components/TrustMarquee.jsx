import styles from "./TrustMarquee.module.css";

export default function TrustMarquee({ content }) {
  const list = (hidden) => (
    <ul role="list" className={styles.list} aria-hidden={hidden || undefined}>
      {content.items.map((item) => (
        <li key={item} className={styles.item}>
          <span className={styles.mark} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.strip} aria-label={content.label}>
      <div className={styles.track}>
        {list(false)}
        {list(true)}
      </div>
    </section>
  );
}
