import { COLOR_LABELS, toPercent } from "@/src/lib/apti-results";
import type { SoultraceDistribution } from "@/src/types/soultrace";
import styles from "@/src/components/distribution-bars.module.css";

const COLOR_CLASS_MAP = {
  white: styles.white,
  blue: styles.blue,
  black: styles.black,
  red: styles.red,
  green: styles.green,
};

export function DistributionBars({
  distribution,
}: {
  distribution: SoultraceDistribution;
}) {
  return (
    <div className={styles.list}>
      {Object.entries(distribution)
        .sort((left, right) => right[1] - left[1])
        .map(([color, value]) => (
          <div className={styles.item} key={color}>
            <div className={styles.labelRow}>
              <span className={styles.label}>
                {COLOR_LABELS[color as keyof typeof COLOR_LABELS]}
              </span>
              <span className={styles.value}>{toPercent(value)}%</span>
            </div>
            <div className={styles.track}>
              <div
                className={`${styles.fill} ${COLOR_CLASS_MAP[color as keyof typeof COLOR_CLASS_MAP]}`}
                style={{ width: `${toPercent(value)}%` }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
