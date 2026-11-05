'use client';
import { useEffect, useId, useState } from 'react';
import { experience } from '@/lib/content';
import { useLang } from './language';

// One hand-inked frame per role in Experience. On wide screens a single sticky frame sits
// beside the timeline and switches (drawing itself in) as each role reaches the middle of
// the screen; on narrow screens each role shows its own small frame above the text.
// The drawings only show the kind of work; facts and numbers stay in the text.

const ink = { pathLength: 1, className: 'ink' } as const;

function SceneEcommerce() {
  // Marketplaces on a globe feed a sales dashboard under a magnifier.
  return (
    <>
      <circle className="wash sage" cx="120" cy="178" r="78" />
      <path className="wash sage-deep" d="M60 146 q14 -20 36 -12 q10 8 0 22 q-14 12 -20 32 q-14 -8 -16 -42z" />
      <path className="wash sage-deep" d="M138 130 q18 -12 32 0 q6 12 -6 18 q-12 2 -18 14 q-12 -6 -8 -32z" />
      <circle {...ink} cx="120" cy="178" r="78" />
      <ellipse {...ink} cx="120" cy="178" rx="36" ry="78" />
      <path {...ink} d="M42 178 H198 M54 138 Q120 154 186 138 M54 218 Q120 202 186 218" />
      {[
        [146, 132],
        [160, 124],
        [170, 138],
        [152, 148],
        [176, 152],
      ].map(([x, y]) => (
        <g key={`${x}${y}`} className="pin clay">
          <path {...ink} d={`M${x} ${y} l0 -10`} />
          <circle cx={x} cy={y - 12} r="4.5" />
        </g>
      ))}
      {[
        [68, 150],
        [82, 160],
        [76, 174],
      ].map(([x, y]) => (
        <g key={`${x}${y}`} className="pin sage">
          <path {...ink} d={`M${x} ${y} l0 -10`} />
          <circle cx={x} cy={y - 12} r="4.5" />
        </g>
      ))}
      <path className="dots" d="M192 138 Q214 104 236 116" />
      <rect className="wash paper" x="230" y="96" width="146" height="100" rx="5" />
      <rect {...ink} x="230" y="96" width="146" height="100" rx="5" />
      <path {...ink} d="M216 202 H390 L378 216 H228 Z" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className="wash sage-deep" x={244 + i * 22} y={176 - [18, 30, 26, 44, 56][i]} width="14" height={[18, 30, 26, 44, 56][i]} />
      ))}
      <path {...ink} d="M240 178 H364" />
      <path {...ink} className="ink accent" d="M248 168 L270 156 L292 158 L314 136 L336 124 L356 112" />
      <circle {...ink} cx="336" cy="126" r="17" />
      <path {...ink} d="M348 138 L362 152" />
    </>
  );
}

function SceneDataPlatform() {
  // A drone streams telemetry into a time-series store and a live monitoring screen.
  return (
    <>
      <ellipse className="wash sage" cx="96" cy="100" rx="56" ry="34" />
      <rect {...ink} x="80" y="94" width="34" height="13" rx="5" />
      <path {...ink} d="M82 97 L60 86 M112 97 L134 86 M88 107 l-4 9 M106 107 l4 9" />
      <ellipse {...ink} cx="56" cy="84" rx="16" ry="4" />
      <ellipse {...ink} cx="138" cy="84" rx="16" ry="4" />
      <path {...ink} className="ink accent" d="M89 128 q8 7 16 0 M82 137 q15 11 30 0" />
      <path className="dots" d="M97 150 Q100 200 142 212" />
      <rect className="wash sage-deep" x="148" y="184" width="56" height="52" />
      <ellipse {...ink} cx="176" cy="184" rx="28" ry="9" />
      <path {...ink} d="M148 184 V236 M204 184 V236 M148 236 Q176 248 204 236 M148 202 Q176 214 204 202 M148 219 Q176 231 204 219" />
      <path {...ink} d="M212 200 Q232 186 246 176 M238 172 l9 3 l-4 9" />
      <rect className="wash paper" x="248" y="78" width="134" height="98" rx="5" />
      <rect {...ink} x="248" y="78" width="134" height="98" rx="5" />
      <path {...ink} d="M314 176 V194 M292 196 H338" />
      <circle className="dot sage" cx="262" cy="90" r="3.5" />
      <circle className="dot sage" cx="273" cy="90" r="3.5" />
      <path {...ink} d="M260 158 H370" />
      <path {...ink} className="ink accent" d="M262 144 L274 134 L284 140 L296 120 L306 130 L318 110 L330 126 L342 118 L354 100 L368 108" />
      <circle className="dot clay" cx="354" cy="100" r="5" />
    </>
  );
}

