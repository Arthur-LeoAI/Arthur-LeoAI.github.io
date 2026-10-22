'use client';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { Lang, Text } from '@/lib/content';

// Shared across pages through localStorage; static HTML always renders English first.
const key = 'jl-site-lang';
const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current) return current;
  try {
    current = localStorage.getItem(key) === 'zh' ? 'zh' : 'en';
  } catch {
    current = 'en';
  }
  return current;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== key) return;
    current = e.newValue === 'zh' ? 'zh' : 'en';
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}
export function setLang(lang: Lang) {
  current = lang;
  try {
    localStorage.setItem(key, lang);
  } catch {
    // Private mode: keep the choice for this page only.
  }
  listeners.forEach((f) => f());
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, read, () => 'en' as Lang);
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);
  const t = useCallback((text: Text) => text[lang], [lang]);
  return { lang, t, setLang };
}
