'use client';
import { useEffect, useRef } from 'react';

// Scroll reveal, scroll progress, parallax, mouse follow, spotlight, card tilt and magnetic buttons.
// Elements opt in with data-reveal, data-progress, data-speed, data-follow, data-spot, data-tilt, data-magnet.
type Motion = { rescan: () => void; detach: () => void };

function attach(root: HTMLElement): Motion {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ease = 'cubic-bezier(.2,.7,.2,1)';
  const offs: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window | HTMLElement,
    type: K,
    fn: (e: WindowEventMap[K]) => void,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn as EventListener, opts);
    offs.push(() => target.removeEventListener(type, fn as EventListener, opts));
  };
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        el.style.opacity = '1';
        el.style.transform = 'none';
        io.unobserve(el);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  const scan = () => {
    root
      .querySelectorAll<HTMLElement>('[data-reveal]:not([data-seen])')
      .forEach((el) => {
        el.setAttribute('data-seen', '');
        if (reduce) return;
        const d = +(el.dataset.reveal || 0);
        el.style.opacity = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = `opacity .9s ${ease} ${d}ms, transform .9s ${ease} ${d}ms`;
        io.observe(el);
      });
  };
  scan();
  if (reduce) return { rescan: scan, detach: () => io.disconnect() };

  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const y = scrollY;
      const max = document.documentElement.scrollHeight - innerHeight;
      root.querySelectorAll<HTMLElement>('[data-progress]').forEach((el) => {
        el.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      });
      root.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
        if (y < innerHeight * 1.5)
          el.style.translate = `0 ${y * +(el.dataset.speed || 0)}px`;
      });
    });
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();
  on(root, 'pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    root.querySelectorAll<HTMLElement>('[data-follow]').forEach((el) => {
      const k = +(el.dataset.follow || 0);
      el.style.transition = `translate .6s ${ease}`;
      el.style.translate = `${x * k}px ${y * k}px`;
    });
    root.querySelectorAll<HTMLElement>('[data-spot]').forEach((el) => {
      const r = el.getBoundingClientRect();
      el.style.background = `radial-gradient(140px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, ${el.dataset.spot}, transparent 70%)`;
    });
    const card = (e.target as Element | null)?.closest?.('[data-tilt]');
    root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((c) => {
      const img = c.querySelector('img');
      if (c !== card) {
        c.style.transform = '';
        if (img) img.style.transform = '';
        return;
      }
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      c.style.transition = `transform .4s ${ease}`;
      c.style.transform = `perspective(1100px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg) translateY(-4px)`;
      if (img) {
        img.style.transition = `transform .6s ${ease}`;
        img.style.transform = `scale(1.04) translate(${-px * 8}px, ${-py * 8}px)`;
      }
    });
    root.querySelectorAll<HTMLElement>('[data-magnet]').forEach((b) => {
      const r = b.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < Math.max(r.width, r.height);
      b.style.transition = `translate .35s ${ease}`;
      b.style.translate = near ? `${dx * 0.18}px ${dy * 0.3}px` : '0 0';
    });
  });
  on(root, 'pointerleave', () =>
    root
      .querySelectorAll<HTMLElement>('[data-tilt],[data-tilt] img')
      .forEach((c) => {
        c.style.transform = '';
      }),
  );
  return {
    rescan: scan,
    detach: () => {
      io.disconnect();
      offs.forEach((f) => f());
      cancelAnimationFrame(raf);
    },
  };
}

/** Attaches the motion layer once; rescans for new [data-reveal] nodes whenever `key` changes. */
export function useSiteMotion(key: unknown) {
  const motion = useRef<Motion | null>(null);
  useEffect(() => {
    motion.current = attach(document.body);
    return () => {
      motion.current?.detach();
      motion.current = null;
    };
  }, []);
  useEffect(() => {
    motion.current?.rescan();
  }, [key]);
}
