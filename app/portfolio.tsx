'use client';
import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
// Static exports use native document navigation and pre-sized local images.
/* oxlint-disable next/no-html-link-for-pages, next/no-img-element */
import {
  profile,
  published,
  byTier,
  projectNumber,
  experience,
  education,
  skills,
  ui,
  location,
  type Category,
  type Project,
  type Text,
} from '@/lib/content';
import HeroFlow from './hero-flow';
import MarketLens from './market-lens';
import ProjectPreview from './project-preview';
import ProcessMap from './process-map';
import { useLang } from './language';
import { useSiteMotion } from './use-site-motion';

const AiLab = lazy(() => import('./transformer-lab'));
const archive = process.env.NEXT_PUBLIC_EDITION === 'archive';
const caseHref = (id: string) => `/work/${id}/`;
const year = 2026;
type T = (text: Text) => string;

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <fieldset className="lang-toggle">
      <legend className="sr-only">Language / 语言</legend>
      <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        EN
      </button>
      <button aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>
        中文
      </button>
    </fieldset>
  );
}

function Chrome({ t, wide = true }: { t: T; wide?: boolean }) {
  return (
    <>
      <a className="skip" href="#main">
        {t(ui.skip)}
      </a>
      {wide && <div className="progress" data-progress="" />}
    </>
  );
}

function SiteFooterLinks({ t, email = false }: { t: T; email?: boolean }) {
  return (
    <div className="footer-bottom">
      <span>
        © {year} Jiaming Li · {t(location)}
      </span>
      <div>
        {email ? (
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        ) : (
          <a href="/resume/">{t(ui.resume)}</a>
        )}
        <a href={profile.linkedin}>LinkedIn ↗</a>
        <a href={profile.github}>GitHub ↗</a>
      </div>
    </div>
  );
}

function ProjectImage({
  image,
  alt,
  crop = false,
  eager = false,
}: {
  image: Project['image'];
  alt: string;
  crop?: boolean;
  eager?: boolean;
}) {
  return (
    <img
      className={crop ? 'crop' : undefined}
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  );
}

const withBreaks = (text: string) =>
  text.split('\n').map((line, i) => (
    <Fragment key={`${i}-${line}`}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));

