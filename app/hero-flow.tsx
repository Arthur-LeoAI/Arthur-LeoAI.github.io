'use client';
import { useEffect, useRef } from 'react';
import { ui, type Text } from '@/lib/content';
import { useLang } from './language';

// Hero background: a simulated multilingual listing-review pipeline.
// Listing records flow from language tags into an "LLM + rules" step, then out to
// Approved / Human review / Auto-fixed. Everything here is synthetic and labelled so.
const languages = ['EN', 'DE', 'FR', 'IT', 'ES', 'NL', 'PL', 'SE'];
type Outcome = 'approved' | 'review' | 'fixed';
const outcomes: Outcome[] = ['approved', 'review', 'fixed'];
const ink = '27,26,23';
const accent = '31,92,69';
const bg = '#f4f1ea';
const font = (size: number, weight = 500) =>
  `${weight} ${size}px 'Hanken Grotesk', 'Noto Sans SC', sans-serif`;

type Pt = { x: number; y: number };
type Curve = [Pt, Pt, Pt, Pt];
type Packet = {
  lane: number;
  out: number;
  t: number; // 0..1 on the input curve, 1..2 on the output curve
  speed: number;
  boost: number;
};
const bez = ([a, b, c, d]: Curve, t: number): Pt => {
  const u = 1 - t;
  return {
    x:
      u * u * u * a.x +
      3 * u * u * t * b.x +
      3 * u * t * t * c.x +
      t * t * t * d.x,
    y:
      u * u * u * a.y +
      3 * u * u * t * b.y +
      3 * u * t * t * c.y +
      t * t * t * d.y,
  };
};
const pick = () => {
  const r = Math.random();
  return r < 0.72 ? 0 : r < 0.9 ? 1 : 2;
};

