---
name: planning-and-task-breakdown
description: Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.
---

# Planning and Task Breakdown

## Overview

Decompose work into small, verifiable tasks with explicit acceptance criteria. Good task breakdown is the difference between an agent that completes work reliably and one that produces a tangled mess. Every task should be small enough to implement and verify in a single focused session, using new tests only when the admission gate warrants them.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note protocol; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

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

- Read the active track's approved spec or bug report, its linked canonical capability specs, and relevant codebase sections
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

### Step 3: Slice Vertically

Instead of building all the database, then all the API, then all the UI — build one complete feature path at a time:

**Bad (horizontal slicing):**
```
Task 1: Build entire database schema
Task 2: Build all API endpoints
Task 3: Build all UI components
Task 4: Connect everything
```

**Good (vertical slicing):**
```
Task 1: User can create an account (schema + API + UI for registration)
Task 2: User can log in (auth schema + API + UI for login)
Task 3: User can create a task (task schema + API + UI for creation)
Task 4: User can view task list (query + API + UI for list view)
```

Each vertical slice delivers working, testable functionality.

### Step 4: Write Tasks

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

### Step 5: Order and Checkpoint

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
- [ ] Review with human before proceeding
```

In normal incremental mode, keep the human review item. In an explicitly approved `/build auto` run, routine checkpoints become automated verification gates; failures and high-risk or irreversible work still stop for the human.

## Task Sizing Guidelines

| Size | Files | Scope | Example |
|------|-------|-------|---------|
| **XS** | 1 | Single function or config change | Add a validation rule |
| **S** | 1-2 | One component or endpoint | Add a new API endpoint |
| **M** | 3-5 | One feature slice | User registration flow |
| **L** | 5-8 | Multi-component feature | Search with filtering and pagination |
| **XL** | 8+ | **Too large — break it down further** | — |

If a task is L or larger, it should be broken into smaller tasks. An agent performs best on S and M tasks.

**When to break a task down further:**
- It would take more than one focused session (roughly 2+ hours of agent work)
- You cannot describe the acceptance criteria in 3 or fewer bullet points
- It touches two or more independent subsystems (e.g., auth and billing)
- You find yourself writing "and" in the task title (a sign it is two tasks)

## Output Files

- **Plan document:** Save the implementation plan to `docs/tracks/<track-id>/plan.md`. This is always a markdown file — design decisions, risks, and open questions don't map cleanly onto individual tracker issues.
- **Task list:** Record each task in the **task list target** (defined below).
- **Launch dossier:** For production-affecting work, initialize `docs/tracks/<track-id>/ship.md` with rollout prerequisites, migrations, feature flags, success thresholds, monitoring, rollback triggers and steps, and owners. Build and verification keep it current.

Resolve the active numbered track using `context-engineering`: ids use a repository-wide three-digit prefix and kebab-case name, such as `001-user-auth`. Create `docs/tracks/<track-id>/` only for the selected or newly authorized change. The plan and task ledger live beside the approved change spec or bug report, while accepted capability requirements stay at `docs/specs/<capability>/spec.md`.

Include **Spec reconciliation** in completion criteria: verified requirement changes update the owning capability specs in the same implementation PR; unchanged contracts receive a justified no-change disposition in the track spec or bug report. Deferred and canceled proposals remain in the track. A task may finish before the track; the track completes only after review and merge.

### Task List Target

The task list target is where tasks and checkpoints are recorded. It is defined once, here; every other reference in this skill defers to it.

- **Default:** write the complete checklist to `docs/tracks/<track-id>/todo.md`. This is the convention `/build` and downstream tooling expect.
- **External tracker:** if the project's agent rules (`CLAUDE.md`, `AGENTS.md`, etc.) or the user designate an issue tracker (e.g. GitHub Issues, Jira, Linear, `bd`/beads), create one tracker item per task. Map the Step 4 structure onto the tracker's fields: acceptance criteria and verification steps in the item body, dependencies via the tracker's linking mechanism (`bd dep add`, "blocked by", etc.). Keep `docs/tracks/<track-id>/todo.md` as an ordered index of tracker item IDs or repository-relative links plus local lifecycle checkpoints; do not duplicate the full tracker bodies.

When using an external tracker, note it in `docs/tracks/<track-id>/plan.md` (e.g. "Tasks tracked in Linear project FOO") so downstream steps and future sessions know where to look. Keep both the plan's Task List section and `docs/tracks/<track-id>/todo.md` as compact ordered indexes rather than duplicate checklists.

## Plan Document Template

```markdown
# Implementation Plan: [Feature/Project Name]

## Overview
[One paragraph summary of what we're building]

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
- [Question needing human input]
```

When tasks live in an external tracker, keep the Task List section above as an ordered index of tracker item IDs or links instead of a duplicate checklist.

## Parallelization Opportunities

When multiple agents or sessions are available:

- **Safe to parallelize:** Independent feature slices, tests for already-implemented features, documentation
- **Must be sequential:** Database migrations, shared state changes, dependency chains
- **Needs coordination:** Features that share an API contract (define the contract first, then parallelize)

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll figure it out as I go" | That's how you end up with a tangled mess and rework. 10 minutes of planning saves hours. |
| "The tasks are obvious" | Write them down anyway. Explicit tasks surface hidden dependencies and forgotten edge cases. |
| "Planning is overhead" | Planning is the task. Implementation without a plan is just typing. |
| "I can hold it all in my head" | Context windows are finite. Written plans survive session boundaries and compaction. |

## Red Flags

- Starting implementation without a written task list
- Duplicating full external-tracker task bodies in `docs/tracks/<track-id>/todo.md` instead of keeping a durable index
- Tasks that say "implement the feature" without acceptance criteria
- No verification steps in the plan
- All tasks are XL-sized
- No checkpoints between tasks
- Dependency order isn't considered

## Verification

Before starting implementation, confirm:

- [ ] Every task has acceptance criteria
- [ ] Every task has a verification step
- [ ] Every proposed test names the uncovered contract or distinct regression it protects, or the task records why existing coverage is sufficient
- [ ] Task dependencies are identified and ordered correctly
- [ ] Tasks are recorded or indexed in `docs/tracks/<track-id>/todo.md`
- [ ] Production-affecting work has an initialized `docs/tracks/<track-id>/ship.md`
- [ ] No task touches more than ~5 files
- [ ] Checkpoints exist between major phases
- [ ] The human has reviewed and approved the plan

## See Also

Acceptance criteria are per-task and answer "did we build the right thing?". They sit on top of the project-wide Definition of Done: tests and required checks pass, runtime behavior is verified, the change remains maintainable and revertible, and relevant docs and operational safeguards are included. Optional whole-pack reference: `../../references/definition-of-done.md`.
