'use client';
import { useEffect, useRef } from 'react';

// Decorative hero background: a seeded random-walk line chart with a cursor crosshair.
// The values are synthetic and must not be presented as real metrics.
const ink = '27,26,23';
const accent = '31,92,69';
const font = "500 11px 'Hanken Grotesk', sans-serif";

export default function HeroChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let series: number[] = [];
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const gauss = () => {
      let s = 0;
      for (let i = 0; i < 6; i++) s += rnd();
      return s / 3 - 1;
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      series = [];
      let v = 0.5;
      for (let i = 0; i < 400; i++) {
        v += gauss() * 0.035 + (0.55 - v) * 0.02;
        series.push(v);
      }
    };
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.tx = e.clientX - r.left;
      m.ty = e.clientY - r.top;
    };
    const leave = () => {
      m.tx = -9999;
      m.ty = -9999;
    };
    const label = (txt: string, x: number, y: number, solid: boolean) => {
      ctx.font = font;
      const w = ctx.measureText(txt).width + 14;
      x = Math.min(Math.max(x, 4), W - w - 4);
      ctx.fillStyle = solid ? `rgb(${accent})` : 'rgba(244,241,234,0.92)';
      ctx.fillRect(x, y - 11, w, 20);
      ctx.fillStyle = solid ? '#f4f1ea' : `rgb(${ink})`;
      ctx.fillText(txt, x + 7, y + 3);
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = reduce ? 0 : (now - t0) / 1000;
      if (m.tx < -999 || m.x < -999) {
        m.x = m.tx;
        m.y = m.ty;
      } else {
        m.x += (m.tx - m.x) * 0.16;
        m.y += (m.ty - m.y) * 0.16;
      }
      ctx.clearRect(0, 0, W, H);
      // Lower band only, so the centred headline and button stay clear.
      const top = H * 0.66;
      const bot = H - 24;
      const step = 7;
      const off = (t * 10) % step;
      const start = Math.floor((t * 10) / step);
      const at = (k: number) => series[(start + k) % series.length];
      const yAt = (k: number) => top + (1 - at(k)) * (bot - top);
      ctx.strokeStyle = `rgba(${ink},0.07)`;
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const y = top + ((bot - top) * g) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      const n = Math.ceil(W / step) + 2;
      ctx.beginPath();
      for (let k = 0; k < n; k++) {
        const x = k * step - off;
        if (k) ctx.lineTo(x, yAt(k));
        else ctx.moveTo(x, yAt(k));
      }
      ctx.strokeStyle = `rgba(${ink},0.28)`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.lineTo(W + step, bot);
      ctx.lineTo(-step, bot);
      ctx.closePath();
      ctx.fillStyle = `rgba(${accent},0.06)`;
      ctx.fill();
      if (m.x > 0 && m.x < W) {
        const k = Math.round((m.x + off) / step);
        const x = k * step - off;
        const y = yAt(k);
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = `rgba(${accent},0.55)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = `rgb(${accent})`;
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#f4f1ea';
        ctx.lineWidth = 2;
        ctx.stroke();
        const val = Math.round(at(k) * 2000).toLocaleString('en');
        const day = ((start + k) % 365) + 1;
        label(`Day ${day} · ${val}`, x + 12, y - 16, true);
        label(val, W - 64, y, false);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <canvas ref={ref} className="hero-chart" aria-hidden="true" />;
}
