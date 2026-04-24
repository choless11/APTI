"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearStoredAssessmentState,
  readStoredResult,
} from "@/src/lib/assessment-storage";
import { getDominantColorLabels } from "@/src/lib/apti-results";
import { getIllustrationAsset } from "@/src/lib/illustration-assets";
import type { AptiResult } from "@/src/types/soultrace";
import { DistributionBars } from "@/src/components/distribution-bars";
import styles from "@/src/components/result-shell.module.css";

export function ResultShell() {
  const [result, setResult] = useState<AptiResult | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    clearStoredAssessmentState();
    queueMicrotask(() => {
      setResult(readStoredResult());
    });
  }, []);

  if (!result) {
    return (
      <main className={`${styles.page} page-shell`}>
        <section className={`${styles.emptyState} glass-card`}>
          <span className="pill">暂时没有人格公报</span>
          <h1>你的动物王国还没揭榜</h1>
          <p>先去完成一轮测评，结果页就会把你最近一次的离谱人格称号留在浏览器里。</p>
          <div className={styles.actionRow}>
            <Link className="button-primary" href="/assessment">
              立即开始
            </Link>
            <Link className="button-ghost" href="/">
              返回首页
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const illustration = getIllustrationAsset(result.aptiSlug);

  return (
    <main className={`${styles.page} page-shell fade-up`}>
      <section className={styles.headerRow}>
        <div>
          <div className="pill">
            原型：{result.archetypeName} / 主导气味：{getDominantColorLabels(result.distribution)}
          </div>
          <h1 className={styles.title}>{result.title}</h1>
          <p className={styles.tagline}>{result.tagline}</p>
        </div>
        <div className={styles.actionRow}>
          <Link className="button-primary" href="/assessment">
            再测一次
          </Link>
          <Link className="button-ghost" href="/">
            返回首页
          </Link>
        </div>
      </section>

      <section className={styles.heroGrid}>
        <div className={`${styles.posterCard} glass-card`}>
          {!imageFailed ? (
            <Image
              alt={`${result.title} 角色海报`}
              className={styles.posterImage}
              height={900}
              onError={() => setImageFailed(true)}
              priority
              src={illustration.path}
              width={1200}
            />
          ) : (
            <div className={styles.posterFallback}>
              <span>{result.emoji}</span>
              <strong>{result.title}</strong>
              <small>{result.badgeEmoji}</small>
            </div>
          )}
        </div>

        <div className={`${styles.summaryCard} glass-card`}>
          <div className={styles.metaRow}>
            <span className="pill">动物：{result.animal}</span>
            <span className="pill">职业：{result.profession}</span>
            <span className="pill">
              海报：{illustration.mode === "ai" ? "AI 成品" : "SVG 兜底版"}
            </span>
          </div>
          <p className={styles.summaryLead}>{result.shortSummary}</p>
          <p className={styles.summaryBody}>{result.longSummary}</p>
          <div className={styles.summaryPanels}>
            <div>
              <h3>你最能拿出来吓人的长板</h3>
              <ul>
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>最容易翻车的高频场面</h3>
              <ul>
                {result.riskPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.tipBox}>
            <span>驯兽建议</span>
            <p>{result.recommendation}</p>
          </div>
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className={`${styles.panel} glass-card`}>
          <h2>你的颜色配方</h2>
          <DistributionBars distribution={result.distribution} />
        </div>

        <div className={`${styles.panel} glass-card`}>
          <h2>隔壁棚最像你的三位邻居</h2>
          <div className={styles.matchList}>
            {result.topMatches.map((match) => (
              <div className={styles.matchItem} key={match.key}>
                <strong>{match.aptiTitle}</strong>
                <span>
                  {match.name} · {match.alignmentScore.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          {/* <a
            className={styles.resultLink}
            href={result.resultUrl}
            rel="noreferrer"
            target="_blank"
          >
            查看 SoulTrace 原始结果页
          </a> */}
        </div>
      </section>
    </main>
  );
}
