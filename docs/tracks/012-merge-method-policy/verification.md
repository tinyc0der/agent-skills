---
type: Verification Report
title: Merge method policy verification
description: Acceptance evidence and limitations for explicit merge policy at the recorded implementation revision.
status: draft
---

# Verification: PASS

Implementation revision: `532dce246ae29155c6677b2fdb7f7f4b94c2d4d8`.
Execution probes were refreshed at `a296cd3` after simplification. The final
six-word record/queue clarification received source review and static checks;
see the [execution evidence](evidence/forward-tests.md) for revision boundaries.
Later updates confined to this track record evidence and handoff state.

## Acceptance trace

| Criterion from bug report | Evidence | State |
| --- | --- | --- |
| Canonical resolution and owner-selected rebase fallback | Git skill procedure; cases 5, 7, 8, 11, including neutral before/after probe | PASS |
| Handoff prohibitions and independent local cleanup | Delegation pointer; action-based cases 6 and 9 | PASS |
| Explicit guarded execution, receipt, actual result verification | All executed probes recorded flags/head/source/result; case 12 detects wrong graph | PASS |
| No repeated approval or silent method substitution | Cases 7 and 10; unavailable case contains zero merge attempts | PASS |
| Requested behavioral regression coverage | Six requested cases plus default and mismatched-result cases; records inspected | PASS |

Detailed observations and limits: [execution evidence](evidence/forward-tests.md).
The [capability contract](../../specs/feature-development-workflow/spec.md)
and lifecycle guide reference the Git skill's canonical procedure.

## Repository gates

- PASS — `node --test scripts/*-test.js scripts/lib/*-test.js`: 74 tests,
  none skipped. Rerun after fixture adjustments and simplification using the
  dot reporter.
- PASS — `node scripts/run-evals.js --min-rank1 95`: 170 checks; 98%
  rank-1 (103/105); the 95% floor and existing cases are unchanged.
- PASS — `node scripts/validate-skills.js`, `validate-versions.js`,
  `validate-reference-links.js`, `validate-markdown-links.js`,
  `validate-commands.js`, `validate-artifact-paths.js`, and
  `validate-lifecycle-contracts.js` (each under `scripts/`).
- PASS — `bash hooks/session-start-test.sh` and `claude plugin validate .`.
- PASS — skill-creator `quick_validate.py` for the Git and delegation skills,
  using `uv run --with pyyaml python`; no repository dependency was added.
- PASS — `git diff --check`; final evidence documents also receive link and
  metadata validation.
- PASS — independent execution of all eight scenarios repeated after
  simplification, with artifact inspection, as described in the evidence record.
- NOT RUN — the standard `--behavioral git-workflow-and-versioning` Claude
  executor/grader path: CLI unauthenticated. Its dry-run passed; native forward
  tests supply behavioral evidence for the eight changed-scope cases.

## Conditional checks and limitations

This is an instruction and evaluation change. Browser, application build,
database migration, accessibility, and performance gates are not applicable.
The fake CLI uses only local files and the Node standard library. No live
merge, deployment, repository-setting change, or installed-cache update was
part of verification. These checks support the source change, not a claim
that installed agents already consume it or that deployed history was repaired.
