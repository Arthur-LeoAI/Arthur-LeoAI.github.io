'use client';
import { useEffect, useRef } from 'react';
import { sphereSkills, ui } from '@/lib/content';
import { useLang } from './language';

// Slow-turning 3D sphere of core skills over a hand-drawn backdrop (painted blob, pen orbits).
// Drag to turn it; hovering pauses it. The most-requested skills are drawn larger in serif.
type Pt = { x: number; y: number; z: number };

export default function SkillsSphere() {
  const { t } = useLang();
  const stage = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = sphereSkills.length;
    // Even spread on the sphere (Fibonacci lattice).
    const pts: Pt[] = sphereSkills.map((_, i) => {
      const y = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(a) * r, y, z: Math.sin(a) * r };
    });
    const idle = { x: 0.00012, y: 0.00042 }; // radians per ms: one turn every ~15 s
    let vx = reduce ? 0 : idle.x;
    let vy = reduce ? 0 : idle.y;
    let paused = false;
    let drag: { x: number; y: number } | null = null;
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const rotate = (ax: number, ay: number) => {
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      for (const p of pts) {
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        p.x = x1;
        p.y = y2;
        p.z = z2;
      }
    };
    const place = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Leave room for long labels at the sides on narrow screens.
      const R = Math.min(w, h) * (w < 420 ? 0.34 : 0.4);
      pts.forEach((p, i) => {
        const tag = tags.current[i];
        if (!tag) return;
        const depth = (p.z + 1) / 2; // 0 = back, 1 = front
        const k = 0.86 + 0.14 * depth;
        const x = w / 2 + p.x * R * k;
        const y = h / 2 + p.y * R * k;
        tag.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.5 + depth * 0.5).toFixed(3)})`;
        tag.style.opacity = (0.06 + 0.94 * depth ** 3).toFixed(3);
        tag.style.zIndex = String(Math.round(depth * 100));
      });
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - last);
      last = now;
      if (!visible) return;
      if (!drag) {
        if (paused) {
          vx *= 0.92;
          vy *= 0.92;
        } else if (!reduce) {
          vx += (idle.x - vx) * 0.03;
          vy += (idle.y - vy) * 0.03;
        }
      }
      rotate(vx * dt, vy * dt);
      place();
    };

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      vy = dx * 0.0002;
      vx = -dy * 0.0002;
      rotate(-dy * 0.006, dx * 0.006);
    };
    const up = () => {
      drag = null;
    };
    const enter = () => {
      paused = true;
    };
    const leave = () => {
      paused = false;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(place);
    io.observe(el);
    ro.observe(el);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    place();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div className="sphere" data-reveal="0">
      <span className="label">{t(ui.sphere.kicker)}</span>
      <div className="sphere-stage" ref={stage} aria-hidden="true">
        <svg className="sphere-art" viewBox="0 0 400 400" aria-hidden="true">
          <path
            className="sphere-blob"
            d="M206 58c62 4 120 40 134 104 13 60-10 126-64 160-50 31-122 34-170 2-47-31-72-92-58-150 15-63 92-120 158-116z"
          />
          <g className="sphere-orbits">
            <ellipse cx="200" cy="200" rx="168" ry="62" transform="rotate(-18 200 200)" pathLength="100" strokeDasharray="88 4 3 5" />
            <ellipse cx="200" cy="200" rx="150" ry="150" pathLength="100" strokeDasharray="1 3" opacity="0.6" />
            <ellipse cx="200" cy="200" rx="64" ry="166" transform="rotate(28 200 200)" pathLength="100" strokeDasharray="70 6 18 6" />
          </g>
          <g className="sphere-moon">
            <circle cx="368" cy="200" r="5" />
          </g>
        </svg>
        {sphereSkills.map((s, i) => (
          <span
            key={s.label.en}
            ref={(node) => {
              tags.current[i] = node;
            }}
            className="sphere-tag"
            data-core={s.core ? '' : undefined}
          >
            {t(s.label)}
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {sphereSkills.map((s) => (
          <li key={s.label.en}>{t(s.label)}</li>
        ))}
      </ul>
    </div>
  );
}
