'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { skills, ui } from '@/lib/content';
import { useLang } from './language';

// Interactive 3D sphere of the confirmed skills, colour-coded by group.
// Drag to rotate, hover to pause, click a tag or a legend item to highlight its group.
const groupColors = ['#1f5c45', '#3b5b8c', '#8a5a2b', '#6b4c9a', '#9a4b3b'];

type Pt = { x: number; y: number; z: number };

export default function SkillsSphere() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLButtonElement | null)[]>([]);
  const items = useMemo(
    () =>
      skills[lang].flatMap(([, list], g) =>
        list.split(' · ').map((label) => ({ label, g })),
      ),
    [lang],
  );

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const n = items.length;
    // Even spread on the sphere (Fibonacci lattice).
    const pts: Pt[] = items.map((_, i) => {
      const y = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(a) * r, y, z: Math.sin(a) * r };
    });
    let vx = reduce ? 0 : 0.0016; // rotation around the X axis per ms
    let vy = reduce ? 0 : 0.0032; // rotation around the Y axis per ms
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
      const R = Math.min(w, h) * (w < 420 ? 0.34 : 0.44);
      pts.forEach((p, i) => {
        const tag = tags.current[i];
        if (!tag) return;
        const s = 1 / (1.6 - p.z * 0.6); // perspective: front tags larger
        const depth = (p.z + 1) / 2; // 0 = back, 1 = front
        const x = w / 2 + p.x * R * (0.8 + 0.2 * s);
        const y = h / 2 + p.y * R * (0.8 + 0.2 * s);
        tag.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.6 + depth * 0.45).toFixed(3)})`;
        tag.style.opacity = (0.12 + 0.88 * depth * depth).toFixed(3);
        tag.style.zIndex = String(Math.round((p.z + 1) * 100));
      });
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, now - last);
      last = now;
      if (!visible) return;
      if (!drag) {
        if (paused) {
          vx *= 0.9;
          vy *= 0.9;
        } else if (!reduce) {
          // Ease back to a gentle idle spin.
          vx += (0.0016 - vx) * 0.02;
          vy += (0.0032 - vy) * 0.02;
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
      vy = dx * 0.0006;
      vx = -dy * 0.0006;
      rotate(-dy * 0.008, dx * 0.008);
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
  }, [items]);

  const toggle = (g: number) => setActive((cur) => (cur === g ? null : g));
  return (
    <div className="sphere" data-reveal="0">
      <span className="label">{t(ui.sphere.kicker)}</span>
      <div className="sphere-stage" ref={stage}>
        {items.map((item, i) => (
          <button
            key={`${item.g}-${item.label}`}
            ref={(node) => {
              tags.current[i] = node;
            }}
            className="sphere-tag"
            data-dim={active !== null && active !== item.g ? '' : undefined}
            style={{ color: groupColors[item.g] }}
            onClick={() => toggle(item.g)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="sphere-legend">
        {skills[lang].map(([group], g) => (
          <li key={group}>
            <button
              aria-pressed={active === g}
              onClick={() => toggle(g)}
              style={{ color: groupColors[g] }}
            >
              <span className="sphere-dot" />
              {group}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
