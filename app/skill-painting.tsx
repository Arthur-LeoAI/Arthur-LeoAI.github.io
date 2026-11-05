'use client';
import { useEffect, useRef } from 'react';
import { ui } from '@/lib/content';
import { useLang } from './language';

// Van Gogh's Sunflowers, repainted live in brush strokes beside Experience. The public-domain
// image (public/art/van-gogh-sunflowers.jpg, from Wikimedia Commons) is only a reference:
// each stroke takes its colour from it and runs along its edges (perpendicular to the colour
// gradient), from broad strokes to fine ones, each with a lighter ridge like impasto. It paints
// itself in when the section scrolls into view; click it to repaint with new strokes.
// Under it: one line on working with AI, and four keywords.

const SRC = '/art/van-gogh-sunflowers.jpg';
const REF_W = 240; // reference resolution for colour and direction sampling

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function SkillPainting() {
  const { t, lang } = useLang();
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
    let strokes: { x: number; y: number; pass: number }[] = [];
    let next = 0;
    let raf = 0;
    let started = false;
    let img: HTMLImageElement | null = null;
    let ref: { w: number; h: number; px: Uint8ClampedArray; lum: Float32Array } | null = null;

    // Reference pixels and luminance at low resolution.
    const prepare = (im: HTMLImageElement) => {
      const w = REF_W;
      const h = Math.round((REF_W * im.naturalHeight) / im.naturalWidth);
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cx = c.getContext('2d', { willReadFrequently: true })!;
      cx.drawImage(im, 0, 0, w, h);
      const px = cx.getImageData(0, 0, w, h).data;
      const lum = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) lum[i] = (px[i * 4] * 0.3 + px[i * 4 + 1] * 0.59 + px[i * 4 + 2] * 0.11) / 255;
      ref = { w, h, px, lum };
    };

    // Colour, stroke angle and edge strength at a point (0..1 coordinates).
    const sample = (u: number, v: number) => {
      const r = ref!;
      const x = Math.max(1, Math.min(r.w - 2, Math.round(u * (r.w - 1))));
      const y = Math.max(1, Math.min(r.h - 2, Math.round(v * (r.h - 1))));
      const i = y * r.w + x;
      const L = r.lum;
      // Sobel gradient: strokes run along edges, across the gradient.
      const gx =
        L[i - r.w + 1] + 2 * L[i + 1] + L[i + r.w + 1] - L[i - r.w - 1] - 2 * L[i - 1] - L[i + r.w - 1];
      const gy =
        L[i + r.w - 1] + 2 * L[i + r.w] + L[i + r.w + 1] - L[i - r.w - 1] - 2 * L[i - r.w] - L[i - r.w + 1];
      const mag = Math.hypot(gx, gy);
      const angle = mag > 0.04 ? Math.atan2(gy, gx) + Math.PI / 2 : Math.sin(u * 9 + v * 13) * 0.9;
      return { c: [r.px[i * 4], r.px[i * 4 + 1], r.px[i * 4 + 2]], angle, mag };
    };

    const layout = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Soft underpainting: the reference, blurred, so no bare canvas shows between strokes.
    const underpaint = () => {
      ctx.save();
      ctx.filter = 'blur(6px) saturate(0.9)';
      ctx.drawImage(img!, -8, -8, W + 16, H + 16);
      ctx.restore();
    };

    // Broad strokes first, then finer ones; the finest pass only where there is detail.
    const plan = () => {
      strokes = [];
      const area = W * H;
      const passes = [area / 120, area / 50, area / 22, area / 9];
      passes.forEach((count, pass) => {
        for (let i = 0; i < count; i++) {
          const x = hash(seed * 7.1 + i * 1.37 + pass * 101) * W;
          const y = hash(seed * 3.3 + i * 2.71 + pass * 211) * H;
          if (pass === 3 && sample(x / W, y / H).mag < 0.12) continue;
          strokes.push({ x, y, pass });
        }
      });
      next = 0;
    };

    const stroke = (k: number) => {
      const p = strokes[k];
      const n = hash(k * 0.913 + seed * 5.7);
      const s = sample(p.x / W, p.y / H);
      const scale = Math.min(W, H) / 300;
      const len = [17, 12, 8, 5][p.pass] * scale * (0.7 + n * 0.6);
      const width = [6, 4.2, 2.8, 1.8][p.pass] * scale * (0.8 + n * 0.4);
      const a = s.angle + (n - 0.5) * 0.3;
      const dx = Math.cos(a) * len * 0.5;
      const dy = Math.sin(a) * len * 0.5;
      const bend = (hash(k * 1.7) - 0.5) * len * 0.3;
      const j = (n - 0.5) * 22; // colour varies a little, as if mixed on the palette
      const c = s.c.map((v) => Math.round(Math.max(0, Math.min(255, v + j)))).join(',');
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(${c},0.94)`;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(p.x - dx, p.y - dy);
      ctx.quadraticCurveTo(p.x - dy * 0.3 + bend, p.y + dx * 0.3, p.x + dx, p.y + dy);
      ctx.stroke();
      // Impasto ridge: a thin lighter line along one edge of the stroke.
      ctx.strokeStyle = `rgba(255,250,235,${(0.08 + n * 0.12).toFixed(2)})`;
      ctx.lineWidth = Math.max(0.5, width * 0.22);
      ctx.beginPath();
      ctx.moveTo(p.x - dx - width * 0.2, p.y - dy - width * 0.25);
      ctx.quadraticCurveTo(p.x - dy * 0.3 + bend, p.y + dx * 0.3 - width * 0.3, p.x + dx - width * 0.2, p.y + dy - width * 0.25);
      ctx.stroke();
    };

    // Fine canvas grain over the finished paint.
    const grain = () => {
      ctx.fillStyle = 'rgba(60,50,40,0.045)';
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
      for (let x = 0; x < W; x += 3) ctx.fillRect(x, 0, 1, H);
    };

    const frame = () => {
      const batch = Math.ceil(strokes.length / 160); // about 2.5 s at 60 fps
      const end = Math.min(strokes.length, next + batch);
      while (next < end) stroke(next++);
      if (next < strokes.length) raf = requestAnimationFrame(frame);
      else grain();
    };

    const start = () => {
      if (!ref || !img) return;
      cancelAnimationFrame(raf);
      layout();
      plan();
      underpaint();
      if (reduce) {
        while (next < strokes.length) stroke(next++);
        grain();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const load = () => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => {
        img = im;
        prepare(im);
        start();
      };
      im.src = SRC;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          started = true;
          load();
        }
      },
      { rootMargin: '120px' },
    );
    let lastW = 0;
    const ro = new ResizeObserver(() => {
      const w = box.getBoundingClientRect().width;
      if (!ref || Math.abs(w - lastW) < 2) return;
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

  return (
    <figure className="skill-painting" data-reveal="0">
      <span className="label">{t(ui.skillArt.kicker)}</span>
      <div className="painting" ref={wrap}>
        <canvas ref={canvasRef} title={t(ui.skillArt.repaint)} aria-hidden="true" />
        <span className="sr-only">{t(ui.skillArt.alt)}</span>
      </div>
      <figcaption>
        <p className="painting-statement">{t(ui.skillArt.statement)}</p>
        <ul className="painting-keywords">
          {ui.skillArt.keywords[lang].map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