function SceneDecision() {
  // Alternatives are scored against weighted criteria, tested for sensitivity, and ranked.
  const rows = [104, 162, 220];
  return (
    <>
      {rows.map((y, i) => (
        <g key={y}>
          <circle className="wash sage" cx="72" cy={y} r="24" />
          <circle {...ink} cx="72" cy={y} r="24" />
          <circle {...ink} cx="72" cy={y} r="10" />
          <path {...ink} d={`M72 ${y - 24} v6 M72 ${y + 18} v6 M48 ${y} h6 M90 ${y} h6`} />
          <text className="frame-note" x="104" y={y + 6}>
            {'ABC'[i]}
          </text>
        </g>
      ))}
      {[16, 28, 10, 22].map((h, c) => (
        <rect key={c} className="wash clay" x={150 + c * 28} y={86 - h} width="16" height={h} />
      ))}
      <rect {...ink} x="140" y="88" width="116" height="150" rx="3" />
      <path {...ink} d="M140 138 H256 M140 188 H256 M169 88 V238 M198 88 V238 M227 88 V238" />
      {rows.map((y, r) =>
        [0, 1, 2, 3].map((c) => (
          <circle
            key={`${r}${c}`}
            className="dot sage"
            cx={154 + c * 29}
            cy={y + 9}
            r={[7, 4, 9, 5, 8, 6, 3, 9, 4, 8, 7, 5][r * 4 + c]}
          />
        )),
      )}
      <path {...ink} d="M150 262 H246" />
      <circle className="dot clay" cx="214" cy="262" r="6" />
      <rect className="wash clay" x="318" y="166" width="32" height="72" />
      <path {...ink} d="M284 238 V196 H318 V166 H350 V210 H382 V238 Z M318 196 V238 M350 210 V238" />
      <text className="frame-note" x="296" y="222">2</text>
      <text className="frame-note" x="328" y="204">1</text>
      <text className="frame-note" x="361" y="230">3</text>
      <path {...ink} className="ink accent" d="M324 146 l8 9 l15 -20" />
    </>
  );
}

const scenes = [SceneEcommerce, SceneDataPlatform, SceneDecision];

export function ExperienceScene({ index, active = true }: { index: number; active?: boolean }) {
  const { t } = useLang();
  const id = useId().replace(/:/g, '');
  const Scene = scenes[index];
  const caption = experience[index]?.frame;
  if (!Scene) return null;
  return (
    <svg className="exp-scene" viewBox="0 0 400 300" data-active={active ? '' : undefined} aria-hidden="true">
      <defs>
        {/* Slight wobble so the lines look drawn by hand. */}
        <filter id={`wob${id}`} x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={index + 3} />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
      <g filter={`url(#wob${id})`}>
        <rect className="wash paper" x="6" y="6" width="388" height="288" rx="8" />
        <Scene />
        <rect {...ink} x="6" y="6" width="388" height="288" rx="8" />
      </g>
      {caption && (
        <g className="caption">
          <rect x="18" y="18" width="174" height="34" rx="4" />
          <text x="30" y="42">
            {t(caption)}
          </text>
        </g>
      )}
    </svg>
  );
}

export default function ExperienceFrames() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const rows = [...document.querySelectorAll<HTMLElement>('#experience .exp-row')];
    if (!rows.length) return;
    const mark = (i: number) => {
      setActive(i);
      rows.forEach((r, k) => r.toggleAttribute('data-current', k === i));
    };
    // The current role is the last one whose top has passed the middle of the screen.
    let current = -1;
    const update = () => {
      const mid = innerHeight * 0.5;
      let i = 0;
      rows.forEach((r, k) => {
        if (r.getBoundingClientRect().top < mid) i = k;
      });
      if (i !== current) {
        current = i;
        mark(i);
      }
    };
    update();
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => {
      removeEventListener('scroll', update);
      removeEventListener('resize', update);
    };
  }, []);
  return (
    <div className="exp-frames">
      {experience.map((x, i) => (
        <div key={x.role.en} className="exp-frame" data-active={i === active ? '' : undefined}>
          <ExperienceScene index={i} active={i === active} />
        </div>
      ))}
    </div>
  );
}
