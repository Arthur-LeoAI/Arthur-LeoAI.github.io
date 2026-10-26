'use client';
import { useId, useMemo, useState } from 'react';
import {
  computeTransformer,
  embeddings,
  examples,
  vocabulary,
} from '@/lib/transformer';
import { useLang } from './language';

const stages = [
  { en: 'Tokens', zh: '词元' },
  { en: 'Embedding + position', zh: '嵌入与位置' },
  { en: 'Multi-head attention', zh: '多头注意力' },
  { en: 'Residual + feed-forward', zh: '残差与前馈' },
  { en: 'Next-token probabilities', zh: '下一词元概率' },
  { en: 'Autoregressive generation', zh: '自回归生成' },
];
const vector = (values: number[]) =>
  '[' + values.map((v) => v.toFixed(2)).join(', ') + ']';

export default function TransformerLab() {
  const { lang, t } = useLang();
  const say = (en: string, zh: string) => (lang === 'zh' ? zh : en);
  const [stage, setStage] = useState(2);
  const [ids, setIds] = useState(examples[0]);
  const [query, setQuery] = useState(2);
  const [head, setHead] = useState(0);
  const [causal, setCausal] = useState(true);
  const [positional, setPositional] = useState(true);
  const [temperature, setTemperature] = useState(1);
  const panel = useId();
  const model = useMemo(
    () => computeTransformer(ids, positional, causal, temperature),
    [ids, positional, causal, temperature],
  );
  const selected = Math.min(query, ids.length - 1);
  const attention = model.heads[head];
  const ranking = model.probabilities
    .map((p, id) => ({ p, id }))
    .sort((a, b) => b.p - a.p);
  const reset = (example: number) => {
    setIds(examples[example]);
    setQuery(examples[example].length - 1);
  };
  const generate = () => {
    if (ids.length >= 8) return;
    setIds([...ids, ranking[0].id]);
    setQuery(ids.length);
    setStage(5);
  };
  const descriptions = [
    say(
      'Text becomes token IDs before it reaches the network. This teaching model splits at words; real LLMs usually use subword tokenizers.',
      '文本先转换为词元 ID，再进入网络。这个教学模型按单词分词；真实大模型通常使用子词分词器。',
    ),
    say(
      'A lookup table maps each ID to a vector. Add a position vector so the network can distinguish token order. Toggle position and watch the numbers change.',
      '查表将每个 ID 映射为向量，再加入位置向量，让网络区分词元顺序。开关位置信息，观察数值变化。',
    ),
    say(
      'Each head projects the input into its own Q, K and V. Select a query row: dot products become attention weights, which mix value vectors. The causal mask blocks future tokens.',
      '每个头通过不同投影得到 Q、K、V。选择查询行：点积变为注意力权重，再对值向量加权求和。因果掩码屏蔽未来词元。',
    ),
    say(
      'Concatenate both heads, project back to four dimensions, add the input and normalize. A feed-forward network transforms each token independently, followed by another residual and normalization.',
      '拼接两个头，投影回四维，加上输入并归一化。前馈网络独立变换每个词元，再进行一次残差连接和归一化。',
    ),
    say(
      'The last token’s final vector is projected to vocabulary logits. Softmax turns them into probabilities. Temperature changes the distribution, not the network weights.',
      '将最后一个词元的最终向量投影为词表上的 logits，再用 softmax 转为概率。温度改变概率分布，不改变网络权重。',
    ),
    say(
      'Append the most likely token, then feed the longer context through the same block again. Real language models learn useful weights from training; this untrained model demonstrates the computation.',
      '加入概率最高的词元，再把更长的上下文输入同一个模块。真实语言模型通过训练获得有用权重；这个未训练模型用于展示计算过程。',
    ),
  ];
  return (
    <div className="transformer-lab">
      <div className="transformer-toolbar">
        <span>
          {say(
            '1 decoder block · 2 heads · 4 dimensions',
            '1 个解码器模块 · 2 个头 · 4 维向量',
          )}
        </span>
        <label>
          {say('Example', '示例')}
          <select
            aria-label={say('Input example', '输入示例')}
            onChange={(e) => reset(Number(e.target.value))}
            defaultValue="0"
          >
            <option value="0">AI can help</option>
            <option value="1">we build useful tools</option>
          </select>
        </label>
      </div>
      <div className="transformer-layout">
        <nav
          className="transformer-architecture"
          aria-label={say(
            'Transformer computation stages',
            'Transformer 计算步骤',
          )}
        >
          {stages.map((item, i) => (
            <button
              key={item.en}
              aria-current={stage === i ? 'step' : undefined}
              aria-controls={panel}
              onClick={() => setStage(i)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {t(item)}
              {i === 2 && (
                <small>
                  {say(
                    'causal mask · Q/K/V · concat',
                    '因果掩码 · Q/K/V · 拼接',
                  )}
                </small>
              )}
              {i === 3 && <small>Add & Norm → FFN → Add & Norm</small>}
            </button>
          ))}
        </nav>
        <div className="transformer-panel" id={panel}>
          <div className="transformer-step-head">
            <span className="label">
              {String(stage + 1).padStart(2, '0')} / 06
            </span>
            <h4>{t(stages[stage])}</h4>
          </div>
          <p className="transformer-explanation">{descriptions[stage]}</p>
          <div
            className="transformer-context"
            aria-label={say('Select query token', '选择查询词元')}
          >
            {ids.map((id, i) =>
              stage >= 4 ? (
                <span key={i}>
                  {vocabulary[id]} <small>{i}</small>
                </span>
              ) : (
                <button
                  key={i}
                  aria-pressed={selected === i}
                  onClick={() => setQuery(i)}
                >
                  {vocabulary[id]} <small>{i}</small>
                </button>
              ),
            )}
          </div>
          {stage === 0 && (
            <>
              <div className="token-lookup">
                {ids.map((id, i) => (
                  <div key={i}>
                    <span>“{vocabulary[id]}”</span>
                    <span>→</span>
                    <strong>ID {id}</strong>
                  </div>
                ))}
              </div>
              <p className="transformer-insight">
                {say(
                  'Token IDs are lookup keys, not meanings or rankings. The embedding table supplies the initial representation.',
                  '词元 ID 只是查表索引，不代表含义或排名。初始表示来自嵌入表。',
                )}
              </p>
            </>
          )}
          {stage === 1 && (
            <>
              <label className="transformer-check">
                <input
                  type="checkbox"
                  checked={positional}
                  onChange={(e) => setPositional(e.target.checked)}
                />
                {say('Add sinusoidal position encoding', '加入正弦位置编码')}
              </label>
              <dl className="transformer-vectors">
                <div>
                  <dt>E[{vocabulary[ids[selected]]}]</dt>
                  <dd>{vector(embeddings[ids[selected]])}</dd>
                </div>
                <div>
                  <dt>P[{selected}]</dt>
                  <dd>{vector(model.positions[selected])}</dd>
                </div>
                <div className="vector-result">
                  <dt>X = E + P</dt>
                  <dd>{vector(model.input[selected])}</dd>
                </div>
              </dl>
              <p className="transformer-insight">
                {say(
                  'Removing position does not remove causality: the mask still controls which tokens can be seen. Position and masking are separate switches.',
                  '移除位置信息不等于移除因果约束：掩码仍决定哪些词元可见。位置与掩码分别控制。',
                )}
              </p>
            </>
          )}
          {stage === 2 && (
            <>
              <div className="attention-controls">
                <div
                  className="head-switch"
                  aria-label={say('Attention head', '注意力头')}
                >
                  {[0, 1].map((h) => (
                    <button
                      key={h}
                      aria-pressed={head === h}
                      onClick={() => setHead(h)}
                    >
                      {say('Head', '头')} {h + 1}
                    </button>
                  ))}
                </div>
                <label className="transformer-check">
                  <input
                    type="checkbox"
                    checked={causal}
                    onChange={(e) => setCausal(e.target.checked)}
                  />
                  {say('Causal mask', '因果掩码')}
                </label>
              </div>
              <p className="transformer-formula">
                A = softmax(QKᵀ / √2 + mask) · V
              </p>
              <section
                className="attention-table-wrap"
                aria-label={say(
                  'Scrollable attention matrix',
                  '可滚动的注意力矩阵',
                )}
              >
                <table
                  className="attention-table"
                  style={{ minWidth: Math.max(320, (ids.length + 1) * 66) }}
                >
                  <caption>
                    {say(
                      'Computed weights · each row sums to 100%',
                      '计算得到的权重 · 每行之和为 100%',
                    )}
                    {ids.length > 4 && (
                      <span>
                        {' '}
                        ·{' '}
                        {say(
                          'Scroll to see every token →',
                          '横向滚动查看全部词元 →',
                        )}
                      </span>
                    )}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Q ↓ / K →</th>
                      {ids.map((id, j) => (
                        <th scope="col" key={j}>
                          {vocabulary[id]}
                          <small>{j}</small>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attention.weights.map((row, i) => (
                      <tr key={i} data-selected={selected === i || undefined}>
                        <th scope="row">
                          <button
                            onClick={() => setQuery(i)}
                            aria-pressed={selected === i}
                          >
                            {vocabulary[ids[i]]}
                            <small>{i}</small>
                          </button>
                        </th>
                        {row.map((weight, j) => (
                          <td
                            key={j}
                            style={{
                              backgroundColor: `rgba(31, 92, 69, ${(weight * 0.7).toFixed(3)})`,
                              color: weight > 0.5 ? '#fff' : undefined,
                            }}
                            title={
                              Number.isFinite(attention.scores[i][j])
                                ? `score ${attention.scores[i][j].toFixed(3)}`
                                : say('Future token masked', '未来词元已屏蔽')
                            }
                          >
                            {causal && j > i
                              ? '—'
                              : `${(weight * 100).toFixed(1)}%`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
              <dl className="transformer-vectors">
                <div>
                  <dt>Q[{selected}]</dt>
                  <dd>{vector(attention.q[selected])}</dd>
                </div>
                <div>
                  <dt>{say('Scores', '分数')}</dt>
                  <dd>
                    {attention.scores[selected]
                      .map((v) => (Number.isFinite(v) ? v.toFixed(2) : '−∞'))
                      .join(' · ')}
                  </dd>
                </div>
                <div className="vector-result">
                  <dt>Σ weight × V</dt>
                  <dd>{vector(attention.output[selected])}</dd>
                </div>
              </dl>
              <p className="transformer-insight">
                {say(
                  'Try query 0, then turn the mask off: future-token weights become nonzero. Switch heads to compare two different projections, using fixed teaching weights here.',
                  '选择第 0 个查询词元，再关闭掩码：未来词元的权重变为非零。切换注意力头，比较两组不同投影的结果；这里使用固定教学权重。',
                )}
              </p>
            </>
          )}
          {stage === 3 && (
            <dl className="transformer-vectors">
              <div>
                <dt>Concat(head₁, head₂) Wᴼ</dt>
                <dd>{vector(model.attention[selected])}</dd>
              </div>
              <div>
                <dt>X + Attention</dt>
                <dd>{vector(model.residual[selected])}</dd>
              </div>
              <div>
                <dt>LayerNorm</dt>
                <dd>{vector(model.normalized[selected])}</dd>
              </div>
              <div>
                <dt>FFN = ReLU(XW₁)W₂</dt>
                <dd>{vector(model.ffn[selected])}</dd>
              </div>
              <div className="vector-result">
                <dt>LayerNorm(X + FFN)</dt>
                <dd>{vector(model.output[selected])}</dd>
              </div>
            </dl>
          )}
          {(stage === 4 || stage === 5) && (
            <>
              <label
                className="temperature-control"
                htmlFor={`${panel}-temperature`}
              >
                {say('Temperature', '温度')}{' '}
                <output>{temperature.toFixed(1)}</output>
                <input
                  id={`${panel}-temperature`}
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                />
              </label>
              <p className="transformer-formula">
                P(next token) = softmax(logits / T)
              </p>
              <div className="token-probabilities">
                {ranking.slice(0, 5).map(({ p, id }) => (
                  <div key={id}>
                    <span>{vocabulary[id]}</span>
                    <span className="probability-track">
                      <span style={{ width: `${p * 100}%` }} />
                    </span>
                    <output>{(p * 100).toFixed(1)}%</output>
                  </div>
                ))}
              </div>
              <button
                className="pill pill-accent"
                disabled={ids.length >= 8}
                onClick={generate}
              >
                {ids.length >= 8
                  ? say(
                      '8-token limit · reset the example',
                      '已达 8 词元 · 重新选择示例',
                    )
                  : say('Append most likely token →', '加入概率最高的词元 →')}
              </button>
              {stage === 5 && (
                <p className="generated-context" aria-live="polite">
                  {say(
                    'Context sent into the next pass:',
                    '下一轮输入的上下文：',
                  )}{' '}
                  <strong>{ids.map((id) => vocabulary[id]).join(' ')}</strong>
                </p>
              )}
            </>
          )}
          <div className="transformer-navigation">
            <button disabled={stage === 0} onClick={() => setStage(stage - 1)}>
              ← {say('Previous', '上一步')}
            </button>
            <button disabled={stage === 5} onClick={() => setStage(stage + 1)}>
              {say('Next', '下一步')} →
            </button>
          </div>
        </div>
      </div>
      <p className="transformer-footnote">
        {say(
          'Computed with fixed, untrained weights. One simplified post-norm decoder block; no cross-attention or training loop. The original Transformer also has an encoder. This explorer focuses on autoregressive decoder computation.',
          '使用固定、未训练权重实际计算。展示单个简化的后置归一化解码器模块，不含交叉注意力与训练循环。原始 Transformer 还包含编码器，此处聚焦自回归解码器计算。',
        )}{' '}
        <a
          href="https://arxiv.org/abs/1706.03762"
          target="_blank"
          rel="noreferrer"
        >
          Attention Is All You Need ↗
        </a>
      </p>
    </div>
  );
}
