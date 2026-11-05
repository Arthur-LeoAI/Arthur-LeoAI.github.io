'use client';
import { useEffect, useRef } from 'react';
import { skillList, ui } from '@/lib/content';
import { useLang } from './language';

// An oil-paint study drawn in code beside Experience: a winding road through fields toward
// a rising sun. A composition function gives the colour and brush direction at every point;
// thousands of short, loaded brush strokes (each with a lighter ridge, like impasto) paint it
// in when the section scrolls into view. Click the painting to repaint it with new strokes.
// The skills are listed under it, each once.

type RGB = [number, number, number];
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const clamp = (v: number) => Math.max(0, Math.min(1, v));

// Palette: warm cream, clay, ochre, sage and deep green, slate blue.
const P = {
  skyTop: [126, 150, 166] as RGB,
  skyLow: [238, 214, 186] as RGB,
  sun: [244, 196, 120] as RGB,
  sunCore: [252, 236, 200] as RGB,
  hill: [118, 138, 132] as RGB,
  field: [96, 128, 84] as RGB,
  fieldLight: [168, 172, 98] as RGB,
  fieldWarm: [201, 150, 90] as RGB,
  path: [226, 196, 150] as RGB,
  cypress: [36, 66, 50] as RGB,
  clay: [201, 100, 66] as RGB,
};

const SUN = { x: 0.66, y: 0.33, r: 0.075 };
const HORIZON = 0.5;
const hill = (x: number) => HORIZON - 0.035 - 0.03 * Math.sin(x * 5.2 + 0.6) - 0.018 * Math.sin(x * 11.3);
// The road: from the bottom left, winding up to the horizon below the sun.
const pathX = (y: number) => {
  const t = clamp((y - HORIZON) / (1 - HORIZON)); // 0 at horizon, 1 at bottom
  return SUN.x - 0.02 + (0.36 - SUN.x) * t + 0.09 * Math.sin(t * 5.5) * t;
};
const pathHalfW = (y: number) => 0.006 + 0.11 * clamp((y - HORIZON) / (1 - HORIZON)) ** 1.6;
const cypresses = [
  { x: 0.16, base: 0.74, h: 0.42, w: 0.055 },
  { x: 0.25, base: 0.7, h: 0.3, w: 0.04 },
  { x: 0.9, base: 0.62, h: 0.2, w: 0.03 },
];
const inCypress = (x: number, y: number) => {
  for (const c of cypresses) {
    const t = (c.base - y) / c.h; // 0 base → 1 tip
    if (t < 0 || t > 1) continue;
    const half = c.w * Math.sin(Math.PI * Math.min(1, t * 1.15 + 0.05)) * (1 - t * 0.45);
    if (Math.abs(x - c.x) < half) return c;
  }
  return null;
};

