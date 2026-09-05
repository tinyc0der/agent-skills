---
name: delegate
description: Delegates engineering phases to separate Orca agent sessions with configurable runner choices. Use when the user asks to coordinate phases across Codex, OpenCode, or Antigravity, supervise a mixed-agent workflow, or run delegate on a task. For an unmonitored ownership handoff, use orca-cli.
---

# Delegate

## Overview

Keep the current session accountable while delegated phases run in separate Orca sessions. Default to Codex for specification, planning, and review, and OpenCode for implementation and independent verification; allow Antigravity for implementation or verification, or an explicit runner override.

This skill owns the phase-to-runner policy. Orca's separately installed `orchestration` workflow owns dispatch and completion mechanics; the project's lifecycle skills own the engineering work. Runner choice is a preference, not evidence of quality.

## When to Use

- The user invokes `delegate` for a task or asks to supervise phases across agent sessions.
- Planning or review should run in Codex while OpenCode or Antigravity implements and independently verifies.
- A phase result must return to the coordinator before another phase begins.

For a full ownership transfer without returned results, follow `orca-cli`. For ordinary work with no delegation request, use the relevant lifecycle skill directly. If the user asks only to discuss or draft a delegation plan, stop at that requested deliverable without launching workers.

## Process

### 1. Load the existing workflows

Load `orca-cli` and `orchestration`. Resolve the Orca executable through `orca-cli`, then read its version-matched orchestration guide with `ORCA skills get orchestration`, replacing `ORCA` with that executable. Use the live guide for command syntax, Run binding, dispatch authority, message acknowledgments, and worker cleanup; installed copies may describe an older contract.

Use the project's lifecycle router, such as `using-lucas-harness` or `using-agent-skills`, to determine which phases are required. If `lead-orchestrator` is installed, use its ownership and task-packet guidance. Do not copy those workflows or rerun intake for every child. The live Orca guide governs transport when older composing skills disagree.

Confirm the runtime and required skills are available before dispatch. If a dependency is missing, name it and keep dependent work pending. Never substitute generic subagents or plain terminal prompts and call them Orca orchestration.

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

The default order, for phases required by the task, is planning → implementation → independent verification → independent review → coordinator acceptance. The verifier uses a fresh session separate from the implementer, even when both use OpenCode or Antigravity. The reviewer also uses its own fresh session.

State the selected mapping before launch and proceed within existing authorization. Do not add a planning phase to an already planned task or a review phase to a planning-only request. A phase transition does not itself require new user approval; preserve actual project gates and reuse approvals already given.

Verify that the requested runner is installed and supported by the current Orca dispatch path. Agent IDs and executable names can differ: Antigravity is commonly the `antigravity` agent running `agy`. A binary on PATH does not prove it can receive a dispatch and report completion. If a selected runner is unavailable or rejects dispatch, use an already authorized fallback or ask for a replacement; do not silently change runners or drop completion tracking.

### 3. Give each session a bounded phase

Create one tracked task per delegated phase, or per independent implementation slice when the plan calls for it. Supply:

- Objective, phase, acceptance criterion references, and the exact lifecycle skill name and resolved `SKILL.md` path to apply.
- Absolute repository/worktree path and branch, input artifact paths, and the revision or dirty working state the worker must inspect.
- Allowed write paths, exclusions, dependencies, expected output/report path, and checks whose evidence must be returned.
- Decisions and relevant user instructions from earlier phases, so a fresh session can work without chat history.
- A phase boundary: return the result to this coordinator; do not start the next phase, spawn descendants, or take ownership of the parent workflow.

Local sessions read shared artifacts and skills directly. Reference the relevant files and sections instead of copying whole documents or earlier conversations into the task packet. Each session reads the applicable project instructions, its assigned lifecycle skill, and the referenced inputs at phase entry. Resolve project paths from the named worktree and use absolute paths for skills outside it; confirm the inputs are accessible from that session.

Use the project's existing artifact locations and lifecycle report formats. In a track workflow, keep running context in `docs/tracks/<track-id>/notes.md` and link the existing spec or bug report, plan, task ledger, verification, and review as relevant. Otherwise use the task's designated brief and report paths. Delegation alone does not require a new track, handoff directory, or duplicate report. Planning may write its specified documents; verification and review may write their designated reports and evidence but must not edit implementation or test source. Route fixes to the selected implementation runner, including fixes discovered during PR preparation when PR work is authorized.

A fresh session does not require a new worktree. Use fresh agent sessions in the required current worktree by default, especially when inputs are uncommitted. Allow only one implementation writer at a time in that checkout. Freeze implementation edits while verification or review examines it. Use another checkout only as permitted by `orchestration`, with an explicit base and a verified way to carry required artifacts and changes into it.

### 4. Dispatch and accept phase results

Follow the live `orchestration` supervised loop: create or bind the appropriate Run, create the task, start the selected worker, and verify its dispatch receipt. Prefer the guide's composed worker-start path; use lower-level paths only where documented and where they preserve actual dispatch authority.

Start dependent phases only after their inputs have been accepted. Task completion alone is not phase acceptance. The coordinator reads the returned artifacts, compares changes with the allowed scope, and checks the promised evidence before dispatching the next task. Parallelize only independent tasks with safe file ownership and a merge step.

Use bounded orchestration event waits within the host's responsiveness limits. Process and acknowledge deliveries according to the live guide, answer worker questions through tracked replies, and handle worker release or retention there. A timeout or idle terminal does not mean failure or completion. Inspect uncertain launch receipts before retrying so two workers do not edit the same task.

