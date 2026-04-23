import Link from "next/link";
import {
  COLOR_LABELS,
  ensureAllArchetypesAreMapped,
} from "@/src/lib/apti-results";
import styles from "@/src/components/home-hero.module.css";

const SCALE_NOTES = [
  "1 = 非常不同意",
  "4 = 中立",
  "7 = 非常同意",
];

const COLOR_BLURBS = [
  { key: "white", label: "秩序与责任" },
  { key: "blue", label: "理解与精确" },
  { key: "black", label: "主动与成就" },
  { key: "red", label: "热烈与表达" },
  { key: "green", label: "连接与成长" },
] as const;

export function HomeHero() {
  return (
    <main className={`${styles.page} fade-up`}>
      <section className={`${styles.hero} page-shell`}>
        <div className={styles.leftColumn}>
          <div className="pill">APTI × SoulTrace × 动物职业人格</div>
          <h1 className="section-title">
            测出你在 APTI 世界里的
            <span className={styles.highlight}>动物职业人格</span>
          </h1>
          <p className="section-copy">
            这是一个把 SoulTrace 问卷重新包装成中文情景人格问答的体验。你将回答
            24 道带一点戏剧感的生活情景题，最后得到一个搞怪但有点准的身份名片，例如
            <strong> 猪皇帝 </strong>
            或其他 24 种动物+职业角色。
          </p>

          <div className={styles.actions}>
            <Link className="button-primary" href="/assessment">
              开始测试
            </Link>
            <Link className="button-ghost" href="/result">
              查看最近一次结果
            </Link>
          </div>

          <div className={styles.scaleBox}>
            {SCALE_NOTES.map((note) => (
              <span className="pill" key={note}>
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.heroCard} glass-card`}>
          <div className={styles.heroSticker}>🐷👑</div>
          <div className={styles.heroMeta}>
            <span className={styles.heroEyebrow}>今日热推角色</span>
            <h2>猪皇帝</h2>
            <p>
              气场像登基现场，执行力像催税现场，戏剧性像随时准备自己给自己加冕。
            </p>
          </div>
          <div className={styles.ribbon}>25 组完整映射已内置</div>
        </div>
      </section>

      <section className={`${styles.gridSection} page-shell`}>
        <div className={`${styles.panel} glass-card`}>
          <h3>五色底层驱动力</h3>
          <p>
            APTI 保留 SoulTrace 的五色分布，只是把它们改造成更离谱、更像森林职场剧的角色设定。
          </p>
          <div className={styles.colorGrid}>
            {COLOR_BLURBS.map((item) => (
              <div className={styles.colorItem} key={item.key}>
                <span className={styles.colorKey}>
                  {COLOR_LABELS[item.key]}色
                </span>
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.panel} glass-card`}>
          <h3>你会得到什么</h3>
          <ul className={styles.featureList}>
            <li>一个动物+职业人格身份名</li>
            <li>更像童话怪趣海报的角色插画路径</li>
            <li>长短版性格解读与建议</li>
            <li>五色分布与 Top 3 匹配</li>
          </ul>
          <p className={styles.footnote}>
            当前仓库映射完整性检查：
            {ensureAllArchetypesAreMapped() ? " 25/25 已覆盖" : " 映射缺失"}
          </p>
        </div>
      </section>
    </main>
  );
}
