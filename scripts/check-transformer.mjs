import assert from 'node:assert/strict';
import { computeTransformer, layerNorm, softmax } from '../lib/transformer.ts';
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const model = computeTransformer([0, 1, 2]);
for (const head of model.heads)
  for (let i = 0; i < 3; i++) {
    near(
      head.weights[i].reduce((a, b) => a + b),
      1,
    );
    head.weights[i].slice(i + 1).forEach((w) => assert.equal(w, 0));
    for (let d = 0; d < 2; d++)
      near(
        head.output[i][d],
        head.weights[i].reduce((sum, w, j) => sum + w * head.v[j][d], 0),
      );
  }
const longer = computeTransformer([0, 1, 2, 3]);
assert.deepEqual(longer.output.slice(0, 3), model.output);
assert.notDeepEqual(
  computeTransformer([0, 1, 2], true, false).output[0],
  model.output[0],
);
assert.notDeepEqual(
  computeTransformer([0, 1, 2], false).heads[0].weights,
  model.heads[0].weights,
);
assert.notDeepEqual(model.heads[0].weights, model.heads[1].weights);
near(
  layerNorm([2, 3, 5, 7]).reduce((a, b) => a + b),
  0,
);
const entropy = (ps) => -ps.reduce((sum, p) => sum + p * Math.log(p), 0);
assert.ok(
  entropy(softmax([1, 2, 4].map((v) => v / 2))) >
    entropy(softmax([1, 2, 4].map((v) => v / 0.2))),
);
near(
  model.probabilities.reduce((a, b) => a + b),
  1,
);
assert.throws(() => computeTransformer([], true, true));
console.log(
  'Transformer invariants passed: normalization, causal isolation, weighted values, heads, position and temperature.',
);
