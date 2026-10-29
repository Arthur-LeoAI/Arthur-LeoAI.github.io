'use client';
/* oxlint-disable next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/content';
import { useLang } from './language';

const sources: Record<string, string | undefined> = {
  mcda: process.env.NEXT_PUBLIC_MCDA_PREVIEW_URL,
  drone: process.env.NEXT_PUBLIC_DRONE_PREVIEW_URL,
  motai: process.env.NEXT_PUBLIC_MOTAI_PREVIEW_URL,
  connoisseur: process.env.NEXT_PUBLIC_CONNOISSEUR_PREVIEW_URL,
};
export default function ProjectPreview({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  const { lang, t } = useLang();
  const say = (en: string, zh: string) => (lang === 'zh' ? zh : en);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const url = project.liveUrl ?? sources[project.id];
  const previewTitle = `${t(project.title)} ${say('interactive project preview', '交互项目预览')}`;
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(entry.contentRect.width / 1280),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  if (!url) {
    const image = (
      <img
        src={project.image.src}
        alt={t(project.image.caption)}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        decoding="async"
        className={full ? undefined : 'crop'}
      />
    );
    return (
      <>
        <div className="mat">
          <div className="mat-inner">
            {full ? image : <a href={`/work/${project.id}/`}>{image}</a>}
          </div>
        </div>
        {full && <p className="case-caption">{t(project.image.caption)}</p>}
      </>
    );
  }
  return (
    <div className="project-window" data-project={project.id}>
      <div className="project-window-bar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="window-title">{t(project.title)}</span>
        {url && (
          <a href={url} target="_blank" rel="noreferrer">
            {say('Open ↗', '新窗口 ↗')}
          </a>
        )}
        {active && (
          <button
            onClick={() => {
              setActive(false);
              setLoaded(false);
            }}
            aria-label={say('Stop project preview', '停止项目预览')}
          >
            ×
          </button>
        )}
      </div>
      <div className="project-window-viewport" ref={viewport}>
        {active && url ? (
          <>
            {!loaded && (
              <output className="preview-loading">
                {say('Opening project…', '正在打开项目…')}
              </output>
            )}
            <iframe
              src={url}
              title={previewTitle}
              onLoad={() => setLoaded(true)}
              style={{ transform: `scale(${scale})` }}
              allow="fullscreen"
              referrerPolicy="no-referrer"
            />
          </>
        ) : (
          <div className="preview-launch">
            <span className="preview-live-dot" />
            <h3>{t(project.title)}</h3>
            <p>
              {say(
                'Explore the actual running interface in this window.',
                '在此窗口中体验实际运行的项目界面。',
              )}
            </p>
            <button
              className="pill pill-accent"
              onClick={() => setActive(true)}
            >
              {say('Launch interactive preview ↗', '打开交互预览 ↗')}
            </button>
            <small>{say('Hosted project instance', '已部署的项目实例')}</small>
          </div>
        )}
      </div>
      <p className="project-window-note">
        {project.id === 'motai'
          ? say(
              'Local-first writing workspace. AI features require the app’s own runtime configuration.',
              '本地优先的写作工作台。AI 功能需要应用自身的运行环境配置。',
            )
          : project.id === 'drone'
            ? say(
                'Public telemetry demo with simulated data.',
                '使用模拟数据的公开遥测演示。',
              )
            : project.id === 'connoisseur'
              ? say(
                  'Live deployment of the Connoisseur sourcing service.',
                  'Connoisseur 采购服务的线上部署版本。',
                )
              : say(
                  'Synthetic decision data; no research findings.',
                  '使用合成决策数据，不代表科研结果。',
                )}
      </p>
    </div>
  );
}
