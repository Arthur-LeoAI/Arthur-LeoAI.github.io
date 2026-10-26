// Teaching decoder: one post-norm block, two heads, four dimensions, untrained weights.
export const vocabulary = [
  'AI',
  'can',
  'help',
  'we',
  'build',
  'useful',
  'tools',
  'work',
  '.',
];
export const examples = [
  [0, 1, 2],
  [3, 4, 5, 6],
];
const matrix = (rows: number, cols: number, seed: number) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from(
      { length: cols },
      (_, c) => Math.sin((r + 1) * (c + seed + 1)) * 0.7,
    ),
  );
export const embeddings = matrix(vocabulary.length, 4, 2);
const project = (vector: number[], weights: number[][]) =>
  weights[0].map((_, j) =>
    vector.reduce((sum, value, i) => sum + value * weights[i][j], 0),
  );
const add = (a: number[], b: number[]) => a.map((value, i) => value + b[i]);
export function softmax(values: number[]) {
  const max = Math.max(...values);
  const exps = values.map((value) => Math.exp(value - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((value) => value / sum);
}
export function layerNorm(vector: number[]) {
  const mean = vector.reduce((a, b) => a + b, 0) / vector.length;
  const variance =
    vector.reduce((sum, value) => sum + (value - mean) ** 2, 0) / vector.length;
  return vector.map((value) => (value - mean) / Math.sqrt(variance + 1e-5));
}
export function computeTransformer(
  ids: number[],
  positional = true,
  causal = true,
  temperature = 1,
) {
  if (!ids.length || ids.some((id) => !Number.isInteger(id) || !vocabulary[id]))
    throw new Error('Use valid vocabulary tokens.');
  if (temperature <= 0) throw new Error('Temperature must be positive.');
  const positions = ids.map((_, position) =>
    Array.from({ length: 4 }, (_, dimension) => {
      const angle = position / 10000 ** ((2 * Math.floor(dimension / 2)) / 4);
      return positional
        ? dimension % 2 === 0
          ? Math.sin(angle)
          : Math.cos(angle)
        : 0;
    }),
  );
  const input = ids.map((id, i) => add(embeddings[id], positions[i]));
  const heads = [0, 1].map((head) => {
    const q = input.map((x) => project(x, matrix(4, 2, 3 + head * 5)));
    const k = input.map((x) => project(x, matrix(4, 2, 5 + head * 5)));
    const v = input.map((x) => project(x, matrix(4, 2, 7 + head * 5)));
    const scores = q.map((query, i) =>
      k.map((key, j) =>
        causal && j > i
          ? -Infinity
          : query.reduce((sum, value, d) => sum + value * key[d], 0) /
            Math.sqrt(2),
      ),
    );
    const weights = scores.map(softmax);
    const output = weights.map((row) =>
      [0, 1].map((d) =>
        row.reduce((sum, weight, j) => sum + weight * v[j][d], 0),
      ),
    );
    return { q, k, v, scores, weights, output };
  });
  const attention = input.map((_, i) =>
    project([...heads[0].output[i], ...heads[1].output[i]], matrix(4, 4, 13)),
  );
  const residual = input.map((x, i) => add(x, attention[i]));
  const normalized = residual.map(layerNorm);
  const ffn = normalized.map((x) =>
    project(
      project(x, matrix(4, 8, 17)).map((v) => Math.max(0, v)),
      matrix(8, 4, 19),
    ),
  );
  const output = normalized.map((x, i) => layerNorm(add(x, ffn[i])));
  const logits = project(
    output[output.length - 1],
    matrix(4, vocabulary.length, 23),
  );
  const probabilities = softmax(logits.map((value) => value / temperature));
  return {
    positions,
    input,
    heads,
    attention,
    residual,
    normalized,
    ffn,
    output,
    logits,
    probabilities,
  };
}
