---
name: delegate
description: Delegates bounded engineering tasks and phases to fresh Orca agent sessions with configurable runner choices. Use when the user asks for one-shot delegation, to coordinate phases across Codex, OpenCode, or Antigravity, to supervise a mixed-agent workflow, or to run delegate on a task.
---

# Delegate

## Overview

Give each bounded task one complete prompt in a fresh Orca session. Default to a one-shot handoff; keep a coordinator only when the user requests supervision, returned results, or automatic dependent phases. Default to Codex for specification, planning, and review, and OpenCode for implementation and independent verification; allow Antigravity or an explicit runner override.

This skill owns task boundaries and phase-to-runner policy. Orca's separately installed `orca-cli` and `orchestration` workflows own transport and lifecycle mechanics; the project's lifecycle skills own the engineering work. Runner choice is a preference, not evidence of quality.

## When to Use

- The user invokes `delegate` for a bounded task, requests a one-shot delegation, or asks to supervise phases across agent sessions.
- Planning or review should run in Codex while OpenCode or Antigravity implements and independently verifies.
- A phase result must return to the coordinator before another phase begins.

Use `orca-cli` directly for a plain ownership transfer needing no phase or runner policy. For ordinary work with no delegation request, use the relevant lifecycle skill directly. If the user asks only to discuss or draft a delegation plan, stop at that requested deliverable without launching workers or requiring access to a live runtime.

## Process

### 1. Select ownership and load the required workflow

| Requested endpoint | Mode and owner |
| --- | --- |
| Delegate a bounded task without supervision or returned results | One-shot handoff: the child owns the assigned task; the parent returns after confirmed prompt delivery. |
| Supervise, return results, or automatically coordinate dependent phases | Coordinated phases: the coordinator owns acceptance and progression; each task still receives one prompt in a fresh session. |

Preserve the entire requested endpoint. Do not silently turn a multi-phase assignment into a single phase, or convert an unmonitored handoff into supervision. A runner choice alone does not request supervision.

Load `orca-cli` and resolve the executable there. For coordinated phases, also load `orchestration` and read its version-matched guide with `ORCA skills get orchestration`, replacing `ORCA` with that executable. Use the live guides for syntax, ownership, dispatch authority, delivery receipts, and cleanup; installed copies may describe an older contract. One-shot handoffs create no Run, Task, or Dispatch and inject no coordinator lifecycle obligations.

Use the project's lifecycle router, such as `using-lucas-harness` or `using-agent-skills`, to determine which phases are required. If `lead-orchestrator` is installed, use its ownership and task-packet guidance. Do not copy those workflows or rerun intake for every child. The live Orca guide governs transport when older composing skills disagree.

Confirm the runtime and mode-specific skills are available before dispatch. For automatic progression without an active coordinator wait, verify documented runtime support for observing attempt termination independently of a child message, durably recording and redelivering notifications, and resuming the coordinator. Best-effort wake/nudge, TUI idle, and a Run identifier do not establish that support.

If that capability is absent, report the limitation before launch. Use an already authorized one-shot handoff or explicit supervised waiting; otherwise prepare the task packet and ask which endpoint the user wants. Never promise automatic continuation, silently substitute a polling loop, or implement a watcher by repeatedly prompting an agent. A missing dependency does not prevent a preparation-only deliverable. Never substitute generic subagents or plain terminal prompts and call them tracked Orca orchestration.

### 2. Resolve phase owners

Apply choices in this order: the user's current instruction, an existing project-specific mapping, then these defaults.

| Required phase | Default runner | Deliverable |
| --- | --- | --- |
| Specification and planning | Codex | Requirements, acceptance criteria, and an actionable plan |
| Implementation, tests, and fixes | OpenCode | Scoped changes and the implementer's check results |
| Independent verification | OpenCode in a fresh session | Acceptance trace, applicable check results, runtime evidence, and a readiness verdict |
| Independent review | Codex in a fresh session | Findings against the actual revision and acceptance criteria |
| Integration and final acceptance | Current coordinator | Reconciled evidence and the requested final outcome |

Antigravity can replace OpenCode for implementation, fixes, the implementer's own checks, or independent verification. Resolve the implementation and verifier runners separately: an override naming only one role changes only that role. Preserve explicitly chosen runners, models, reasoning effort, accounts, and budgets. Otherwise use the runner's configured model defaults. Do not infer a model from a CLI name or pass one provider's model flags to another.

For coordinated work, the default order of required phases is planning → implementation → independent verification → independent review → coordinator acceptance. Every phase, implementation slice, and repair uses a fresh session, even when the runner is unchanged. Reuse files and accepted artifacts rather than a growing conversation. A one-shot handoff assigns only its agreed bounded scope and does not promise later phases will run automatically.

