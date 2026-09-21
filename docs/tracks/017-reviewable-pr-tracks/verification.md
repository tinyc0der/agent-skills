---
type: Verification Report
title: Reviewable PR tracks verification
description: Evidence for the one-PR track rule at implementation revision 040af19.
status: draft
---

# Verification: PASS

Implementation revision: `040af190efe4829a638ce99c20abed5c1199c90e`.
Base: `1b5f7f3739aad8fc03a441731891fc8dda41edcd` (`main`). Later commits only save track evidence.

## Acceptance trace

| Criterion | Evidence | Result |
| --- | --- | --- |
| Split large intent, including one capability; keep small work together | Independent execution of planning case 3 produced four import children and retained the copy edit as one task | PASS |
| Each track has one PR outcome, checks, dependencies/base, and safe merge state | Generated parent plan records all fields for children 041–044; all share `imports` and one later launch | PASS |
| Build and review check the combined PR and handle scope growth | Reviewed delivery fork, build, Git, and review rules; migration expand and destructive contract require separate tracks and PRs | PASS |
| Skills, adapters, and accepted contract agree | Reviewed all three adapters; command, lifecycle, artifact, and link validators pass; capability spec reconciled | PASS |
| Behavioral cases and repository checks protect the change | Five planning expectations passed; checks below pass | PASS |

## Behavioral evidence

A fresh agent used a temporary copy of the skills and the inputs from [planning case 3](../../../evals/cases/planning-and-task-breakdown.json), without the expected answer or grading criteria. It saved 12 documents in isolated local worktrees. The author inspected the generated plan, child index, map, child stub, and small-task spec against all five expectations.

- `030-import-rollout` became a coordination initiative. Its ledger indexes `041-import-upload-queue` → `042-import-validated-preview` → `043-import-retry-execution` → `044-import-safe-undo`.
- Each child has one outcome, exclusions, evidence, a prerequisite/base, and disabled behavior until the shared launch. All retain the same `imports` capability owner.
- The parent contains child order and integration checks, without child implementation tasks.
- `040-empty-import-message` stays one bounded task and PR. It reuses the existing test and needs no parent or child tracks.
- No implementation, push, PR, merge, or deployment occurred in the evaluation. Missing product code and commands were reported rather than invented.

The evaluation used the core split rules before final edits to bug-child routing, already-unmerged scope repair, and one example path. Comparing that snapshot with the final skills confirmed the exercised feature-planning and small-task paths are unchanged. Those later paths received source review and repository checks, not a claim of additional execution coverage.

## Repository checks

All commands were run through `rtk`; each exited 0 after the path correction.

| Check | Result |
| --- | --- |
| `node --test scripts/*-test.js scripts/lib/*-test.js` | 74 passed |
| `node scripts/run-evals.js --min-rank1 95` | 174 checks; 98% rank-1; no errors or warnings |
| `node scripts/validate-skills.js` | 30 skills; no errors or warnings |
| `node scripts/validate-versions.js` | Manifests agree on 0.7.1 |
| `node scripts/validate-commands.js` | 11 commands agree across all adapters |
| `node scripts/validate-artifact-paths.js` | 34 files pass |
| `node scripts/validate-lifecycle-contracts.js` | PASS |
| `node scripts/validate-reference-links.js` | 30 skills pass |
| `node scripts/validate-markdown-links.js` | PASS |
| `bash hooks/session-start-test.sh` | JSON payload OK |
| `bash hooks/simplify-ignore-test.sh` | 21 passed |
| Skill-creator `quick_validate.py` for all eight changed skills | All valid |
| `claude plugin validate .` | PASS |
| `git diff main...HEAD --check` | PASS |

[GitHub CI for the implementation](https://github.com/tinyc0der/agent-skills/actions/runs/35584080316) also passed all four jobs, including plugin installation.

## Limits

This changes instructions and evaluation inputs. Application build, browser, security, performance, and production migration checks are not applicable. The selected behavioral case ran through a native agent; the full paid headless behavioral suite was not run. Merge and deployment are outside this request.
