---
type: Verification Report
title: Merge method policy verification
description: Acceptance evidence and limitations for explicit merge policy at the recorded implementation revision.
status: draft
---

# Verification: PASS

Implementation revision: `b598be5ee531f6c9088a8e27acd229086e60f36f`.
This adds the readiness follow-up to the integration at `960f255`, which combined
the verified merge correction at `532dce2` with `main` at `47b1bbc`.
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
| Completed PR readiness and explicit scope limits | Fresh isolated dialogue cases 3 and 13; unchanged stale-evidence case 2 also rerun | PASS |

Detailed observations and limits: [execution evidence](evidence/forward-tests.md).
The [capability contract](../../specs/feature-development-workflow/spec.md)
and lifecycle guide reference the Git skill's canonical procedure.

## Repository gates

- PASS — `node --test scripts/*-test.js scripts/lib/*-test.js`: 74 tests,
  none skipped. Rerun after fixture adjustments and simplification using the
  dot reporter, then again after integration and the readiness follow-up.
- PASS — `node scripts/run-evals.js --min-rank1 95`: 171 checks; 98%
  rank-1 (104/106) after the readiness follow-up; the 95% floor is unchanged.
- PASS — `node scripts/validate-skills.js`, `validate-versions.js`,
  `validate-reference-links.js`, `validate-markdown-links.js`,
  `validate-commands.js`, `validate-artifact-paths.js`, and
  `validate-lifecycle-contracts.js` (each under `scripts/`).
- PASS — `bash hooks/session-start-test.sh` and `claude plugin validate .`.
- PASS — skill-creator `quick_validate.py` for the Git and delegation skills,
  using `uv run --with pyyaml python`; no repository dependency was added.
  The Git and router skills also pass after the readiness follow-up.
- PASS — `git diff --check`; final evidence documents also receive link and
  metadata validation.
- PASS — independent execution of all eight scenarios repeated after
  simplification, with artifact inspection, as described in the evidence record.
- NOT RUN — the standard `--behavioral git-workflow-and-versioning` Claude
  executor/grader path: CLI unauthenticated. Its dry-run passed; native forward
  tests supply behavioral evidence for the eight changed-scope cases.

## Integration verification

The author checked the conflict resolution against both parents. The delegation
skill keeps `main`'s stopping condition and this PR's single merge-policy handoff
bullet. The merge decision, fixtures, and action-based cases are byte-identical
to `fd28bbf`; their recorded behavioral evidence remains applicable within the
revision boundaries above. Repository gates were rerun after integration, and
the delegation skill passed its format validator. Track `012` replaces this
branch's conflicting `011` allocation; artifact and link validators pass.

## Readiness follow-up

At `b598be5`, all repository gates above were rerun. Three fresh native agents
received only the frozen Git skill and their scenario prompt. Case 3 calls for
publication and an explicit ready transition without another user request;
case 13 retains the requested draft; case 2 rejects readiness with stale
verification. The author inspected all responses against the eval criteria.
See the [forward-test record](evidence/forward-tests.md#readiness-follow-up).
These are dialogue decision probes, not live forge operations or another run of
the eight merge execution cases. The original merge-method procedure is unchanged.

## Conditional checks and limitations

This is an instruction and evaluation change. Browser, application build,
database migration, accessibility, and performance gates are not applicable.
The fake CLI uses only local files and the Node standard library. No live
merge, deployment, repository-setting change, or installed-cache update was
part of verification. These checks support the source change, not a claim
that installed agents already consume it or that deployed history was repaired.