State the selected mapping before launch and proceed within existing authorization. Do not add a planning phase to an already planned task or a review phase to a planning-only request. A phase transition does not itself require new user approval; preserve actual project gates and reuse approvals already given.

Verify that the requested runner is installed and supported by the selected Orca launch path. Agent IDs and executable names can differ: Antigravity is commonly the `antigravity` agent running `agy`. A binary on PATH does not prove prompt delivery or, in coordinated mode, tracked completion support. If a selected runner is unavailable or rejects dispatch, use an already authorized fallback or ask for a replacement; do not silently change runners or drop required completion tracking.

### 3. Give each session a bounded phase

Prepare one self-contained task packet per phase or independent implementation slice; create tracked Tasks only in coordinated mode. Supply:

- Objective, phase, acceptance criterion references, and the exact lifecycle skill name and resolved `SKILL.md` path to apply.
- Absolute repository/worktree path and branch, input artifact paths, and the revision or dirty working state the worker must inspect.
- Allowed write paths, exclusions, dependencies, expected output/report path, and checks whose evidence must be returned.
- Decisions and relevant user instructions from earlier phases, so a fresh session can work without chat history.
- For integration, the effective merge policy, prohibitions, and source from the [Git skill's merge method decision](../git-workflow-and-versioning/SKILL.md#merge-method-decision); carry them to the integration owner and subsequent handoffs.
- A stopping condition and result owner: write the assigned result artifact and end after completion or an unresolved blocker. For coordinated tasks, include the live blocking ask/reply mechanism in the packet: seek a necessary coordinator answer before declaring the task blocked, then return the required completion report. A one-shot child records unresolved blockers for its result owner without creating coordinator obligations. Do not start another phase, spawn descendants, or wait for more assignments.

Local sessions read shared artifacts and skills directly. Reference the relevant files and sections instead of copying whole documents or earlier conversations into the task packet. Each session reads the applicable project instructions, its assigned lifecycle skill, and the referenced inputs at phase entry. Resolve project paths from the named worktree and use absolute paths for skills outside it; confirm the inputs are accessible from that session.

Use the project's existing artifact locations and lifecycle report formats. In a track workflow, keep running context in `docs/tracks/<track-id>/notes.md` and link the existing spec or bug report, plan, task ledger, verification, and review as relevant. Otherwise use the task's designated brief and report paths. Delegation alone does not require a new track, handoff directory, or duplicate report. Planning may write its specified documents; verification and review may write their designated reports and evidence but must not edit implementation or test source. Route fixes to the selected implementation runner, including fixes discovered during PR preparation when PR work is authorized.

A fresh session does not require a new worktree. Use fresh agent sessions in the required current worktree by default, especially when inputs are uncommitted. Allow only one implementation writer at a time in that checkout. Freeze implementation edits while verification or review examines it. Use another checkout only as permitted by the selected Orca workflow, with an explicit base and a verified way to carry required artifacts and changes into it.

Send the complete packet once. Do not send progress inquiries, reminders, unsolicited advice, or "continue" prompts, and do not append another assignment after completion. A necessary answer to a worker's blocking question or an explicit user correction/cancellation is allowed through the live transport contract; it does not authorize ongoing coaching. Route new scope and repair findings to a fresh session after the prior attempt has settled or is confirmed stopped. An ambiguous send receipt is a reason to inspect the original request, never to send the packet again blindly.

### 4. Dispatch once and honor the selected endpoint

**One-shot handoff:** follow `orca-cli`'s terminal/worktree handoff path. Wait for startup readiness only when needed to avoid losing the initial prompt, then verify its send receipt. Report the session/worktree identity, delivery state, and expected result path; describe the task as handed off, not completed. End the parent turn without completion polling, terminal peeking, or follow-up prompts. The child writes its result and stops; it does not owe `worker_done` to a coordinator that no longer owns the task. Later inspection or work is a new user-owned request.

**Coordinated phases:** use the documented runtime-managed completion path when available. Lifecycle monitoring belongs to the runtime; an agent should wake for a result, a blocking question, or an actionable fault. Otherwise, only within explicitly requested supervised waiting, follow the live `orchestration` loop below. Do not start a tracked dispatch and abandon its settlement or cleanup obligations by ending the turn.

Follow the live `orchestration` supervised loop: create or bind the appropriate Run, create the task, start the selected worker, and verify its dispatch receipt. Prefer the guide's composed worker-start path; use lower-level paths only where documented and where they preserve actual dispatch authority.

Start dependent phases only after their inputs have been accepted. Task completion alone is not phase acceptance. The coordinator reads the returned artifacts, compares changes with the allowed scope, and checks the promised evidence before dispatching the next task. Parallelize only independent tasks with safe file ownership and a merge step.

For explicit supervised waiting, use the longest documented event-wait window compatible with host responsiveness. Where the host supports background execution, keep one outstanding event wait across tool yields instead of issuing a new short check each time. Do not build a repeated short-timeout loop such as `--timeout-ms 40000` as the default. Process and acknowledge deliveries according to the live guide; a timeout never calls for a prompt to the child. After settlement, release the worker or honor explicit retention, then launch any next task in a fresh session rather than reuse its conversation.

Require an accepted completion report from the actual dispatched worker with the correct task/dispatch identity and explicit outcome. Failed or stale completion reports cannot release dependent phases. Never manufacture worker completion from the coordinator, and do not use a manual completed status to disguise an unsupported runner.

#### Missing completion and runtime recovery

Treat attempt termination and successful work as separate facts. A runtime-owned end signal must be tied to the actual attempt; it cannot replace a missing worker report with invented success. The child writes the result artifact before its terminal report, so recovery can inspect saved work without extending that conversation.

| Observation | Action |
| --- | --- |
| Accepted completion with a report for the expected target | Validate artifacts and checks, then accept or reject the phase. |
| Proven attempt termination without the required completion report | Preserve artifacts and classify the outcome as unknown/incomplete; use the live recovery contract before a fresh recovery task. Do not advance dependent work or ask the old child to "send done." |
| Timeout, TUI idle, stale heartbeat, or lost connection | Preserve the live/unverifiable state and follow documented inspection or escalation. These observations do not authorize success, stop, release, or a duplicate worker. |
| Replayed notification or uncertain delivery | Resolve the original attempt/delivery and acknowledge idempotently; do not re-dispatch the work. |

A supported runtime should persist attempt termination and retry notification delivery even if the child forgets its event. This is a runtime capability requirement, not something a skill prompt can guarantee. If the live guide still requires worker-authored `worker_done`, retain that contract and its missing-report recovery path. Never synthesize `worker_done`, infer success from process exit, or claim runtime-owned settlement exists without evidence.

#### Shared phase handoff

Every planner, worker, reviewer, and verifier writes this summary in its assigned result artifact, referencing the lifecycle skill's report rather than duplicating it. In coordinated mode, also return it through the live completion mechanism. If the existing report already covers a field, link its relevant section. Keep useful new context in the existing workflow notes or brief within the assigned write scope.

```markdown
## Phase handoff

- Phase / runner: <assigned role and actual runner>
- Orca identity: <actual task/dispatch identifiers; or session identity for an untracked handoff>
- Worktree / branch: <absolute worktree path>; <branch>
- Target: <commit plus reproducible working-tree snapshot if dirty>
- Skills applied: <names and resolved SKILL.md paths>
- Delivery: <complete | partial | blocked>
- Summary: <what this phase produced or found>
- Artifacts: <project paths and relevant sections for outputs>
- Evidence / verdict: <phase report path and verdict; or applicable check results>
- Context / blockers: <notes or brief section; essential context not yet recorded>
- Next action: <recommendation for the result owner>
```

Delivery describes whether the assigned phase produced its result; it does not approve the implementation. Preserve the lifecycle report's verdict, including FAIL or INCOMPLETE. For coordinated work, the coordinator reads and accepts or rejects the artifacts before supplying them in the next task packet. The receiving session reads those local sources itself. A handoff recommendation does not authorize a child to start another phase. The remaining steps apply when verification or review belongs to the requested coordinated workflow; a one-shot dispatch ends at its handoff receipt.

### 5. Verify independently

When verification is required, dispatch it to a fresh session using the selected verifier runner after accepting the implementation output. The default verifier is OpenCode; Antigravity is an alternative. The implementer still runs checks while building; the verifier independently tests the assembled result against acceptance criteria. Load the project's `verification-and-validation` skill when available; otherwise use its documented verification workflow with the minimum report contract below.

Give the verifier the requirements, accepted plan, exact implementation revision or reproducible working-tree snapshot, environment and check instructions, and the implementer's report. Require the verifier to run applicable checks and observe relevant runtime behavior itself. The implementer's report supplies context, not a substitute for independent evidence. For changes with no runtime surface, record why runtime checks do not apply.

The verifier returns a report tied to the target revision with each acceptance criterion mapped to evidence, exact commands and exit statuses, runtime observations where applicable, and any blockers. Mark checks PASS, FAIL, NOT RUN, or NOT APPLICABLE with reasons. The readiness verdict is PASS only when all required evidence passes, FAIL when a required check fails, or INCOMPLETE when required evidence is missing. A successfully delivered report with FAIL or INCOMPLETE does not unlock review or final acceptance.

Send failures to a fresh session of the implementation runner for a bounded fix; send missing prerequisites to the coordinator to resolve. Reverify the changed result before continuing. The verifier reports findings and does not patch the implementation, weaken acceptance criteria, or treat an unavailable check as passing.

### 6. Review, repair, and finish

Give review a fresh Codex session with the accepted plan, acceptance criteria, actual diff, and the accepted verifier report when verification is required. Review assesses code quality and risks using that evidence. Record the reviewed commit plus any uncommitted changes, or another reproducible snapshot identity. Do not accept an earlier verification or review report after the implementation changes.

When review finds a blocking issue, create a bounded fix task in a fresh implementation session, return the updated revision to a fresh verifier when verification is required, then obtain fresh review of that revision. Rerun affected checks and any regression gates required by the project. Continue authorized, actionable fixes autonomously. If the same blocker persists after two fix attempts without new evidence or an actionable next step, preserve the artifacts and raise the concrete blocker instead of looping indefinitely. Honor Orca's dispatch circuit breaker separately.

Keep the coordinator responsible for integration, any lifecycle checks still required, and final acceptance. Delegating phases does not add permission to publish, merge, deploy, or message people. Complete the requested endpoint, then report the phase owners, artifact locations, verification results, and any remaining blocker. Distinguish a prepared delegation plan from phases that actually ran.

## Example Requests

- `Use delegate for a one-shot implementation of this approved task. Return after delivery; save the child's result in the existing track.`
- `Use delegate to build this feature. Codex plans and reviews; OpenCode implements and verifies in separate sessions.`
- `Use delegate with Antigravity for implementation, fixes, and verification in separate sessions. Keep all phases in this worktree.`
- `Use delegate for implementation and review only; the existing plan is already approved.`

## Common Rationalizations

| Rationalization | Correction |
| --- | --- |
| The CLI is installed, so it is a supported worker. | Check actual dispatch support and its receipt. |
| The worker said done, so start the next phase. | Validate authoritative completion and accept its artifacts first. |
| The implementer's tests passed, so independent verification is done. | The verifier must check the accepted target and return its own evidence. |
| The coordinator can quickly fix the review findings. | Keep edits with the assigned implementation owner. |
| Every phase needs another approval. | Continue under existing authorization unless a real gate applies. |
| A short check timed out, so nudge the child. | Silence does not call for another prompt; use the selected completion path. |
| The process ended, so the work passed. | Termination proves the attempt ended; acceptance still needs its report and evidence. |
| Reuse the implementer for this small fix. | A new bounded task gets a fresh session with artifact references. |

## Red Flags

- A worker advances to the next phase or creates its own delegation tree.
- Runner fallback occurs without authorization, or a prompt-only session is presented as tracked work.
- Verification or review reads a changing checkout, or later sessions cannot access predecessor artifacts.
- The verifier patches code or approves the result using only the implementer's report.
- An old report or a failed dispatch unlocks dependent work.
- A default handoff grows a polling loop, or a coordinator promises automatic continuation without runtime support.
- Missing completion triggers repeated prompts, invented success, or another writer while the prior attempt may still be active.

## Verification

Apply these checks to the requested execution scope; a plan-only request needs a reviewable mapping and task packets, with no claim that workers ran.

- [ ] Only required phases ran, using the resolved runner mapping and requested settings.
- [ ] A one-shot handoff has a confirmed send receipt and result destination, with no supervision or claim of completed work.
- [ ] Coordinated phases have valid Orca task/dispatch provenance and accepted results; automatic continuation uses verified runtime support.
- [ ] Each bounded task received one complete packet in a fresh session; only necessary blocking replies or explicit user steering added input.
- [ ] Missing completion preserves an unknown/incomplete outcome and work; timeout, idle, and contact loss never manufacture success or authorize a duplicate.
- [ ] Each session received accessible inputs and stayed within its phase and write scope.
- [ ] Each handoff identifies its target and links accessible local artifacts and skills using the existing workflow's report formats and locations.
- [ ] When verification is required, a separate verifier returned PASS against the final implementation state with independent acceptance evidence.
- [ ] When review is required, it covers the final implementation state; blocking findings and required checks are resolved.
- [ ] Worker resources are accounted for through the live orchestration cleanup contract.
- [ ] Existing authorization was preserved and the requested endpoint is complete, or a concrete blocker is reported.