function Home() {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  const [before, accent, after] = ui.heroTitle[lang];
  const titles = Object.fromEntries(published.map((p) => [p.id, t(p.title)]));
  return (
    <>
      <Chrome t={t} />
      <div className="wrap">
        <header className="site-header">
          <a className="wordmark" href="#top">
            {lang === 'zh' ? '李嘉铭 Jiaming Li' : 'Jiaming Li'}
          </a>
          <nav aria-label={t(ui.navigation)}>
            <a href="#experience">{t(ui.nav.experience)}</a>
            <a href="#work">{t(ui.nav.work)}</a>
            <a href="#approach">{t(ui.nav.approach)}</a>
            <a href="#skills">{t(ui.nav.skills)}</a>
            <a href="#contact">{t(ui.nav.contact)}</a>
          </nav>
          <div className="header-actions">
            <LangToggle />
            <a className="pill pill-ink" href="/resume/">
              {t(ui.resume)} ↓
            </a>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <section id="top" className="hero">
            <HeroFlow />
            <div className="status" data-reveal="0">
              <span className="dot" />
              {t(ui.status)}
            </div>
            <div className="hero-copy">
              <h1 data-reveal="90">
                <span className="hero-title">
                  {withBreaks(before)}
                  <em>
                    {lang === 'en'
                      ? accent.split(' ').map((word, i) => (
                          <Fragment key={word}>
                            {i > 0 && ' '}
                            <span className="hero-word">{word}</span>
                          </Fragment>
                        ))
                      : accent}
                  </em>
                  {withBreaks(after)}
                </span>
              </h1>
              <p className="hero-sub" data-reveal="170">
                {t(ui.heroSub)}
              </p>
              <p className="hero-targets" data-reveal="200">
                <strong>{t(ui.targetLabel)}</strong> {t(ui.targetRoles)}
              </p>
              <div className="hero-actions" data-reveal="240">
                <a className="pill pill-lg pill-accent" href="#work">
                  {t(ui.seeWork)}
                </a>
                <a className="pill pill-lg pill-outline" href="/resume/">
                  {t(ui.readResume)}
                </a>
              </div>
              <p className="hero-links" data-reveal="280">
                <a href={profile.linkedin}>{t(ui.heroLinks.linkedin)}</a>
                <a href={profile.github}>{t(ui.heroLinks.github)}</a>
              </p>
            </div>
            <p className="hero-hint" aria-hidden="true">
              <span className="hint-pointer">{t(ui.heroHint)}</span>
              <span className="hint-touch">{t(ui.heroHintTouch)}</span>
            </p>
          </section>

          <dl className="fact-strip" aria-label={t(ui.summaryLabel)}>
            {ui.facts.map((f, i) => (
              <div key={f.label.en} data-reveal={String([0, 90, 90, 180][i])}>
                <dt className="label">{t(f.label)}</dt>
                <dd>{t(f.value)}</dd>
              </div>
            ))}
          </dl>

          <section id="about" className="section">
            <div className="split about-profile">
              <figure className="portrait" data-reveal="0">
                <div>
                  <img
                    src="/portrait.jpg"
                    alt={t(profile.name)}
                    width="540"
                    height="680"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <div className="about-intro" data-reveal="80">
                <h2 className="h2">{t(ui.aboutTitle)}</h2>
                <p className="about-lead">{t(ui.heroIntro)}</p>
                <p className="about-lead">{t(ui.about)}</p>
                <a className="related" href={profile.linkedin}>
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="strengths-head">
              <h3>{t(ui.bringTitle)}</h3>
              <p>{t(ui.aboutHello)}</p>
            </div>
            <div className="strengths-grid">
              {ui.strengths.map((item, i) => (
                <article key={item.title.en} data-reveal={String(i * 80)}>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <a className="related" href={item.href}>
                    {t(item.link)}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="split section ruled">
            <aside className="lens-col">
              <MarketLens />
            </aside>
            <div>
              <h2 className="h2 exp-title" data-reveal="0">
                {t(ui.experienceTitle)}
              </h2>
              {experience.map((x) => (
                <article className="exp-row" key={x.role.en} data-reveal="0">
                  <span className="exp-date">{t(x.date)}</span>
                  <div>
                    <h3>{t(x.role)}</h3>
                    <div className="org">{t(x.org)}</div>
                    <ul>
                      {x.points[lang].map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                    <ul className="tool-tags" aria-label={t(ui.skillsLabel)}>
                      {x.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                    {x.project && (
                      <a className="related" href={caseHref(x.project)}>
                        {t(ui.relatedProject)}
                        {titles[x.project]} →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="section ruled">
            <div className="work-head">
              <h2 className="h2" data-reveal="0">
                {t(ui.workTitle)}
              </h2>
              <p>{t(ui.workIntro)}</p>
            </div>
            <div className="work-grid">
              {byTier('featured').map((p, i) => (
                <article
                  className="work-card"
                  key={p.id}
                  data-reveal={String((i % 2) * 120)}
                >
                  <ProjectPreview project={p} />
                  <div className="meta">
                    <span>
                      {projectNumber(p)} · {t(p.tag)}
                    </span>
                    <span>{t(p.status)}</span>
                  </div>
                  <h3>
                    <a href={caseHref(p.id)}>{t(p.title)} ↗</a>
                  </h3>
                  <p>{t(p.summary)}</p>
                  <dl className="card-constraint">
                    <dt>{t(ui.caseSteps.constraints)}</dt>
                    <dd>{t(p.constraints)}</dd>
                  </dl>
                  <span className="stack">{p.stack}</span>
                  <p className="card-links">
                    <a href={caseHref(p.id)}>{t(ui.caseLinks.caseStudy)}</a>
                    <a href={`${profile.github}/${p.repo}`}>
                      {t(ui.caseLinks.code)}
                    </a>
                  </p>
                </article>
              ))}
            </div>

            <div className="supporting">
              <span className="label">{t(ui.supportingTitle)}</span>
              {byTier('supporting').map((p) => (
                <article className="supporting-card" key={p.id} data-reveal="0">
                  <ProjectPreview project={p} />
                  <div>
                    <div className="meta">
                      <span>
                        {projectNumber(p)} · {t(p.tag)}
                      </span>
                      <span>{t(p.status)}</span>
                    </div>
                    <h3>
                      <a href={caseHref(p.id)}>{t(p.title)} ↗</a>
                    </h3>
                    <p>{t(p.summary)}</p>
                    <span className="stack">{p.stack}</span>
                    <p className="card-links">
                      <a href={caseHref(p.id)}>{t(ui.caseLinks.caseStudy)}</a>
                      <a href={`${profile.github}/${p.repo}`}>
                        {t(ui.caseLinks.code)}
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="approach" className="section ruled">
            <div className="work-head">
              <h2 className="h2" data-reveal="0">
                {t(ui.approach.title)}
              </h2>
              <p>{t(ui.approach.intro)}</p>
            </div>
            <ol className="approach-steps">
              {ui.approach.steps.map((step, i) => (
                <li key={step.title.en} data-reveal={String((i % 3) * 80)}>
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{t(step.title)}</h3>
                  <p>{t(step.body)}</p>
                  {step.href && (
                    <a className="related" href={step.href}>
                      {t(step.link)} →
                    </a>
                  )}
                </li>
              ))}
            </ol>
            <ProcessMap />
          </section>

          <section id="skills" className="section ruled">
            <div className="split">
              <h2 className="h2" data-reveal="0">
                {t(ui.skillsLabel)}
              </h2>
              <div>
                <p className="section-intro">{t(ui.skillsIntro)}</p>
                <dl className="skills-list">
                  {skills[lang].map(([k, v]) => (
                    <div key={k} data-reveal="0">
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <a className="lab-teaser" href="/lab/" data-reveal="0">
              <span className="label">{t(ui.lab.teaserTitle)}</span>
              <span>{t(ui.lab.teaserBody)}</span>
              <strong>{t(ui.lab.teaserLink)}</strong>
            </a>
          </section>

          <section id="education" className="split section ruled">
            <h2 className="h2" data-reveal="0">
              {t(ui.educationLabel)}
            </h2>
            <div className="education-list">
              {education.map((e) => (
                <article key={e.deg.en} data-reveal="0">
                  <span className="label">{t(e.date)}</span>
                  <h3>{t(e.deg)}</h3>
                  <p>{t(e.school)}</p>
                  <p className="sub">{t(e.note)}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer id="contact" className="contact ruled">
          <h2 data-reveal="0">{t(ui.contactTitle)}</h2>
          <p className="contact-intro">{t(ui.contactIntro)}</p>
          <div className="contact-actions">
            <a className="pill pill-accent" href="/resume/">
              {t(ui.readResume)}
            </a>
            <a
              className="pill pill-outline"
              href={lang === 'zh' ? profile.resumePdfZh : profile.resumePdf}
              download
            >
              {t(ui.resumePage.download)}
            </a>
          </div>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email} ↗
          </a>
          <SiteFooterLinks t={t} />
        </footer>
      </div>
    </>
  );
}

function Case({ p }: { p: Project }) {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  const next = published[(published.indexOf(p) + 1) % published.length];
  const steps = (
    [
      'problem',
      'constraints',
      'contribution',
      'built',
      'result',
      'limitations',
      'next',
    ] as const
  ).map((k) => ({ k, label: ui.caseSteps[k], body: p[k] }));
  return (
    <>
      <Chrome t={t} />
      <div className="wrap">
        <header className="site-header">
          <a className="wordmark" href="/">
            {lang === 'zh' ? '李嘉铭 Jiaming Li' : 'Jiaming Li'}
          </a>
          <nav aria-label={t(ui.projectNavigation)}>
            {published.map((x) => (
              <a
                key={x.id}
                href={caseHref(x.id)}
                aria-current={x.id === p.id ? 'page' : undefined}
              >
                {t(x.title)}
              </a>
            ))}
          </nav>
          <LangToggle />
        </header>
        <main id="main" tabIndex={-1}>
          <section className="case-hero">
            <div className="spot" data-spot="rgba(47,138,100,0.12)" />
            <a className="back" href={archive ? '/#projects' : '/#work'}>
              {t(ui.allProjects)}
            </a>
            <div className="case-tag" data-reveal="0">
              {projectNumber(p)} · {t(p.tag)}
            </div>
            <h1 data-reveal="80">
              {t(p.title)}
              <span className="accent">.</span>
            </h1>
            <p className="case-subtitle" data-reveal="160">
              {t(p.subtitle)}
            </p>
            <div className="case-pills" data-reveal="240">
              <span className="pill pill-outline-soft">{t(p.ctx)}</span>
              <span className="pill pill-outline-soft">{t(p.status)}</span>
              <a className="pill pill-ink" href={`${profile.github}/${p.repo}`}>
                {t(ui.viewSource)}
              </a>
            </div>
          </section>

          <figure className="case-feature" data-reveal="120">
            <ProjectPreview project={p} full />
          </figure>

          <ol className="case-steps">
            {steps.map((s, i) => (
              <li key={s.k} className={`case-step step-${s.k}`} data-reveal="0">
                <div className="step-label">
                  <span className="step-n">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2>{t(s.label)}</h2>
                </div>
                <div className="step-body">
                  <p>{t(s.body)}</p>
                  {s.k === 'built' && p.facts[lang].length > 0 && (
                    <ul className="facts">
                      {p.facts[lang].map((f) => (
                        <li key={f}>
                          <span aria-hidden="true">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <section className="case-gallery ruled">
            <h2 className="h2" data-reveal="0">
              {t(ui.walkthrough)}
            </h2>
            <div className="gallery-grid">
              {p.gallery.map((g, i) => (
                <figure key={g.src} data-reveal={String((i % 2) * 120)}>
                  <div className="mat" data-tilt="">
                    <div className="mat-inner">
                      <ProjectImage image={g} alt={t(g.caption)} crop />
                    </div>
                  </div>
                  <figcaption>{t(g.caption)}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="case-outcome ruled">
            <div data-reveal="0">
              <h2 className="label">{t(ui.stack)}</h2>
              <p>{p.stack}</p>
            </div>
            <div data-reveal="0">
              <h2 className="label">{t(ui.evidenceLabel)}</h2>
              <p>{t(p.evidence)}</p>
              <a
                className="related"
                href={profile.github + '/' + p.repo + '/' + p.evidencePath}
              >
                {t(ui.evidenceLink)}
              </a>
            </div>
          </section>

          <a className="next-project" href={caseHref(next.id)} data-reveal="0">
            <div>
              <div className="next-label">{t(ui.nextProject)}</div>
              <div className="next-title">{t(next.title)}</div>
            </div>
            <span aria-hidden="true">→</span>
          </a>
        </main>
        <footer className="case-footer">
          <SiteFooterLinks t={t} email />
        </footer>
      </div>
    </>
  );
}

function Lab() {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  return (
    <>
      <Chrome t={t} />
      <div className="wrap">
        <header className="site-header">
          <a className="wordmark" href="/">
            {t(ui.lab.back)}
          </a>
          <LangToggle />
        </header>
        <main id="main" tabIndex={-1} className="lab-page">
          <div className="ai-copy">
            <h1 className="h2">{t(ui.ai.title)}</h1>
            <p className="ai-lead">{t(ui.ai.lead)}</p>
          </div>
          <Suspense fallback={<p>{t(ui.ai.lead)}</p>}>
            <AiLab />
          </Suspense>
        </main>
        <footer className="case-footer">
          <SiteFooterLinks t={t} email />
        </footer>
      </div>
    </>
  );
}

function Resume() {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  const r = ui.resumePage;
  useEffect(() => {
    // PDFs printed from a local preview must link to the public portfolio.
    const originals = new Map<HTMLAnchorElement, string>();
    const beforePrint = () => {
      document
        .querySelectorAll<HTMLAnchorElement>('.resume a[href^="/"]')
        .forEach((a) => {
          const href = a.getAttribute('href');
          if (!href) return;
          originals.set(a, href);
          a.href = new URL(href, profile.archive).href;
        });
    };
    const afterPrint = () => {
      originals.forEach((href, a) => a.setAttribute('href', href));
      originals.clear();
    };
    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);
    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
      afterPrint();
    };
  }, []);
  return (
    <>
      <Chrome t={t} />
      <div className="wrap wrap-narrow">
        <header className="site-header">
          <a className="wordmark" href="/">
            {t(r.back)}
          </a>
          <div className="header-actions">
            <LangToggle />
            <a
              className="pill pill-accent"
              href={lang === 'zh' ? profile.resumePdfZh : profile.resumePdf}
              download
            >
              {t(r.download)}
            </a>
          </div>
        </header>
        <main id="main" className="resume">
          <section className="resume-head">
            <h1 data-reveal="0">
              {lang === 'zh' ? '李嘉铭 Jiaming Li' : 'Jiaming Li'}
            </h1>
            <p className="headline" data-reveal="100">
              {t(r.headline)}
            </p>
            <p className="summary" data-reveal="180">
              {t(r.summary)}
            </p>
            <div className="contact-row" data-reveal="240">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.linkedin}>LinkedIn ↗</a>
              <a href={profile.github}>GitHub ↗</a>
              <span>{t(location)}</span>
            </div>
          </section>

          <section className="resume-row">
            <h2 data-reveal="0">{t(r.experience)}</h2>
            <div className="stack-28">
              {experience.map((x) => (
                <div key={x.role.en} data-reveal="0">
                  <div className="row-head">
                    <h3>{t(x.role)}</h3>
                    <span>{t(x.date)}</span>
                  </div>
                  <div className="sub">{t(x.org)}</div>
                  <ul>
                    {x.points[lang].map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="resume-row">
            <h2 data-reveal="0">{t(r.projects)}</h2>
            <div className="stack-18">
              {published.map((p) => (
                <a
                  className="resume-project"
                  key={p.id}
                  href={caseHref(p.id)}
                  data-reveal="0"
                >
                  <div className="strong">
                    {t(p.title)} ↗{' '}
                    <span className="project-status">{t(p.status)}</span>
                  </div>
                  <div className="sub">{t(p.summary)}</div>
                  <div className="stack">{p.stack}</div>
                </a>
              ))}
            </div>
          </section>

          <section className="resume-row">
            <h2 data-reveal="0">{t(r.skills)}</h2>
            <div className="stack-12">
              {skills[lang].map(([k, v]) => (
                <div className="kv" key={k} data-reveal="0">
                  <strong>{k}</strong>
                  <span>{v}</span>
                </div>
              ))}
              <div className="kv" data-reveal="0">
                <strong>{t(r.languages)}</strong>
                <span>{t(r.languagesValue)}</span>
              </div>
            </div>
          </section>

          <section className="resume-row last">
            <h2 data-reveal="0">{t(r.education)}</h2>
            <div className="stack-20">
              {education.map((e) => (
                <div key={e.deg.en} data-reveal="0">
                  <div className="row-head">
                    <h3>{t(e.deg)}</h3>
                    <span>{t(e.date)}</span>
                  </div>
                  <div className="sub">
                    {t(e.school)} · {t(e.note)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

const filters: ('All' | Category)[] = ['All', 'Data', 'AI', 'Product'];
function Archive() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  useSiteMotion(`${lang}-${filter}`);
  const a = ui.archive;
  const list = published.filter(
    (p) => filter === 'All' || p.cat.includes(filter),
  );
  return (
    <>
      <Chrome t={t} wide={false} />
      <div className="archive">
        <aside className="archive-sidebar">
          <div>
            <a className="archive-name" href="/">
              {t(profile.name)}
            </a>
            <p>{t(a.tagline)}</p>
          </div>
          <nav aria-label={t(ui.archiveNavigation)}>
            {a.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {t(n.label)}
              </a>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <span className="open">
              <span className="dot" />
              {t(a.open)}
            </span>
            <span className="sidebar-location">{t(location)}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github}>GitHub ↗</a>
            <LangToggle />
          </div>
        </aside>
        <main id="main" className="archive-main">
          <section id="projects">
            <div className="archive-head">
              <h1 data-reveal="0">{t(a.title)}</h1>
              <fieldset className="filters">
                <legend className="sr-only">{t(ui.filterLabel)}</legend>
                {filters.map((f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {t(a.filters[f])}
                    <span>
                      {f === 'All'
                        ? published.length
                        : published.filter((p) => p.cat.includes(f)).length}
                    </span>
                  </button>
                ))}
              </fieldset>
            </div>
            <div className="archive-grid">
              {list.map((p, i) => (
                <a
                  className="archive-card"
                  key={p.id}
                  href={caseHref(p.id)}
                  data-reveal={String((i % 3) * 90)}
                >
                  <div className="archive-thumb" data-tilt="">
                    <ProjectImage
                      image={p.image}
                      alt={t(p.image.caption)}
                      crop
                    />
                  </div>
                  <div className="meta">
                    <span>
                      {projectNumber(p)} · {t(p.tag)}
                    </span>
                    <span>{t(p.status)}</span>
                  </div>
                  <h2>{t(p.title)}</h2>
                  <p>{t(p.summary)}</p>
                  <span className="stack">{p.stack}</span>
                </a>
              ))}
            </div>
          </section>
          <section id="experience" className="archive-exp">
            <h2 data-reveal="0">{t(ui.experienceTitle)}</h2>
            {experience.map((x) => (
              <div className="archive-exp-row" key={x.role.en} data-reveal="0">
                <span>{t(x.date)}</span>
                <div>
                  <div className="strong">{t(x.role)}</div>
                  <div className="sub">{t(x.org)}</div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export function NotFoundView() {
  const { t } = useLang();
  return (
    <main className="not-found">
      <p className="label">{t(ui.notFound.label)}</p>
      <h1>{t(ui.notFound.title)}</h1>
      <a href="/">{t(ui.notFound.back)}</a>
    </main>
  );
}

export default function Portfolio({
  projectId,
  view,
}: {
  projectId?: string;
  view?: 'resume' | 'lab';
}) {
  const p = published.find((x) => x.id === projectId);
  if (p) return <Case p={p} />;
  if (view === 'resume') return <Resume />;
  if (view === 'lab') return <Lab />;
  return archive ? <Archive /> : <Home />;
}
