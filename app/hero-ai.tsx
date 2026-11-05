'use client';
import { useEffect, useRef } from 'react';

// Hero background: "raw data → AI → insight".
// Scattered data fragments (numbers, IDs, table cells) drift on the left, get pulled into a
// glowing ✦ AI spark at the bottom centre, and every few fragments the spark sends a small
// chart card out to the right. Hover the spark to speed it up; click the hero to process
// everything on screen. All values are decorative.
const ink = '27,26,23';
const accent = '31,92,69';
const card = '#fbf9f4';
const fragments = [
  '1,284', '0.072', '€31k', 'SKU-2041', '2026-10-03', 'null', 'Δ −4.1%', 'CTR 1.9%',
  '#N/A', '8,402', 'qty 36', '“FR”', '12.5', 'n=640', 'id 7731', '3.4★', 'TRUE', '0.18',
];

type Token = {
  text: string | null; // null = a little table-cell grid
  x: number;
  y: number;
  rot: number;
  age: number;
  life: number;
  phase: number;
  pull: number; // 0 = floating, >0 = being pulled into the spark
  sx: number;
  sy: number;
};
type Output = { kind: number; t: number; tx: number; ty: number; age: number; seed: number };

export default function HeroAI() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const hero = canvas?.closest('section');
    if (!canvas || !ctx || !hero) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let compact = false;
    let spark = { x: 0, y: 0 };
    let tokens: Token[] = [];
    let outputs: Output[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let spawnClock = 0;
    let absorbed = 0;
    let glow = 0;
    let hover = 0;
    const m = { x: -9999, y: -9999, on: false };

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compact = W < 720;
      spark = { x: W / 2, y: H - (compact ? 40 : 52) };
    };

    const spawn = (instant = false) => {
      const maxTokens = compact ? 9 : 16;
      if (tokens.length >= maxTokens) return;
      const left = compact ? [0.08, 0.32] : [0.05, 0.26];
      tokens.push({
        text: Math.random() < 0.18 ? null : fragments[Math.floor(Math.random() * fragments.length)],
        x: W * (left[0] + Math.random() * (left[1] - left[0])),
        y: H * (0.12 + Math.random() * 0.62),
        rot: (Math.random() - 0.5) * 0.28,
        age: instant ? Math.random() * 3 : 0,
        life: 3 + Math.random() * 3.5,
        phase: Math.random() * Math.PI * 2,
        pull: 0,
        sx: 0,
        sy: 0,
      });
    };

    const emit = () => {
      if (outputs.length >= (compact ? 2 : 4)) outputs.shift();
      const right = compact ? [0.62, 0.86] : [0.74, 0.92];
      outputs.push({
        kind: Math.floor(Math.random() * 3),
        t: 0,
        tx: W * (right[0] + Math.random() * (right[1] - right[0])),
        ty: H * (0.14 + Math.random() * 0.56),
        age: 0,
        seed: Math.random() * 1000,
      });
    };

    // A four-pointed AI spark (✦), as used by most AI products.
    const star = (x: number, y: number, r: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        const b = a + Math.PI / 4;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
        ctx.quadraticCurveTo(Math.cos(b) * r * 0.16, Math.sin(b) * r * 0.16, Math.cos(a + Math.PI / 2) * r, Math.sin(a + Math.PI / 2) * r);
      }
      ctx.closePath();
      ctx.restore();
    };

    const drawCard = (o: Output, x: number, y: number, alpha: number) => {
      const w = compact ? 64 : 92;
      const h = compact ? 42 : 58;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = card;
      ctx.strokeStyle = `rgba(${accent},0.45)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, y - h / 2, w, h, 6);
      ctx.fill();
      ctx.stroke();
      const pad = compact ? 8 : 11;
      const ix = x - w / 2 + pad;
      const iy = y - h / 2 + pad;
      const iw = w - pad * 2;
      const ih = h - pad * 2;
      const grow = Math.min(1, o.age * 1.5);
      ctx.fillStyle = `rgba(${accent},0.85)`;
      ctx.strokeStyle = `rgba(${accent},0.85)`;
      if (o.kind === 0) {
        // Bar chart
        for (let i = 0; i < 4; i++) {
          const v = 0.35 + 0.6 * Math.abs(Math.sin(o.seed + i * 1.7));
          const bw = iw / 4 - 3;
          ctx.fillRect(ix + i * (iw / 4), iy + ih * (1 - v * grow), bw, ih * v * grow);
        }
      } else if (o.kind === 1) {
        // Trend line with end dot
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        const n = 6;
        let ex = ix;
        let ey = iy + ih;
        for (let i = 0; i <= n * grow; i++) {
          ex = ix + (iw * i) / n;
          ey = iy + ih * (0.85 - (i / n) * 0.6 + 0.15 * Math.sin(o.seed + i * 2.1));
          if (i === 0) ctx.moveTo(ex, ey);
          else ctx.lineTo(ex, ey);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ex, ey, 2.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Donut
        const cx = x - w / 2 + pad + ih / 2;
        const cy = y;
        const r = ih / 2;
        ctx.lineWidth = compact ? 4 : 6;
        ctx.strokeStyle = `rgba(${accent},0.18)`;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${accent},0.85)`;
        ctx.beginPath();
        ctx.arc(cx, cy, r - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.68 * grow);
        ctx.stroke();
        ctx.fillStyle = `rgba(${ink},0.25)`;
        for (let i = 0; i < 2; i++) ctx.fillRect(cx + r + 6, cy - 7 + i * 10, (iw - ih - 6) * (i ? 0.6 : 0.9), 3);
      }
      ctx.globalAlpha = 1;
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const t = performance.now() / 1000;

      // Faint guide curves: left → spark → right.
      ctx.strokeStyle = `rgba(${accent},0.12)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(W * 0.16, H * 0.5);
      ctx.quadraticCurveTo(W * 0.22, spark.y, spark.x - 30, spark.y);
      ctx.moveTo(spark.x + 30, spark.y);
      ctx.quadraticCurveTo(W * 0.78, spark.y, W * 0.84, H * 0.45);
      ctx.stroke();
      ctx.setLineDash([]);

      // Raw data fragments
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `500 ${compact ? 10 : 12}px ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace`;
      const next: Token[] = [];
      for (const k of tokens) {
        k.age += dt;
        if (k.pull === 0 && k.age > k.life) {
          k.pull = 0.0001;
          k.sx = k.x;
          k.sy = k.y;
        }
        let x: number;
        let y: number;
        let a: number;
        let s = 1;
        if (k.pull > 0) {
          k.pull += dt * (0.55 + hover * 0.9);
          if (k.pull >= 1) {
            absorbed++;
            glow = 1;
            if (absorbed % 3 === 0) emit();
            continue;
          }
          const p = k.pull * k.pull;
          const cx = (k.sx + spark.x) / 2;
          const cy = Math.max(k.sy, spark.y) + 20;
          x = (1 - p) * (1 - p) * k.sx + 2 * (1 - p) * p * cx + p * p * spark.x;
          y = (1 - p) * (1 - p) * k.sy + 2 * (1 - p) * p * cy + p * p * spark.y;
          a = 0.55 * (1 - p) + 0.15;
          s = 1 - 0.6 * p;
        } else {
          x = k.x + Math.sin(t * 0.6 + k.phase) * 6;
          y = k.y + Math.cos(t * 0.5 + k.phase) * 5;
          a = Math.min(1, k.age / 0.8) * 0.5;
        }
        const near = m.on && Math.hypot(x - m.x, y - m.y) < 70;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(k.pull > 0 ? k.rot * (1 - k.pull) : k.rot);
        ctx.scale(s, s);
        if (k.text) {
          ctx.fillStyle = near || k.pull > 0 ? `rgba(${accent},${Math.min(1, a + 0.3)})` : `rgba(${ink},${a})`;
          ctx.fillText(k.text, 0, 0);
        } else {
          ctx.strokeStyle = near || k.pull > 0 ? `rgba(${accent},${a + 0.2})` : `rgba(${ink},${a * 0.8})`;
          ctx.lineWidth = 1;
          for (let r = 0; r < 2; r++)
            for (let c = 0; c < 3; c++) ctx.strokeRect(-24 + c * 16, -10 + r * 10, 16, 10);
        }
        ctx.restore();
        next.push(k);
      }
      tokens = next;

      // Insight cards flying out to the right
      const outs: Output[] = [];
      for (const o of outputs) {
        o.age += dt;
        o.t = Math.min(1, o.t + dt * 0.8);
        const e = 1 - Math.pow(1 - o.t, 3);
        const cx = (spark.x + o.tx) / 2 + 40;
        const cy = Math.max(spark.y, o.ty) + 10;
        const x = (1 - e) * (1 - e) * spark.x + 2 * (1 - e) * e * cx + e * e * o.tx;
        const y = (1 - e) * (1 - e) * spark.y + 2 * (1 - e) * e * cy + e * e * o.ty;
        const fade = o.age > 6 ? Math.max(0, 1 - (o.age - 6) / 1.2) : Math.min(1, o.t * 2);
        if (fade <= 0) continue;
        drawCard(o, x, y, fade * 0.95);
        outs.push(o);
      }
      outputs = outs;

      // The spark
      glow *= Math.exp(-dt * 2.5);
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6);
      const R = (compact ? 13 : 17) * (1 + 0.12 * glow + 0.12 * hover);
      const halo = ctx.createRadialGradient(spark.x, spark.y, 0, spark.x, spark.y, R * 3.4);
      halo.addColorStop(0, `rgba(${accent},${0.22 + 0.2 * glow + 0.08 * pulse})`);
      halo.addColorStop(1, `rgba(${accent},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, R * 3.4, 0, Math.PI * 2);
      ctx.fill();
      const rot = reduce ? 0 : t * 0.25;
      star(spark.x, spark.y, R, rot);
      ctx.fillStyle = `rgb(${accent})`;
      ctx.fill();
      star(spark.x + R * 1.05, spark.y - R * 1.05, R * 0.38, -rot);
      ctx.fill();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Allow larger steps so throttled tabs still progress (normal 60fps is unaffected).
      const dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      if (!visible) return;
      spawnClock += dt;
      if (spawnClock > 0.5) {
        spawnClock = 0;
        spawn();
      }
      const d = m.on ? Math.hypot(m.x - spark.x, m.y - spark.y) : 999;
      hover += ((d < 70 ? 1 : 0) - hover) * Math.min(1, dt * 6);
      canvas.parentElement?.toggleAttribute('data-hot', d < 70);
      draw(dt);
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.on = e.pointerType === 'mouse' && m.y >= 0 && m.y <= r.height;
    };
    const leave = () => {
      m.on = false;
    };
    const click = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button,input,select')) return;
      for (const k of tokens)
        if (k.pull === 0) {
          k.pull = 0.0001;
          k.sx = k.x;
          k.sy = k.y;
        }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(0);
    });
    layout();
    for (let i = 0; i < (compact ? 7 : 12); i++) spawn(true);
    io.observe(canvas);
    ro.observe(canvas);
    if (reduce) {
      emit();
      emit();
      outputs.forEach((o) => {
        o.t = 1;
        o.age = 2;
      });
      draw(0);
    } else {
      addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
      hero.addEventListener('pointerdown', click);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      hero.removeEventListener('pointerdown', click);
    };
  }, []);
  return (
    <div className="hero-bg" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