// Colour and brush angle at a point of the picture (0..1 coordinates).
const sample = (x: number, y: number, n: number): { c: RGB; a: number; size: number } => {
  const cy = inCypress(x, y);
  if (cy) {
    const shade = 0.5 + 0.5 * Math.sin((x - cy.x) * 60 + y * 30);
    return { c: mix(P.cypress, [70, 104, 70], shade * 0.6 + n * 0.2), a: Math.PI / 2 + Math.sin(y * 40) * 0.5, size: 0.7 };
  }
  const ds = Math.hypot(x - SUN.x, (y - SUN.y) * 1.1);
  if (y < hill(x)) {
    // Sky: strokes swirl around the sun, warmer toward the horizon.
    if (ds < SUN.r) return { c: mix(P.sunCore, P.sun, ds / SUN.r), a: Math.atan2(y - SUN.y, x - SUN.x) + Math.PI / 2, size: 0.6 };
    const warm = clamp(1 - (HORIZON - y) / 0.45) ** 1.4;
    let c = mix(P.skyTop, P.skyLow, warm);
    c = mix(c, P.sun, clamp(1 - ds / 0.32) ** 2 * 0.75);
    const swirl = Math.atan2(y - SUN.y, x - SUN.x) + Math.PI / 2;
    const blend = clamp(1 - ds / 0.4);
    const a = swirl * blend + (Math.sin(x * 9 + y * 4) * 0.3) * (1 - blend);
    return { c, a, size: 1.1 };
  }
  if (y < HORIZON + 0.005) {
    return { c: mix(P.hill, P.skyLow, 0.25 + n * 0.2), a: Math.sin(x * 14) * 0.25, size: 0.8 };
  }
  // Fields with the road.
  const px = pathX(y);
  const half = pathHalfW(y);
  const depth = clamp((y - HORIZON) / (1 - HORIZON));
  if (Math.abs(x - px) < half) {
    const edge = Math.abs(x - px) / half;
    const dir = Math.atan2(1, (pathX(y + 0.01) - px) / 0.01);
    return { c: mix(P.path, P.fieldWarm, edge * 0.5 + n * 0.15), a: dir, size: 0.5 + depth * 0.8 };
  }
  // Furrows: bands that curve toward the road, alternating green and ochre.
  const band = Math.sin((y - HORIZON) * (40 - depth * 22) + Math.sin(x * 6) * 1.2);
  let c = mix(P.field, P.fieldLight, clamp(band * 0.5 + 0.5));
  // A ripening field on the right, fading in softly.
  const warmth = clamp((x - 0.5) / 0.2) * clamp((y - 0.6) / 0.12) * (0.75 + 0.25 * Math.sin(x * 23 + y * 9));
  c = mix(c, P.fieldWarm, warmth * 0.45);
  c = mix(c, P.skyLow, (1 - depth) * 0.35); // aerial haze
  const a = (px - x) * 0.6 * depth + Math.sin(x * 7 + y * 3) * 0.12;
  return { c, a, size: 0.6 + depth * 1.1 };
};

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function SkillPainting() {
  const { t } = useLang();
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!box || !canvas || !ctx) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let seed = 1;
    let strokes: { x: number; y: number }[] = [];
    let next = 0;
    let raf = 0;
    let started = false;

    const layout = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Coarse underpainting so no canvas shows between strokes.
    const underpaint = () => {
      const step = 6;
      for (let y = 0; y < H; y += step)
        for (let x = 0; x < W; x += step) {
          const s = sample(x / W, y / H, 0.5);
          ctx.fillStyle = `rgb(${s.c.map((v) => Math.round(v * 0.92)).join(',')})`;
          ctx.fillRect(x, y, step + 1, step + 1);
        }
    };

    // Stroke positions, large strokes first; jittered grid passes from coarse to fine.
    const plan = () => {
      strokes = [];
      const area = W * H;
      for (const [count, k] of [
        [area / 90, 0],
        [area / 40, 1],
        [area / 22, 2],
      ] as const) {
        for (let i = 0; i < count; i++) {
          strokes.push({ x: hash(seed * 7.1 + i * 1.37 + k * 101) * W, y: hash(seed * 3.3 + i * 2.71 + k * 211) * H });
        }
      }
      next = 0;
    };

    const stroke = (i: number) => {
      const p = strokes[i];
      const pass = i / strokes.length;
      const n = hash(i * 0.913 + seed);
      const s = sample(p.x / W, p.y / H, n);
      const scale = Math.min(W, H) / 320;
      const len = (14 - pass * 7) * s.size * scale * (0.7 + n * 0.6);
      const width = (5.2 - pass * 2.6) * Math.min(1.3, s.size) * scale * (0.8 + n * 0.4);
      const a = s.a + (n - 0.5) * 0.35;
      const dx = Math.cos(a) * len * 0.5;
      const dy = Math.sin(a) * len * 0.5;
      const bend = (hash(i * 1.7) - 0.5) * len * 0.35;
      const j = (n - 0.5) * 26; // colour jitter, as if mixed on the palette
      const c = s.c.map((v) => Math.round(Math.max(0, Math.min(255, v + j)))).join(',');
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(${c},0.92)`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(p.x - dx, p.y - dy);
      ctx.quadraticCurveTo(p.x - dy * 0.3 + bend, p.y + dx * 0.3, p.x + dx, p.y + dy);
      ctx.stroke();
      // Impasto ridge: a thin lighter line along the upper edge of the stroke.
      ctx.strokeStyle = `rgba(255,248,236,${(0.1 + n * 0.14).toFixed(2)})`;
      ctx.lineWidth = Math.max(0.6, width * 0.22);
      ctx.beginPath();
      ctx.moveTo(p.x - dx - width * 0.2, p.y - dy - width * 0.25);
      ctx.quadraticCurveTo(p.x - dy * 0.3 + bend, p.y + dx * 0.3 - width * 0.3, p.x + dx - width * 0.2, p.y + dy - width * 0.25);
      ctx.stroke();
    };

    // Fine linen grain over the finished paint.
    const grain = () => {
      ctx.fillStyle = 'rgba(60,50,40,0.05)';
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
      for (let x = 0; x < W; x += 3) ctx.fillRect(x, 0, 1, H);
    };

    const paintAll = () => {
      underpaint();
      for (let i = 0; i < strokes.length; i++) stroke(i);
      grain();
    };

    const frame = () => {
      const batch = Math.ceil(strokes.length / 150); // about 2.5 s at 60 fps
      const end = Math.min(strokes.length, next + batch);
      while (next < end) stroke(next++);
      if (next < strokes.length) raf = requestAnimationFrame(frame);
      else grain();
    };

    const start = () => {
      cancelAnimationFrame(raf);
      layout();
      plan();
      if (reduce) {
        paintAll();
        return;
      }
      underpaint();
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          start();
        }
      },
      { rootMargin: "120px" },
    );
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      const w = box.getBoundingClientRect().width;
      if (!started || Math.abs(w - lastW) < 2) return;
      lastW = w;
      start();
    });
    const repaint = () => {
      seed++;
      start();
    };
    io.observe(box);
    ro.observe(box);
    canvas.addEventListener('click', repaint);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('click', repaint);
    };
  }, []);

  const core = skillList.filter((s) => s.core);
  const more = skillList.filter((s) => !s.core);
  return (
    <figure className="skill-painting" data-reveal="0">
      <span className="label">{t(ui.skillArt.kicker)}</span>
      <div className="painting" ref={wrap}>
        <canvas ref={canvasRef} aria-hidden="true" title={t(ui.skillArt.repaint)} />
      </div>
      <figcaption>
        <small className="painting-note">{t(ui.skillArt.note)}</small>
        <ul className="painting-core">
          {core.map((s) => (
            <li key={s.label.en}>{t(s.label)}</li>
          ))}
        </ul>
        <ul className="painting-more">
          {more.map((s) => (
            <li key={s.label.en}>{t(s.label)}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
