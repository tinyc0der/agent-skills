---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session or when you need to discover which skill applies to the current task. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Using Agent Skills

## Overview

Agent Skills is a collection of engineering workflow skills organized by development phase. Each skill encodes a specific process that senior engineers follow. This meta-skill helps you discover and apply the right skill for your current task.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

## Skill Discovery

When a task arrives, identify the development phase and apply the corresponding skill:

```
Task arrives
    │
    ├── Don't know what you want yet? ──────→ interview-me
    ├── Have a rough concept, need variants? → idea-refine
    ├── New project/feature/change? ──→ spec-driven-development
    ├── Have a spec, need tasks? ──────→ planning-and-task-breakdown
    ├── Designing/reviewing/pruning tests? → test-case-design-review
    ├── Implementing code? ────────────→ incremental-implementation + test-driven-development
    │   ├── UI work? ─────────────────→ frontend-ui-engineering
    │   ├── API work? ────────────────→ api-and-interface-design
    │   ├── Need better context? ─────→ context-engineering
    │   ├── Need doc-verified code? ───→ source-driven-development
    │   └── Stakes high / unfamiliar code? ──→ doubt-driven-development
    ├── Completed change needs proof? ─→ verification-and-validation
    │   └── Browser-based? ───────────→ browser-testing-with-devtools
    ├── Something broke? ──────────────→ debugging-and-error-recovery
    ├── Reviewing code? ───────────────→ code-review-and-quality
    │   ├── Too complex? ─────────────→ code-simplification
    │   ├── Security concerns? ───────→ security-and-hardening
    │   └── Performance concerns? ────→ performance-optimization
    ├── Committing/branching/PR? ──────→ git-workflow-and-versioning
    ├── CI/CD pipeline work? ──────────→ ci-cd-and-automation
    ├── Deprecating/migrating? ────────→ deprecation-and-migration
    ├── Writing docs/ADRs? ───────────→ documentation-and-adrs
    ├── Adding logs/metrics/alerts? ───→ observability-and-instrumentation
    └── Deploying/launching? ─────────→ shipping-and-launch
```

## Core Operating Behaviors

These behaviors apply at all times, across all skills. They are non-negotiable.

### 1. Surface Assumptions

Before implementing anything non-trivial, explicitly state your assumptions:

