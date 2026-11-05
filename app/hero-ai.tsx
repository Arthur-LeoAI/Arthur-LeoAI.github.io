'use client';
import { useEffect, useRef } from 'react';
import { useLang } from './language';

// Hero background, drawn in a hand-inked style: scattered data scraps on the left are
// integrated into a table, run through an AI step and a three-step workflow, and land on an
// insight board where opportunities are circled and a decision is ticked.
// Hover a scrap to nudge it, click it to send it through; click empty hero space to send all.
// Every value is decorative.
const ink = '27,26,23';
const clay = '201,100,66';
const sage = '31,92,69';
const paper = '#fbf9f4';
const fragments = ['1,284', '€31k', 'SKU-2041', '#N/A', 'CTR 1.9%', 'qty 36', '“FR”', '0.072', 'null', '3.4★'];
const captions = {
  en: {
    full: ['Scattered data', 'Integrate', 'AI analysis', 'Workflow', 'Opportunity · decision'],
    short: ['Data', 'Integrate', 'AI', 'Workflow', 'Decision'],
  },
  zh: {
    full: ['零散数据', '整合', 'AI 分析', '自动化流程', '发现商机 · 做出判断'],
    short: ['数据', '整合', 'AI', '流程', '判断'],
  },
};

type Scrap = {
  kind: number; // 0 text, 1 sheet, 2 sticky note, 3 dot cluster
  text: string;
  x: number;
  y: number;
  dx: number; // pointer push offset
  dy: number;
  rot: number;
  seed: number;
  born: number;
};
type Packet = { seg: number; p: number; sx: number; sy: number; scrap: Scrap | null };