Require an accepted completion report from the actual dispatched worker with the correct task/dispatch identity and explicit outcome. Failed or stale completion reports cannot release dependent phases. Never manufacture worker completion from the coordinator, and do not use a manual completed status to disguise an unsupported runner.

#### Shared phase handoff

Every planner, worker, reviewer, and verifier returns this concise summary through the live orchestration completion mechanism. Write phase artifacts using the assigned lifecycle skill, then reference them here. If the existing report already covers a field, link its relevant section rather than repeating the content. Keep useful new context in the existing workflow notes or brief within the assigned write scope.

```markdown
## Phase handoff

- Phase / runner: <assigned role and actual runner>
- Orca task / dispatch: <actual identifiers from this dispatch>
- Worktree / branch: <absolute worktree path>; <branch>
- Target: <commit plus reproducible working-tree snapshot if dirty>
- Skills applied: <names and resolved SKILL.md paths>
- Delivery: <complete | partial | blocked>
- Summary: <what this phase produced or found>
- Artifacts: <project paths and relevant sections for outputs>
- Evidence / verdict: <phase report path and verdict; or applicable check results>
- Context / blockers: <notes or brief section; essential context not yet recorded>
- Next action: <recommendation for the coordinator>
```

Delivery describes whether the assigned phase returned its result; it does not approve the implementation. Preserve the lifecycle report's verdict, including FAIL or INCOMPLETE. The coordinator reads the linked artifacts, accepts or rejects the result, and supplies the accepted paths and relevant context in the next task packet. The receiving session reads those local sources itself. A handoff recommendation does not authorize a child to start another phase.

### 5. Verify independently

When verification is required, dispatch it to a fresh session using the selected verifier runner after accepting the implementation output. The default verifier is OpenCode; Antigravity is an alternative. The implementer still runs checks while building; the verifier independently tests the assembled result against acceptance criteria. Load the project's `verification-and-validation` skill when available; otherwise use its documented verification workflow with the minimum report contract below.

Give the verifier the requirements, accepted plan, exact implementation revision or reproducible working-tree snapshot, environment and check instructions, and the implementer's report. Require the verifier to run applicable checks and observe relevant runtime behavior itself. The implementer's report supplies context, not a substitute for independent evidence. For changes with no runtime surface, record why runtime checks do not apply.

The verifier returns a report tied to the target revision with each acceptance criterion mapped to evidence, exact commands and exit statuses, runtime observations where applicable, and any blockers. Mark checks PASS, FAIL, NOT RUN, or NOT APPLICABLE with reasons. The readiness verdict is PASS only when all required evidence passes, FAIL when a required check fails, or INCOMPLETE when required evidence is missing. A successfully delivered report with FAIL or INCOMPLETE does not unlock review or final acceptance.

Send failures to the implementation runner for a bounded fix; send missing prerequisites to the coordinator to resolve. Reverify the changed result before continuing. The verifier reports findings and does not patch the implementation, weaken acceptance criteria, or treat an unavailable check as passing.

### 6. Review, repair, and finish

Give review a fresh Codex session with the accepted plan, acceptance criteria, actual diff, and the accepted verifier report when verification is required. Review assesses code quality and risks using that evidence. Record the reviewed commit plus any uncommitted changes, or another reproducible snapshot identity. Do not accept an earlier verification or review report after the implementation changes.

When review finds a blocking issue, create a bounded fix task for the implementation runner, return the updated revision to the verifier when verification is required, then obtain review of that revision. Rerun affected checks and any regression gates required by the project. Continue authorized, actionable fixes autonomously. If the same blocker persists after two fix attempts without new evidence or an actionable next step, preserve the artifacts and raise the concrete blocker instead of looping indefinitely. Honor Orca's dispatch circuit breaker separately.

Keep the coordinator responsible for integration, any lifecycle checks still required, and final acceptance. Delegating phases does not add permission to publish, merge, deploy, or message people. Complete the requested endpoint, then report the phase owners, artifact locations, verification results, and any remaining blocker. Distinguish a prepared delegation plan from phases that actually ran.

## Example Requests

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

## Red Flags

- A worker advances to the next phase or creates its own delegation tree.
- Runner fallback occurs without authorization, or a prompt-only session is presented as tracked work.
- Verification or review reads a changing checkout, or later sessions cannot access predecessor artifacts.
- The verifier patches code or approves the result using only the implementer's report.
- An old report or a failed dispatch unlocks dependent work.

## Verification

Apply these checks to the requested execution scope; a plan-only request needs a reviewable mapping and task packets, with no claim that workers ran.

- [ ] Only required phases ran, using the resolved runner mapping and requested settings.
- [ ] Every delegated phase has valid Orca task/dispatch provenance and an accepted result.
- [ ] Each session received accessible inputs and stayed within its phase and write scope.
- [ ] Each handoff identifies its target and links accessible local artifacts and skills using the existing workflow's report formats and locations.
- [ ] When verification is required, a separate verifier returned PASS against the final implementation state with independent acceptance evidence.
- [ ] When review is required, it covers the final implementation state; blocking findings and required checks are resolved.
- [ ] Worker resources are accounted for through the live orchestration cleanup contract.
- [ ] Existing authorization was preserved and the requested endpoint is complete, or a concrete blocker is reported.
