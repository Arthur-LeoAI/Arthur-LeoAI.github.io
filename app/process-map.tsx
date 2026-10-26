'use client';
import { useState } from 'react';
import { ui } from '@/lib/content';
import { useLang } from './language';

// Illustrative BPMN-style swimlane map of a listing compliance check.
// Shapes follow BPMN conventions: thin circle = start, thick circle = end,
// rounded rectangle = task, diamond = exclusive gateway.
type View = 'asis' | 'tobe';
const laneH = 100;
const labelW = 84;

function Task({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g className="pm-task">
      <rect x={x} y={y - 24} width={w} height={48} rx={8} />
      <text x={x + w / 2} y={y + 4} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}
function Gateway({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  return (
    <g className="pm-gateway">
      <path d={`M${cx} ${cy - 28} L${cx + 28} ${cy} L${cx} ${cy + 28} L${cx - 28} ${cy} Z`} />
      <text x={cx} y={cy - 36} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}
const Start = ({ cx, cy }: { cx: number; cy: number }) => (
  <circle className="pm-start" cx={cx} cy={cy} r={16} />
);
const End = ({ cx, cy, label }: { cx: number; cy: number; label: string }) => (
  <g className="pm-end">
    <circle cx={cx} cy={cy} r={16} />
    <text x={cx} y={cy + 34} textAnchor="middle">
      {label}
    </text>
  </g>
);
const Flow = ({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) => (
  <g className="pm-flow">
    <path d={d} markerEnd="url(#pm-arrow)" />
    {label && (
      <text x={lx} y={ly}>
        {label}
      </text>
    )}
  </g>
);

export default function ProcessMap() {
  const { t } = useLang();
  const [view, setView] = useState<View>('tobe');
  const m = ui.processMap;
  const lanes = [m.lanes.operator, m.lanes.system, m.lanes.reviewer];
  return (
    <div className="process-map" id="process-map" data-reveal="0">
      <div className="pm-head">
        <div>
          <span className="label">{t(m.kicker)}</span>
          <h3>{t(m.title)}</h3>
        </div>
        <div className="pm-tabs" role="tablist" aria-label={t(m.title)}>
          {(['asis', 'tobe'] as View[]).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
            >
              {t(m.tabs[v])}
            </button>
          ))}
        </div>
      </div>
      <div className="pm-scroll">
        <svg viewBox="0 0 960 300">
          <title>{`${t(m.title)} · ${t(m.tabs[view])}`}</title>
          <defs>
            <marker
              id="pm-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" className="pm-arrowhead" />
            </marker>
          </defs>
          {lanes.map((lane, i) => (
            <g key={lane.en} className="pm-lane">
              <rect x={0} y={i * laneH} width={960} height={laneH} />
              <line x1={labelW} y1={i * laneH} x2={labelW} y2={(i + 1) * laneH} />
              <text x={labelW / 2} y={i * laneH + laneH / 2 + 4} textAnchor="middle">
                {t(lane)}
              </text>
            </g>
          ))}
          {view === 'asis' ? (
            <g key="asis" className="pm-diagram">
              <Start cx={120} cy={50} />
              <Flow d="M136 50 H166" />
              <Task x={170} y={50} w={140} label={t(m.asis.export)} />
              <Flow d="M310 50 H336" />
              <Task x={340} y={50} w={220} label={t(m.asis.read)} />
              <Flow d="M560 50 H588" />
              <Gateway cx={620} cy={50} label={t(m.asis.issue)} />
              <Flow d="M648 50 H840" label={t(m.no)} lx={660} ly={42} />
              <End cx={860} cy={50} label={t(m.asis.done)} />
              <Flow d="M620 78 V122" label={t(m.yes)} lx={628} ly={104} />
              <Task x={540} y={150} w={160} label={t(m.asis.fix)} />
              <Flow d="M540 150 H450 V78" />
            </g>
          ) : (
            <g key="tobe" className="pm-diagram">
              <Start cx={120} cy={50} />
              <Flow d="M120 66 V150 H156" />
              <Task x={160} y={150} w={200} label={t(m.tobe.extract)} />
              <Flow d="M360 150 H388" />
              <Gateway cx={420} cy={150} label={t(m.tobe.valid)} />
              <Flow d="M448 150 H496" label={t(m.yes)} lx={456} ly={142} />
              <Task x={500} y={150} w={150} label={t(m.tobe.publish)} />
              <Flow d="M650 150 H722" />
              <End cx={740} cy={150} label={t(m.tobe.done)} />
              <Flow d="M420 178 V222" label={t(m.no)} lx={428} ly={204} />
              <Task x={340} y={250} w={170} label={t(m.tobe.review)} />
              <Flow d="M510 242 H575 V178" label={t(m.approve)} lx={520} ly={234} />
              <Flow d="M510 260 H820 V50 H754" label={t(m.reject)} lx={720} ly={276} />
              <Task x={600} y={50} w={150} label={t(m.tobe.fix)} />
              <Flow d="M600 50 H260 V122" />
            </g>
          )}
        </svg>
      </div>
      <p className="pm-change" aria-live="polite">
        {t(m.changes[view])}
      </p>
      <p className="lab-note">{t(m.note)}</p>
    </div>
  );
}
