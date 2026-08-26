# Feature Development Workflow

**Status:** Draft

This document defines the proposed canonical workflow for developing a feature with Agent Skills. It makes the pull-request boundary explicit, separates test-driven implementation from post-build validation, and treats git, security, documentation, CI, and observability as cross-cutting disciplines rather than end-of-lifecycle cleanup.

## Workflow

```text
Discover -> Define -> Plan -> Draft PR -> Build slices -> Verify
                                            ^           |
                                            |-- Debug --|
       -> Review -> Fix -> Reverify -> Rereview -> Merge
       -> Ship -> Observe -> Clean up
```

The workflow is sequential at its major decision gates. Inside a phase, conditional skills may run together when their concerns are independent.

## Phase 1: Discover

Use this phase when the request does not yet express a sufficiently clear problem or outcome. Skip it when the feature request is already concrete.

**Skills**

- `interview-me` when the underlying user need or priority is unclear
- `idea-refine` when several approaches or product shapes need comparison

**Artifacts**

- A short feature brief containing the problem, target users, desired outcomes, and non-goals
- An explicit list of assumptions and unresolved questions

**Exit gate**

- The problem and intended outcome are understood well enough to specify
- Material assumptions have been confirmed by the human

## Phase 2: Establish Context and a Safe Baseline

Understand the repository before making feature-level decisions, and create an isolated place for the work.

**Skills**

- `context-engineering`
- `git-workflow-and-versioning`
- `doubt-driven-development` when the system is unfamiliar or the cost of error is high

**Artifacts**

- Current project rules and commands, recorded in the repository's existing rules file when missing
- Baseline test, build, lint, and type-check results
- A short-lived feature branch or isolated worktree

**Exit gate**

- Repository conventions, validation commands, boundaries, and known risks are understood
- The baseline state is recorded, including pre-existing failures
- Feature work is isolated from unrelated changes

## Phase 3: Define

Specify what will be built without duplicating the planning or implementation phases.

**Skills**

- `spec-driven-development`
- `api-and-interface-design` when public or module contracts change
- `frontend-ui-engineering` when user-facing interaction or layout is involved
- `security-and-hardening` when the feature handles untrusted input, authentication, authorization, secrets, or sensitive data

**Artifacts**

- `specs/SPEC.md` for a single-capability feature
- `specs/capability-map.md` plus `specs/SPEC-<module-id>.md` for a multi-capability initiative
- Acceptance criteria, non-goals, boundaries, success measures, and open questions

Feature specs should reference project-wide commands, structure, and style rules rather than copying them unless the feature changes those conventions.

**Exit gate**

- Scope, non-goals, acceptance criteria, boundaries, and success measures are testable
- Public contracts and trust boundaries are identified where applicable
- The human approves the specification before planning begins

## Phase 4: Plan

Convert the approved specification into small, dependency-ordered, vertically sliced tasks.

**Skills**

- `planning-and-task-breakdown`
- `documentation-and-adrs` for decisions whose rationale must survive the feature
- `deprecation-and-migration` when existing behavior, APIs, or data must move
- `doubt-driven-development` for risky or difficult-to-reverse decisions

**Artifacts**

- `tasks/plan.md`
- `tasks/todo.md`, or task records in the repository's designated external tracker
- ADRs following the repository's existing convention
- Test, migration, rollout, observability, and rollback requirements embedded in the relevant tasks

**Exit gate**

- Tasks have acceptance criteria, dependencies, likely files, and verification steps
- High-risk work occurs early enough to fail fast
- Every task leaves the repository in a working state
- The human approves the plan

## Phase 5: Open a Draft Pull Request

Create the collaboration artifact early. A draft pull request is a living handoff, not a declaration that the feature is ready for review.

**Skills**

- `git-workflow-and-versioning`

**Artifacts**

- A draft PR linking the specification and plan
- A PR description covering objective, scope, non-goals, design, risks, and the planned verification story

Open the draft after the approved plan has been committed or after the first coherent implementation commit. Update it as implementation and verification evidence accumulate.

**Exit gate**

- The work is visible and reviewable without being marked ready prematurely
- The PR can be understood without reconstructing intent from the diff

## Phase 6: Build in Verified Slices

Implement one complete slice at a time. Test-driven development is part of BUILD; it is not the separate feature-level VERIFY phase.

**Skills**

- `incremental-implementation`
- `test-driven-development`
- `git-workflow-and-versioning`
- `context-engineering` to load only the context needed for the current slice
- `source-driven-development` when implementation depends on external technology documentation
- Relevant UI, API, security, documentation, and observability skills as triggered

**Per-slice loop**

```text
Read acceptance criteria
-> Write and run a failing test (RED)
-> Implement the minimum behavior (GREEN)
-> Run the focused test
-> Refactor while tests remain green
-> Run affected tests, build, lint, and type checking
-> Verify runtime behavior when applicable
-> Apply the per-task Definition of Done
-> Commit atomically
-> Update the task, specification, ADR, and draft PR when needed
```

**Artifacts**

