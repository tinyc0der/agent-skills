---
type: Verification Evidence
title: Merge method execution probes
description: Observed commands, records, and integration results from isolated merge policy evaluations.
status: draft
---

# Merge method execution probes

## Target and method

Final implementation: `532dce246ae29155c6677b2fdb7f7f4b94c2d4d8`.
After the owner requested simpler wording, all eight probes were repeated at
`a296cd3fabc23a1790a1e500260f9f06c4b00970`; every copy matches SHA-256
`9506932a6f3de91535a30f57abb7ae47deb3103e2098f7c1ea378476e7fef50f`.
The final six-word clarification explicitly names the target, outcome, and
pending queue state. It received source review and static checks, not another
behavioral run. Method selection and execution instructions are unchanged.

On September 16, 2026, fresh native agents executed cases 5–12 from
[the Git skill evals](../../../../evals/cases/git-workflow-and-versioning.json),
one case per disposable Git workspace created by `materializeWorkspace`.
They received the skill, selected request, and raw fixture inputs, without the
expectations or proposed correction. They used the local fake forge, which
records attempted commands and does not enforce user/project method policy.
The standard Claude runner was unavailable (`claude auth status` reported
`loggedIn: false`); these are independent forward tests, not Claude grader runs.

The coordinator read every merge record, inspected actual action logs and
result graphs, checked unchanged tracked inputs, and asserted each selected
flag and head guard. The refreshed runs used the final fixture inputs; their
raw logs, records, and inspector output are retained locally under the ignored
`evals/results/merge-policy/simplified/` directory. The table below preserves
the outcomes. Earlier runs also passed, including a replay against the final
fixture, and remain under the parent results directory.

## Observed actions

All executed merges used `--match-head-commit` with reviewed head
`a586f3aaed927059bbbfa9c6644835ed18f87874`. Their log sequence was exactly
`view → merge → view`, with one merge attempt. Case 10 logged only `view`.
Each record identifies the policy source, PR/head, actual invocation, and
outcome; merged cases also record the resulting commit/range and verification.

| Case | Actual method/action | Observed outcome | Eval |
| --- | --- | --- | --- |
| 5: user prohibits squash | `--rebase` | Prohibition recorded; three logical commits preserved | PASS |
| 6: handoff prohibits squash, history used squash | `--rebase` | Prior decision and source retained; history did not override it | PASS |
| 7: project selects merge commits | `--merge` | Two-parent merge retains the reviewed head; no repeated question | PASS |
| 8: user explicitly selects squash | `--squash` | Authorized combined change verified; no refusal or fallback substitution | PASS |
| 9: local fixups were squashed | `--rebase` | Local cleanup did not authorize PR squash or another local rewrite | PASS |
| 10: only squash available, user prohibits it | No merge attempted | PR remains open; precise conflict and required decision recorded | PASS |
| 11: no method preference | `--rebase` | Record cites the harness fallback; no redundant question | PASS |
| 12: forge returns squash after requested rebase | `--rebase` | Agent records integration verification FAIL and stops; no retry or history rewrite | PASS |

For rebase, the three patch IDs remain ordered in a new linear chain ending at
`fff6778c5768285d1039889f385b375a210ec7d5`. The merge-commit result is
`14091a9f2461267ee7e02525b4f1f2923f1c9849`, whose parents are the base and
reviewed head. Squash results end at `f77695ae7ad3ec2fa6e918b510913320e4ad7ea5`
and combine the three patch IDs in one commit. These synthetic identifiers
describe fixture state, not real FastPodcast history.

## Baseline and evaluation refinements

An initial old-skill probe chose rebase; it did not reproduce the historical
squash. Review then identified that the fixture's example itself used
`--rebase`. The example was made method-neutral, and a fresh pair repeated
case 11 with identical final fixture inputs and no expected answers:

- Source `0e9bac9`: chose `--merge`, explicitly describing this as a
  discretionary choice to preserve commit identities.
- Updated skill: chose `--rebase` and cited the canonical harness fallback.

Both actually executed guarded commands and verified the resulting graph.
This demonstrates the new decision rule in the sampled run; it neither
reconstructs the prior incident nor establishes a statistical reliability rate.
All eight cases were subsequently repeated after the owner-requested
simplification, using neutral examples. The fault declaration for case 12 was
moved out of the assigned request into server fixture data before that case ran.

## Limits

The fake models method availability, a head guard, and distinguishable commit
graphs. It performs no network or real Git merge. Live forge behavior, merge
queues, concurrency races, and repeated-session compliance are not established
by these probes. Fixture tests validate the fake's logging and rejection
behavior; structural and routing checks remain separate evidence.

## Readiness follow-up

Revision `b598be5ee531f6c9088a8e27acd229086e60f36f` adds the final readiness
transition. Three fresh native agents received only the complete frozen Git
skill and one dialogue prompt each, with no expected answer or prior findings.
They did not inspect other cases or perform live forge operations. The author
inspected their saved responses against the case expectations.

| Case | Observed decision | Result |
| --- | --- | --- |
| 3: ordinary completed implementation | Publish, create the missing PR, explicitly mark ready, and confirm its state without another request | PASS |
| 13: user requests draft for a walkthrough | Retain draft and report the user's reason despite passing gates | PASS |
| 2: verification predates the current head | Keep draft, refresh affected verification, then mark ready once gates pass | PASS |

The frozen skill SHA-256 is
`0e1353b722f2db1a3ee7fe9d65cd5a5c6d8a5e27346e62d6d3b93e19a7c19e94`.
Prompts, responses, and their hash manifest are retained locally under
`evals/results/merge-policy/readiness/` (ignored). These probes establish sampled
decisions, not live state transitions or a reliability rate. The standard Claude
executor/grader remains unavailable because the CLI is unauthenticated.
