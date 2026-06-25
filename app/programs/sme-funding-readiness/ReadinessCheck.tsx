"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "../../_components/Icon";

const CONSULT = "https://calendly.com/aaa-accreditation/30min";

const CATS: { cat: string; qs: [string, string] }[] = [
  {
    cat: "Financial & Funding Readiness",
    qs: [
      "We keep clear, up-to-date financial records such as accounts, cash flow, and statements.",
      "We know how much funding we need and exactly what we would use it for.",
    ],
  },
  {
    cat: "Operational Requirements",
    qs: [
      "Our core operations and delivery processes are documented.",
      "We have the people and resources to meet our current workload.",
    ],
  },
  {
    cat: "Management & Structure",
    qs: [
      "Our business is properly registered and legally constituted.",
      "Ownership, roles, and management responsibilities are clearly defined.",
    ],
  },
  {
    cat: "Governance & Compliance",
    qs: [
      "We meet the legal, tax, and regulatory requirements that apply to us.",
      "We identify and manage the main risks to our business.",
    ],
  },
  {
    cat: "Market Presence & Growth",
    qs: [
      "We have a clear target market and an active, repeat customer base.",
      "We have a written plan for how the business will grow.",
    ],
  },
  {
    cat: "Continuous Improvement",
    qs: [
      "We collect customer and team feedback and act on it.",
      "We keep a record of the improvements and changes we make.",
    ],
  },
];

const OPTS: { l: string; v: number }[] = [
  { l: "Yes", v: 2 },
  { l: "Somewhat", v: 1 },
  { l: "Not yet", v: 0 },
];

const TOTAL_Q = 12;
const MAX_SCORE = 24;
const LAST_PAGE = CATS.length - 1;

type View = "intro" | "wizard" | "result";

export default function ReadinessCheck() {
  const [view, setView] = useState<View>("intro");
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const answeredCount = Object.keys(answers).length;
  const pageAnswered =
    answers[`${page}-0`] !== undefined && answers[`${page}-1`] !== undefined;

  function select(key: string, value: number) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }
  function next() {
    if (!pageAnswered) return;
    if (page < LAST_PAGE) setPage(page + 1);
    else setView("result");
  }
  function back() {
    if (page === 0) setView("intro");
    else setPage(page - 1);
  }
  function start() {
    setPage(0);
    setView("wizard");
  }
  function retake() {
    setAnswers({});
    setPage(0);
    setView("intro");
  }

  const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const pct = Math.round((total / MAX_SCORE) * 100);
  const level =
    pct >= 80
      ? "Funding-ready"
      : pct >= 60
        ? "Nearly there"
        : pct >= 40
          ? "Building readiness"
          : "Early stage";

  const strengths: string[] = [];
  const gaps: string[] = [];
  CATS.forEach((c, i) => {
    const score = (answers[`${i}-0`] || 0) + (answers[`${i}-1`] || 0);
    if (score >= 3) strengths.push(c.cat);
    else gaps.push(c.cat);
  });

  return (
    <div className="smerc-card">
      {view === "intro" && (
        <div className="smerc-intro">
          <p>
            Six short steps, two questions each. It takes about two minutes &mdash;
            no sign-up, no obligation.
          </p>
          <button type="button" className="btn btn-primary" onClick={start}>
            Check your readiness score <Icon name="arrow" size={14} className="arrow" />
          </button>
        </div>
      )}

      {view === "wizard" && (
        <div className="smerc-wizard">
          <div className="smerc-bar">
            <div
              className="smerc-bar-fill"
              style={{ width: `${(page / CATS.length) * 100}%` }}
            />
          </div>
          <div className="smerc-step">
            Step {page + 1} of {CATS.length}
          </div>
          <div className="smerc-cat">{CATS[page].cat}</div>

          {CATS[page].qs.map((q, qi) => {
            const key = `${page}-${qi}`;
            return (
              <div className="smerc-q" key={key}>
                <div className="smerc-qtext">{q}</div>
                <div className="smerc-opts">
                  {OPTS.map((o) => (
                    <button
                      type="button"
                      key={o.l}
                      className={"smerc-opt" + (answers[key] === o.v ? " sel" : "")}
                      onClick={() => select(key, o.v)}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="smerc-nav">
            <button type="button" className="btn btn-ghost" onClick={back}>
              Back
            </button>
            <span className="smerc-progress">
              {answeredCount} of {TOTAL_Q} answered
            </span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={next}
              disabled={!pageAnswered}
            >
              {page === LAST_PAGE ? "See my result" : "Next"}{" "}
              <Icon name="arrow" size={14} className="arrow" />
            </button>
          </div>
        </div>
      )}

      {view === "result" && (
        <div className="smerc-result">
          <div className="smerc-congrats">
            <strong>You&rsquo;re eligible to apply for accreditation.</strong>
            <p>
              Every operating business can apply. Here is your readiness snapshot
              and what to strengthen next.
            </p>
          </div>

          <div className="smerc-top">
            <div
              className="smerc-ring"
              style={{
                background: `conic-gradient(var(--aaa-blue) ${pct}%, var(--ink-200) ${pct}%)`,
              }}
            >
              <div className="smerc-ring-inner">
                <span className="smerc-pct">{pct}%</span>
                <span className="smerc-rlbl">Your score</span>
              </div>
            </div>
            <div className="smerc-band">
              <span className="smerc-band-name">{level}</span>
              <span className="smerc-band-sub">
                Based on your answers across the six areas we assess. Apply to
                confirm your verified score and earn your certificate.
              </span>
            </div>
          </div>

          <div className="smerc-cols">
            <div className="smerc-col ok">
              <h4>Your strengths</h4>
              <ul>
                {strengths.length ? (
                  strengths.map((s) => <li key={s}>{s}</li>)
                ) : (
                  <li>Build a strength in any area to see it here.</li>
                )}
              </ul>
            </div>
            <div className="smerc-col gap">
              <h4>Focus areas</h4>
              <ul>
                {gaps.length ? (
                  gaps.map((s) => <li key={s}>{s}</li>)
                ) : (
                  <li>No gaps flagged. You look funding-ready.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="smerc-cta">
            <Link href="/quote" className="btn btn-primary">
              Apply now <Icon name="arrow" size={14} className="arrow" />
            </Link>
            <a
              href={CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Talk to our team
            </a>
            <button type="button" className="btn btn-ghost" onClick={retake}>
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
