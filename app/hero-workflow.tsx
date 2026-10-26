'use client';
import { useState } from 'react';
import { useLang } from './language';

const tasks = Array.from({ length: 28 }, (_, i) => {
  let x = 25 + ((i * 197 + 31) % 1130);
  const y = 55 + ((i * 139 + 17) % 590);
  // The scattered state keeps a clear reading area behind the headline.
  if (x > 250 && x < 950 && y < 580) x = (i % 2 ? 970 : 20) + (i % 5) * 40;
  return { x, y, side: i % 2, row: Math.floor(i / 2) };
});
const lanes = [
  'M 18 90 C 190 90, 58 630, 430 630 L 530 630',
  'M 0 330 C 200 330, 100 630, 430 630 L 530 630',
  'M 30 520 C 150 520, 150 630, 430 630 L 530 630',
  'M 670 630 L 770 630 C 1060 630, 1050 90, 1180 90',
  'M 670 630 L 770 630 C 1050 630, 1040 330, 1200 330',
  'M 670 630 L 770 630 C 1050 630, 1050 520, 1170 520',
];
export default function HeroWorkflow() {
  const { lang } = useLang();
  const [organized, setOrganized] = useState(true);
  const say = (en: string, zh: string) => (lang === 'zh' ? zh : en);
  return (
    <>
      <div
        className="hero-workflow"
        data-organized={organized}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 760" preserveAspectRatio="none">
          <g className="workflow-lanes">
            {lanes.map((path, i) => (
              <g key={path}>
                <path d={path} className="workflow-track" />
                <path
                  d={path}
                  className="workflow-signal"
                  style={{ animationDelay: `${-i * 1.3}s` }}
                />
              </g>
            ))}
          </g>
          {tasks.map((task, i) => {
            const x = organized
              ? task.side === 0
                ? 38 + (task.row % 3) * 40
                : 1050 + (task.row % 3) * 40
              : task.x;
            const y = organized ? 55 + task.row * 37 : task.y;
            return (
              <g
                key={i}
                className="workflow-document"
                style={{
                  transform: `translate(${x}px,${y}px) rotate(${organized ? 0 : ((i % 5) - 2) * 8}deg)`,
                }}
              >
                <rect width="19" height="25" rx="2" />
                <path d="M5 8h9 M5 13h9 M5 18h5" />
              </g>
            );
          })}
          <g className="workflow-hub">
            <rect x="530" y="598" width="140" height="64" rx="9" />
            <path d="M556 620h14m-7-7v14 M585 619h14m-7-7v14 M615 620h14m-7-7v14" />
            <text x="600" y="646" textAnchor="middle">
              {say('AI workflow', 'AI 工作流')}
            </text>
          </g>
          <g className="workflow-endpoints">
            <rect x="185" y="612" width="160" height="38" rx="5" />
            <text x="265" y="636" textAnchor="middle">
              {say('Repetitive tasks', '重复性任务')}
            </text>
            <rect x="855" y="612" width="160" height="38" rx="5" />
            <text x="935" y="636" textAnchor="middle">
              {say('Reviewed results', '审核后的成果')}
            </text>
          </g>
        </svg>
        <div className="hero-mobile-flow">
          <span>{say('Repetitive tasks', '重复性任务')}</span>
          <span>{say('AI workflow', 'AI 工作流')}</span>
          <span>{say('Reviewed results', '审核后的成果')}</span>
        </div>
      </div>
      <div className="hero-workflow-controls">
        <span>
          {say(
            'From scattered work to a connected workflow',
            '从零散任务，到连贯的工作流',
          )}
        </span>
        <div aria-label={say('Compare workflow states', '比较工作流状态')}>
          <button aria-pressed={!organized} onClick={() => setOrganized(false)}>
            {say('Manual tasks', '零散任务')}
          </button>
          <button aria-pressed={organized} onClick={() => setOrganized(true)}>
            {say('AI workflow', 'AI 工作流')} ↗
          </button>
        </div>
      </div>
    </>
  );
}
