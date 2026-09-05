---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when requirements are unclear, ambiguous, or only exist as a vague idea. Use when a single requirement spans several independently testable capabilities and needs decomposing into a capability map of modules before specifying.
---

# Spec-Driven Development

## Overview

Write a structured specification before writing any code. The spec is the shared source of truth between you and the human engineer — it defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

Canonical capability specs live at `docs/specs/<capability>/spec.md` and describe current accepted behavior. This skill writes proposed changes to `docs/tracks/<track-id>/spec.md`, linking the affected capability specs rather than copying them. Track ids use a repository-wide three-digit prefix and kebab-case suffix, such as `001-user-auth`; follow the artifact map in `context-engineering` for allocation and active-track resolution. A bug that restores an existing contract can use `docs/tracks/<track-id>/bug.md` through `debugging-and-error-recovery` without a separate change spec.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## The Gated Workflow

Spec-driven development owns the approved specification, not the implementation plan or code. It has one required Specify phase, preceded by a scope check that activates only when one request bundles several independently testable capabilities.

```
SCOPE CHECK (when needed) -> SPECIFY -> HAND OFF TO PLAN
          │                    │
          ▼                    ▼
        Human                Human
        reviews              reviews
```

### Phase 0: Scope Check

Most requests describe one capability. If this one does, skip this phase and go straight to Specify — Phase 0 exists for the exception, not the rule, and it puts no hierarchy on single-capability features.

**Detection.** Decompose before specifying when a single requirement bundles several independently testable capabilities:

- The requirement names distinct capabilities with their own consumers or data (e.g. identity, billing, notifications, reporting)
- Acceptance criteria cluster into groups that could ship and be verified separately
- One capability could be cut or replaced without rewriting the others' requirements

**Propose a capability map before writing any spec.** Small and reviewable — a module table plus a build order, not a project plan:

```markdown
---
type: Capability Map
title: "[Initiative] capability map"
description: "Capability boundaries, dependencies, and build order for [initiative]."
status: draft
---

# Capability Map: [Initiative Name]

| Module id | Responsibility | Depends on |
|---|---|---|
| identity | Accounts, sessions, SSO | — |
| billing | Plans, invoices, payments | identity |
| notifications | Email and webhook fan-out | identity |
| reporting | Usage dashboards | billing, notifications |

Build order: identity → billing, notifications → reporting
```

- **Stable module ids.** Kebab-case, chosen once, never renamed mid-initiative. Specs, plans, and downstream commands select work by these ids instead of guessing which spec is active.
- **Dependency direction, no cycles.** Arrows point one way. If two modules each need the other, they are one module.
- **Interfaces live at the boundary.** The map records that `billing` depends on `identity`; proposed contract changes belong in the provider's track-spec section and accepted contracts in its capability spec (see `api-and-interface-design` for designing them).

**The map is gated like every phase.** The human reviews capability boundaries, dependency direction, and build order before the detailed capability sections are written. Getting the map wrong is expensive; reviewing ten lines is not.

**Then specify each capability's changes.** Save the approved map as `docs/tracks/<track-id>/capability-map.md`. Each row links a section in `docs/tracks/<track-id>/spec.md` and the owning `docs/specs/<capability>/spec.md` (or names its intended path for a new capability). Scope each section to that capability's objective, boundaries, contracts, and success criteria. Reuse existing capability ids across tracks; the map selects spec sections rather than separate module-spec files.

### Phase 1: Specify

Start with a high-level vision. Ask the human clarifying questions until requirements are concrete.

**Surface assumptions immediately.** Before writing any spec content, list what you're assuming:

```
ASSUMPTIONS I'M MAKING:
1. This is a web application (not native mobile)
2. Authentication uses session-based cookies (not JWT)
3. The database is PostgreSQL (based on existing Prisma schema)
4. We're targeting modern browsers only (no IE11)
→ Correct me now or I'll proceed with these.
```

Don't silently fill in ambiguous requirements. The spec's entire purpose is to surface misunderstandings *before* code gets written — assumptions are the most dangerous form of misunderstanding.

**Write a spec document covering these core areas:**

1. **Objective** — What are we building and why? Who is the user? What does success look like?

2. **Project conventions** — Reference the repository's existing rules for commands, structure, and code style. Include those details only for a new project or when this feature changes them. Full executable commands use flags, not just tool names.
   ```
   Build: npm run build
   Test: npm test -- --coverage
   Lint: npm run lint --fix
   Dev: npm run dev
   ```

3. **Affected structure** — Where feature code, tests, migrations, and documentation belong.
   ```
   src/           → Application source code
   src/components → React components
   src/lib        → Shared utilities
   tests/         → Unit and integration tests
   e2e/           → End-to-end tests
   docs/          → Documentation
   ```

4. **Testing and verification strategy** — Map materially changed behavior and credible risks to existing or proposed evidence. Name the cheapest reliable test level for uncovered contracts, avoid duplicate coverage across layers, and state when runtime evidence is more appropriate than another automated case. Do not turn generic scenario categories or coverage percentages into case quotas.

5. **Boundaries** — Three-tier system:
   - **Always do:** Run tests before commits, follow naming conventions, validate inputs
   - **Ask first:** Database schema changes, adding dependencies, changing CI config
   - **Never do:** Commit secrets, edit vendor directories, remove failing tests without approval

**Spec template:**

