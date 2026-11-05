'use client';
/* oxlint-disable next/no-img-element */
import { skillList, ui } from '@/lib/content';
import { useLang } from './language';

// Beside Experience: Van Gogh's Sunflowers (1888, National Gallery, London; public domain,
// from Wikimedia Commons), with the skills listed once underneath.
export default function SkillPainting() {
  const { t } = useLang();
  const core = skillList.filter((s) => s.core);
  const more = skillList.filter((s) => !s.core);
  return (
    <figure className="skill-painting" data-reveal="0">
      <span className="label">{t(ui.skillArt.kicker)}</span>
      <div className="painting">
        <img
          src="/art/van-gogh-sunflowers.jpg"
          alt={t(ui.skillArt.alt)}
          width={960}
          height={1211}
          loading="lazy"
          decoding="async"
        />
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
