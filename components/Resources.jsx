import DeadLink from "./DeadLink";
import { ArrowUpRight, Download } from "./Icons";
import styles from "./Resources.module.css";

export default function Resources({ content }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="resources-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            {content.eyebrow}
          </p>
          <h2 id="resources-title" className="h2" data-reveal>
            {content.title}
          </h2>
        </header>

        <div className={styles.grid}>
          <div>
            <h3 className={styles.label} data-reveal>
              {content.guidesLabel}
            </h3>
            <ul role="list" className={styles.guides}>
              {content.guides.map((guide, i) => (
                <li key={guide.title} data-reveal>
                  <DeadLink href={guide.href} className={styles.guide}>
                    <span className={styles.cover} aria-hidden="true" data-variant={i}>
                      <span className={styles.coverLabel}>Guide</span>
                      <span className={styles.coverTitle}>{guide.title}</span>
                      <span className={styles.coverRule} />
                    </span>
                    <span className={styles.guideText}>
                      <span className={styles.guideTitle}>{guide.title}</span>
                      <span className={styles.guideBody}>{guide.body}</span>
                      <span className={styles.guideCta}>
                        <Download size={16} />
                        {guide.cta}
                      </span>
                    </span>
                  </DeadLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.label} data-reveal>
              {content.toolsLabel}
            </h3>
            <ul role="list" className={styles.tools}>
              {content.tools.map((tool) => (
                <li key={tool.title} data-reveal>
                  <DeadLink href={tool.href} className={styles.tool}>
                    <span className={styles.toolMeta}>{tool.meta}</span>
                    <span className={styles.toolTitle}>{tool.title}</span>
                    <span className={styles.toolArrow} aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </DeadLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
