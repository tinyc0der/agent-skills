---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or requirements document with objectives and scope, or when requirements are unclear, ambiguous, or only exist as a vague idea. Use when a single requirement spans several independently testable capabilities and needs decomposing into a capability map, and when deciding whether that map stays on one Feature track or an Epic parent with child tracks.
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

## Specification Readiness

Spec-driven development owns the specification within authorized scope. It has one required Specify phase, preceded by a brief scope check for every request. Check readiness autonomously against the user's request and established contracts; ask only for material intent or trade-offs that cannot be resolved from evidence or delegated judgment. Existing authorization counts; do not require a new approval ceremony for each artifact.

```
SCOPE CHECK -> SPECIFY -> HAND OFF TO PLAN
     │           │
     ▼           ▼
   Scope      Readiness
   check        check
```

### Phase 0: Scope Check

Apply the [delivery fork](../using-agent-skills/SKILL.md#delivery-fork) before writing a detailed spec. Check whether the whole intent fits one focused PR, including when it names only one capability. A small coherent request goes straight to Specify with one track; it needs no parent or map unless several capabilities need mapping.

**Detection.** Split into implementation tracks before specifying when the intent needs more than one reviewable PR:

- The requirement names distinct capabilities with their own consumers or data (e.g. identity, billing, notifications, reporting)
- Acceptance criteria form distinct reviewable outcomes, even when they depend on earlier tracks or share a release
- One capability could be cut or replaced without rewriting the others' requirements
- One capability has too much combined scope or several rollout stages for one focused review

**Propose a capability map before writing any spec.** Small and reviewable — a module table plus a build order, not a project plan:

```markdown
---
type: Capability Map
title: "[Feature] capability map"
description: "Capability boundaries, dependencies, and build order for [feature]."
status: draft
---

# Capability Map: [Feature Name]

| Module id | Responsibility | Depends on | Delivery | Canonical path |
|---|---|---|---|---|
| identity | Accounts, sessions, SSO | — | docs/tracks/<track-id>/spec.md#identity | docs/specs/identity/spec.md |
| billing | Plans, invoices, payments | identity | docs/tracks/<track-id>/spec.md#billing | docs/specs/billing/spec.md |

Build order: identity → billing
```

- **Stable module ids.** Kebab-case, chosen once, never renamed mid-initiative. Specs, plans, and downstream commands select work by these ids instead of guessing which spec is active.
- **Dependency direction, no cycles.** Arrows point one way. If two modules each need the other, they are one module.
- **Interfaces live at the boundary.** The map records that `billing` depends on `identity`; proposed contract changes belong in the provider's Feature spec (section or child track) and accepted contracts in its capability spec (see `api-and-interface-design` for designing them).
- **Delivery.** `docs/tracks/<track-id>/spec.md#<id>` means this track owns that section within one PR. Child track ids (or intended suffixes before planning allocates numbers) mean this is an initiative parent. One capability may map to several ordered child tracks; keep its stable capability id and canonical owner.

**Check the map before detailing the spec.** Validate capability boundaries, dependency direction, build order, and Delivery against the authorized outcome. Resolve routine design choices autonomously; ask only when a material scope or ownership decision requires the user. Do not infer human review from this check.

**Then specify from Delivery, not by defaulting to one fat spec.** Save the checked map as `docs/tracks/<track-id>/capability-map.md`. Reuse existing capability ids; never create extra module specification files beside the track spec, or a second canonical spec for an existing capability.

- **Feature with a map.** Each Delivery cell is `docs/tracks/<track-id>/spec.md#<id>`. Write a section per capability in this track spec, scoped to that capability's objective, boundaries, contracts, and success criteria, linking `docs/specs/<capability>/spec.md` (or naming the intended path). All sections together must fit one focused PR.
- **Epic.** Set `role: initiative` on this track spec. Delivery cells are child track ids or intended suffixes. This spec covers initiative objective, non-goals, integration acceptance, shared contracts, and boundaries. Do not write full child feature specs here. Planning allocates child ids and child Feature specs.

### Phase 1: Specify

Start with a high-level vision. Inspect available evidence and reuse prior answers before asking the human for unresolved requirements. For decisions, use an available interactive question tool with 2–3 concise choices and a custom-answer path, or short labeled options when no tool is available. Put a supported recommendation first with a brief reason and explain each option's consequence. Ask dependent questions one at a time. Label each question **Blocking** with the work awaiting its answer, or **Non-blocking** with when the answer is needed. Use focused free text for facts that choices would distort; investigate factual unknowns yourself where possible. A recommendation or silence is not approval.

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
   - **Ask first:** Material unresolved intent, missing authority/access, or consequential effects and risks outside what the agent can handle within scope
   - **Never do:** Commit secrets, bypass enforced safeguards, hide regressions by removing failing tests, or expand the task without authorization

**Spec template:**

```markdown
---
type: Change Specification
title: "[Change] specification"
description: "Proposed requirements and acceptance criteria for [change]."
status: draft
workflow_status: planned
role: feature  # or initiative
---

# Spec: [Project/Feature Name]

**Authorization and readiness:** [User request/delegation, readiness evidence, and any actual required human approval]
**Affected capabilities:** [Links to existing specs; intended paths for new capabilities]
**PR boundary:** [One outcome, exclusions, acceptance checks, dependencies/base, and safe merge state; parents link the child split instead]

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
- **[Blocking / Non-blocking — choose one]**: [Decision question] — [work blocked, or answer needed by when]
  - A. [Recommended option, when supported] — [reason and consequence]
  - B. [Alternative] — [consequence; custom answers welcome]

## Research Follow-ups
- [Factual unknown for the agent to investigate] — [next action]

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

Save the scope-authorized change spec as `docs/tracks/<track-id>/spec.md`. A Feature+map spec uses a section per affected capability; an Epic parent spec uses initiative-level outcomes and leaves child details to child tracks. Check acceptance criteria and unresolved decisions. The orchestrator continues into `planning-and-task-breakdown` when the request covers implementation; a spec-only request ends at the documented handoff. This skill produces no plan or implementation code itself. The proposal remains track-local until implemented and verified; record actual human approval only when it occurred.

## Keeping the Spec Alive

The track spec remains current while work proceeds:

- **Update when decisions change** — If you discover the data model needs to change, update the spec first, then implement.
- **Update when scope changes** — Features added or cut should be reflected in the spec.
- **Commit the spec** — The checked specification within authorized scope belongs in version control before implementation begins.
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
| "I'll decompose during planning" | Planning slices tasks within a spec, or allocates Epic children from a map. Module boundaries and Delivery must be decided before the spec is written, not after. |
| "It is one capability, so it needs one track" | A capability can span several PRs. Each implementation track owns one reviewable outcome; an initiative records their dependencies. |

## Red Flags

- Starting to write code without any written requirements
- Asking "should I just start building?" before clarifying what "done" means
- Implementing features not mentioned in any spec or task list
- Making architectural decisions without documenting them
- Skipping the spec because "it's obvious what to build"
- A Feature+map spec without separately scoped capability sections and canonical owners
- An initiative parent spec that contains full child specs, or a child with no safe merge state on its declared base
- Module boundaries, Delivery, or build order decided implicitly during implementation because no capability map was checked up front
- Implementing requirements that are outside authorization or still depend on unresolved material intent
- A new canonical capability spec created for behavior already owned by an existing capability
- An approved but unimplemented proposal written into the canonical capability spec

## Verification

Before proceeding to implementation, confirm:

- [ ] The spec covers objective, non-goals, project context, affected structure, testing and verification, boundaries, and success criteria
- [ ] The spec matches authorized scope; material unresolved decisions received the required input, with no invented human approval
- [ ] Success criteria are specific and testable
- [ ] The testing strategy targets material coverage gaps without generic case matrices or duplicated test layers
- [ ] Boundaries (Always/Ask First/Never) are defined
- [ ] The spec is saved to a file in the repository
- [ ] The whole intent was checked against one focused PR before detailed specs; larger intent has child PR boundaries even within one capability
- [ ] When a map is needed, its stable ids, dependency direction, build order, and Delivery (section vs child tracks) were checked before detailed specs
- [ ] Feature+map sections, or Epic child specs, each link a canonical owner or name the intended path for a new capability; an Epic parent spec does not duplicate those full child specs
- [ ] The scope-authorized spec is saved under `docs/tracks/<track-id>/` and committed before implementation
- [ ] The next step is explicitly handed to `planning-and-task-breakdown`
