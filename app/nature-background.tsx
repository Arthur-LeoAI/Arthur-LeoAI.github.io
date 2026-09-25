'use client';
/* oxlint-disable next/no-img-element -- pre-sized optimized local static asset */
import { useEffect, useRef, useState } from 'react';

const preferenceKey = 'portfolio-background-motion';
export default function NatureBackground() {
  const video = useRef<HTMLVideoElement>(null);
  const wanted = useRef(false);
  const visible = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = video.current!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(preferenceKey);
    } catch {
      /* Storage is optional. */
    }
    wanted.current =
      stored !== 'paused' && !reduced.matches && !connection?.saveData;
    let ready = false;
    const sync = () => {
      if (!ready) return;
      if (!wanted.current || !visible.current || document.hidden) {
        el.pause();
        return;
      }
      if (!el.getAttribute('src')) {
        el.src = matchMedia('(max-width: 800px)').matches
          ? '/media/alpine-mobile.mp4'
          : '/media/alpine-desktop.mp4';
      }
      void el.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    const changed = () => {
      if (reduced.matches) wanted.current = false;
      sync();
    };
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', changed);
    const timer = window.setTimeout(() => {
      ready = true;
      sync();
    }, 900);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', changed);
      el.pause();
    };
  }, []);
  function toggle() {
    const el = video.current!;
    wanted.current = !playing;
    try {
      localStorage.setItem(
        preferenceKey,
        wanted.current ? 'playing' : 'paused',
      );
    } catch {
      /* Storage is optional. */
    }
    if (!wanted.current) {
      el.pause();
      return;
    }
    setFailed(false);
    if (!el.getAttribute('src'))
      el.src = matchMedia('(max-width: 800px)').matches
        ? '/media/alpine-mobile.mp4'
        : '/media/alpine-desktop.mp4';
    if (el.error) el.load();
    void el.play().catch(() => {
      setPlaying(false);
      setFailed(true);
    });
  }
  return (
    <>
      <div className="nature-background" aria-hidden="true">
        <img
          src="/media/alpine-poster.webp"
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
        />
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster="/media/alpine-poster.webp"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
      </div>
      <div className="landscape-controls">
        <a
          href="https://www.pexels.com/video/time-lapse-of-moving-clouds-over-snow-capped-mountains-12175235/"
          target="_blank"
          rel="noreferrer"
        >
          Alpine reflections · Giuseppe Paoletti ↗
        </a>
        <button onClick={toggle} aria-pressed={playing}>
          {playing ? 'Ⅱ Pause background' : '▷ Play background'}
        </button>
        {failed && (
          <output>Showing a still image. You can retry playback.</output>
        )}
      </div>
    </>
  );
}
