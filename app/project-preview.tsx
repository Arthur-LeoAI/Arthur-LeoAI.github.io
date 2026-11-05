'use client';
/* oxlint-disable next/no-img-element */
import type { Project } from '@/lib/content';
import { useLang } from './language';

// Project image. Projects with a public deployment get a "Live site" badge on the image;
// the screenshot itself links to the case study (cards) or the live site (case page).
export default function ProjectPreview({
  project,
  full = false,
}: {
  project: Project;
  full?: boolean;
}) {
  const { lang, t } = useLang();
  const live = project.liveUrl;
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
  const href = full ? live : `/work/${project.id}/`;
  return (
    <>
      <div className="mat project-shot">
        <div className="mat-inner">
          {href ? (
            <a
              href={href}
              {...(full && live ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {image}
            </a>
          ) : (
            image
          )}
        </div>
        {live && (
          <a className="live-badge" href={live} target="_blank" rel="noreferrer">
            <span className="preview-live-dot" />
            {lang === 'zh' ? '在线访问 ↗' : 'Live site ↗'}
          </a>
        )}
      </div>
      {full && <p className="case-caption">{t(project.image.caption)}</p>}
    </>
  );
}
