---
type: Review
title: Epic parent and child tracks review
description: Five-axis findings and dispositions for the Epic delivery-fork change at head d05c6ce.
status: draft
---

# Review: Request changes

**Verdict:** REQUEST CHANGES

**Head revision:** `d05c6ce0abf248542f2f9e4d34d57e2f8b079ea1` (evidence-only verification)

**Implementation revision:** `1c4333a561f774b8faba90f3ae6bb05e5c272ad9`

**PR:** [tinyc0der/agent-skills#12](https://github.com/tinyc0der/agent-skills/pull/12) (`tinyc0der/epic-child-tracks` → `main`)

This is a five-axis review of the implementation diff at `1c4333a` plus the evidence-only follow-up at `d05c6ce`. It is not independent human approval.

An adversarial `code-reviewer` subagent reviewed the same artifact and contract (issues-only prompt; no author claim). It reported the same two defects as R1 and R2 (it labeled them Critical; this report keeps **Required**: they break the Epic route’s classification and `/plan` mechanics, not a security or data-loss path). It also contributed R3 (parent planning merge vs parent `/verify`). Other items were classified as Optional, Nit, contract-misread, or already covered.

## Context

The change makes the Epic route executable: Feature+map vs Epic parent/child tracks vs migration phases. No new skill. The fork’s single home is `using-agent-skills`; spec, plan, build, git, verify, deprecation, and shipping apply it. Canonical `docs/specs/feature-development-workflow/spec.md` and `docs/specs/memory-management/spec.md` were updated in the implementation commit.

## Spec reconciliation

Verified in implementation commit `1c4333a` (not deferred to the evidence commit):

| Capability | Track disposition | In `1c4333a`? |
|---|---|---|
| [Feature development workflow](../../specs/feature-development-workflow/spec.md) | delivery fork, parent/child artifacts, `/build` and `/verify` roles | Yes: `docs/specs/feature-development-workflow/spec.md:19`, `:41–42` |
| [Memory management](../../specs/memory-management/spec.md) | optional `role`, `parent`, `children` | Yes: `docs/specs/memory-management/spec.md:52` |

No missing-reconciliation Required finding. The canonical Feature-development-workflow spec states Feature+map vs Epic parent and the `/build`/`/verify` parent roles. It does not restate the fork’s third row (migration phases / destructive-not-in-the-same-PR). That gap is not a reconciliation miss against the track’s listed items; it is folded into Required-1 because the third row is currently contradictory.

## Findings

### Critical

None.

### Required

#### R1. Migration-phase classification contradicts itself, so expand/contract can still land in one PR

**Disposition:** open — must align before merge.

The fork’s third row, the deprecation restatement, incremental build, and eval 6 do not agree. Expand/contract phases are independently deployable by design, so “Epic when phases are separately shippable” plus “index them as Epic children” always promotes a column rename to an Epic. Eval 6 and the deprecation eval then grade the same example as a Feature with separately mergeable slices, not child tracks.

| Source | What it tells an agent |
|---|---|
| `skills/using-agent-skills/SKILL.md:312` | Migration phases: “Epic when phases are separately shippable; otherwise Feature slices. Destructive steps never share a PR with expands.” |
| `skills/deprecation-and-migration/SKILL.md:185` | Worked `name` → `full_name` example: “If phases can ship and be verified on their own, apply the delivery fork and index them as Epic children.” |
| `skills/incremental-implementation/SKILL.md:40` | “Destructive migration phases stay on their own child.” Then line 42: execute all slices in the authorized scope. |
| `evals/cases/using-agent-skills.json:100–105` | Same column rename is “Feature plus deprecation-and-migration expand/contract, **not Epic**, with destructive contract in its own mergeable slice.” |
| `evals/cases/deprecation-and-migration.json:48` | Expand/dual-write/contract are separately mergeable slices; does **not** require Epic children. |

On the Feature path eval 6 requires, `/build auto` still runs every task on one branch (`incremental-implementation` line 42; git “one PR for the current feature branch”). Nothing mechanical then keeps a destructive contract out of the expand PR except treating phases as Epic children — which eval 6 forbids. That violates the track success criterion “Destructive migration phases do not share a PR with additive expands” and the fork’s “one home; other skills apply it rather than restating it.”

**Recommended fix (do not rewrite the fork):** Keep eval 6. A single-capability expand/contract stays a Feature with separately mergeable slices. Clarify `using-agent-skills/SKILL.md:312` so “separately shippable” means independently deliverable *features*, not every deployable migration step. In deprecation, drop “index them as Epic children”; keep “destructive contract is a later, separate PR.” In incremental and git, require a new PR (same track is fine) before a destructive contract slice. Do not spawn child tracks for `name` → `full_name`.

#### R2. Epic parent `/plan` stops slicing, then the numbered steps and exit checklist undo that stop

**Disposition:** open — must align before merge.

`skills/planning-and-task-breakdown/SKILL.md:65` tells an Epic parent to “Stop slicing implementation tasks here” and index children (`:67–71`). The skill then continues as Feature planning:

- `:84` Step 4 Slice Vertically (account/login/task implementation slices)
- `:106` Step 5 Write Tasks (full implementation-task template)
- `:204–245` plan template is still a Phase 1/2/3 implementation task list
- `:300–307` verification: “Every task has acceptance criteria,” “Every task has a verification step,” “No implementation task touches more than ~5 files”

The `/plan` adapters (`.claude/commands/plan.md:9`, `commands/planning.toml:8`, `.gemini/commands/planning.toml`) state the Epic index rule, then **Then:** continue into generic inspect / dependency-graph / slice steps. `using-agent-skills` says skills are workflows and steps are followed in order. An agent that obeys Step 3 then Step 4 will fill the parent `todo.md` with child implementation tasks — the flattening this track exists to prevent. The exit checklist would also fail a *correct* parent index that has no implementation tasks.

`evals/cases/planning-and-task-breakdown.json` eval 2 would catch this, but it is `kind: execution` and was **not run** (verification.md limitation).

**Recommended fix:** After the Epic parent bullets, skip Steps 4–5 (and the Feature plan template) and jump to parent-specific output/verification: child index, order, shared contracts, integration checkpoints. Scope the current checklist to Feature/child plans. Parent `/plan` must not write identity/billing/notifications/reporting task bodies. Detection for `/build` must still treat a child-id index as a parent even if leftover implementation tasks exist.

#### R3. Parent planning cannot both merge early and satisfy parent `/verify`

**Disposition:** open — must specify a planning-only ready path.

The Epic route says merge parent planning documents early as a docs PR, then branch children from default after shared contracts exist:

- `skills/using-agent-skills/SKILL.md:344` — `/pr` is per child; parent planning may merge separately as docs
- `skills/git-workflow-and-versioning/SKILL.md:142` — merge parent planning early; branch children from the default branch after shared contracts exist
- `skills/git-workflow-and-versioning/SKILL.md:271–277` — `/pr ready` requires a `verification-and-validation` PASS on that head
- `skills/verification-and-validation/SKILL.md:53` — parent `/verify` is initiative integration on an assembled revision that includes required merged children; missing children is INCOMPLETE

There is no planning-only verify mode, no docs-PR exception to the ready gates, and no definition of “assembled revision” (default-branch head after children merge? last child head? invented parent merge?). An agent that follows the written gates cannot mark the parent planning PR ready until children already exist on default — which they cannot, because the stubs and frozen contracts live on that unmerged parent PR.

**Recommended fix:** Parent planning PR verifies artifact completeness (map, initiative spec, child index, stub ids), not integration. Allow that docs PR to become ready and merge without an integration PASS. After required children land on the remote default branch, freeze that commit as the assembled revision, run parent `/verify` against it, and record evidence on a follow-up parent docs PR. Do not attach parent PASS to a child PR.

### Optional

#### O1. Feature-branch short-lived rule narrowed to children

`skills/git-workflow-and-versioning/SKILL.md:138` now says “Keep **child** feature branches short-lived.” Trunk-based development above still requires short-lived feature branches in general. Restore the original bullet and keep the initiative-vs-child paragraph so ordinary Feature branches do not lose the 1–3 day rule.

#### O2. Canonical spec omits one-PR-per-child and `/spec`/`/plan` parent roles

`docs/specs/feature-development-workflow/spec.md:40` still describes draft PRs generically. `/pr` per child lives in `using-agent-skills` command roles and `.claude/commands/pr.md`. Worth a sentence in the capability spec if those are accepted contracts; not required by this track’s reconciliation list.

#### O3. Copilot alias table was not updated

`docs/copilot-setup.md:142–144` still gives abbreviated `/spec`, `/plan`, `/build` bodies with no delivery-fork gate. Those prompts are intentionally shorter than the Claude/Gemini/Antigravity twins (parity validator covers only `.claude/`, `.gemini/`, and `commands/`). Consider a one-line pointer at the fork so Copilot installs do not flatten epics.

#### O4. Child worktree/branch is not bound to the allocated track id

`skills/planning-and-task-breakdown/SKILL.md:67` allocates `021-portal-identity`. Parent `/build` does not say to name the child branch after that id. `skills/context-engineering/SKILL.md:116` will treat `feature/portal-identity` as a new suffix and mint another number. Resolve child checkouts from the parent `children` / todo index; do not allocate a second prefix when a stub id exists.

#### O5. `/build` detection uses `role: initiative`, not `epic`

`skills/memory-management/SKILL.md:127` and `/build` look for `role: initiative`. Agents copying the word “Epic” may emit `role: epic` and implement children in the parent checkout. Mention the exact enum in the fork table or `/build` gate.

#### O6. Parent `/build` on a stub child starts incremental, not the child’s Feature `/spec`

`skills/incremental-implementation/SKILL.md:40` and `.claude/commands/build.md:35` open the child worktree and “build there.” Planning stubs wait for that child’s `/spec` and `/plan` (`planning-and-task-breakdown/SKILL.md:70`). If the child spec is a stub, run spec-driven-development in that worktree and stop; run incremental only when that child has a checked spec and task list.

### Nits

#### N1. Spec map example is titled Initiative but uses Feature+map Delivery cells

`skills/spec-driven-development/SKILL.md:53–63` titles the example “[Initiative]” while Delivery points at `spec.md#identity`. Easy to copy-paste into an Epic. Use a Feature+map title, or show one Epic row with a child suffix.

#### N2. Default spec template always sets `role: feature`

`skills/spec-driven-development/SKILL.md:135`. Phase 0 already says set `role: initiative` for an Epic. A comment in the template, or `role: feature  # or initiative`, would reduce missed metadata.

### FYI

- Track `014` itself correctly uses `role: feature`: this change is one coordinated deliverable, not an Epic of independently shippable children.
- Track `014` skips `013` because `tinyc0der/draft-harness-principles` already allocated that number. Preserve the gap.
- `d05c6ce` is evidence-only (`verification.md`). Findings apply to implementation `1c4333a`; a later review-only commit does not expand reviewed scope.
- Behavioral (tier 3) evals for the new dialogue/execution cases were not run. Routing evals: 174 checks, rank-1 98% (107/109). That limitation is already in verification.md.
- File sizes stay under the skill-anatomy 500-line guidance (`using-agent-skills` 396, `planning-and-task-breakdown` 313).
- Claude / Gemini / Antigravity command twins were updated in lockstep; `validate-commands.js` passes.

## Five-axis assessment

| Axis | Assessment |
|---|---|
| **Correctness** | Feature+map vs Epic parent artifacts, parent `/build`/`/verify` roles, flat tracks, and spec-eval-2 rewrite match the track. Blocked by R1 (migration fork vs eval 6), R2 (parent `/plan` control flow), and R3 (planning merge vs parent `/verify`). Edge case: Feature `/build auto` on expand/contract has no PR split. |
| **Readability** | Fork table is the right shape. Downstream skills mostly link rather than restate. Deprecation “index them as Epic children” and incremental “own child” are the restatements that create R1. Planning Step 3 then Step 4 is hard to follow as a single procedure. |
| **Architecture** | No new skill, no nested `docs/tracks/` or `docs/epics/`. Graph metadata is optional and omitted on historical tracks. Command adapters stay thin. Matches existing patterns. R1 is a missing model for Feature-path destructive slices, not a new abstraction. |
| **Security** | No new trust boundary, input handling, secrets, or dependencies. Instruction text only. Copilot aliases are abbreviated, not a secret leak. |
| **Performance** | Markdown/eval-only. No runtime path, unbounded fetch, or new dependency. |

## Tests reviewed

Admission-gate read of the new cases (Keep; each protects a distinct defect):

| Case | Distinct defect | Notes |
|---|---|---|
| `using-agent-skills` eval 6 | Epic vs Feature+migration classification | Conflicts with deprecation/incremental restatement (R1) |
| `spec-driven-development` eval 2 rewrite | Portal initiative flattened into one spec | Replaces the old one-track reward; Feature+map still covered by eval 3 |
| `planning-and-task-breakdown` eval 2 | Parent todo filled with child tasks | Execution; not run |
| `incremental-implementation` eval 5 | `/build auto` implements children in the parent checkout | Dialogue; not run |
| `verification-and-validation` eval 3 | Child PASS treated as parent PASS | Dialogue; not run |
| `deprecation-and-migration` extra expectation | Expand and contract in one PR | Agrees with eval 6; disagrees with deprecation skill text (R1) |

No wording-matching unit tests were added; that matches this pack’s eval style. Git one-PR-per-child is untested (O2).

## Verification story

Re-ran at `d05c6ce` in this worktree:

- `node scripts/validate-skills.js` — 30 skills, 0 errors
- `node scripts/validate-commands.js` — 11 commands, parity and descriptions aligned
- `node scripts/validate-lifecycle-contracts.js` — PASS
- `node scripts/validate-artifact-paths.js` — 34 files
- `node scripts/validate-markdown-links.js` — 154 files
- `node scripts/validate-reference-links.js` — 30 skills
- `node scripts/run-evals.js` — 174 checks, 0 errors; rank-1 98% (107/109)
- GitHub CI on PR #12 — SUCCESS (plugin installation, skill content, command parity, plugin structure)
- `node scripts/run-evals.js --behavioral` — NOT RUN (on-demand; disclosed)

Author verification.md PASS for `1c4333a` is accepted for repository gates. It does not cover R1–R3, which are instruction contradictions rather than validator failures. Static “the sentence exists” traces are not evidence that the fork is consistent.

## What’s done well

- One home for the fork in `using-agent-skills`, with other skills linking `#delivery-fork` instead of adding a skill or `docs/epics/`.
- Feature+map is preserved: spec eval 3 and incremental eval 3 still train section-based Delivery cells.
- Spec eval 2 no longer rewards a one-track portal spec.
- Parent `/build` and `/verify` command roles are in all three adapter trees and in the canonical Feature-development-workflow spec in the same implementation PR.
- Optional `role` / `parent` / `children` are structural, omitted on historical tracks, and reconciled into the memory-management capability spec.

## Verdict

Request changes. Three Required findings remain (R1, R2, R3). No Critical. Do not approve until those are fixed, the affected evals/skills are aligned, and affected behavior is reverified and rereviewed at the new implementation revision.

This verdict does not authorize merge, release, or human approval.
