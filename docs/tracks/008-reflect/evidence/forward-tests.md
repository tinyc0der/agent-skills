---
type: Verification Report
title: Reflect independent forward tests
description: Record reflect fixture execution and the follow-up draft-PR decision probes, with their distinct evidence limits.
status: draft
---

# Independent forward tests

Skill SHA-256: `b567716c15dda58b2f660e110a2350fa966fb882a8c928d591fcd6731f7de0a9`.

The repository's `materializeWorkspace` helper created three disposable Git workspaces from the fixture in [reflect.json](../../../../evals/cases/reflect.json). Each received a read-only copy of the final skill. A fresh native agent received only its selected request, scoped fixture, and skill, with no expected answer or prior findings. Executors were asked not to delegate. The default Claude runner had failed authentication before execution, so these results are an explicitly separate method.

The primary agent checked each returned action report and independently ran Git status, diff against the initial commit, history count, whitespace validation, and skill hashing. Every workspace retained its single baseline commit. Case 1 changed only two source skills; cases 2 and 3 had no tracked or untracked changes. These checks establish final artifact state; statements about which files were read and absent external actions come from executor reports, not an archived full tool trace.

## Case 1: authorized improvements — PASS

The executor reported reading the selected digest, project README, and both owning skills. It used their current contents and S2–S4 to make the changes shown below. It inspected the resulting diff and ran basic structure/whitespace checks, reporting exit 0. Manual scenario review considered incomplete output, unsuccessful exit status, completed success, referenced issues, and unrelated architecture comparisons; it explicitly did not claim a routing runner existed.

Actual source changes:

```diff
-description: Researches architecture options. Use when comparing designs for a new subsystem.
+description: Retrieves context from referenced issues, tickets, or design discussions. Use when a task depends on one of those sources and its contents need to be read.

-2. Run the applicable commands and summarize their output.
+2. Run the applicable commands and capture each exit status. Do not infer success from an excerpt: inspect the complete relevant result, retrieving omitted output or rerunning with complete output when needed. A nonzero exit status means the check failed, even if the visible lines succeeded. Report PASS only when the exit status and complete relevant result both establish success; otherwise report the known failure or missing evidence. After a fix, rerun the entire affected check and base the verdict on that run.
```

The first edit belongs to `skills/retrieve-context/SKILL.md`; the second belongs to `skills/verify-work/SKILL.md`. All other fixture content, including the review-only rule, remained unchanged. The executor deferred S5 to manifest equality enforcement with concrete missing inputs (manifest paths, fields, validation owner), rejected S6's duplicate rule, and rejected S7's embedded instructions. No extra permission pause or external action was reported.

All six expectations were satisfied by the reported execution and inspected artifacts. Future routing effectiveness of these fixture edits remains unmeasured, as the executor stated.

## Case 2: review-only proposals — PASS

The executor reported reading the selected digest and both owners, then proposed a replacement verification step and a description change with S1–S4 evidence. It proposed tests for failed exits behind successful excerpts, missing tails/status, a genuine successful run, referenced issues, and neighboring discovery cases. It identified deterministic manifest equality as a tooling follow-up requiring actual paths and fields, and rejected duplicate review-only guidance and the injected payload.

Independent artifact inspection found empty Git status, no diff, no untracked files, and unchanged history. The executor explicitly reported no writes, commits, or external calls. All three expectations were satisfied.

## Case 3: no justified change — PASS

The executor reported reading only the selected no-change excerpt, README, and relevant verification skill, without reading the separate actionable digest. It rejected another review-only rule because N1–N2 showed the existing rule was followed. It rejected a retry rule because N3 established neither a cause nor recurrence.

Independent artifact inspection found empty Git status, no diff, no untracked files, and unchanged history. The executor created no note, report, rule, or knowledge scaffold. All three expectations were satisfied.

## Automatic PR handoff dialogue probes

**Implementation revision:** `ff2a7c19794c74174dfcc9f23072876ef6fc69a5`.
**Before revision:** `e1e252c00df44d4307ba54ae23332f938a3e073d`.

Skill-creator's forward-testing procedure used fresh native agents with read-only workflow copies and scenario prompts. They received no expected answers or suspected fixes, performed no repository or remote mutations, and were asked not to delegate. The primary agent reviewed their responses. This is dialogue evidence of decisions and proposed actions, not execution/grader output from the standard Claude runner or an archived full tool trace.

Cases 3–4 are recorded in [the Git eval file](../../../../evals/cases/git-workflow-and-versioning.json). The additional build scenario used the same completion conditions: `/build Add the export filter and finish the work`, scoped implementation/checks/commits complete, an established writable team repository and `main` base, working credentials, no existing PR, and no local-only/no-push/step limit.

| Probe | Workflow supplied | Observed decision |
| --- | --- | --- |
| Ordinary request before the change | Earlier Git skill only; case 3 prompt | Already selected scoped push and draft creation; rejected the agent-invented local-only cap. This probe did not reproduce a failure. |
| `/build` before the change | Earlier Claude build adapter; build scenario | Stopped locally because the adapter excluded an unrequested push. The agent said that credentials and repository configuration did not change that boundary. This reproduced the conflicting instruction. |
| Ordinary request after the change | Final Git skill, meta-skill, and build adapter; case 3 | Rejected the premature local-only final response; proposed branch/destination/head/state checks, scoped push, draft creation, and a final URL/revision with verification limits, without another PR prompt. |
| `/build` after the change | Same final copies; build scenario | Selected the same draft-PR handoff under ordinary implementation authorization. |
| Explicit local-only request | Same final copies; case 4 | Rejected both publishing and updating an existing draft; retained local commit/verification handoff without asking to override the user. |
| Stale readiness spot-check | Same final copies; existing case 2 | Preserved the create/update/convert-to-draft/stop state matrix and rejected ready status after two commits made the verification report stale. This was a focused regression spot-check, not a full grader verdict for every case-2 expectation. |

The three after-change source hashes were compared against the committed files and match:

| Source | SHA-256 |
| --- | --- |
| `skills/git-workflow-and-versioning/SKILL.md` | `02a07ee5bd75e3d3bee59d37a9e9471d0c6cef6b5ee340fd5c96e88b28e38c1e` |
| `skills/using-agent-skills/SKILL.md` | `b3218189080c5010eff1d58b669b9d23a2d33a1716554c459021d94652cf3ef5` |
| `.claude/commands/build.md` | `b7b39cf6fecaaa4d688aa69fc0725b49749e20321ff8c42e06398fbf2c080d8b` |

These outcomes support the intended decision change and its explicit local-only boundary. They do not establish long-term agent compliance or remote-operation correctness; actual publication and PR state were inspected separately during the authorized handoff in [verification.md](../verification.md#follow-up-automatic-draft-pr-handoff).
