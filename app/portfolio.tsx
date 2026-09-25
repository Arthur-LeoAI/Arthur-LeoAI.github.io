'use client';
import { useEffect, useRef, useState } from 'react';
// Static exports use native document navigation and pre-sized local images.
/* oxlint-disable next/no-html-link-for-pages, next/no-img-element */
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  Code2 as Github,
  Plus,
  Check,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import NatureBackground from './nature-background';
import './v2.css';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { profile, projects, experience, certificates } from '@/lib/content';

const archive = process.env.NEXT_PUBLIC_EDITION === 'archive';
const options = [
  { name: 'Alternative A', values: [90, 35, 55] },
  { name: 'Alternative B', values: [50, 90, 60] },
  { name: 'Alternative C', values: [65, 55, 95] },
  { name: 'Alternative D', values: [75, 70, 50] },
  { name: 'Alternative E', values: [45, 80, 85] },
];
export function DecisionLab() {
  const [weights, setWeights] = useState([50, 30, 20]);
  const sum = weights.reduce((a, b) => a + b, 0);
  const ranked = options
    .map((x) => ({
      ...x,
      score: sum
        ? x.values.reduce((v, n, i) => v + n * weights[i], 0) / sum
        : 0,
    }))
    .sort((a, b) => b.score - a.score);
  return (
    <div className="decision-lab">
      <div className="lab-top">
        <span className="micro">DECISION EXPLORER</span>
        <span className="live-dot">Interactive</span>
      </div>
      <h3>What matters most?</h3>
      <p>Change the priorities. Watch the decision shift.</p>
      <div className="ranking" aria-label="Weighted alternative scores">
        {ranked.map((x, i) => (
          <div className="rank" key={x.name}>
            <div>
              <span>
                {String(i + 1).padStart(2, '0')} / {x.name}
              </span>
              <strong>{x.score.toFixed(1)}</strong>
            </div>
            <div className="track">
              <span style={{ width: `${x.score}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="sliders">
        {['Environmental', 'Economic', 'Technical'].map((label, i) => (
          <div className="weight" key={label}>
            <label id={`weight-${i}`}>
              {label}
              <span>{weights[i]}</span>
            </label>
            <Slider
              aria-labelledby={`weight-${i}`}
              value={[weights[i]]}
              min={0}
              max={100}
              step={5}
              onValueChange={(v) =>
                setWeights((old) =>
                  old.map((w, j) =>
                    j === i ? (Array.isArray(v) ? v[0] : v) : w,
                  ),
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="lab-bottom">
        <span>Synthetic data · weighted-sum model</span>
        <button onClick={() => setWeights([50, 30, 20])}>Reset ↺</button>
      </div>
      <p className="sr-only" aria-live="polite">
        {sum
          ? `${ranked[0].name} leads with ${ranked[0].score.toFixed(1)} points.`
          : 'Set at least one weight above zero.'}
      </p>
      {sum === 0 && (
        <p>Set at least one weight above zero to compare alternatives.</p>
      )}
    </div>
  );
}
type ProjectImageData = (typeof projects)[number]['featuredImage'];
function Gallery({ images }: { images: ProjectImageData[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const step = (direction: number) =>
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + images.length) % images.length,
    );
  return (
    <>
      <div className="project-gallery">
        {images.map((image, index) => (
          <div key={image.src}>
            <button
              className="image-open"
              aria-label={`Enlarge screenshot ${index + 1}: ${image.alt}`}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(index);
              }}
            >
              <ProjectImage image={image} />
              <span className="image-hint">View full size ↗</span>
            </button>
          </div>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="image-dialog"
          finalFocus={trigger}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              step(1);
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              step(-1);
            }
          }}
        >
          <DialogTitle>
            Interface walkthrough · {(selected ?? 0) + 1} / {images.length}
          </DialogTitle>
          {selected !== null && (
            <>
              <img
                src={images[selected].src}
                alt={images[selected].alt}
                width={images[selected].width}
                height={images[selected].height}
              />
              <DialogDescription>{images[selected].caption}</DialogDescription>
            </>
          )}
          <div className="gallery-controls">
            <button onClick={() => step(-1)}>← Previous</button>
            <button onClick={() => step(1)}>Next →</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
function Credentials() {
  if (!certificates.length) return null;
  const cards = (items: typeof certificates) =>
    items.map((item) => (
      <article className="credential-card" key={item.name}>
        <span className="micro">
          {item.issuer} · {item.date}
        </span>
        <h3>{item.name}</h3>
        {item.url && (
          <a href={item.url} target="_blank" rel="noreferrer">
            Verify credential ↗
          </a>
        )}
      </article>
    ));
  return (
    <section className="section credentials" id="credentials">
      <div className="section-heading">
        <span className="micro">04 / CONTINUED LEARNING</span>
        <h2>Learning, applied.</h2>
      </div>
      <div className="credential-grid">{cards(certificates.slice(0, 4))}</div>
      {certificates.length > 4 && (
        <details>
          <summary>More credentials</summary>
          {cards(certificates.slice(4))}
        </details>
      )}
    </section>
  );
}
function ProjectImage({
  image,
  eager = false,
  compact = false,
}: {
  image: ProjectImageData;
  eager?: boolean;
  compact?: boolean;
}) {
  return (
    <figure className={compact ? 'project-image compact' : 'project-image'}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}
function Header() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="/">
          JL<span>JIAMING LI</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/#about">About</a>
          <a href="/#experience">Experience</a>
          <a href="/#work">Work</a>
          <a href="/#contact">
            Contact <ArrowUpRight size={14} />
          </a>
        </nav>
        <a className="resume-link" href="/jiaming-li-resume.pdf" download>
          Résumé <ArrowDown size={14} />
        </a>
      </header>
    </>
  );
}
function Footer() {
  return (
    <footer id="contact">
      <div className="micro">HAVE A PROBLEM WORTH EXPLORING?</div>
      <h2>
        Let’s make
        <br />
        <span>something clear.</span>
      </h2>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
        <ArrowUpRight />
      </a>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Jiaming Li</span>
        <div>
          <a href="/jiaming-li-resume.pdf" download>
            Résumé ↓
          </a>
          <a href={profile.linkedin}>LinkedIn ↗</a>
          <a href={profile.github}>GitHub ↗</a>
          <a href={archive ? profile.story : profile.archive}>
            {archive ? 'Explore the story' : 'Explore the archive'} ↗
          </a>
        </div>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
function About() {
  return (
    <section className="about-section section profile-first" id="about">
      <div className="profile-landscape">
        <NatureBackground />
        <div className="profile-heading">
          <span className="micro accent">01 / MEET JIAMING</span>
          <h1>
            Jiaming Li<span className="accent">.</span>
          </h1>
          <p className="profile-role">Data Analyst / Business Data Analyst</p>
        </div>
        <div className="about-grid">
          <div className="portrait-wrap">
            <img
              src="/portrait.jpg"
              alt="Jiaming Li"
              width="540"
              height="680"
              loading="eager"
              fetchPriority="high"
            />
            <span className="portrait-label">JIAMING LI</span>
          </div>
          <div className="about-copy">
            <div className="profile-actions">
              <a className="primary-button" href="#work">
                Explore my work <ArrowDown size={18} />
              </a>
              <a className="text-link" href={`mailto:${profile.email}`}>
                Contact me <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="/jiaming-li-resume.pdf" download>
                Résumé ↓
              </a>
            </div>
            <p className="large-copy">
              I like understanding why things work the way they do. Then finding
              a way to make them work better.
            </p>
            <p>
              My background brings together applied mathematics, interactive
              media and European e-commerce. I connect analytical thinking with
              useful, tangible tools.
            </p>
            <p>
              Having studied in Ireland, I value collaborative, international
              environments. I’m based in China and open to relocation, with
              Ireland as my preferred destination. Employer sponsorship would be
              required.
            </p>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <div className="education">
          <span className="micro">EDUCATION</span>
          <strong>MSc Computer Science (Interactive Media)</strong>
          <span>University College Cork · 2024–2026</span>
          <strong>BSc Applied Mathematics</strong>
          <span>Taiyuan University of Science and Technology · 2020–2024</span>
        </div>
        <div className="skills">
          {[
            'Python',
            'SQL',
            'Excel',
            'Power BI',
            'Tableau',
            'JavaScript',
            'Data visualisation',
            'Business analysis',
          ].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="section-heading">
        <span className="micro">02 / EXPERIENCE</span>
        <h2>
          Grounded in
          <br />
          <em>real questions.</em>
        </h2>
      </div>
      {experience.map((x) => (
        <article className="experience-row" key={x.company}>
          <span className="micro">{x.date}</span>
          <div>
            <h3>{x.role}</h3>
            <span>{x.company}</span>
          </div>
          <div className="experience-detail">
            <p>{x.text}</p>
            <ul>
              {x.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {x.project && (
              <a className="text-link" href={`/work/${x.project}/`}>
                Explore the related project ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      className={`project-card card-${p.id}`}
      href={`/work/${p.id}/`}
      onPointerMove={(e) => {
        if (
          e.pointerType !== 'mouse' ||
          matchMedia('(prefers-reduced-motion: reduce)').matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          '--tilt',
          `${((e.clientX - r.left) / r.width - 0.5) * 3}deg`,
        );
      }}
      onPointerLeave={() => ref.current?.style.setProperty('--tilt', '0deg')}
    >
      <div className="card-top">
        <span className="micro">
          {p.number} / {p.tag}
        </span>
        <ArrowUpRight />
      </div>
      <ProjectImage image={p.featuredImage} compact />
      <div className="card-copy">
        <span className="micro">{p.context}</span>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="card-bottom">
          <span>{p.status}</span>
          <span className="circle-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </a>
  );
}
function Work() {
  const [filter, setFilter] = useState('All');
  const grid = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, DOMRect>());
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    grid.current
      ?.querySelectorAll<HTMLElement>('[data-project]')
      .forEach((el) => {
        const prev = positions.current.get(el.dataset.project!);
        if (prev) {
          const now = el.getBoundingClientRect();
          el.animate(
            [
              {
                transform: `translate(${prev.left - now.left}px,${prev.top - now.top}px)`,
              },
              { transform: 'translate(0,0)' },
            ],
            { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' },
          );
        }
      });
  }, [filter]);
  return (
    <section className="work section" id="work">
      <div className="section-heading">
        <span className="micro">03 / SELECTED WORK</span>
        <h2>
          Different problems.
          <br />
          <em>One curious mind.</em>
        </h2>
        <p>
          From research questions to working systems.
          <br />
          Four projects at the intersection of data and product.
        </p>
      </div>
      {!archive && (
        <div className="flagship">
          <div className="flagship-copy">
            <span className="micro accent">FEATURED / MCDA TOOL</span>
            <h3>
              Good decisions start
              <br />
              with better questions.
            </h3>
            <div className="story-step">
              <span>01 — THE QUESTION</span>
              <p>
                Which tyre recovery option makes sense when every choice
                involves a trade-off?
              </p>
            </div>
            <div className="story-step">
              <span>02 — THE METHOD</span>
              <p>
                Make the criteria explicit. Adjust their importance. See which
                alternatives move to the top.
              </p>
            </div>
            <div className="story-step">
              <span>03 — THE TOOL</span>
              <p>
                Built at MaREI in Ireland, initially comparing five alternatives
                within a research team of more than seven.
              </p>
            </div>
            <a className="text-link" href="/work/mcda/">
              Explore the case study <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="sticky-lab">
            <DecisionLab />
          </div>
        </div>
      )}
      {archive && (
        <div className="filters" aria-label="Filter projects">
          {['All', 'Data', 'AI', 'Product'].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => {
                positions.current.clear();
                grid.current
                  ?.querySelectorAll<HTMLElement>('[data-project]')
                  .forEach((el) =>
                    positions.current.set(
                      el.dataset.project!,
                      el.getBoundingClientRect(),
                    ),
                  );
                setFilter(f);
              }}
            >
              {f}
              <span>
                {f === 'All'
                  ? 4
                  : projects.filter((p) => p.category.includes(f)).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div ref={grid} className="project-grid">
        {projects
          .filter((p) => filter === 'All' || p.category.includes(filter))
          .map((p) => (
            <div data-project={p.id} key={p.id}>
              <ProjectCard p={p} />
            </div>
          ))}
      </div>
    </section>
  );
}
function Sidebar() {
  return (
    <aside className="archive-sidebar">
      <a className="wordmark" href="/">
        JL<span>JIAMING LI</span>
      </a>
      <p>
        Data Analyst
        <br />& practical tool builder.
      </p>
      <nav aria-label="Archive navigation">
        <a href="/#about">01 — About me</a>
        <a href="/#experience">02 — Experience</a>
        <a href="/#work">03 — Selected work</a>
        <a href="/#contact">04 — Get in touch</a>
      </nav>
      <div className="sidebar-bottom">
        <span className="live-dot">Open to opportunities</span>
        <a href="/jiaming-li-resume.pdf" download>
          Download résumé ↗
        </a>
        <a href={profile.github}>GitHub ↗</a>
      </div>
    </aside>
  );
}
export default function Portfolio({ projectId }: { projectId?: string }) {
  const p = projects.find((x) => x.id === projectId);
  useEffect(() => {
    document.documentElement.dataset.edition = archive ? 'archive' : 'story';
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll('.section-heading,.experience-row,.story-step')
      .forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        'main > section[id], main > footer[id]',
      ),
    );
    const updateNavigation = () => {
      const active =
        [...sections]
          .reverse()
          .find(
            (section) =>
              section.getBoundingClientRect().top <= innerHeight * 0.4,
          ) ?? sections[0];
      document.querySelectorAll('nav a[href^="/#"]').forEach((link) => {
        if (link.getAttribute('href') === `/#${active?.id}`)
          link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateNavigation);
    };
  }, []);
  return (
    <div id="top" className={archive ? 'edition archive' : 'edition story'}>
      {archive ? (
        <>
          <a className="skip" href="#main">
            Skip to content
          </a>
          <Sidebar />
        </>
      ) : (
        <Header />
      )}
      <main id="main">
        {p ? (
          <>
            <section className="case-hero section">
              <a className="text-link" href="/#work">
                <ArrowLeft size={18} /> All projects
              </a>
              <div className="micro accent">
                {p.number} / {p.tag}
              </div>
              <h1>
                {p.title}
                <span className="accent">.</span>
              </h1>
              <p className="case-subtitle">{p.subtitle}</p>
              <div className="case-meta">
                <span>{p.context}</span>
                <span>{p.status}</span>
                <a href={`${profile.github}/${p.repo}`}>
                  View source <Github size={16} />
                </a>
              </div>
            </section>
            <section className="case-body section">
              <div className="case-narrative case-intro">
                <h2>The question</h2>
                <p className="large-copy">{p.problem}</p>
                <h3>My contribution</h3>
                <p>{p.contribution}</p>
                <h3>The approach</h3>
                <p>{p.approach}</p>
                <div className="fact-list">
                  {p.facts.map((f) => (
                    <span key={f}>
                      <Check size={16} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <section
                className="interface-walkthrough"
                aria-labelledby="interface-heading"
              >
                <div className="gallery-heading">
                  <span className="micro accent">WORKING INTERFACES</span>
                  <h2 id="interface-heading">Interface walkthrough</h2>
                  <p>
                    Screens captured from the running project. Each note
                    explains what the view shows and what I contributed.
                  </p>
                </div>
                <Gallery images={[p.featuredImage, ...p.gallery]} />
                {p.id === 'mcda' && (
                  <div className="case-demo">
                    <h3>Explore a synthetic scenario</h3>
                    <DecisionLab />
                  </div>
                )}
              </section>
              <div className="case-narrative case-result">
                <h3>What exists today</h3>
                <p>{p.outcome}</p>
                <details>
                  <summary>
                    Technical notes <Plus size={18} />
                  </summary>
                  <p>{p.stack.join(' · ')}</p>
                  <a
                    className="text-link"
                    href={`${profile.github}/${p.repo}/blob/main/${p.source}`}
                  >
                    Read the project documentation ↗
                  </a>
                </details>
                <details>
                  <summary>
                    What I’m exploring next <Plus size={18} />
                  </summary>
                  <p>{p.next}</p>
                </details>
              </div>
            </section>
            <section className="next-project section">
              <span className="micro">KEEP EXPLORING</span>
              <a href={`/work/${projects[(projects.indexOf(p) + 1) % 4].id}/`}>
                {projects[(projects.indexOf(p) + 1) % 4].title}
                <ArrowUpRight />
              </a>
            </section>
          </>
        ) : (
          <>
            <About />
            <Experience />
            <Work />
            <Credentials />
          </>
        )}
        <Footer />
      </main>
    </div>
  );
}
