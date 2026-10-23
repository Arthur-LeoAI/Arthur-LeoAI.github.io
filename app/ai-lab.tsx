'use client';
import { useEffect, useRef, useState } from 'react';
import { ui } from '@/lib/content';
import { useLang } from './language';

// "AI lab" card: a self-attention visualiser and a simulated LLM API pipeline.
// Attention weights are hand-set to illustrate the mechanism (each row sums to 1).
const tokens = ['Market', 'B', 'has', 'high', 'traffic', 'but', 'low', 'conversion'];
const weights = [
  [0.3, 0.38, 0.06, 0.04, 0.08, 0.02, 0.04, 0.08],
  [0.45, 0.25, 0.06, 0.04, 0.08, 0.02, 0.04, 0.06],
  [0.2, 0.22, 0.18, 0.1, 0.14, 0.04, 0.04, 0.08],
  [0.04, 0.04, 0.06, 0.22, 0.46, 0.06, 0.08, 0.04],
  [0.1, 0.1, 0.06, 0.36, 0.2, 0.06, 0.04, 0.08],
  [0.04, 0.04, 0.06, 0.14, 0.18, 0.16, 0.16, 0.22],
  [0.04, 0.04, 0.04, 0.06, 0.06, 0.12, 0.22, 0.42],
  [0.08, 0.1, 0.04, 0.06, 0.18, 0.12, 0.34, 0.08],
];
const heat = (w: number) => `rgba(31,92,69,${Math.min(1, w * 2.1).toFixed(2)})`;
const stepMs = 700;
type Tab = 'attention' | 'pipeline';

function Attention() {
  const { t } = useLang();
  const a = ui.ai.lab.attention;
  const [q, setQ] = useState(7);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Auto-cycle through queries while visible, until the visitor takes over.
  useEffect(() => {
    if (touched || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting)
        id = window.setInterval(() => setQ((v) => (v + 1) % tokens.length), 1800);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(id);
    };
  }, [touched]);

  const pick = (i: number) => {
    setTouched(true);
    setQ(i);
  };
  const row = weights[q];
  const top = row
    .map((w, i) => ({ w, i }))
    .filter((x) => x.i !== q)
    .sort((x, y) => y.w - x.w)
    .slice(0, 2);
  return (
    <div className="attn" ref={ref}>
      <fieldset className="attn-tokens">
        <legend className="sr-only">{t(a.query)}</legend>
        {tokens.map((tok, i) => (
          <button
            key={tok}
            className="attn-token"
            data-query={i === q || undefined}
            style={{ background: i === q ? undefined : heat(row[i]) }}
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span>{tok}</span>
            <small>{row[i].toFixed(2)}</small>
          </button>
        ))}
      </fieldset>
      <p className="attn-readout" aria-live="polite">
        <strong>“{tokens[q]}”</strong> {t(a.attends)}{' '}
        {top.map((x, k) => (
          <span key={x.i}>
            {k > 0 && ' · '}“{tokens[x.i]}” {Math.round(x.w * 100)}%
          </span>
        ))}
      </p>
      <div className="attn-matrix" aria-hidden="true">
        <span />
        {tokens.map((tok) => (
          <span key={tok} className="attn-col">
            {tok.slice(0, 4)}
          </span>
        ))}
        {weights.map((r, i) => (
          <div className="attn-row" data-active={i === q || undefined} key={tokens[i]}>
            <span className="attn-rowlabel" onMouseEnter={() => pick(i)}>
              {tokens[i]}
            </span>
            {r.map((w, j) => (
              <span
                key={tokens[j]}
                className="attn-cell"
                style={{ background: heat(w) }}
                onMouseEnter={() => pick(i)}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="attn-formula">
        Attention(Q, K, V) = softmax(QKᵀ / √dₖ) · V
      </p>
      <p className="lab-note">
        {t(a.hint)} {t(a.note)}
      </p>
    </div>
  );
}

function Pipeline() {
  const { t } = useLang();
  const d = ui.ai.lab.pipeline;
  const total = d.steps.length;
  // Starts automatically when the tab opens; -1 idle, total = done.
  const [step, setStep] = useState(() =>
    typeof window !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
      ? total
      : 0,
  );
  useEffect(() => {
    if (step < 0 || step >= total) return;
    const id = setTimeout(() => setStep((s) => s + 1), stepMs);
    return () => clearTimeout(id);
  }, [step, total]);
  const running = step >= 0 && step < total;
  const done = step >= total;
  return (
    <>
      <div
        className="flow-progress"
        style={{ transform: `scaleX(${Math.max(0, Math.min(step, total)) / total})` }}
      />
      <ol className="flow-steps">
        {d.steps.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'run' : 'wait';
          return (
            <li key={s.label.en} data-state={state} data-warn={s.warn || undefined}>
              <span className="flow-icon" aria-hidden="true">
                {state === 'done' ? (s.warn ? '↻' : '✓') : state === 'run' ? '' : String(i + 1)}
              </span>
              <span className="flow-label">{t(s.label)}</span>
              <span className="flow-out">{state === 'done' ? t(s.out) : ''}</span>
            </li>
          );
        })}
      </ol>
      <div className="flow-result" data-show={done || undefined} aria-live="polite">
        {done && (
          <>
            <span className="flow-ai">OK</span>
            <p>{t(d.result)}</p>
          </>
        )}
      </div>
      <div className="flow-bottom">
        <button
          className="pill pill-ink"
          disabled={running}
          onClick={() => setStep(0)}
        >
          {running ? t(d.running) : done ? t(d.rerun) : t(d.run)}
        </button>
        <span>{t(d.note)}</span>
      </div>
    </>
  );
}

export default function AiLab() {
  const { t } = useLang();
  const lab = ui.ai.lab;
  const [tab, setTab] = useState<Tab>('pipeline');
  return (
    <div className="flow" data-reveal="80">
      <div className="flow-top">
        <span className="flow-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="flow-file">{lab[tab].file}</span>
        <span className="label">{t(lab.kicker)}</span>
      </div>
      <div className="lab-tabs" role="tablist">
        {(['pipeline', 'attention'] as Tab[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
          >
            {t(lab.tabs[k])}
          </button>
        ))}
      </div>
      {tab === 'attention' ? <Attention /> : <Pipeline />}
    </div>
  );
}
