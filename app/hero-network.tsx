'use client';
import { useEffect, useRef } from 'react';

// Hero background: a small layered neural network. Signals travel along weighted
// connections and light up the nodes they reach. Hovering a node highlights its
// connections and sends a signal from it; clicking the hero fires the input layer.
// Weights are fixed and decorative; nothing here is a trained model.
const ink = '27,26,23';
const accent = '31,92,69';
const card = '#fbf9f4';

type Node = { x: number; y: number; layer: number; act: number };
type Edge = { a: number; b: number; w: number };
type Pulse = { edge: number; t: number; s: number };

export default function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const hero = canvas?.closest('section');
    if (!canvas || !ctx || !hero) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let out: number[][] = [];
    let into: number[][] = [];
    let layers: number[][] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let idle = 0;
    let hoverClock = 0;
    let hot = -1;
    const m = { x: -9999, y: -9999, on: false };

    const build = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const compact = W < 720;
      const xs = compact ? [0.07, 0.5, 0.93] : [0.06, 0.22, 0.5, 0.78, 0.94];
      const counts = compact ? [4, 5, 3] : [4, 6, 7, 6, 3];
      let seed = 11;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      nodes = [];
      layers = counts.map((n, l) => {
        const ids: number[] = [];
        const top = H * 0.16;
        const span = H * 0.68;
        for (let i = 0; i < n; i++) {
          const y = top + (span * (i + 0.5)) / n + (rnd() - 0.5) * 14;
          ids.push(nodes.length);
          nodes.push({ x: W * xs[l], y, layer: l, act: 0 });
        }
        return ids;
      });
      edges = [];
      for (let l = 0; l < layers.length - 1; l++)
        for (const a of layers[l])
          for (const b of layers[l + 1]) {
            const w = rnd() * 2 - 1;
            if (Math.abs(w) > 0.3) edges.push({ a, b, w });
          }
      out = nodes.map(() => []);
      into = nodes.map(() => []);
      edges.forEach((e, i) => {
        out[e.a].push(i);
        into[e.b].push(i);
      });
      pulses = [];
    };

    // Send a signal from a node along its strongest outgoing connections.
    const fire = (n: number, s: number) => {
      nodes[n].act = Math.max(nodes[n].act, s);
      const ranked = [...out[n]].sort((i, j) => Math.abs(edges[j].w) - Math.abs(edges[i].w));
      for (const e of ranked.slice(0, 3))
        if (pulses.length < 140) pulses.push({ edge: e, t: 0, s: s * Math.abs(edges[e].w) });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const lit = new Set<number>();
      if (hot >= 0) [...out[hot], ...into[hot]].forEach((e) => lit.add(e));

      // Connections
      edges.forEach((e, i) => {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const on = lit.has(i);
        ctx.strokeStyle = on
          ? `rgba(${accent},0.5)`
          : `rgba(${ink},${(0.05 + 0.08 * Math.abs(e.w)).toFixed(3)})`;
        ctx.lineWidth = on ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Signals
      const next: Pulse[] = [];
      for (const p of pulses) {
        p.t += dt * 0.85;
        const e = edges[p.edge];
        const a = nodes[e.a];
        const b = nodes[e.b];
        if (p.t >= 1) {
          if (out[e.b].length) fire(e.b, Math.min(1, p.s * 1.25));
          else b.act = Math.max(b.act, p.s);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.08);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.08);
        ctx.strokeStyle = `rgba(${accent},${(0.35 * p.s + 0.15).toFixed(2)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${accent},${(0.5 + 0.5 * p.s).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.8, 0, Math.PI * 2);
        ctx.fill();
        next.push(p);
      }
      pulses = next;

      // Nodes
      nodes.forEach((n, i) => {
        if (!reduce) n.act *= Math.exp(-dt * 1.6);
        const r = n.layer === 0 || !out[i].length ? 6 : 5;
        if (n.act > 0.02) {
          ctx.fillStyle = `rgba(${accent},${(0.14 * n.act).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 10 * n.act, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = card;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (n.act > 0.02) {
          ctx.fillStyle = `rgba(${accent},${Math.min(1, n.act).toFixed(2)})`;
          ctx.fill();
        }
        ctx.strokeStyle = i === hot ? `rgb(${accent})` : `rgba(${ink},0.35)`;
        ctx.lineWidth = i === hot ? 2 : 1.2;
        ctx.stroke();
      });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;
      idle += dt;
      if (idle > 0.7) {
        idle = 0;
        const input = layers[0][Math.floor(Math.random() * layers[0].length)];
        fire(input, 0.9);
      }
      if (hot >= 0) {
        hoverClock += dt;
        if (hoverClock > 0.55) {
          hoverClock = 0;
          fire(hot, 1);
        }
      }
      draw(dt);
    };

    const nearest = () => {
      let best = -1;
      let dist = 34;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - m.x, n.y - m.y);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      return best;
    };
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.on = e.pointerType === 'mouse' && m.y >= 0 && m.y <= r.height;
      const n = m.on ? nearest() : -1;
      if (n !== hot) {
        hot = n;
        hoverClock = 0.55;
      }
      canvas.parentElement?.toggleAttribute('data-hot', hot >= 0);
    };
    const leave = () => {
      m.on = false;
      hot = -1;
    };
    const click = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button,input,select')) return;
      layers[0].forEach((n) => fire(n, 1));
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
      layers[0].forEach((n, i) => i % 2 === 0 && fire(n, 0.8));
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
    <div className="hero-network" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
