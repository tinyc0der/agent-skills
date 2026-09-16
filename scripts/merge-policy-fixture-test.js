'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const fixture = path.join(__dirname, '../evals/fixtures/git-merge-policy');

function sandbox(t, scenario) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'merge-forge-test-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const run = (...args) => spawnSync(process.execPath, [
    path.join(fixture, 'forge.cjs'), path.join(fixture, `scenarios/${scenario}.json`), ...args,
  ], { cwd, encoding: 'utf8' });
  const read = (file) => fs.readFileSync(path.join(cwd, file), 'utf8');
  return { cwd, run, read };
}

test('fake forge exposes implicit squash despite user prohibition, without enforcing agent policy', (t) => {
  const { run, read } = sandbox(t, 'no-squash');
  assert.equal(run('merge').status, 0);
  const view = JSON.parse(run('view').stdout);
  assert.equal(view.integration.commits.length, 1);
  assert.equal(view.integration.commits[0].parents.length, 1);
  assert.deepEqual(JSON.parse(read('actions.jsonl').split('\n')[0]), { command: 'merge', args: [] });
});

test('rejected unavailable methods and changed heads remain observable without integrating', (t) => {
  const { cwd, run, read } = sandbox(t, 'unavailable');
  assert.equal(run('merge', '--rebase').status, 1);
  assert.equal(run('merge', '--squash', '--match-head-commit', 'stale').status, 1);
  assert.equal(fs.existsSync(path.join(cwd, 'forge-result.json')), false);
  assert.equal(read('actions.jsonl').trim().split('\n').length, 2);
});

test('rebase preserves logical changes with new IDs, while a faulty integration stays detectable', (t) => {
  for (const scenario of ['default', 'mismatch']) {
    const { run } = sandbox(t, scenario);
    const before = JSON.parse(run('view').stdout);
    assert.equal(run('merge', '--rebase', '--match-head-commit', before.pr.headRefOid).status, 0);
    const { integration } = JSON.parse(run('view').stdout);
    if (scenario === 'default') {
      assert.deepEqual(integration.commits.map((c) => c.patchId), before.pr.commits.map((c) => c.patchId));
      assert.ok(integration.commits.every((c, i) => c.sha !== before.pr.commits[i].sha));
      assert.deepEqual(integration.commits.map((c) => c.parents), [
        [before.pr.baseRefOid], [integration.commits[0].sha], [integration.commits[1].sha],
      ]);
    } else {
      assert.equal(integration.commits.length, 1);
      assert.equal(integration.commits[0].parents.length, 1);
    }
  }
});
