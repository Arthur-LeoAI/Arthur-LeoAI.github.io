'use client';
import { Fragment, useState } from 'react';
// Static exports use native document navigation and pre-sized local images.
/* oxlint-disable next/no-html-link-for-pages, next/no-img-element */
import {
  profile,
  projects,
  experience,
  education,
  skills,
  ui,
  type Category,
  type Project,
  type Text,
} from '@/lib/content';
import HeroChart from './hero-chart';
import { useLang } from './language';
import { useSiteMotion } from './use-site-motion';

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
      <span>© {year} Jiaming Li</span>
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

function Home() {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  const [before, accent, after] = ui.heroTitle[lang];
  const titles = Object.fromEntries(projects.map((p) => [p.id, t(p.title)]));
  return (
    <>
      <Chrome t={t} />
      <div className="wrap">
        <header className="site-header">
          <a className="wordmark" href="#top">
            {lang === 'zh' ? '李嘉铭 Jiaming Li' : 'Jiaming Li'}
          </a>
          <nav aria-label="Main navigation">
            <a href="#experience">{t(ui.nav.experience)}</a>
            <a href="#work">{t(ui.nav.work)}</a>
            <a href="#about">{t(ui.nav.about)}</a>
            <a href="#contact">{t(ui.nav.contact)}</a>
          </nav>
          <div className="header-actions">
            <LangToggle />
            <a className="pill pill-ink" href="/resume/">
              {t(ui.resume)} ↓
            </a>
          </div>
        </header>
        <main id="main">
          <section id="top" className="hero">
            <HeroChart />
            <div>
              <div className="status" data-reveal="0">
                <span className="dot" />
                {t(ui.status)}
              </div>
              <h1 data-reveal="90" data-speed="-0.06">
                <span className="hero-title">
                  {before.split('\n').map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                  <em>{accent}</em>
                  {after}
                </span>
              </h1>
              <p className="hero-intro" data-reveal="200">
                {t(ui.heroIntro)}
              </p>
              <div className="hero-actions" data-reveal="300">
                <a className="pill pill-lg pill-accent" data-magnet="" href="#work">
                  {t(ui.seeWork)}
                </a>
                <a
                  className="pill pill-lg pill-outline"
                  data-magnet=""
                  href={`mailto:${profile.email}`}
                >
                  {profile.email}
                </a>
              </div>
            </div>
            <figure className="portrait" data-reveal="160">
              <div data-follow="-22">
                <img
                  data-speed="0.05"
                  src="/portrait.jpg"
                  alt={t(profile.name)}
                  width="540"
                  height="680"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </figure>
          </section>

          <section className="fact-strip" aria-label="Summary">
            {ui.facts.map((f, i) => (
              <div key={f.label.en} data-reveal={String([0, 90, 90, 180][i])}>
                <span className="label">{t(f.label)}</span>
                <span>{t(f.value)}</span>
              </div>
            ))}
          </section>

          <section id="experience" className="split section">
            <h2 className="h2" data-reveal="0">
              {t(ui.experienceTitle)}
            </h2>
            <div>
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
              {projects.map((p, i) => (
                <a
                  className="work-card"
                  key={p.id}
                  href={caseHref(p.id)}
                  data-reveal={String((i % 2) * 120)}
                >
                  <div className="mat" data-tilt="">
                    <div className="mat-inner">
                      <ProjectImage image={p.image} alt={t(p.image.caption)} crop />
                    </div>
                  </div>
                  <div className="meta">
                    <span>
                      {p.n} · {t(p.tag)}
                    </span>
                    <span>{t(p.status)}</span>
                  </div>
                  <h3>{t(p.title)} ↗</h3>
                  <p>{t(p.summary)}</p>
                  <span className="stack">{p.stack}</span>
                </a>
              ))}
            </div>
          </section>

          <section id="about" className="split section ruled">
            <h2 className="h2" data-reveal="0">
              {t(ui.aboutTitle)}
            </h2>
            <div className="about">
              <p className="about-lead">{t(ui.about)}</p>
              <div className="about-cols">
                <div>
                  <span className="label">{t(ui.educationLabel)}</span>
                  {education.map((e) => (
                    <div key={e.deg.en}>
                      <div className="strong">{t(e.deg)}</div>
                      <div className="sub">
                        {t(e.school)} · {t(e.note)}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="label">{t(ui.skillsLabel)}</span>
                  {skills[lang].map(([k, v]) => (
                    <div key={k}>
                      <div className="strong">{k}</div>
                      <div className="sub">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="contact ruled">
          <h2 data-reveal="0">{t(ui.contactTitle)}</h2>
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
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <Chrome t={t} />
      <div className="wrap">
        <header className="site-header">
          <a className="wordmark" href="/">
            {lang === 'zh' ? '李嘉铭 Jiaming Li' : 'Jiaming Li'}
          </a>
          <nav aria-label="Projects">
            {projects.map((x) => (
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
        <main id="main">
          <section className="case-hero">
            <div className="spot" data-spot="rgba(47,138,100,0.12)" />
            <a className="back" href={archive ? '/#projects' : '/#work'}>
              {t(ui.allProjects)}
            </a>
            <div className="case-tag" data-reveal="0">
              {p.n} · {t(p.tag)}
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
              <a
                className="pill pill-ink"
                data-magnet=""
                href={`${profile.github}/${p.repo}`}
              >
                {t(ui.viewSource)}
              </a>
            </div>
          </section>

          <figure className="case-feature" data-reveal="120">
            <div className="mat mat-lg" data-tilt="">
              <div className="mat-inner">
                <ProjectImage image={p.image} alt={t(p.image.caption)} eager />
              </div>
            </div>
          </figure>

          <section className="case-narrative">
            <div data-reveal="0">
              <div className="label">{t(ui.question)}</div>
              <p className="question">{t(p.problem)}</p>
            </div>
            <div className="case-detail">
              <div data-reveal="80">
                <h2>{t(ui.contribution)}</h2>
                <p>{t(p.contribution)}</p>
              </div>
              <div data-reveal="160">
                <h2>{t(ui.approach)}</h2>
                <p>{t(p.approach)}</p>
              </div>
              <ul className="facts" data-reveal="240">
                {p.facts[lang].map((f) => (
                  <li key={f}>
                    <span aria-hidden="true">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="case-gallery ruled">
            <h2 className="h2" data-reveal="0">
              {t(ui.walkthrough)}
            </h2>
            <div className="gallery-grid">
              {p.gallery.map((g, i) => (
                <figure key={g.src} data-reveal={String((i % 2) * 120)}>
                  <div className="mat" data-tilt="">
                    <div className="mat-inner">
                      <ProjectImage image={g} alt={t(g.caption)} />
                    </div>
                  </div>
                  <figcaption>{t(g.caption)}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="case-outcome ruled">
            <div data-reveal="0">
              <div className="label">{t(ui.today)}</div>
              <p>{t(p.outcome)}</p>
            </div>
            <div data-reveal="100">
              <div className="label">{t(ui.stack)}</div>
              <p>{p.stack}</p>
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

function Resume() {
  const { lang, t } = useLang();
  useSiteMotion(lang);
  const r = ui.resumePage;
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
              data-magnet=""
              href={profile.resumePdf}
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
              <span>{t(r.location)}</span>
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
              {projects.map((p) => (
                <a
                  className="resume-project"
                  key={p.id}
                  href={caseHref(p.id)}
                  data-reveal="0"
                >
                  <div className="strong">{t(p.title)} ↗</div>
                  <div className="sub">{t(p.summary)}</div>
                  <div className="stack">{p.stack}</div>
                </a>
              ))}
            </div>
          </section>

          <section className="resume-row">
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

          <section className="resume-row last">
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
  const list = projects.filter((p) => filter === 'All' || p.cat.includes(filter));
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
          <nav aria-label="Archive navigation">
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
                <legend className="sr-only">Filter projects</legend>
                {filters.map((f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {t(a.filters[f])}
                    <span>
                      {f === 'All'
                        ? projects.length
                        : projects.filter((p) => p.cat.includes(f)).length}
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
                    <ProjectImage image={p.image} alt={t(p.image.caption)} crop />
                  </div>
                  <div className="meta">
                    <span>
                      {p.n} · {t(p.tag)}
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
  view?: 'resume';
}) {
  const p = projects.find((x) => x.id === projectId);
  if (p) return <Case p={p} />;
  if (view === 'resume') return <Resume />;
  return archive ? <Archive /> : <Home />;
}
