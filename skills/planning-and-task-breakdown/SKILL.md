---
name: planning-and-task-breakdown
description: Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible. Use when an Epic parent needs child-track allocation and a parent todo that indexes children instead of duplicating their tasks.
---

# Planning and Task Breakdown

## Overview

Decompose work into small, verifiable tasks with explicit acceptance criteria. Good task breakdown is the difference between an agent that completes work reliably and one that produces a tangled mess. Every task should be small enough to implement and verify in a single focused session, using new tests only when the admission gate warrants them.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

## When to Use

- You have a spec and need to break it into implementable units
- A task feels too large or vague to start
- Work needs to be parallelized across multiple agents or sessions
- You need to communicate scope to a human
- The implementation order isn't obvious

**When NOT to use:** Single-file changes with obvious scope, or when the spec already contains well-defined tasks.

## The Planning Process

### Step 1: Enter Plan Mode

Before writing any code, operate in read-only mode:

- Read the active track's authorized spec or bug report, its linked canonical capability specs, and relevant codebase sections
- Identify existing patterns and conventions
- Map dependencies between components
- Note risks and unknowns

**Do NOT write code during planning.** The output is a plan document saved to `docs/tracks/<track-id>/plan.md` and a task ledger at `docs/tracks/<track-id>/todo.md`, not implementation.

### Step 2: Identify the Dependency Graph

Map what depends on what:

```
Database schema
    │
    ├── API models/types
    │       │
    │       ├── API endpoints
    │       │       │
    │       │       └── Frontend API client
    │       │               │
    │       │               └── UI components
    │       │
    │       └── Validation logic
    │
    └── Seed data / migrations
```

Implementation order follows the dependency graph bottom-up: build foundations first.

### Step 3: Apply the Delivery Fork