// Stable pseudo-random numbers so the "ink" doesn't flicker between frames.
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export default function HeroAI() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { lang } = useLang();
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const hero = canvas?.closest('section');
    if (!canvas || !ctx || !hero) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0;
    let H = 0;
    let compact = false;
    let wide = false; // board sits at mid-right only when there is room beside the copy
    let bandY = 0;
    let st = { data: 0, integ: 0, ai: 0, flow: 0, flowGap: 40 };
    let board = { x: 0, y: 0, w: 0, h: 0 };
    let scraps: Scrap[] = [];
    let packets: Packet[] = [];
    let rows = 0; // filled rows in the integration table
    let aiGlow = 0;
    const ticks = [0, 0, 0];
    let points: number[] = [0.22, 0.3, 0.27, 0.38];
    let opp = -1; // index of the circled opportunity point
    let oppDraw = 0;
    let decision = 0;
    let hoverStation = -1;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let clock = 0;
    let releaseClock = 0;
    let seedN = 1;
    const m = { x: -9999, y: -9999, on: false };

    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      compact = W < 720;
      wide = W >= 1180;
      bandY = H - (compact ? 74 : 92);
      st = compact
        ? { data: W * 0.1, integ: W * 0.3, ai: W * 0.5, flow: W * 0.7, flowGap: 17 }
        : wide
          ? { data: W * 0.11, integ: W * 0.27, ai: W * 0.5, flow: W * 0.71, flowGap: 40 }
          : { data: W * 0.08, integ: W * 0.25, ai: W * 0.45, flow: W * 0.65, flowGap: 34 };
      board = compact
        ? { x: W * 0.9, y: bandY, w: 56, h: 40 }
        : wide
          ? { x: W * 0.885, y: H * 0.5, w: Math.min(230, W * 0.17), h: 132 }
          : { x: W * 0.87, y: bandY, w: 110, h: 66 };
    };

    const spawn = () => {
      const max = compact ? 5 : 9;
      if (scraps.length >= max) return;
      const kind = Math.floor(hash(seedN * 3.1) * 4);
      const s: Scrap = {
        kind,
        text: fragments[Math.floor(hash(seedN * 7.7) * fragments.length)],
        x: compact ? W * (0.03 + hash(seedN * 1.3) * 0.13) : W * (0.035 + hash(seedN * 1.3) * 0.15),
        y: compact ? bandY - 46 + hash(seedN * 2.9) * 40 : H * (0.16 + hash(seedN * 2.9) * 0.56),
        dx: 0,
        dy: 0,
        rot: (hash(seedN * 5.3) - 0.5) * 0.5,
        seed: seedN,
        born: clock,
      };
      seedN++;
      scraps.push(s);
    };

    const release = (s: Scrap) => {
      scraps = scraps.filter((k) => k !== s);
      packets.push({ seg: 0, p: 0, sx: s.x + s.dx, sy: s.y + s.dy, scrap: s });
    };

    // ---------- hand-drawn primitives ----------
    const line = (x1: number, y1: number, x2: number, y2: number, seed: number, wob = 1.4) => {
      const mx = (x1 + x2) / 2 + (hash(seed) - 0.5) * wob * 2;
      const my = (y1 + y2) / 2 + (hash(seed + 1) - 0.5) * wob * 2;
      ctx.moveTo(x1 + (hash(seed + 2) - 0.5) * wob, y1 + (hash(seed + 3) - 0.5) * wob);
      ctx.quadraticCurveTo(mx, my, x2 + (hash(seed + 4) - 0.5) * wob, y2 + (hash(seed + 5) - 0.5) * wob);
    };
    const rect = (x: number, y: number, w: number, h: number, seed: number, fill?: string) => {
      if (fill) {
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 4);
        ctx.fill();
      }
      ctx.beginPath();
      line(x, y, x + w, y, seed);
      line(x + w, y, x + w, y + h, seed + 10);
      line(x + w, y + h, x, y + h, seed + 20);
      line(x, y + h, x, y, seed + 30);
      ctx.stroke();
    };
    // Organic blob behind each station, like a painted backdrop.
    const blob = (x: number, y: number, r: number, seed: number, alpha: number) => {
      const n = 9;
      const pts: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const rr = r * (0.82 + 0.3 * hash(seed + i) + 0.05 * Math.sin(clock * 0.6 + i + seed));
        pts.push([x + Math.cos(a) * rr * 1.18, y + Math.sin(a) * rr * 0.9]);
      }
      ctx.fillStyle = `rgba(${clay},${alpha})`;
      ctx.beginPath();
      const mid = (a: [number, number], b: [number, number]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const s = mid(pts[n - 1], pts[0]);
      ctx.moveTo(s[0], s[1]);
      for (let i = 0; i < n; i++) {
        const q = mid(pts[i], pts[(i + 1) % n]);
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]);
      }
      ctx.fill();
    };
    // A pen loop that slightly overshoots, as if circled by hand.
    const loop = (x: number, y: number, rx: number, ry: number, seed: number, amount = 1) => {
      ctx.beginPath();
      const a0 = -2.2 + hash(seed);
      const end = a0 + (Math.PI * 2 + 0.45) * amount;
      for (let a = a0; a <= end; a += 0.12) {
        const k = 1 + 0.08 * Math.sin(a * 2 + seed) + (a - a0) * 0.012;
        const px = x + Math.cos(a) * rx * k;
        const py = y + Math.sin(a) * ry * k;
        if (a === a0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    };
    const tick = (x: number, y: number, s: number, amount: number) => {
      if (amount <= 0) return;
      ctx.beginPath();
      ctx.moveTo(x - s, y);
      const a = Math.min(1, amount * 2);
      ctx.lineTo(x - s + s * 0.8 * a, y + s * 0.8 * a);
      if (amount > 0.5) {
        const b = (amount - 0.5) * 2;
        ctx.lineTo(x - s * 0.2 + s * 1.4 * b, y + s * 0.8 - s * 1.6 * b);
      }
      ctx.stroke();
    };

    // ---------- path segments ----------
    const flowX = (i: number) => st.flow + (i - 1) * st.flowGap;
    const boardPoint = (i: number) => {
      const n = 7;
      const px = board.x - board.w / 2 + 12 + ((board.w - 24) * i) / (n - 1);
      const py = board.y + board.h / 2 - 12 - (board.h - 30) * points[i];
      return [px, py];
    };
    const segPoint = (k: Packet): [number, number] => {
      const p = k.p;
      const e = p * p * (3 - 2 * p);
      const quad = (ax: number, ay: number, cx: number, cy: number, bx: number, by: number): [number, number] => [
        (1 - e) * (1 - e) * ax + 2 * (1 - e) * e * cx + e * e * bx,
        (1 - e) * (1 - e) * ay + 2 * (1 - e) * e * cy + e * e * by,
      ];
      switch (k.seg) {
        case 0:
          return quad(k.sx, k.sy, k.sx + 30, bandY + 10, st.integ - 30, bandY);
        case 1:
          return [st.integ + 30 + (st.ai - 30 - st.integ - 30) * e, bandY];
        case 2:
          return [st.ai + 26 + (flowX(0) - st.ai - 26) * e, bandY];
        case 3:
        case 4: {
          const a = flowX(k.seg - 3);
          return [a + (flowX(k.seg - 2) - a) * e, bandY];
        }
        default: {
          const [bx, by] = boardPoint(Math.min(points.length, 6));
          return !wide
            ? quad(flowX(2), bandY, (flowX(2) + bx) / 2, bandY - 10, bx, by)
            : quad(flowX(2) + 12, bandY, bx - 10, bandY, bx, by);
        }
      }
    };
    const arrive = (k: Packet) => {
      if (k.seg === 0) rows = (rows % 4) + 1;
      if (k.seg === 1) aiGlow = 1;
      if (k.seg >= 2 && k.seg <= 4) ticks[k.seg - 2] = 1;
      if (k.seg === 5) {
        const prev = points[points.length - 1];
        const v = Math.max(0.12, Math.min(0.92, (prev > 0.84 ? 0.3 : prev) + (hash(seedN * 9.1) - 0.25) * 0.24));
        points.push(v);
        if (points.length > 7) {
          points = points.slice(-7);
          if (opp >= 0) opp--;
        }
        // Circle the biggest jump as the opportunity, then tick the decision.
        let best = -1;
        let gain = 0.06;
        for (let i = 1; i < points.length; i++)
          if (points[i] - points[i - 1] > gain) {
            gain = points[i] - points[i - 1];
            best = i;
          }
        if (best !== opp) {
          opp = best;
          oppDraw = 0;
          decision = 0;
        }
      }
    };

    // ---------- drawing ----------
    const drawScrap = (s: Scrap, x: number, y: number, scale: number, alpha: number, hot: boolean) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(s.rot + (hot ? Math.sin(clock * 12) * 0.06 : 0));
      ctx.scale(scale, scale);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgba(${ink},0.75)`;
      ctx.lineWidth = 1.2;
      const sd = s.seed * 100;
      if (s.kind === 0) {
        ctx.fillStyle = `rgba(${hot ? clay : ink},0.8)`;
        ctx.font = `500 ${compact ? 10 : 12}px ui-monospace, Menlo, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.text, 0, 0);
      } else if (s.kind === 1) {
        rect(-20, -12, 40, 24, sd, paper);
        ctx.beginPath();
        line(-20, 0, 20, 0, sd + 40, 0.8);
        line(-7, -12, -7, 12, sd + 50, 0.8);
        line(6, -12, 6, 12, sd + 60, 0.8);
        ctx.stroke();
      } else if (s.kind === 2) {
        rect(-14, -14, 28, 28, sd, `rgba(${clay},0.22)`);
        ctx.beginPath();
        line(-9, -5, 8, -5, sd + 40, 1.2);
        line(-9, 1, 5, 1, sd + 50, 1.2);
        line(-9, 7, 7, 7, sd + 60, 1.2);
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(${ink},0.6)`;
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.arc((hash(sd + i) - 0.5) * 30, (hash(sd + i + 9) - 0.5) * 20, 2 + hash(sd + i + 3) * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const caption = (text: string, x: number, y: number, hot: boolean) => {
      const zh = langRef.current === 'zh';
      ctx.font = zh
        ? `${hot ? 600 : 500} ${compact ? 11 : 13}px 'Noto Serif SC', serif`
        : `italic ${compact ? 13 : 17}px 'Instrument Serif', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = hot ? `rgb(${clay})` : `rgba(${ink},0.7)`;
      ctx.fillText(text, x, y);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const cap = captions[langRef.current === 'zh' ? 'zh' : 'en'][compact ? 'short' : 'full'];
      const capY = bandY + (compact ? 26 : 34);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Dashed pen path joining the stations.
      ctx.strokeStyle = `rgba(${ink},0.22)`;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      line(st.integ + 34, bandY, st.ai - 30, bandY, 901, 2);
      line(st.ai + 30, bandY, flowX(0) - 14, bandY, 911, 2);
      if (wide) {
        ctx.moveTo(flowX(2) + 14, bandY);
        ctx.quadraticCurveTo(board.x - 10, bandY, board.x - 10, board.y + board.h / 2 + 4);
      } else {
        line(flowX(2) + 10, bandY, board.x - board.w / 2 - 4, bandY, 921, 2);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // 1. Scattered data
      for (const s of scraps) {
        const bx = s.x + Math.sin(clock * 0.5 + s.seed) * 5;
        const by = s.y + Math.cos(clock * 0.45 + s.seed * 1.7) * 4;
        const d = m.on ? Math.hypot(bx + s.dx - m.x, by + s.dy - m.y) : 999;
        if (d < 80) {
          const f = (80 - d) / 80;
          s.dx += ((bx + s.dx - m.x) / (d || 1)) * f * 60 * dt;
          s.dy += ((by + s.dy - m.y) / (d || 1)) * f * 60 * dt;
        }
        s.dx *= Math.exp(-dt * 1.2);
        s.dy *= Math.exp(-dt * 1.2);
        const fade = Math.min(1, (clock - s.born) / 0.8);
        drawScrap(s, bx + s.dx, by + s.dy, compact ? 0.75 : 1, fade * 0.85, d < 34);
      }
      caption(cap[0], st.data, capY, hoverStation === 0);

      // 2. Integrate: a table that fills row by row.
      const tw = compact ? 40 : 64;
      const th = compact ? 30 : 46;
      blob(st.integ, bandY, compact ? 26 : 40, 11, hoverStation === 1 ? 0.26 : 0.14);
      ctx.strokeStyle = `rgba(${ink},0.85)`;
      ctx.lineWidth = 1.3;
      rect(st.integ - tw / 2, bandY - th / 2, tw, th, 21, paper);
      ctx.fillStyle = `rgba(${sage},0.85)`;
      ctx.fillRect(st.integ - tw / 2 + 2, bandY - th / 2 + 2, tw - 4, th / 5 - 1);
      for (let i = 0; i < 4; i++) {
        const ry = bandY - th / 2 + (th / 5) * (i + 1) + th / 10;
        if (i < rows) {
          ctx.fillStyle = `rgba(${sage},0.35)`;
          ctx.fillRect(st.integ - tw / 2 + 5, ry - 1.5, (tw - 10) * (0.5 + 0.45 * hash(i + rows * 3)), 3);
        }
      }
      caption(cap[1], st.integ, capY, hoverStation === 1);

      // 3. AI: a hand-drawn chip, glowing while it processes.
      aiGlow *= Math.exp(-dt * 1.6);
      const cs = compact ? 30 : 46;
      blob(st.ai, bandY, (compact ? 26 : 40) * (1 + 0.15 * aiGlow), 31, (hoverStation === 2 ? 0.3 : 0.2) + aiGlow * 0.25);
      ctx.strokeStyle = `rgba(${ink},0.85)`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const o = -cs / 4 + (i * cs) / 4;
        line(st.ai + o, bandY - cs / 2, st.ai + o, bandY - cs / 2 - 6, 40 + i, 0.6);
        line(st.ai + o, bandY + cs / 2, st.ai + o, bandY + cs / 2 + 6, 50 + i, 0.6);
        line(st.ai - cs / 2, bandY + o, st.ai - cs / 2 - 6, bandY + o, 60 + i, 0.6);
        line(st.ai + cs / 2, bandY + o, st.ai + cs / 2 + 6, bandY + o, 70 + i, 0.6);
      }
      ctx.stroke();
      rect(st.ai - cs / 2, bandY - cs / 2, cs, cs, 81, paper);
      ctx.fillStyle = aiGlow > 0.3 ? `rgb(${clay})` : `rgb(${ink})`;
      ctx.font = `italic ${compact ? 15 : 22}px 'Instrument Serif', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AI', st.ai, bandY + 1);
      if (aiGlow > 0.05) {
        ctx.strokeStyle = `rgba(${clay},${aiGlow * 0.6})`;
        ctx.lineWidth = 1.2;
        loop(st.ai, bandY, cs * (1.2 - aiGlow * 0.4), cs * (0.95 - aiGlow * 0.3), 7);
      }
      caption(cap[2], st.ai, capY, hoverStation === 2);

      // 4. Workflow: three steps that tick as work passes through.
      const bs = compact ? 14 : 22;
      blob(st.flow, bandY, compact ? 30 : 58, 51, hoverStation === 3 ? 0.24 : 0.12);
      for (let i = 0; i < 3; i++) {
        ticks[i] *= Math.exp(-dt * 0.9);
        const x = flowX(i);
        ctx.strokeStyle = `rgba(${ink},0.85)`;
        ctx.lineWidth = 1.3;
        rect(x - bs / 2, bandY - bs / 2, bs, bs, 91 + i * 7, ticks[i] > 0.1 ? `rgba(${sage},${0.15 + ticks[i] * 0.3})` : paper);
        if (i < 2) {
          ctx.beginPath();
          line(x + bs / 2 + 3, bandY, flowX(i + 1) - bs / 2 - 3, bandY, 120 + i, 0.8);
          ctx.moveTo(flowX(i + 1) - bs / 2 - 7, bandY - 3);
          ctx.lineTo(flowX(i + 1) - bs / 2 - 3, bandY);
          ctx.lineTo(flowX(i + 1) - bs / 2 - 7, bandY + 3);
          ctx.stroke();
        }
        if (ticks[i] > 0.05) {
          ctx.strokeStyle = `rgba(${sage},${Math.min(1, ticks[i] * 1.6)})`;
          ctx.lineWidth = 1.8;
          tick(x, bandY, bs * 0.28, Math.min(1, (1 - ticks[i]) * 6 + 0.2));
        }
      }
      caption(cap[3], st.flow, capY, hoverStation === 3);

      // 5. Insight board: trend with a confidence band, a circled opportunity, a ticked decision.
      const bx0 = board.x - board.w / 2;
      const by0 = board.y - board.h / 2;
      blob(board.x, board.y, Math.max(board.w, board.h) * 0.55, 71, hoverStation === 4 ? 0.22 : 0.1);
      ctx.strokeStyle = `rgba(${ink},0.85)`;
      ctx.lineWidth = 1.3;
      rect(bx0, by0, board.w, board.h, 131, paper);
      const pts = points.map((_, i) => boardPoint(i));
      if (!compact) {
        ctx.fillStyle = `rgba(${clay},0.16)`;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y - 7 - i) : ctx.moveTo(x, y - 7)));
        for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(pts[i][0], pts[i][1] + 7 + i);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = `rgba(${ink},0.35)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        line(bx0 + 10, by0 + board.h - 10, bx0 + board.w - 8, by0 + board.h - 10, 141, 0.8);
        line(bx0 + 10, by0 + 10, bx0 + 10, by0 + board.h - 10, 151, 0.8);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgb(${sage})`;
      ctx.lineWidth = compact ? 1.4 : 1.8;
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
      ctx.fillStyle = `rgb(${sage})`;
      const [lx, ly] = pts[pts.length - 1];
      ctx.beginPath();
      ctx.arc(lx, ly, compact ? 2 : 3, 0, Math.PI * 2);
      ctx.fill();
      if (opp >= 0 && opp < pts.length) {
        oppDraw = Math.min(1, oppDraw + dt * 1.2);
        ctx.strokeStyle = `rgb(${clay})`;
        ctx.lineWidth = compact ? 1.3 : 1.8;
        loop(pts[opp][0], pts[opp][1], compact ? 7 : 13, compact ? 6 : 10, opp * 13, oppDraw);
        if (oppDraw >= 1) decision = Math.min(1, decision + dt * 1.4);
        // Decision mark in the board's corner.
        const dx = bx0 + board.w - (compact ? 9 : 16);
        const dy = by0 + (compact ? 9 : 16);
        ctx.strokeStyle = `rgba(${clay},${decision})`;
        ctx.lineWidth = 1.3;
        if (decision > 0) loop(dx, dy, compact ? 6 : 10, compact ? 6 : 10, 3, Math.min(1, decision * 1.3));
        ctx.lineWidth = compact ? 1.4 : 1.8;
        tick(dx, dy, compact ? 3 : 5, decision);
      }
      caption(cap[4], board.x, wide ? by0 + board.h + 12 : Math.max(capY, by0 + board.h + 6), hoverStation === 4);

      // Moving work items
      const speed = [0.55, 0.9, 1.2, 2.2, 2.2, 0.8];
      const nextPackets: Packet[] = [];
      for (const k of packets) {
        k.p += dt * speed[k.seg] * (compact ? 1.2 : 1);
        if (k.p >= 1) {
          arrive(k);
          k.seg++;
          k.p = 0;
          if (k.seg > 5) continue;
        }
        const [x, y] = segPoint(k);
        if (k.seg === 0 && k.scrap) {
          drawScrap(k.scrap, x, y, (compact ? 0.75 : 1) * (1 - 0.6 * k.p), 0.85, false);
        } else if (k.seg === 1) {
          ctx.fillStyle = `rgba(${sage},0.85)`;
          ctx.beginPath();
          ctx.roundRect(x - 7, y - 3, 14, 6, 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgb(${clay})`;
          ctx.beginPath();
          ctx.arc(x, y, compact ? 2.6 : 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
        nextPackets.push(k);
      }
      packets = nextPackets;
    };

    const stations = () => [
      [st.data, compact ? bandY - 26 : H * 0.44],
      [st.integ, bandY],
      [st.ai, bandY],
      [st.flow, bandY],
      [board.x, board.y],
    ];


    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // Larger steps are allowed so throttled tabs still progress.
      const dt = Math.min(0.25, (now - last) / 1000);
      last = now;
      if (!visible) return;
      clock += dt;
      releaseClock += dt;
      if (releaseClock > 1.7) {
        releaseClock = 0;
        if (scraps.length > (compact ? 2 : 4)) release(scraps[0]);
        spawn();
      }
      if (scraps.length < (compact ? 3 : 5)) spawn();
      hoverStation = -1;
      if (m.on)
        stations().forEach(([x, y], i) => {
          if (i > 0 && Math.hypot(m.x - x, m.y - y) < (compact ? 28 : 44)) hoverStation = i;
        });
      canvas.parentElement?.toggleAttribute('data-hot', hoverStation > 0 || nearScrap() !== null);
      draw(dt);
    };

    const nearScrap = (force = false) => {
      if (!m.on && !force) return null;
      let best: Scrap | null = null;
      let bd = 34;
      for (const s of scraps) {
        const d = Math.hypot(s.x + s.dx - m.x, s.y + s.dy - m.y);
        if (d < bd) {
          bd = d;
          best = s;
        }
      }
      return best;
    };

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.on = e.pointerType === 'mouse' && m.y >= 0 && m.y <= r.height;
    };
    const leave = () => {
      m.on = false;
    };
    const click = (e: PointerEvent) => {
      if ((e.target as Element).closest('a,button,input,select')) return;
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      const s = nearScrap(true);
      if (s) {
        release(s);
        return;
      }
      // Anywhere else: send everything through, staggered.
      scraps.forEach((k, i) => setTimeout(() => scraps.includes(k) && release(k), i * 160));
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(() => {
      layout();
      scraps = [];
      packets = [];
      for (let i = 0; i < (compact ? 4 : 7); i++) spawn();
      scraps.forEach((s) => (s.born = -1));
      if (reduce) draw(0);
    });
    layout();
    io.observe(canvas);
    ro.observe(canvas);
    if (reduce) {
      rows = 3;
      points = [0.22, 0.3, 0.27, 0.38, 0.58, 0.62, 0.7];
      opp = 4;
      oppDraw = 1;
      decision = 1;
      draw(0);
    } else {
      addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
      hero.addEventListener('pointerdown', click);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      hero.removeEventListener('pointerdown', click);
    };
  }, []);
  return (
    <div className="hero-bg" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
