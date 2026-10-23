'use client';
import { useEffect, useRef } from 'react';

// Hero background, "messy data → clear decisions": scattered dots drift as noise and snap into
// a dot-matrix area chart where the cursor sweeps, when the page scrolls, or on a slow idle breath.
// The values are synthetic and must not be presented as real metrics.
const ink = [27, 26, 23];
const accent = [31, 92, 69];
const bins = 6;
const font = "500 11px 'Hanken Grotesk', sans-serif";
const smooth = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

type Dot = {
  bx: number;
  by: number;
  tx: number;
  ty: number;
  f: number;
  ph: number;
  o: number;
};

export default function HeroChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Colour ramp from ink (noise) to accent (ordered), pre-built per bin.
    const colours = Array.from({ length: bins }, (_, i) => {
      const k = i / (bins - 1);
      const c = ink.map((v, j) => Math.round(v + (accent[j] - v) * k));
      return `rgba(${c.join(',')},${(0.2 + 0.45 * k).toFixed(2)})`;
    });
    let W = 0;
    let H = 0;
    let step = 10;
    let top = 0;
    let bot = 0;
    let dots: Dot[] = [];
    let values: number[] = [];
    let tops: number[] = [];
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const m = { x: -9999, y: -9999, last: -1e9 };

    const build = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      step = W < 700 ? 9 : 10;
      // Chart band sits in the hero's bottom padding, below the headline and button.
      bot = H - 30;
      top = bot - Math.min(H * 0.24, 170);
      let seed = 7;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const cols = Math.floor(W / step);
      const maxRows = Math.max(4, Math.floor((bot - top) / step));
      values = [];
      let v = 0.55;
      for (let c = 0; c < cols; c++) {
        v += (rnd() - 0.5) * 0.12 + (0.55 - v) * 0.04;
        v = Math.min(0.98, Math.max(0.12, v));
        values.push(v);
      }
      dots = [];
      tops = [];
      const x0 = (W - cols * step) / 2 + step / 2;
      values.forEach((val, c) => {
        const rows = Math.max(1, Math.round(val * maxRows));
        for (let row = 0; row < rows; row++) {
          dots.push({
            bx: rnd() * W,
            by: 12 + rnd() * (H - 24),
            tx: x0 + c * step,
            ty: bot - row * step,
            f: 0.25 + rnd() * 0.5,
            ph: rnd() * Math.PI * 2,
            o: reduce ? 1 : 0,
          });
        }
        tops.push(dots.length - 1);
      });
    };

    const label = (txt: string, x: number, y: number) => {
      ctx.font = font;
      const w = ctx.measureText(txt).width + 14;
      x = Math.min(Math.max(x, 4), W - w - 4);
      ctx.fillStyle = `rgb(${accent.join(',')})`;
      ctx.fillRect(x, y - 11, w, 20);
      ctx.fillStyle = '#f4f1ea';
      ctx.fillText(txt, x + 7, y + 3);
    };

    const draw = (now: number) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      const pointer = !reduce && now - m.last < 2500 && m.x > 0 && m.x < W;
      const scrolled = smooth(0, H * 0.55, scrollY);
      const breathe = 0.5 - 0.5 * Math.cos((t / 9) * Math.PI * 2);
      const global = reduce ? 1 : Math.max(scrolled, pointer ? 0 : breathe * 0.85);
      ctx.clearRect(0, 0, W, H);
      const buckets: number[][] = Array.from({ length: bins }, () => []);
      for (const d of dots) {
        const lens = pointer ? 1 - smooth(60, 240, Math.abs(d.tx - m.x)) : 0;
        d.o += (Math.max(global, lens) - d.o) * 0.07;
        const e = d.o * d.o * (3 - 2 * d.o);
        const a = 16 * (1 - e);
        const mx = d.bx + Math.sin(t * d.f + d.ph) * a;
        const my = d.by + Math.cos(t * d.f * 0.8 + d.ph) * a;
        const x = mx + (d.tx - mx) * e;
        const y = my + (d.ty - my) * e;
        const b = Math.min(bins - 1, Math.round(e * (bins - 1)));
        buckets[b].push(x, y);
      }
      buckets.forEach((pts, b) => {
        ctx.fillStyle = colours[b];
        const s = 1.6 + (b / (bins - 1)) * 0.8;
        for (let i = 0; i < pts.length; i += 2)
          ctx.fillRect(pts[i] - s / 2, pts[i + 1] - s / 2, s, s);
      });
      // Trend line across the tops of columns that have settled.
      ctx.lineWidth = 1.2;
      for (let c = 1; c < tops.length; c++) {
        const p = dots[tops[c - 1]];
        const q = dots[tops[c]];
        const o = Math.min(p.o, q.o);
        if (o < 0.6) continue;
        ctx.strokeStyle = `rgba(${accent.join(',')},${((o - 0.6) * 1.6).toFixed(2)})`;
        ctx.beginPath();
        ctx.moveTo(p.tx, p.ty - step);
        ctx.lineTo(q.tx, q.ty - step);
        ctx.stroke();
      }
      if (pointer && values.length) {
        const c = Math.min(
          values.length - 1,
          Math.max(0, Math.round((m.x - dots[0].tx) / step)),
        );
        const d = dots[tops[c]];
        if (d.o > 0.5) {
          ctx.setLineDash([3, 4]);
          ctx.strokeStyle = `rgba(${accent.join(',')},0.5)`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.tx, top - 18);
          ctx.lineTo(d.tx, bot + 6);
          ctx.stroke();
          ctx.setLineDash([]);
          const val = Math.round(values[c] * 2000).toLocaleString('en');
          label(`Day ${c + 1} · ${val}`, d.tx + 10, d.ty - step - 14);
        }
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (visible) draw(now);
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.last = m.y > 0 && m.y < r.height ? performance.now() : m.last;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0);
    });
    build();
    io.observe(canvas);
    ro.observe(canvas);
    if (reduce) {
      draw(0);
    } else {
      addEventListener('pointermove', move, { passive: true });
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('pointermove', move);
    };
  }, []);
  return <canvas ref={ref} className="hero-chart" aria-hidden="true" />;
}