```markdown
---
type: Change Specification
title: "[Change] specification"
description: "Proposed requirements and acceptance criteria for [change]."
status: draft
workflow_status: planned
---

# Spec: [Project/Feature Name]

**Approval:** [Actual approval evidence or pending review]
**Affected capabilities:** [Links to existing specs; intended paths for new capabilities]

## Objective
[What we're building and why. User stories or acceptance criteria.]

## Non-Goals
[What this feature explicitly will not do.]

## Tech Stack
[Framework, language, key dependencies with versions]

## Project Conventions
[Link to existing project rules; include only feature-specific changes.]

## Affected Structure
[Likely source, test, migration, and documentation locations.]

## Testing Strategy
[Framework and test locations; changed contract or material risk → existing/new evidence and cheapest test level; explicit no-new-test rationale where appropriate]

## Boundaries
- Always: [...]
- Ask first: [...]
- Never: [...]

## Success Criteria
[How we'll know this is done — specific, testable conditions]

## Open Questions
[Anything unresolved that needs human input]

## Spec reconciliation
[Before review: implemented requirements → canonical spec paths, or a justified no-change disposition. Deferred and canceled items remain here.]
```

**Reframe instructions as success criteria.** When receiving vague requirements, translate them into concrete conditions:

```
REQUIREMENT: "Make the dashboard faster"

REFRAMED SUCCESS CRITERIA:
- Dashboard LCP < 2.5s on 4G connection
- Initial data load completes in < 500ms
- No layout shift during load (CLS < 0.1)
→ Are these the right targets?
```

This lets you loop, retry, and problem-solve toward a clear goal rather than guessing what "faster" means.

### Hand Off to Planning

Before writing an artifact, require a non-default branch and resolve the active track. For a new track, allocate the next unused three-digit prefix above the repository's highest existing track number, starting at `001`, and append a kebab-case name. The branch can supply the suffix; it never supplies the capability id. Create `docs/tracks/<track-id>/` only for the selected or newly authorized change and preserve its id across branch renames.

After human approval, save the change spec as `docs/tracks/<track-id>/spec.md`, with a section per affected capability when needed. Then invoke `planning-and-task-breakdown`; do not create tasks or implementation code in this skill. An approved proposal remains track-local until implemented and verified.

## Keeping the Spec Alive

The track spec remains current while work proceeds:

- **Update when decisions change** — If you discover the data model needs to change, update the spec first, then implement.
- **Update when scope changes** — Features added or cut should be reflected in the spec.
- **Commit the spec** — The approved spec belongs in version control before implementation begins.
- **Reference the spec in PRs** — Link back to the spec section that each PR implements.

**Spec reconciliation:** Before review, incorporate implemented, verified changes into each owning `docs/specs/<capability>/spec.md` in the same PR as the implementation. Canonical specs use `type: Capability Specification`; track proposals use `type: Change Specification`, both with `title` and `description`. Record the affected paths and dispositions in the track spec. Keep deferred, canceled, and unverified requirements out of canonical specs; record a justified no-change disposition for an unchanged contract. Reconcile concurrent edits against the latest accepted capability spec. Mark the track complete after merge and retain its history.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is simple, I don't need a spec" | Simple tasks don't need *long* specs, but they still need acceptance criteria. A two-line spec is fine. |
| "I'll write the spec after I code it" | That's documentation, not specification. The spec's value is in forcing clarity *before* code. |
| "The spec will slow us down" | A 15-minute spec prevents hours of rework. Waterfall in 15 minutes beats debugging in 15 hours. |
| "Requirements will change anyway" | That's why the spec is a living document. An outdated spec is still better than no spec. |
| "The user knows what they want" | Even clear requests have implicit assumptions. The spec surfaces those assumptions. |
| "It's one big feature; splitting it is overhead" | If acceptance criteria cluster into independently testable groups, a monolithic spec forces every downstream task to reason over the whole contract. A ten-line capability map is the cheap alternative. |
| "I'll decompose during planning" | Planning slices tasks within a spec. By then the oversized artifact already exists — module boundaries and dependency direction must be decided before the spec is written, not after. |

## Red Flags

- Starting to write code without any written requirements
- Asking "should I just start building?" before clarifying what "done" means
- Implementing features not mentioned in any spec or task list
- Making architectural decisions without documenting them
- Skipping the spec because "it's obvious what to build"
- A multi-capability track spec without separately scoped capability sections and canonical owners
- Module boundaries or build order decided implicitly during implementation because no capability map was approved up front
- Planning tasks or implementation code produced before the specification is approved
- A new canonical capability spec created for behavior already owned by an existing capability
- An approved but unimplemented proposal written into the canonical capability spec

## Verification

Before proceeding to implementation, confirm:

- [ ] The spec covers objective, non-goals, project context, affected structure, testing and verification, boundaries, and success criteria
- [ ] The human has reviewed and approved the spec
- [ ] Success criteria are specific and testable
- [ ] The testing strategy targets material coverage gaps without generic case matrices or duplicated test layers
- [ ] Boundaries (Always/Ask First/Never) are defined
- [ ] The spec is saved to a file in the repository
- [ ] If the request bundles several independently testable capabilities, a capability map (stable ids, dependency direction, build order) was approved before detailed capability sections were written
- [ ] Each proposed capability section links its canonical owner or names the intended path for a new capability
- [ ] The approved spec is saved under `docs/tracks/<track-id>/` and committed before implementation
- [ ] The next step is explicitly handed to `planning-and-task-breakdown`
