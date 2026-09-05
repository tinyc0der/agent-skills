---
type: Capability Specification
title: 'Capability: Feature Development Workflow'
description: Accepted requirements, ownership, and acceptance criteria for Feature Development Workflow.
---

# Capability: Feature Development Workflow

## Objective

Provide a consistent, reviewable lifecycle from change requirements through implementation, verification, review, merge, and production release. Preserve accepted capability contracts across successive changes and keep each change's execution history independently traceable.

## Artifact Ownership

- Each stable capability has one canonical `docs/specs/<capability>/spec.md` containing its accepted requirements, boundaries, contracts, and acceptance criteria.
- Each change has a track under `docs/tracks/<track-id>/`. Track ids use a repository-wide three-digit number followed by a kebab-case name, starting at `001`. Allocate above the highest existing number, preserve historical ids and gaps, and resolve allocation collisions before merge.
- A track uses `spec.md` for proposed requirements or `bug.md` for a defect's expected behavior, reproduction, actual behavior, and fix acceptance criteria. Create both only when needed. Each identifies its affected capabilities and status.
- Plans, task ledgers, revision-scoped verification and review evidence, running notes, and launch dossiers belong to the track. Create artifacts only when the work needs them.
- Multi-capability changes keep per-capability sections in one track spec. An optional capability map links those sections, canonical owners, dependency directions, and build order.
- Explicit track selection takes precedence over branch-derived naming. A branch can supply a new track's suffix; capability ids and existing track ids remain stable across branch renames and deletion. Never infer an active change from the sole historical directory.
- External task trackers remain authoritative when designated; the track retains an ordered index without duplicating task bodies.
- Capability specs, authored track documents, and authorized saved workflow briefs or standalone reports use the memory-management document-metadata profile: required `type`, `title`, and `description`; evidence-backed optional fields; preserved Markdown body sections. Metadata applies to whole files; task subsections, external tracker items, inline review contributions, and raw evidence retain their native formats.
- Document maturity uses OKF `status` (`draft`, `stable`, `deprecated`); new unreviewed documents start as `draft`. Workflow progress, approval, report verdicts, and evaluated revisions remain separate. Formatting a proposal or report does not change its authority or evidence coverage.

## Lifecycle

The canonical sequence is `/spec`, `/plan`, `/pr draft`, `/build`, `/verify`, `/pr ready`, `/review`, merge, and `/ship`. Gemini and Antigravity expose planning as `/planning`. Bounded bugs may use a bug report without a separate feature specification or plan.

- Execute the selected workflow autonomously through the authorized endpoint, reusing scope decisions and permissions. Specs, plans, checks, reviews, documentation, and local commits do not require routine reapproval. Explicit read-only, phase-only, single-task, and manual-checkpoint instructions remain binding.
- Human gates are reserved for material intent or trade-offs that cannot be resolved from evidence or delegated judgment, necessary access or enforced external approval, consequential effects outside authorization, or risk/blockers that cannot be contained and resolved autonomously. Complete safe preparation and independent work before requesting the exact missing decision. Silence does not provide authorization.
- Quality gates remain mandatory. Diagnose, fix, and reverify failures within scope before escalating a blocker requiring human input. Scope authorization, agent readiness, and actual human approval are separate evidence; never impersonate a required reviewer or waive enforced CI/release policy.
- Every phase reads the active track's `docs/tracks/<track-id>/notes.md` at entry or resume and updates meaningful observations, tentative ideas, decisions, outcomes, blockers, and next actions, including before handoff or compaction. Initialize notes with authorized tracked work; preserve pre-track discovery in its brief. Honor explicit read-only and file-scope limits.
- Notes support reusable knowledge, skill/workflow improvements, and ad hoc context. Label uncertainty, link authoritative artifacts, and triage actionable items to their owning files, promotion review, or a follow-up task. A note does not establish approval, a requirement, or verification evidence.
- Specification owns written requirements within authorized scope and hands off to planning before implementation when the route requires it. Plans define dependency-ordered, verifiable tasks; routine readiness checks can be completed by the agent.
- Draft PRs identify the track, affected capability specs, scope, acceptance criteria, design, risks, and evidence. Creation, updates, and readiness are explicit transitions; existing PR state is checked before mutation.
- `/build` executes the authorized scope in verified, independently revertible slices. `auto` and `all` remain aliases; `step` requests one task. Use the selected route's requirements and plan when needed, preserve per-task checks and commits, and resume after resolved blockers without requiring a new command.
- Verification maps material acceptance criteria to executable evidence and names the exact implementation revision. Results are PASS, FAIL, or INCOMPLETE.
- Reviews use Critical, Required, Optional, Nit, and FYI. Critical and Required findings block approval until fixed, reverified, and rereviewed.
- Use suitable cross-model review when available within existing provider, scope, data-handling, cost, and read-only execution authorization. Avoid per-cycle permission prompts, disclose optional fallback, and retain INCOMPLETE status for unavailable mandatory coverage. Review-only requests do not authorize remediation.
- **Spec reconciliation** happens before review: incorporate implemented, verified requirement changes into the owning capability specs in the same PR. Record affected paths and dispositions in the track spec or bug report. A fix restoring an already-correct contract records why no canonical edit is needed. Deferred, canceled, and unverified proposals remain track-local.
- Reconcile concurrent changes against the latest accepted capability spec. Mark a track complete after merge and retain it as historical evidence; task completion alone does not complete a track.

## Evidence and Release Boundaries

- Evidence names the exact revision evaluated. Later evidence or administrative updates confined to the same track may preserve evidence only when requirements, scope, acceptance criteria, canonical specs, and implementation are unchanged.
- Canonical spec changes are contract changes; they invalidate affected evidence and are not evidence-only commits.
- Zero-argument `/ship` discovers the production baseline and remote default-branch target, pins the exact release range, identifies included PRs and direct commits, and obtains required release confirmation.
- Track launch dossiers describe rollout, migrations, flags, success thresholds, monitoring, rollback, and ownership. The authoritative deployment result stays in the configured release system; recording it must not mutate the pinned target.
- Keep working-note updates outside pinned verification/release targets in an authorized workspace or follow-up documentation change. A note-only commit does not expand coverage to a new revision.
- Read older headerless artifacts permissively and add metadata only within authorized edits. Header migrations preserve historical bodies, unknown fields, and revision claims; they do not reverify reports or mutate a pinned target.
- Reusable knowledge follows `memory-management` promotion rules and remains separate from capability spec reconciliation.

## Verification Contract

- Claude, Gemini, and Antigravity adapters and lifecycle skills agree on artifact ownership, numbered track ids, active-track selection, reconciliation, and reading/updating running notes in every phase.
- Path checks reject workflow artifacts, including notes, under capability specs and unnumbered track paths. Link checks protect moves and references; lifecycle checks detect missing note contracts, evidence, and reconciliation gates.
- Proposed tests protect distinct material regressions that existing coverage misses, at the cheapest reliable layer. No fixed test counts, generic case matrices, or numerical coverage quotas are required.
- `test-case-design-review` owns case selection and pruning; `test-driven-development` owns RED-GREEN-REFACTOR. Adequately covered refactors and non-behavioral tasks use proportionate existing or executable checks.
