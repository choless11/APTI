"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  clearStoredAssessmentState,
  persistQuestionState,
  persistResult,
  readStoredAssessmentState,
} from "@/src/lib/assessment-storage";
import { readApiPayload } from "@/src/lib/http";
import type {
  AssessmentApiPayload,
  AssessmentState,
  ScoreValue,
} from "@/src/types/soultrace";
import styles from "@/src/components/assessment-shell.module.css";

const SCORE_OPTIONS: Array<{ score: ScoreValue; label: string }> = [
  { score: 1, label: "非常不同意" },
  { score: 2, label: "不同意" },
  { score: 3, label: "略微不同意" },
  { score: 4, label: "中立" },
  { score: 5, label: "略微同意" },
  { score: 6, label: "同意" },
  { score: 7, label: "非常同意" },
];

async function startAssessmentRequest() {
  const response = await fetch("/api/assessment/start", {
    method: "POST",
  });

  return readApiPayload<AssessmentApiPayload>(response);
}

async function answerAssessmentRequest(
  answers: Array<{ questionId: number; score: ScoreValue }>,
) {
  const response = await fetch("/api/assessment/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });

  return readApiPayload<AssessmentApiPayload>(response);
}

export function AssessmentShell() {
  const router = useRouter();
  const questionAnchorRef = useRef<HTMLDivElement | null>(null);
  const pendingScrollQuestionIdRef = useRef<number | null>(null);
  const [state, setState] = useState<AssessmentState>({
    phase: "loading",
    answers: [],
  });
  const [selectedScore, setSelectedScore] = useState<ScoreValue | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startUiTransition] = useTransition();

  useEffect(() => {
    const cachedState = readStoredAssessmentState();

    if (cachedState?.phase === "question") {
      queueMicrotask(() => {
        setState(cachedState);
      });
      return;
    }

    let isMounted = true;

    void startAssessmentRequest()
      .then((payload) => {
        if (!isMounted) {
          return;
        }

        if (payload.status !== "in_progress") {
          throw new Error("初始化问卷失败，请重新开始测试。");
        }

        const nextState: Extract<AssessmentState, { phase: "question" }> = {
          phase: "question",
          answers: [],
          ...payload,
        };

        persistQuestionState(nextState);
        setState(nextState);
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          phase: "error",
          answers: [],
          message:
            error instanceof Error ? error.message : "初始化失败，请稍后再试。",
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (state.phase !== "question") {
      return;
    }

    if (pendingScrollQuestionIdRef.current !== state.question.id) {
      return;
    }

    pendingScrollQuestionIdRef.current = null;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    questionAnchorRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    questionAnchorRef.current?.focus({ preventScroll: true });
  }, [state]);

  const handleRestart = () => {
    clearStoredAssessmentState();
    window.location.assign("/assessment");
  };

  const handleSubmit = () => {
    if (state.phase !== "question" || selectedScore === null || isPending) {
      return;
    }

    const nextAnswers = [
      ...state.answers,
      {
        questionId: state.question.id,
        score: selectedScore,
      },
    ];

    setErrorMessage("");

    startUiTransition(() => {
      void answerAssessmentRequest(nextAnswers)
        .then((payload) => {
          if (payload.status === "in_progress") {
            const nextState: Extract<AssessmentState, { phase: "question" }> = {
              phase: "question",
              answers: nextAnswers,
              ...payload,
            };

            // 问卷恢复能力依赖本地缓存，因此每次答题后都立刻同步。
            pendingScrollQuestionIdRef.current = payload.question.id;
            persistQuestionState(nextState);
            setState(nextState);
            setSelectedScore(null);
            return;
          }

          persistResult(payload.result);
          clearStoredAssessmentState();

          startTransition(() => {
            router.push("/result");
          });
        })
        .catch((error: unknown) => {
          setErrorMessage(
            error instanceof Error ? error.message : "提交答案失败，请稍后再试。",
          );
        });
    });
  };

  if (state.phase === "loading") {
    return (
      <main className={`${styles.page} page-shell`}>
        <section className={`${styles.statusCard} glass-card`}>
          <span className="pill">问卷初始化中</span>
          <h1>正在呼叫你的第一道题</h1>
          <p>如果你是第一次进入页面，系统会自动向 SoulTrace 申请问卷流程。</p>
        </section>
      </main>
    );
  }

  if (state.phase === "error") {
    return (
      <main className={`${styles.page} page-shell`}>
        <section className={`${styles.statusCard} glass-card`}>
          <span className="pill">发生了一点卡顿</span>
          <h1>问卷没能顺利启动</h1>
          <p>{state.message}</p>
          <div className={styles.actionRow}>
            <button className="button-primary" onClick={handleRestart} type="button">
              重新开始
            </button>
            <Link className="button-ghost" href="/">
              返回首页
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (state.phase !== "question") {
    return null;
  }

  const progressRatio = (state.progress.answered / state.progress.total) * 100;

  return (
    <main className={`${styles.page} page-shell fade-up`}>
      <section className={styles.headlineRow}>
        <div>
          <div className="pill">第 {state.progress.answered + 1} 题 / 24</div>
          <h1 className={styles.title}>看看这道情景题像不像你</h1>
        </div>
        <button className="button-ghost" onClick={handleRestart} type="button">
          重新开始
        </button>
      </section>

      <section className={`${styles.mainGrid} glass-card`}>
        <div className={styles.questionColumn}>
          <div className={styles.progressTrack} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${progressRatio}%` }} />
          </div>

          <div
            className={styles.questionWrap}
            ref={questionAnchorRef}
            tabIndex={-1}
          >
            <span className={styles.questionTag}>
              {state.question.localizationMode === "curated"
                ? "情景题面"
                : "英文原题辅助"}
            </span>
            <h2>{state.question.text}</h2>
            <p>
              请选择 1 到 7 分，按你在真实生活里的第一反应作答，不用刻意选“更好看”的答案。
            </p>
            {state.question.localizationMode === "fallback" ? (
              <div className={styles.originalQuestion}>
                <strong>SoulTrace 原句</strong>
                <span>{state.question.originalText}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.answerColumn}>
          <div className={styles.scoreGrid}>
            {SCORE_OPTIONS.map((option) => (
              <button
                className={`${styles.scoreButton} ${
                  selectedScore === option.score ? styles.scoreButtonActive : ""
                }`}
                key={option.score}
                onClick={() => setSelectedScore(option.score)}
                type="button"
              >
                <strong>{option.score}</strong>
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          {errorMessage ? <p className={styles.errorMessage}>{errorMessage}</p> : null}

          <div className={styles.actionRow}>
            <button
              className="button-primary"
              disabled={selectedScore === null || isPending}
              onClick={handleSubmit}
              type="button"
            >
              {isPending ? "提交中..." : "提交答案"}
            </button>
            <Link className="button-ghost" href="/">
              暂时退出
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