- Production code and behavior-focused tests
- Small, independently revertible commits
- Updated task state and living specification
- Documentation, ADR, migration, feature-flag, and telemetry changes owned by the slice

**Exit gate**

- The slice meets its acceptance criteria and the per-task Definition of Done
- The repository remains buildable and testable
- No unrelated work is included in the commit

When any check fails, invoke `debugging-and-error-recovery`: reproduce, localize, reduce, fix the root cause, add a regression guard, reverify, and then resume.

## Phase 7: Verify the Assembled Feature

Feature verification proves that the integrated result satisfies the approved specification. It is distinct from the RED-GREEN-REFACTOR loop used to construct individual slices.

**Skills**

- A proposed `verification-and-validation` skill as the owner of this phase
- `browser-testing-with-devtools` for browser-visible behavior
- `security-and-hardening`, `performance-optimization`, and accessibility checks when applicable
- `debugging-and-error-recovery` only when verification exposes a failure

**Verification scope**

- Trace every acceptance criterion to evidence
- Run the full test suite, build, lint, formatting, and type checking
- Verify integration and critical user flows at runtime
- Test migrations and both feature-flag states where applicable
- Check security, accessibility, performance, compatibility, documentation, and observability requirements triggered by the change
- Capture screenshots or before/after measurements for UI and performance work

**Artifacts**

- A verification section in the PR or a linked verification report
- CI run links, command results, screenshots, measurements, and known limitations

**Exit gate**

- Every acceptance criterion has concrete evidence
- The complete Definition of Done passes
- No unexplained failing or skipped checks remain
- The draft PR is ready to be marked for review

## Phase 8: Review, Remediate, and Merge

Review is a loop, not a one-way handoff.

**Skills**

- `code-review-and-quality`
- `code-simplification` before final approval when complexity can be removed safely
- `security-and-hardening` and `performance-optimization` for deeper conditional reviews

**Loop**

```text
Review -> Resolve Critical/Required findings with TDD
       -> Reverify affected behavior
       -> Rereview
       -> Human approval and green CI
       -> Merge
```

**Artifacts**

- Review findings using one severity taxonomy: `Critical`, `Required`, `Optional`, `Nit`, and `FYI`
- Responses or commits resolving every blocking finding
- Final verification evidence, approval, and green CI run
- Merge record

**Exit gate**

- No unresolved Critical or Required findings remain
- Changes made during review have been reverified
- Required human approvals and CI checks are green
- The PR is merged using the project's merge strategy

## Phase 9: Ship

Shipping is the production-release gate, not a duplicate of the PR review. Reuse recent review evidence when the release diff has not changed; rerun affected checks when it has.

**Skills**

- `shipping-and-launch`
- `observability-and-instrumentation`
- `git-workflow-and-versioning` for versions, tags, and changelog entries
- `deprecation-and-migration` when rollout changes existing contracts or data

**Artifacts**

- Go/no-go decision
- Launch checklist and acknowledged risks
- Rollback triggers, exact rollback steps, owner, and recovery-time target
- Feature-flag and staged-rollout configuration
- Dashboards and alert links
- Release notes, changelog, version, and deployment record where applicable

**Exit gate**

- Rollback is ready before deployment
- Monitoring and success thresholds are active
- Production configuration and migrations are ready
- The authorized human gives the GO decision

## Phase 10: Observe and Clean Up

Continue until the rollout is proven stable and temporary launch machinery is removed.

**Skills**

- `observability-and-instrumentation`
- `debugging-and-error-recovery` for launch failures
- `deprecation-and-migration` for cleanup of old paths

**Artifacts**

- Post-launch verification or incident record
- Follow-up tasks for defects or deferred improvements
- Feature-flag, compatibility-path, and dead-code cleanup commits

**Exit gate**

- Technical and business signals remain within rollout thresholds
- The feature is fully rolled out or safely rolled back
- Expired flags and temporary compatibility paths are removed
- Durable documentation reflects the final state

## Cross-Cutting Skill Rules

Some disciplines do not belong to a single late phase:

- `git-workflow-and-versioning` applies from the baseline through merge and release.
- `test-driven-development` applies whenever behavior changes.
- `security-and-hardening` begins during specification and design when trust boundaries exist, then remains active through implementation and review.
- `documentation-and-adrs` runs when decisions or public behavior change, not after the work is otherwise complete.
- `observability-and-instrumentation` is designed and implemented with production-critical behavior.
- `ci-cd-and-automation` enforces validation before merge and deployment; it is not merely a shipping concern.
- `debugging-and-error-recovery` is an exception path entered by failed checks, not the normal VERIFY phase.

## Canonical Command Sequence

The proposed user-facing sequence is:

```text
/spec -> /plan -> /pr draft -> /build -> /verify
      -> /pr ready -> /review -> merge -> /ship
```

`/test` remains available as a focused TDD entry point but is not presented as the post-build lifecycle phase. `/build auto` may remove routine human pauses between tasks only after its checkpoint, artifact, and risk semantics are explicitly aligned with this workflow.
