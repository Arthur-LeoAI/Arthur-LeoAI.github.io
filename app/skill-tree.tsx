'use client';
import { skillTree, ui } from '@/lib/content';
import { useLang } from './language';

// A hand-drawn "skill tree" painting beside Experience: roots in data, core skills at the
// branch tips, supporting skills listed underneath. Branches draw in when the section is
// revealed, the canopy sways slowly, and hovering a branch tip highlights it.
// Leaf positions in a 320 × 400 drawing; [x, y, branch origin height on the trunk].
const tips: [number, number, number][] = [
  [160, 74, 96], // top of the trunk
  [92, 140, 206],
  [232, 128, 206],
  [58, 200, 258],
  [262, 196, 258],
  [74, 262, 302],
  [248, 262, 302],
];

const branch = ([x, y, oy]: [number, number, number]) =>
  x === 160 ? '' : `M160 ${oy} Q ${160 + (x - 160) * 0.45} ${oy - 6} ${x} ${y}`;

export default function SkillTree() {
  const { t, lang } = useLang();
  const core = skillTree.filter((s) => s.core);
  const more = skillTree.filter((s) => !s.core);
  return (
    <figure className="skill-tree" data-reveal="0">
      <span className="label">{t(ui.sphere.kicker)}</span>
      <svg viewBox="-24 20 368 390">
        <title>
          {core.map((s) => t(s.label)).join(', ')}
        </title>
        <path
          className="tree-blob"
          d="M172 36c64 6 128 46 140 110 12 62-12 118-66 146-52 27-128 28-176 0-48-28-70-84-56-140 16-64 92-122 158-116z"
        />
        {/* Roots: the tree grows out of data. */}
        <g className="tree-ink tree-roots">
          <path pathLength="1" d="M78 362 Q 120 358 160 362 T 244 360" />
          <path pathLength="1" d="M160 362 Q 150 380 118 392" />
          <path pathLength="1" d="M160 362 Q 164 384 146 400" />
          <path pathLength="1" d="M160 362 Q 176 380 204 394" />
          <path pathLength="1" d="M160 362 Q 186 370 226 380" />
        </g>
        <g className="tree-bits">
          <rect x="110" y="388" width="7" height="7" />
          <rect x="141" y="398" width="6" height="6" />
          <rect x="203" y="391" width="7" height="7" />
          <rect x="226" y="377" width="6" height="6" />
          <circle cx="96" cy="384" r="2.5" />
          <circle cx="182" cy="402" r="2.5" />
          <circle cx="250" cy="388" r="2" />
        </g>
        <g className="tree-canopy">
          <path
            className="tree-ink tree-trunk"
            pathLength="1"
            d="M160 362 C 154 322 168 282 160 240 S 154 150 160 92"
          />
          {core.map((s, i) => {
            const tip = tips[i];
            const [x, y] = tip;
            const angle = x === 160 ? -90 : (Math.atan2(y - tip[2], x - 160) * 180) / Math.PI;
            return (
              <g key={s.label.en} className="tree-tip" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                {branch(tip) && <path className="tree-ink tree-branch" pathLength="1" d={branch(tip)} />}
                <path
                  className="tree-leaf"
                  transform={`translate(${x} ${y}) rotate(${angle - 35})`}
                  d="M0 0 C 6 -7 15 -7 20 0 C 15 7 6 7 0 0 Z"
                />
                <path
                  className="tree-leaf tree-leaf-2"
                  transform={`translate(${x} ${y}) rotate(${angle + 40})`}
                  d="M0 0 C 5 -6 12 -6 16 0 C 12 6 5 6 0 0 Z"
                />
                <circle className="tree-bud" cx={x} cy={y} r="3.4" />
                <text x={x} y={y - 14} textAnchor="middle" lang={lang === 'zh' ? 'zh-CN' : 'en'}>
                  {t(s.label)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <figcaption className="tree-more">
        <span>{t(ui.sphere.more)}</span> {more.map((s) => t(s.label)).join(' · ')}
      </figcaption>
    </figure>
  );
}
