'use client';
import { useState } from 'react';
import { ui } from '@/lib/content';
import { useLang } from './language';

// Synthetic marketplace figures for the Experience widget. They are illustrative, not company data.
const markets = [
  { id: 'A', sales: 42, traffic: 310, conversion: 9.1 },
  { id: 'B', sales: 31, traffic: 290, conversion: 6.2 },
  { id: 'C', sales: 24, traffic: 150, conversion: 10.4 },
  { id: 'D', sales: 18, traffic: 205, conversion: 5.1 },
  { id: 'E', sales: 15, traffic: 98, conversion: 8.7 },
  { id: 'F', sales: 11, traffic: 120, conversion: 5.8 },
  { id: 'G', sales: 8, traffic: 64, conversion: 7.9 },
  { id: 'H', sales: 6, traffic: 72, conversion: 4.3 },
];
type Metric = 'sales' | 'traffic' | 'conversion';
const metrics: Metric[] = ['sales', 'traffic', 'conversion'];
const format: Record<Metric, (v: number) => string> = {
  sales: (v) => `€${v}k`,
  traffic: (v) => `${v}k`,
  conversion: (v) => `${v.toFixed(1)}%`,
};
const avg = (m: Metric) =>
  markets.reduce((s, x) => s + x[m], 0) / markets.length;
const rowHeight = 34;

export default function MarketLens() {
  const { t } = useLang();
  const [metric, setMetric] = useState<Metric>('conversion');
  const [active, setActive] = useState('B');
  const l = ui.lens;
  const max = Math.max(...markets.map((x) => x[metric]));
  const order = [...markets]
    .sort((a, b) => b[metric] - a[metric])
    .map((x) => x.id);
  const mean = avg(metric);
  const m = markets.find((x) => x.id === active) ?? markets[0];
  const verdict =
    m.traffic > avg('traffic') && m.conversion < avg('conversion')
      ? l.flag
      : m.conversion >= avg('conversion') && m.traffic < avg('traffic')
        ? l.lowTraffic
        : m.conversion >= avg('conversion')
          ? l.healthy
          : l.weak;
  return (
    <div className="lens" data-reveal="0">
      <span className="label">{t(l.kicker)}</span>
      <h3>{t(l.title)}</h3>
      <fieldset className="lens-tabs">
        <legend className="sr-only">{t(l.hint)}</legend>
        {metrics.map((k) => (
          <button
            key={k}
            aria-pressed={metric === k}
            onClick={() => setMetric(k)}
          >
            {t(l.metrics[k])}
          </button>
        ))}
      </fieldset>
      <div
        className="lens-chart"
        style={{ height: markets.length * rowHeight }}
      >
        <span className="lens-mean-area" aria-hidden="true">
          <span className="lens-mean" style={{ left: `${(mean / max) * 100}%` }}>
            <span>
              {t(l.mean)} {format[metric](Math.round(mean * 10) / 10)}
            </span>
          </span>
        </span>
        {markets.map((x) => (
            <button
              key={x.id}
              className="lens-row"
              data-active={x.id === active || undefined}
              style={{
                transform: `translateY(${order.indexOf(x.id) * rowHeight}px)`,
              }}
              onMouseEnter={() => setActive(x.id)}
              onFocus={() => setActive(x.id)}
              onClick={() => setActive(x.id)}
            >
              <span className="lens-name">
                {t(l.market)} {x.id}
              </span>
              <span className="lens-track">
                <span
                  className="lens-bar"
                  style={{ width: `${(x[metric] / max) * 100}%` }}
                />
              </span>
              <span className="lens-value">{format[metric](x[metric])}</span>
            </button>
        ))}
      </div>
      <div className="lens-readout" aria-live="polite">
        <strong>
          {t(l.market)} {m.id}
        </strong>
        <span>
          {t(l.metrics.sales)} {format.sales(m.sales)} · {t(l.metrics.traffic)}{' '}
          {format.traffic(m.traffic)} · {t(l.metrics.conversion)}{' '}
          {format.conversion(m.conversion)}
        </span>
        <p>{t(verdict)}</p>
      </div>
      <p className="lens-note">
        {t(l.hint)} {t(l.note)}
      </p>
    </div>
  );
}