export default function HeroFlow() {
  const { lang } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const labels = useRef({ t: (x: Text) => x[lang] });
  // Reduced-motion mode draws a single frame, so it needs a redraw on language change.
  const redraw = useRef<(() => void) | null>(null);
  useEffect(() => {
    labels.current = { t: (x: Text) => x[lang] };
    redraw.current?.();
  }, [lang]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const hero = canvas?.closest('section');
    if (!canvas || !ctx || !hero) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let compact = false;
    let hub = { x: 0, y: 0, w: 150, h: 46 };
    let inputs: { x: number; y: number; w: number; h: number; curve: Curve }[] =
      [];
    let outs: { x: number; y: number; w: number; h: number; curve: Curve }[] =
      [];
    let packets: Packet[] = [];
    let processed = 0;
    let reviewed = 0;
    let pulse = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let spawnClock = 0;
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
      hub = {
        x: W / 2,
        y: compact ? H - 86 : H - 104,
        w: compact ? 120 : 150,
        h: compact ? 40 : 46,
      };
      const margin = compact ? 10 : Math.max(18, W * 0.03);
      const chipW = compact ? 30 : 38;
      const chipH = compact ? 20 : 24;
      const top = H * 0.1;
      const span = hub.y - 30 - top;
      const left: Pt = { x: hub.x - hub.w / 2, y: hub.y };
      const right: Pt = { x: hub.x + hub.w / 2, y: hub.y };
      if (compact) {
        // Phones: language tags in a row above the LLM step, outcome icons to its right.
        const gap = 6;
        const rowW = languages.length * chipW + (languages.length - 1) * gap;
        const rowY = hub.y - 58;
        inputs = languages.map((_, i) => {
          const x = (W - rowW) / 2 + i * (chipW + gap);
          const a = { x: x + chipW / 2, y: rowY + chipH };
          return {
            x,
            y: rowY,
            w: chipW,
            h: chipH,
            curve: [
              a,
              { x: a.x, y: a.y + 18 },
              { x: hub.x, y: hub.y - 30 },
              { x: hub.x, y: hub.y - hub.h / 2 },
            ],
          };
        });
        outs = outcomes.map((_, j) => {
          const x = hub.x + hub.w / 2 + 22 + j * 26;
          return {
            x,
            y: hub.y - chipH / 2,
            w: 20,
            h: chipH,
            curve: [
              right,
              { x: right.x + 8, y: right.y },
              { x: x - 8, y: hub.y },
              { x: x + 10, y: hub.y },
            ],
          };
        });
      } else {
        inputs = languages.map((_, i) => {
          const y = top + (span * i) / (languages.length - 1);
          const a = { x: margin + chipW, y };
          return {
            x: margin,
            y: y - chipH / 2,
            w: chipW,
            h: chipH,
            // Drop down near the edge, then run along the bottom: the centre copy stays clear.
            curve: [
              a,
              { x: a.x + W * 0.07, y },
              { x: a.x + W * 0.03, y: left.y },
              left,
            ],
          };
        });
        const outW = compact ? 22 : 128;
        outs = outcomes.map((_, j) => {
          const y = H * (0.3 + j * 0.17);
          const x = W - margin - outW;
          return {
            x,
            y: y - chipH / 2 - 2,
            w: outW,
            h: chipH + 4,
            curve: [
              right,
              { x: x - W * 0.03, y: right.y },
              { x: x - W * 0.07, y },
              { x, y },
            ],
          };
        });
      }
      if (reduce) {
        // A still frame with records spread along every lane.
        packets = [];
        for (let i = 0; i < 26; i++)
          packets.push({
            lane: i % 8,
            out: pick(),
            t: (i * 0.077) % 2,
            speed: 0,
            boost: 0,
          });
      }
    };

    const spawn = (lane: number, n = 1) => {
      for (let i = 0; i < n; i++)
        packets.push({
          lane,
          out: pick(),
          t: -i * 0.035,
          speed: 0.11 + Math.random() * 0.05,
          boost: 0,
        });
    };

    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };
    const strokeCurve = (c: Curve, style: string, width: number) => {
      ctx.beginPath();
      ctx.moveTo(c[0].x, c[0].y);
      ctx.bezierCurveTo(c[1].x, c[1].y, c[2].x, c[2].y, c[3].x, c[3].y);
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.stroke();
    };
    const hoveredLane = () =>
      m.on
        ? inputs.findIndex(
            (c) =>
              m.x >= c.x - 6 &&
              m.x <= c.x + c.w + 6 &&
              m.y >= c.y - 6 &&
              m.y <= c.y + c.h + 6,
          )
        : -1;

    const draw = (dt: number) => {
      const { t } = labels.current;
      const hot = hoveredLane();
      ctx.clearRect(0, 0, W, H);

      // Lanes
      inputs.forEach((c, i) =>
        strokeCurve(
          c.curve,
          `rgba(${accent},${i === hot ? 0.55 : 0.16})`,
          i === hot ? 2 : 1.2,
        ),
      );
      outs.forEach((c) => strokeCurve(c.curve, `rgba(${accent},0.16)`, 1.2));

      // Packets
      if (!reduce) {
        spawnClock += dt;
        if (spawnClock > 0.32) {
          spawnClock = 0;
          spawn(Math.floor(Math.random() * languages.length));
        }
      }
      const next: Packet[] = [];
      for (const p of packets) {
        const before = p.t;
        if (!reduce) p.t += (p.speed + p.boost) * dt;
        p.boost *= 0.94;
        if (before < 1 && p.t >= 1) {
          pulse = 1;
          processed++;
          if (p.out === 1) reviewed++;
        }
        if (p.t < 0) {
          next.push(p);
          continue;
        }
        if (p.t > 2) continue;
        const pos =
          p.t < 1
            ? bez(inputs[p.lane].curve, p.t)
            : bez(outs[p.out].curve, p.t - 1);
        // The cursor acts as a reviewer: nearby records light up and move faster.
        const near = m.on && Math.hypot(pos.x - m.x, pos.y - m.y) < 70;
        if (near && !reduce) p.boost = Math.min(0.5, p.boost + 0.04);
        const lit = near || p.lane === hot;
        if (p.t < 1) {
          const s = lit ? 7 : 5.5;
          ctx.fillStyle = lit ? `rgba(${accent},0.9)` : `rgba(${ink},0.32)`;
          ctx.fillRect(pos.x - s / 2, pos.y - s / 2, s, s);
        } else if (p.out === 0) {
          ctx.fillStyle = `rgba(${accent},${lit ? 1 : 0.75})`;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.out === 1) {
          ctx.strokeStyle = `rgba(${ink},0.75)`;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(pos.x - 3.5, pos.y - 3.5, 7, 7);
        } else {
          ctx.strokeStyle = `rgba(${accent},0.85)`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 3.8, 0, Math.PI * 2);
          ctx.stroke();
        }
        next.push(p);
      }
      packets = next;

      // Language tags
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      inputs.forEach((c, i) => {
        roundRect(c.x, c.y, c.w, c.h, 4);
        ctx.fillStyle = i === hot ? `rgb(${accent})` : bg;
        ctx.fill();
        ctx.strokeStyle = `rgba(${accent},0.55)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = i === hot ? bg : `rgb(${accent})`;
        ctx.font = font(compact ? 10 : 11, 600);
        ctx.fillText(languages[i], c.x + c.w / 2, c.y + c.h / 2 + 0.5);
      });
      if (hot >= 0 && !compact) {
        const c = inputs[hot];
        const label = `${languages[hot]} ${t(ui.heroFlow.trace)}`;
        ctx.font = font(12);
        const w = ctx.measureText(label).width + 16;
        roundRect(c.x + c.w + 8, c.y, w, c.h, 4);
        ctx.fillStyle = `rgb(${accent})`;
        ctx.fill();
        ctx.fillStyle = bg;
        ctx.textAlign = 'left';
        ctx.fillText(label, c.x + c.w + 16, c.y + c.h / 2 + 0.5);
      }

      // Outcome tags
      outs.forEach((c, j) => {
        roundRect(c.x, c.y, c.w, c.h, 4);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.strokeStyle = `rgba(${accent},0.55)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        const cx = c.x + (compact ? c.w / 2 : 14);
        const cy = c.y + c.h / 2;
        if (j === 0) {
          ctx.fillStyle = `rgb(${accent})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 3.6, 0, Math.PI * 2);
          ctx.fill();
        } else if (j === 1) {
          ctx.strokeStyle = `rgb(${ink})`;
          ctx.lineWidth = 1.4;
          ctx.strokeRect(cx - 3.5, cy - 3.5, 7, 7);
        } else {
          ctx.strokeStyle = `rgb(${accent})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(cx, cy, 3.8, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (!compact) {
          ctx.textAlign = 'left';
          ctx.fillStyle = `rgb(${accent})`;
          ctx.font = font(12);
          ctx.fillText(
            t(ui.heroFlow.outcomes[outcomes[j]]),
            c.x + 26,
            cy + 0.5,
          );
        }
      });

      // Hub
      pulse *= 0.9;
      const hx = hub.x - hub.w / 2;
      const hy = hub.y - hub.h / 2;
      if (pulse > 0.02) {
        roundRect(
          hx - 6 * pulse,
          hy - 6 * pulse,
          hub.w + 12 * pulse,
          hub.h + 12 * pulse,
          12,
        );
        ctx.fillStyle = `rgba(${accent},${0.18 * pulse})`;
        ctx.fill();
      }
      roundRect(hx, hy, hub.w, hub.h, 9);
      ctx.fillStyle = `rgb(${accent})`;
      ctx.fill();
      ctx.fillStyle = bg;
      ctx.textAlign = 'center';
      ctx.font = font(compact ? 12 : 14, 600);
      ctx.fillText(t(ui.heroFlow.hub), hub.x, hub.y + 1);

      // Live counter (simulated)
      if (!reduce) {
        ctx.font = font(11);
        ctx.fillStyle = `rgba(${ink},0.55)`;
        ctx.fillText(
          t(ui.heroFlow.counter)
            .replace('{n}', processed.toLocaleString('en'))
            .replace('{r}', reviewed.toLocaleString('en')),
          hub.x,
          hub.y + hub.h / 2 + 16,
        );
      }

      // Cursor lens
      if (m.on && hot < 0 && !reduce) {
        ctx.strokeStyle = `rgba(${accent},0.22)`;
        ctx.setLineDash([3, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 70, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) draw(dt);
    };
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.on = e.pointerType === 'mouse' && m.y >= 0 && m.y <= r.height;
      canvas.parentElement?.toggleAttribute('data-hot', hoveredLane() >= 0);
    };
    const leave = () => {
      m.on = false;
    };
    const click = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button,input,select')) return;
      const r = canvas.getBoundingClientRect();
      const y = e.clientY - r.top;
      let lane = 0;
      inputs.forEach((c, i) => {
        if (
          Math.abs(c.y + c.h / 2 - y) <
          Math.abs(inputs[lane].y + inputs[lane].h / 2 - y)
        )
          lane = i;
      });
      spawn(lane, 8);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(() => {
      layout();
      if (reduce) draw(0);
    });
    layout();
    io.observe(canvas);
    ro.observe(canvas);
    if (reduce) {
      draw(0);
      redraw.current = () => draw(0);
    } else {
      // Start mid-stream so the first frame is already moving.
      for (let i = 0; i < 14; i++) {
        spawn(i % languages.length);
        packets[i].t = Math.random() * 1.9;
      }
      addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
      hero.addEventListener('pointerdown', click);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      redraw.current = null;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      hero.removeEventListener('pointerdown', click);
    };
  }, []);

  return (
    <div className="hero-flow" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