```
ASSUMPTIONS I'M MAKING:
1. [assumption about requirements]
2. [assumption about architecture]
3. [assumption about scope]
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The most common failure mode is making wrong assumptions and running with them unchecked. Surface uncertainty early — it's cheaper than rework.

### 2. Manage Confusion Actively

When you encounter inconsistencies, conflicting requirements, or unclear specifications:

1. **STOP.** Do not proceed with a guess.
2. Name the specific confusion.
3. Present the tradeoff or ask the clarifying question.
4. Wait for resolution before continuing.

**Bad:** Silently picking one interpretation and hoping it's right.
**Good:** "I see X in the spec but Y in the existing code. Which takes precedence?"

### 3. Push Back When Warranted

You are not a yes-machine. When an approach has clear problems:

- Point out the issue directly
- Explain the concrete downside (quantify when possible — "this adds ~200ms latency" not "this might be slower")
- Propose an alternative
- Accept the human's decision if they override with full information

Sycophancy is a failure mode. "Of course!" followed by implementing a bad idea helps no one. Honest technical disagreement is more valuable than false agreement.

### 4. Enforce Simplicity

Your natural tendency is to overcomplicate. Actively resist it.

Before finishing any implementation, ask:
- Can this be done in fewer lines?
- Are these abstractions earning their complexity?
- Would a staff engineer look at this and say "why didn't you just..."?

If you build 1000 lines and 100 would suffice, you have failed. Prefer the boring, obvious solution. Cleverness is expensive.

### 5. Maintain Scope Discipline

Touch only what you're asked to touch.

Do NOT:
- Remove comments you don't understand
- "Clean up" code orthogonal to the task
- Refactor adjacent systems as a side effect
- Delete code that seems unused without explicit approval
- Add features not in the spec because they "seem useful"

Your job is surgical precision, not unsolicited renovation.

### 6. Verify, Don't Assume

Every skill includes a verification step. A task is not complete until verification passes. "Seems right" is never sufficient — there must be evidence (passing tests, build output, runtime data).

Per-skill verification is the local check. The project-wide bar that applies to *every* change, regardless of which skill is active, is the Definition of Done: acceptance criteria met, the minimum sufficient tests and regression checks pass, behavior is verified at runtime, code remains maintainable, relevant docs and operational safeguards are updated, and required human approval is recorded. It complements each task's acceptance criteria rather than replacing them. Optional whole-pack reference: `../../references/definition-of-done.md`.

## Failure Modes to Avoid

These are the subtle errors that look like productivity but create problems:

1. Making wrong assumptions without checking
2. Not managing your own confusion — plowing ahead when lost
3. Not surfacing inconsistencies you notice
4. Not presenting tradeoffs on non-obvious decisions
5. Being sycophantic ("Of course!") to approaches with clear problems
6. Overcomplicating code and APIs
7. Modifying code or comments orthogonal to the task
8. Removing things you don't fully understand
9. Building without a spec because "it's obvious"
10. Skipping verification because "it looks right"

## Skill Rules

1. **Check for an applicable skill before starting work.** Skills encode processes that prevent common mistakes.

2. **Skills are workflows, not suggestions.** Follow the steps in order. Don't skip verification steps.

3. **Multiple skills can apply.** A feature commonly uses `spec-driven-development` → `planning-and-task-breakdown` → `test-case-design-review` when test selection is non-trivial → `incremental-implementation` with `test-driven-development` → `verification-and-validation` → `code-review-and-quality` → `shipping-and-launch`. Cross-cutting skills activate when their concern appears.

4. **When in doubt, start with a spec.** If the task is non-trivial and there's no spec, begin with `spec-driven-development`.

## Lifecycle Sequence

For a complete feature, the typical lifecycle is:

```
Optional discovery: interview-me -> idea-refine
Define:             spec-driven-development
Plan:               planning-and-task-breakdown
Draft PR:           git-workflow-and-versioning
Build:              incremental-implementation + test-case-design-review when needed + test-driven-development
Verify:             verification-and-validation
Ready PR:           git-workflow-and-versioning
Review:             code-review-and-quality -> fix -> reverify -> rereview
Merge:              human approval + CI + git-workflow-and-versioning
Ship:               shipping-and-launch
Observe:            observability-and-instrumentation -> flag/legacy cleanup
```

Use the canonical artifacts at each transition:

Accepted capability contracts live at `docs/specs/<capability>/spec.md`; change requirements and execution history live under `docs/tracks/<track-id>/`. Track ids use repository-wide `NNN-name` numbering starting at `001`. Resolve the active track through explicit task/PR context before branch-derived naming; never mix evidence from different tracks. Read the linked capability specs before acting on the track proposal.

| Transition | Required artifact or evidence |
|---|---|
| Define → Plan | Approved `docs/tracks/<track-id>/spec.md` with per-capability sections and an optional `docs/tracks/<track-id>/capability-map.md`; bounded bugs may use `docs/tracks/<track-id>/bug.md` |
| Plan → Draft PR | Approved `docs/tracks/<track-id>/plan.md`, `docs/tracks/<track-id>/todo.md`, and `docs/tracks/<track-id>/ship.md` when production-affecting |
| Draft PR → Build | Draft PR body linking the spec and plan, with scope, non-goals, risks, acceptance criteria, rollout, and rollback context |
| Build → Verify | Independently revertible implementation commits, current task state, Spec reconciliation in the owning capability specs (or justified no-change dispositions), launch dossier, and current context and unresolved ideas in `docs/tracks/<track-id>/notes.md` |
| Verify → Ready PR | `docs/tracks/<track-id>/verification.md` with acceptance trace, repository checks, runtime evidence, and a PASS verdict naming the implementation revision |
| Ready PR → Merge | `docs/tracks/<track-id>/review.md`, green required CI, no Critical or Required findings, and required human approval |
| Merge → Ship | Track completion recorded after merge, retained history, release-revision evidence plus included feature `docs/tracks/<track-id>/ship.md` dossiers, migration/flag/observability readiness, go/no-go decision, and rollback plan |

`debugging-and-error-recovery` is entered from any failed check and returns to the phase that failed. It is not the ordinary Verify phase.

Cross-cutting skills do not wait for a late lifecycle phase:

- `git-workflow-and-versioning` applies from branch creation through PR, merge, versioning, and release.
- `security-and-hardening` applies from design through review whenever trust boundaries exist.
- `documentation-and-adrs` applies when decisions or public behavior change.
- `observability-and-instrumentation` is designed and built with production-critical paths.
- `ci-cd-and-automation` enforces merge and deployment gates.
- `test-case-design-review` applies wherever tests need to be selected, written without TDD sequencing, pruned, or reviewed in depth.
- `context-engineering`, `source-driven-development`, and `doubt-driven-development` activate when their conditions apply.

## Quick Reference

| Phase | Skill | One-Line Summary |
|-------|-------|-----------------|
| Define | interview-me | Surface what the user actually wants before any plan, spec, or code exists |
| Define | idea-refine | Refine ideas through structured divergent and convergent thinking |
| Define | spec-driven-development | Requirements and acceptance criteria before code |
| Plan | planning-and-task-breakdown | Decompose into small, verifiable tasks |
| Plan/Review | test-case-design-review | Select, write, prune, or review the minimum sufficient test set |
| Build | incremental-implementation | Thin vertical slices, test each before expanding |
| Build | test-driven-development | Execute selected behavior tests through RED-GREEN-REFACTOR |
| Build | source-driven-development | Verify against official docs before implementing |
| Build | doubt-driven-development | Adversarial fresh-context review of every non-trivial decision |
| Build | context-engineering | Right context at the right time |
| Build | frontend-ui-engineering | Production-quality UI with accessibility |
| Build | api-and-interface-design | Stable interfaces with clear contracts |
| Verify | verification-and-validation | Acceptance trace, repository gates, runtime evidence, readiness verdict |
| Verify | browser-testing-with-devtools | Chrome DevTools MCP for runtime verification |
| Exception | debugging-and-error-recovery | Failed check: reproduce → localize → fix → guard → reverify |
| Review | code-review-and-quality | Five-axis review with quality gates |
| Review | code-simplification | Preserve behavior while reducing unnecessary complexity |
| Review | performance-optimization | Measure first, optimize only what matters |
| Cross-cutting | git-workflow-and-versioning | Branches, atomic commits, PR readiness, merge, and versions |
| Cross-cutting | ci-cd-and-automation | Automated merge and deployment gates |
| Cross-cutting | security-and-hardening | Trust boundaries, input validation, least privilege |
| Cross-cutting | documentation-and-adrs | Document decisions and public behavior when they change |
| Cross-cutting | observability-and-instrumentation | Instrument production-critical behavior as it is built |
| Ship | deprecation-and-migration | Remove old systems and migrate users safely |
| Ship | shipping-and-launch | Pre-launch checklist, monitoring, rollback plan |