Read the [delivery fork](../using-agent-skills/SKILL.md#delivery-fork) and any capability map's Delivery column. Check the whole track's expected PR before writing tasks. Record one outcome, exclusions, acceptance checks, dependencies/base, and safe merge state. Small tasks cannot excuse a large combined PR. If it no longer fits, split the remaining intent into tracks and update the parent index before task planning, preserving existing work.

**One implementation track (including Feature+map).** Continue to vertical task slices only within its one-PR boundary. Map rows whose Delivery is `docs/tracks/<track-id>/spec.md#<id>` stay in this `docs/tracks/<track-id>/todo.md`.

**Epic parent.** Stop slicing implementation tasks here.

1. Allocate a unique `NNN-name` child track id per focused PR (next unused prefixes; intended suffixes from the map are not ids until numbered). A capability row may need several child ids. Write the ids into the map Delivery column, the parent spec `children` list, and parent `docs/tracks/<track-id>/todo.md`. Record each child's outcome, exclusions, acceptance evidence, dependencies/base, and safe merge state; separate user releases are not required.
2. Write `docs/tracks/<track-id>/plan.md` as child order, shared contracts, integration checkpoints, and risks — not child implementation tasks.
3. Parent `docs/tracks/<track-id>/todo.md` is an index of child tracks plus integration checkpoints. Do not copy child task bodies.
4. Create each child directory with a stub `docs/tracks/<track-id>/spec.md` (or `docs/tracks/<track-id>/bug.md` for a defect), its selected workflow's `role`, and `parent:` set to the initiative id. Detailed requirements and tasks wait for that child's workflow; Feature children use `/spec` then `/plan`, while bounded children need only their route's artifacts.
5. Set `role: initiative` on the parent spec if missing.

**Stop.** Do not run Steps 4–6 on an Epic parent. Hand off to `/build`, which opens the next child. A parent plan is complete when the child index, order, shared contracts, and integration checkpoints are recorded. Check parent planning against the parent verification list below, not the Feature task checklist.

When the active track is already a child (`parent:` set), check its PR boundary too. If it is too large, update the existing parent with smaller sibling tracks; do not nest initiatives. Otherwise continue at Step 4 for that child's tasks only.

```markdown
## Children
- [ ] `021-portal-identity` — accounts and SSO. Depends: none
- [ ] `022-portal-billing` — plans and invoices. Depends: 021-portal-identity

## Integration
- [ ] Parent `/verify` on the assembled revision after required children merge
```

### Step 4: Slice Vertically (Feature and child tracks only)

Instead of building all the database, then all the API, then all the UI — build one complete feature path at a time:

**Bad (horizontal slicing):**
```
Task 1: Build entire database schema
Task 2: Build all API endpoints
Task 3: Build all UI components
Task 4: Connect everything
```

**Good (vertical delivery tracks, each with its own PR):**
```
Track 1: User can create an account (schema + API + UI for registration)
Track 2: User can log in (depends on Track 1)
Track 3: User can create a task (depends on Track 2)
Track 4: User can view the task list (depends on Track 3)
```

Within one track, tasks are smaller steps toward that single PR outcome, such as account validation, persistence, and registration UI. Recheck the whole PR even when every task is small.

### Step 5: Write Tasks

Each task follows this structure, whether it lands in the markdown task list or as an item in an external tracker (see Output Files):

```markdown
## Task [N]: [Short descriptive title]

**Description:** One paragraph explaining what this task accomplishes.

**Acceptance criteria:**
- [ ] [Specific, testable condition]
- [ ] [Specific, testable condition]

**Test design:** [Changed contract or material risk → exact existing coverage or proposed case, cheapest layer, and distinct-defect rationale; or why no new test is warranted]

**Verification:**
- [ ] Tests pass: [the repository's focused-test command]
- [ ] Build succeeds: [the repository's build command]
- [ ] Manual check: [description of what to verify]

**Dependencies:** [Task numbers this depends on, or "None"]

**Files likely touched:**
- `src/path/to/file.ts`
- `tests/path/to/test.ts` — only when the admission gate warrants a new or modified case

**Estimated scope:** [Small: 1-2 files | Medium: 3-5 files | Large: 5+ files]
```

For a non-trivial behavioral task, use the compact test ledger from `test-case-design-review`. Skip it for an obviously sufficient one-test change. Do not populate happy/empty/boundary/error/concurrency matrices unless each retained row protects a distinct material risk.

### Step 6: Order and Checkpoint

Arrange tasks so that:

1. Dependencies are satisfied (build foundation first)
2. Each task leaves the system in a working state
3. Verification checkpoints occur after every 2-3 tasks
4. High-risk tasks are early (fail fast)

Add explicit checkpoints to the task list target:

```markdown
## Checkpoint: After Tasks 1-3
- [ ] All tests pass
- [ ] Application builds without errors
- [ ] Core user flow works end-to-end
- [ ] Review checkpoint evidence and resolve blockers before proceeding
```

Run routine checkpoints autonomously. Diagnose, fix, and reverify failed checks before continuing; involve the human only when a material decision, missing authority/access, or uncontained risk cannot be resolved within the authorized scope. Preserve a human checkpoint only when the user or enforced policy explicitly requires it.

## Task Sizing Guidelines

| Size | Files | Scope | Example |
|------|-------|-------|---------|
| **XS** | 1 | Single function or config change | Add a validation rule |
| **S** | 1-2 | One component or endpoint | Add a new API endpoint |
| **M** | 3-5 | One feature slice | User registration flow |
| **L** | 5-8 | Multi-component feature | Search with filtering and pagination |
| **XL** | 8+ | **Too large — break it down further** | — |

If a task is L or larger, break it into smaller tasks. Then check the combined PR against Step 3: several S or M tasks can still make an oversized track. Separate reviewable outcomes become child tracks, including dependent slices of the same capability.

**When to break a task down further:**
- It would take more than one focused session (roughly 2+ hours of agent work)
- You cannot describe the acceptance criteria in 3 or fewer bullet points
- It touches two or more independent subsystems (e.g., auth and billing)
- You find yourself writing "and" in the task title (a sign it is two tasks)

## Output Files

- **Plan document:** Save the implementation plan to `docs/tracks/<track-id>/plan.md`. This is always a markdown file — design decisions, risks, and open questions don't map cleanly onto individual tracker issues.
- **Task list:** Record each task in the **task list target** (defined below).
- **Launch dossier:** For production-affecting work, initialize `docs/tracks/<track-id>/ship.md` with rollout prerequisites, migrations, feature flags, success thresholds, monitoring, rollback triggers and steps, and owners. Build and verification keep it current.

Each document starts with the memory-management header (`type`, `title`, `description`): use `Implementation Plan`, `Task List`, or `Launch Dossier` respectively. New unreviewed documents use `status: draft`; task progress and launch readiness remain separate. Add frontmatter once per file, not to individual tasks, checklist sections, or external tracker items.

Resolve the active numbered track using `context-engineering`: ids use a repository-wide three-digit prefix and kebab-case name, such as `001-user-auth`. Create `docs/tracks/<track-id>/` only for the selected or newly authorized change. The plan and task ledger live beside the authorized change spec or bug report, while accepted capability requirements stay at `docs/specs/<capability>/spec.md`.

Include **Spec reconciliation** in completion criteria: verified requirement changes update the owning capability specs in the same implementation PR; unchanged contracts receive a justified no-change disposition in the track spec or bug report. Deferred and canceled proposals remain in the track. A task may finish before the track; the track completes only after review and merge.

**Never overwrite an incomplete plan.** Before writing `docs/tracks/<track-id>/plan.md` or `docs/tracks/<track-id>/todo.md`, check whether they already exist and still contain unchecked tasks:

- Same work being replanned (the user asked to revise or extend this plan) → update the existing files in place.
- Different work → **stop and ask.** The unchecked tasks may be mid-build in another session. Do not delete, overwrite, or rename the existing files on your own; present the conflict and let the user decide (finish the old plan first, explicitly discard it, or tell you where the new plan should go).

The same rule applies to an external task list target: never bulk-close or delete another plan's open tracker items to make room for new ones.

### Task List Target

The task list target is where tasks and checkpoints are recorded. It is defined once, here; every other reference in this skill defers to it.

- **Default:** write the complete checklist to `docs/tracks/<track-id>/todo.md`. This is the convention `/build` and downstream tooling expect. An Epic parent uses this file as a child-track index, not an implementation checklist.
- **External tracker:** if the project's agent rules (`CLAUDE.md`, `AGENTS.md`, etc.) or the user designate an issue tracker (e.g. GitHub Issues, Jira, Linear, `bd`/beads), create one tracker item per task. Map the Step 4 structure onto the tracker's fields: acceptance criteria and verification steps in the item body, dependencies via the tracker's linking mechanism (`bd dep add`, "blocked by", etc.). Keep `docs/tracks/<track-id>/todo.md` as an ordered index of tracker item IDs or repository-relative links plus local lifecycle checkpoints; do not duplicate the full tracker bodies.

When using an external tracker, note it in `docs/tracks/<track-id>/plan.md` (e.g. "Tasks tracked in Linear project FOO") so downstream steps and future sessions know where to look. Keep both the plan's Task List section and `docs/tracks/<track-id>/todo.md` as compact ordered indexes rather than duplicate checklists.

## Plan Document Template (Feature and child tracks)

An Epic parent `docs/tracks/<track-id>/plan.md` records child order, shared contracts, and integration checkpoints — not this implementation-task template.

## Plan Document Template

```markdown
---
type: Implementation Plan
title: "[Change] implementation plan"
description: "Implementation steps, dependencies, risks, and verification for [change]."
status: draft
---

# Implementation Plan: [Feature/Project Name]

## Overview
[One paragraph summary of what we're building]

## PR Boundary
[One reviewable outcome, exclusions, acceptance evidence, dependencies/base, and safe merge state]

## Architecture Decisions
- [Key decision 1 and rationale]
- [Key decision 2 and rationale]

## Task List

### Phase 1: Foundation
- [ ] Task 1: ...
- [ ] Task 2: ...

### Checkpoint: Foundation
- [ ] Tests pass, builds clean

### Phase 2: Core Features
- [ ] Task 3: ...
- [ ] Task 4: ...

### Checkpoint: Core Features
- [ ] End-to-end flow works

### Phase 3: Polish
- [ ] Task 5: ...
- [ ] Task 6: ...

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] Ready for review

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [High/Med/Low] | [Strategy] |

## Open Questions
- **[Blocking / Non-blocking — choose one]**: [Decision question] — [work blocked, or answer needed by when]
  - A. [Recommended option, when supported] — [reason and consequence]
  - B. [Alternative] — [consequence; custom answers welcome]

## Research Follow-ups
- [Factual unknown for the agent to investigate] — [next action]
```

Resolve questions from evidence and prior decisions before asking. Present remaining user decisions through an available interactive question tool, or short labeled options: 2–3 distinct choices, a supported recommendation first with a reason, and a custom-answer path. Ask dependent questions one at a time. Label each question **Blocking** with the work awaiting its answer, or **Non-blocking** with when the answer is needed. Use focused free text for missing facts that choices would distort. Continue independent work while required answers are pending; a recommendation or silence is not approval. Record resolved decisions in the plan and remove them from Open Questions.

When tasks live in an external tracker, keep the Task List section above as an ordered index of tracker item IDs or links instead of a duplicate checklist.

## Parallelization Opportunities

When multiple agents or sessions are available:

- **Safe to parallelize:** Independent feature slices, independent Epic children after shared contracts exist, tests for already-implemented features, documentation
- **Must be sequential:** Database migrations, shared state changes, dependency chains, children that edit the same capability spec
- **Needs coordination:** Features that share an API contract (define the contract first, then parallelize); Epic children that consume a provider contract (land the provider child first)

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll figure it out as I go" | That's how you end up with a tangled mess and rework. 10 minutes of planning saves hours. |
| "The tasks are obvious" | Write them down anyway. Explicit tasks surface hidden dependencies and forgotten edge cases. |
| "Planning is overhead" | Planning is the task. Implementation without a plan is just typing. |
| "I can hold it all in my head" | Context windows are finite. Written plans survive session boundaries and compaction. |
| "The old `docs/tracks/<track-id>/plan.md` is stale, I'll just replace it" | Unchecked tasks may be mid-build in another session. Overwriting them destroys work state that exists nowhere else. Stop and ask. |
| "Every task is small, so the track is small" | Reviewers see the combined PR. Split its outcomes into tracks before writing more tasks. |

## Red Flags

- Starting implementation without a written task list
- Duplicating full external-tracker task bodies in `docs/tracks/<track-id>/todo.md` instead of keeping a durable index
- Overwriting a track plan or task ledger that still has unchecked tasks for different work, without asking
- Tasks that say "implement the feature" without acceptance criteria
- No verification steps in the plan
- All tasks are XL-sized
- An Epic parent `docs/tracks/<track-id>/todo.md` filled with child implementation tasks instead of child track ids
- No checkpoints between tasks
- Dependency order isn't considered

## Verification

**Epic parent** (stop after Step 3; do not require implementation tasks):

- [ ] Each focused PR has a unique child track id in the map, parent `children` list, and parent `docs/tracks/<track-id>/todo.md`, with its outcome, evidence, dependencies/base, and safe merge state
- [ ] Parent `docs/tracks/<track-id>/plan.md` records child order, shared contracts, and integration checkpoints
- [ ] Parent `docs/tracks/<track-id>/todo.md` indexes child tracks, not identity/billing/notifications/reporting task bodies
- [ ] Child requirement stubs exist with the selected workflow's `role` and `parent:` set
- [ ] Production-affecting work has an initialized parent `docs/tracks/<track-id>/ship.md`
- [ ] No pre-existing incomplete plan was overwritten without explicit user confirmation

**Feature and child tracks:**

- [ ] All tasks together fit one focused PR; dependent outcomes that need separate reviews have separate tracks
- [ ] Every task has acceptance criteria
- [ ] Every task has a verification step
- [ ] Every proposed test names the uncovered contract or distinct regression it protects, or the task records why existing coverage is sufficient
- [ ] Task dependencies are identified and ordered correctly
- [ ] Tasks are recorded or indexed in `docs/tracks/<track-id>/todo.md`
- [ ] Production-affecting work has an initialized `docs/tracks/<track-id>/ship.md`
- [ ] No pre-existing incomplete plan was overwritten without explicit user confirmation
- [ ] No implementation task touches more than ~5 files; reducing task size has not hidden an oversized PR
- [ ] Checkpoints exist between major phases
- [ ] The plan matches authorized requirements, is checked for dependencies and verification, and has no unresolved decision requiring the user

## See Also

Acceptance criteria are per-task and answer "did we build the right thing?". They sit on top of the project-wide Definition of Done: tests and required checks pass, runtime behavior is verified, the change remains maintainable and revertible, and relevant docs and operational safeguards are included. Optional whole-pack reference: `../../references/definition-of-done.md`.
