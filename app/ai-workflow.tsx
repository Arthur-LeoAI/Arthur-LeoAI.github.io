'use client';
import { useEffect, useRef, useState } from 'react';
import { ui } from '@/lib/content';
import { useLang } from './language';

// Simulated AI-assisted reporting run. Steps tick through once when scrolled into view.
const stepMs = 750;

export default function AiWorkflow() {
  const { t } = useLang();
  const d = ui.ai.demo;
  const total = d.steps.length;
  // -1 = idle, 0..total-1 = running that step, total = done
  const [step, setStep] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setStep(reduce ? total : 0);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [total]);

  useEffect(() => {
    if (step < 0 || step >= total) return;
    const id = setTimeout(() => setStep((s) => s + 1), stepMs);
    return () => clearTimeout(id);
  }, [step, total]);

  const running = step >= 0 && step < total;
  const done = step >= total;
  return (
    <div className="flow" ref={ref} data-reveal="80">
      <div className="flow-top">
        <span className="flow-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="flow-file">{d.file}</span>
        <span className="label">{t(d.kicker)}</span>
      </div>
      <div
        className="flow-progress"
        style={{ transform: `scaleX(${Math.max(0, Math.min(step, total)) / total})` }}
      />
      <ol className="flow-steps">
        {d.steps.map((s, i) => {
          const state = i < step ? 'done' : i === step ? 'run' : 'wait';
          return (
            <li key={s.label.en} data-state={state}>
              <span className="flow-icon" aria-hidden="true">
                {state === 'done' ? '✓' : state === 'run' ? '' : String(i + 1)}
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
            <span className="flow-ai">AI</span>
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
    </div>
  );
}
