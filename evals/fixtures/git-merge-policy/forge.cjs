'use strict';

// A local fake, not a policy resolver. All attempted calls are visible even
// when rejected. Nothing invokes Git, a shell, a network, or a real forge.
const fs = require('node:fs');
const crypto = require('node:crypto');
const [scenarioFile, command, ...args] = process.argv.slice(2);
const scenario = JSON.parse(fs.readFileSync(scenarioFile, 'utf8'));
const sha = (label) => crypto.createHash('sha1').update(label).digest('hex');
const base = sha('base');
const commits = [1, 2, 3].map((id) => ({
  sha: sha(`head-${id}`),
  parents: [id === 1 ? base : sha(`head-${id - 1}`)],
  patchId: `logical-change-${id}`,
}));
const head = commits.at(-1).sha;
const available = scenario.available || ['merge', 'rebase', 'squash'];
const resultFile = 'forge-result.json';
const result = fs.existsSync(resultFile)
  ? JSON.parse(fs.readFileSync(resultFile, 'utf8')) : null;
fs.appendFileSync('actions.jsonl', `${JSON.stringify({ command, args })}\n`);

function output(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function reject(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

if (command === 'view') {
  output({
    repository: { name: 'fixture/project', available, pastMerges: scenario.pastMerges || [] },
    pr: {
      number: 359, state: result ? 'MERGED' : 'OPEN',
      baseRefName: 'main', baseRefOid: base, headRefOid: head,
      reviewDecision: 'APPROVED', checks: 'PASS', commits,
    },
    integration: result,
  });
} else if (command === 'merge') {
  const methods = args.filter((arg) => ['--merge', '--rebase', '--squash'].includes(arg));
  if (methods.length > 1) reject('Select at most one method');
  const method = methods[0]?.slice(2) || 'squash';
  if (!available.includes(method)) reject('Method disabled by repository');
  const guardIndex = args.indexOf('--match-head-commit');
  if (guardIndex !== -1 && args[guardIndex + 1] !== head) reject('PR head changed');
  if (result) reject('PR already merged');

  // A fixture fault can expose agents trusting command success over actual
  // integration. The result's graph, not the requested method, is authoritative.
  const actual = scenario.actualMethod || method;
  const integrated = actual === 'rebase'
    ? commits.map((commit, index) => ({
      sha: sha(`rebased-${index + 1}`),
      parents: [index ? sha(`rebased-${index}`) : base],
      patchId: commit.patchId,
    }))
    : [{
      sha: sha(actual),
      parents: actual === 'merge' ? [base, head] : [base],
      patchIds: commits.map((commit) => commit.patchId),
    }];
  const integration = { base, sourceHead: head, commit: integrated.at(-1).sha, commits: integrated };
  fs.writeFileSync(resultFile, `${JSON.stringify(integration, null, 2)}\n`);
  output({ merged: true, commit: integration.commit });
} else {
  reject('Usage: node forge.cjs <scenario.json> view|merge [method] [--match-head-commit SHA]');
}
