---
type: Verification Report
title: Capability specs and numbered tracks verification
description: Recorded checks, outcomes, and evaluated revisions for capability specs and numbered tracks.
---

# Verification: INCOMPLETE

Implementation revision: `b821f67e6f00abcee5c72a4980015ab39d30f7f8`.

The cutover is commit `09f701c`; the final follow-up clarifies the bounded-bug build entrypoint and renders Markdown command paths explicitly. This report is a later evidence-only artifact and does not claim that its own commit was part of the evaluated implementation.

## Acceptance Trace

| Contract | Evidence | State |
| --- | --- | --- |
| Canonical capability specs and numbered tracks have separate homes | Artifact-path validator passes across 34 producers/consumers; actual directory checks reject execution artifacts under specs and duplicate numeric track ids | PASS |
| Memory skill defines ownership, NNN-name allocation, proposal isolation, and reconciliation | Static skill review and structure validation; new execution fixture tests allocation above existing 001/007 tracks and leaves the accepted spec unchanged | PASS for static checks; behavioral check NOT RUN |
| Lifecycle gates require capability spec reconciliation | Lifecycle validator passes, including all three PR/verify/review adapters; regression case rejects missing PR reconciliation | PASS |
| Historical evidence survives the move | Plan, task ledger, verification, review, and ship files in track 001 compared byte-for-byte with `e217fb1` | PASS |
| Commands, links, and routing stay aligned | Command parity and description checks, Markdown/reference-link validation, and 144 routing checks pass | PASS |
| Agents follow the revised workflow | Targeted memory-management eval 5 rejected by the executor's session quota before execution; affected spec and verification scenarios updated but not attempted under that same quota | NOT RUN |

## Repository Checks

- PASS — 68 automated Node tests in the eight existing test files: artifact paths, Markdown links, skill lint, eval runner, command parity, versions, lifecycle contracts, and reference links. The cutover was tested before `09f701c`; the final prompt-only follow-up leaves these executable validators and test bodies unchanged.
- PASS — `node scripts/run-evals.js --min-rank1 80`: 144 checks, 0 errors/warnings, rank-1 88% (77/88).
- PASS — `node scripts/validate-skills.js`: 27 skills, 0 errors/warnings.
- PASS — `node scripts/validate-commands.js`: 10 commands, parity and descriptions aligned.
- PASS — `node scripts/validate-artifact-paths.js`, `node scripts/validate-lifecycle-contracts.js`, and `node scripts/validate-reference-links.js`.
- PASS — `node scripts/validate-markdown-links.js` and Git whitespace checks.
- NOT APPLICABLE — application build, browser runtime, deployment, or database migration: this change modifies workflow instructions, validators, and fixtures.

The artifact-path, lifecycle, and command validators were rerun after the final prompt follow-up. No tests were disabled or expectations weakened to obtain a pass.

## Behavioral Limitation

Memory-management eval 5 was selected in an isolated copy of the unchanged repository runner and fixture. Claude rejected the request with: `You've hit your session limit · resets 6:10pm (Asia/Saigon)`. No behavioral pass is claimed. The local diagnostic is under ignored `evals/results/capability-specs-and-tracks/`; earlier results from the OKF v0.2 work do not certify this revision.

Run the affected behavioral scenarios when capacity is available before claiming full workflow verification or merge readiness. No remote push, PR, merge, deployment, or quota bypass was performed.
