---
name: memory-management
description: Maintains running track notes, shared Open Knowledge Format (OKF) document metadata, and durable knowledge bundles. Use when recording ad hoc observations or skill and workflow improvement ideas, resuming a tracked change, formatting capability specs and track documents, saving verified lessons or preferences, or bootstrapping, pruning, and syncing memory.
---

# Memory Management

## Overview

Preserve enough trustworthy context for future sessions to understand the project, apply its conventions, explain particular decisions, and carry out recurring operations. Route reusable knowledge to its canonical owner and keep evidence and freshness visible. During an active track, maintain `docs/tracks/<track-id>/notes.md` across every workflow phase; working observations can be recorded before they become permanent lessons.

The skill defines shared document metadata for capability specs, track artifacts, and saved workflow briefs and reports, plus the durable OKF knowledge bundle. It uses reviewable Git changes and thin rules-file pointers, without depending on a particular agent tool. Save what future work needs and link to established sources instead of copying them.

## When to Use

Trigger this skill — even when the user doesn't say "memory":

- **An active track enters or resumes any workflow phase.** Read its running notes and update them as useful context changes, including before a pause, handoff, or context compaction.
- **A capability spec, track document, or authorized saved workflow brief or report is authored or deliberately updated.** Apply the document-metadata profile while preserving its ownership, workflow state, and evidence.
- **A feature ships.** Promote what was learned during the work into durable memory.
- **The user states a durable preference or corrects you** in a way that should outlive this session ("we always run migrations in a transaction", "don't use default exports here").
- **A failure is diagnosed and reproducible.** The failure mode and its cause are worth keeping.
- **A session starts and feels familiar** — load the relevant memory rather than re-exploring.
- **Memory looks stale, sprawling, or wrong** — it contradicts the current code, or files have grown unscannable. Pruning and reorganizing is part of this skill, not a separate one.
- **Setting up a project's durable-memory core** for the first time (Bootstrap mode — derive it from the codebase), or deciding where a new piece of knowledge belongs.

Temporary context belongs in track notes when it helps continue the work. It does **not** automatically belong in the durable knowledge bundle. Standalone questions and explicit read-only or no-op requests do not require creating or updating notes.

## A Note on Terms: Memory vs. `steering/`

**Memory** is the whole durable-knowledge system: the portable OKF knowledge bundle, canonical capability specs, and change tracks that supply historical evidence. The bundle contains `project.md`, `decision-records/`, `steering/`, and `runbooks/`; specs and tracks stay outside it.

**`steering/`** provides broad, enduring project understanding: product context, technology, structure, architecture, standards, and domain knowledge. It used to be called `memory/`; the name `steering/` distinguishes this purpose from the wider memory system.

Within the bundle, `project.md` anchors project identity and direction; `steering/` explains how the project works today; `decision-records/` records individual, contextual choices as they arise; and `runbooks/` holds ordered procedures. Together they support orientation, informed judgment, and repeatable execution across sessions.

## The Mental Model: Three Tiers

Knowledge lives at one of three levels, and only earns promotion upward when it's useful, scoped, evidence-backed, and reviewable:

```
Session memory   → what this agent has in context right now (most of it is disposable)
Workflow state   → one change's proposals, tasks, and evidence (docs/tracks/<track-id>/)
Project memory   → accepted capability specs + reusable knowledge (docs/specs/ + docs/knowledge/)
```

The promotion test for reusable knowledge: **"Would a future feature that has nothing to do with this one still need this fact?"** If yes, it belongs in durable memory, routed by purpose: project understanding, a specific decision, or a repeatable procedure. Capability requirements go to their owning specs. Other change-local facts stay in the track. Completed tracks remain as provenance without promoting their task histories into the always-discovered core.

An abandoned or reverted experiment that established no reusable constraint stays in session or workflow history. Do not save an ineffective parameter change merely as context for a verified fix, or turn "it made no difference in this session" into a general rule.

## Where Knowledge Lives

Route durable memory by the reader's need: *"What should I understand about this project?"* → `project.md` and `steering/`; *"Why did we make this particular choice?"* → `decision-records/`; *"How do I perform this operation?"* → `runbooks/`. Related documents link to each other while each owns its distinct purpose.

**Discover existing owners before applying the defaults below.** Inspect project rules, documentation indexes, existing ADRs and runbooks, and configuration such as `.adr-dir`. Established homes such as `docs/adr/` or `Documentation/Decisions/` remain canonical, including their numbering, format, and links. Follow `documentation-and-adrs` for decisions in those homes. Directory names alone do not identify a legacy memory layout or authorize moving it.

When an established home is outside the bundle, route its new knowledge there. If bundle discovery is needed, add a typed `external-knowledge.md` concept (`type: Knowledge Sources`) linking to those canonical homes with descriptions, and list that concept in the root index. Use the cross-boundary citation rules below; do not copy their contents into bundle concepts or put external links in reserved collection indexes. Required bundle indexes may stay empty for externally owned collections. External documents keep their existing format and are not subject to OKF concept frontmatter. All routing below uses these resolved owners; the illustrated homes are defaults for knowledge with no established owner.

**Every durable artifact has a resolved home.** Resolve scope first: the repository memory root is `docs/`; a package-owned memory root is `packages/<pkg>/docs/`. The OKF bundle root is always `<memory-root>/knowledge/`. Canonical capability specs stay in repository `docs/specs/<capability>/spec.md`; change history stays in `docs/tracks/<track-id>/`, outside the bundle, regardless of memory scope. The repository layout is:

```
docs/knowledge/
  index.md              → OKF bundle entrypoint and version declaration
  project.md            → stable (but evolving) project contract, direction, constraints
  decision-records/     → individual, dated decisions and their context
    index.md
    NNNN-*.md
  steering/             → broad project understanding, current architecture, standards
    index.md
    <domain>.md
  runbooks/             → repeatable operational procedures
    index.md
    <procedure>.md

docs/specs/<capability>/
  spec.md               → current accepted requirements for one capability

docs/tracks/<track-id>/  → numbered change, e.g. 001-adopt-okf-v0-2
  spec.md               → proposed requirement changes and capability links
  bug.md                → defect, reproduction, expected behavior, fix criteria
  plan.md, todo.md      → implementation plan and task ledger
  verification.md       → evidence for an exact revision
  review.md             → findings, dispositions, and reviewed revision
  notes.md              → running notes and resume context throughout the workflow
  ship.md               → launch dossier, only when needed
```

Each bundle has a root `index.md`; each durable collection under `<memory-root>/knowledge/` carries its own `index.md`. These maps provide one-line summaries and discovery paths so a session can find the right concept without reading the whole directory.

### Capability specs and numbered tracks

Each capability has one stable kebab-case id and one canonical spec across changes. A track may affect several capabilities. Read the existing capability specs first; the track's spec describes proposed changes rather than copying the whole accepted contract. A bug report can replace a track spec when the work restores existing behavior. Create only the artifacts the change needs.

**Track ids use `NNN-<name>`**, for example `001-adopt-okf-v0-2`. Allocate the next unused three-digit number above the highest existing prefix in repository `docs/tracks/`, starting at `001`; use a concise kebab-case name. Numbers are repository-wide, not per capability. Preserve existing ids and gaps, never overwrite or renumber historical tracks, and resolve a concurrent allocation collision before merge. An explicit existing track path takes precedence over branch-derived naming; a branch slug supplies only the descriptive suffix for a new track.

**Spec reconciliation:** Before review, incorporate implemented, verified requirement changes into each owning `docs/specs/<capability>/spec.md` in the same PR as the implementation. Record links and dispositions in the track spec or bug report. If a fix restores an already-correct contract, record why no canonical edit is needed. Keep deferred, canceled, and unverified proposals in the track. Reconcile against the latest accepted spec when concurrent tracks affect the same capability. Mark a track complete after merge and retain it as history.

Spec reconciliation and OKF knowledge promotion have separate destinations and gates: capability contracts accompany their implementation; reusable lessons follow the review/promotion workflow below. Do not copy requirements, plans, bug reports, or reviews into `steering/`, and do not treat a completed track as proof that every candidate lesson was verified. Link to canonical specs and track evidence when useful. Specs and tracks share document metadata with OKF concepts while retaining these separate roles.

## Document Metadata for Specs and Tracks

The **document-metadata profile** requires parseable YAML frontmatter with non-empty string `type`, `title`, and one-sentence `description` for newly authored or deliberately updated capability specs, track documents, and authorized saved workflow briefs or standalone reports. Base OKF requires only `type`; the other two fields are this project's discovery convention. Add one header at the start of the file and retain its ordinary Markdown body and artifact-specific sections.

| Artifact | `type` |
| --- | --- |
| `docs/specs/<capability>/spec.md` | `Capability Specification` |
| Track `spec.md` | `Change Specification` |
| `bug.md` | `Bug Report` |
| `plan.md` | `Implementation Plan` |
| `todo.md` | `Task List` |
| `review.md` | `Review` |
| `verification.md` | `Verification Report` |
| `notes.md` | `Working Notes` |
| `capability-map.md` | `Capability Map` |
| `ship.md` | `Launch Dossier` |
| Saved idea / intent brief | `Idea Brief` / `Intent Brief` |
| Standalone security / performance audit | `Security Audit` / `Performance Audit` |
| Standalone test coverage report | `Test Coverage Analysis` |
| Standalone optimization ledger (`PERF.md`) | `Performance Record` |

Use OKF `status` only for document maturity: `draft`, `stable`, or `deprecated`. New unreviewed documents start as `draft`; `stable` means ready for consumption, not approved requirements, implemented behavior, a PASS verdict, or a completed track. Record work progress separately in `workflow_status` when useful, using the project's vocabulary (for example `planned`, `in_progress`, or `completed`). Keep one authoritative representation of progress; task checkboxes and report verdicts keep their own meanings. An existing prose “Status” label may describe work or evidence; never automatically convert it to OKF `status`.

Optional track-graph fields on track `spec.md` and `bug.md` (omit on historical or standalone tracks):

| Field | Meaning |
| --- | --- |
| `role` | `initiative`, `feature`, `bug`, or `task`. Epic parents use `initiative`, never `epic`. |
| `parent` | Track id of the initiative this change belongs to |
| `children` | List of child track ids the initiative indexes |

These are structural links for the [delivery fork](../using-agent-skills/SKILL.md#delivery-fork). They are not OKF `status`, `workflow_status`, approval, or a verification verdict.

Optional `sources`, `generated`, and `verified` follow the v0.2 rules below and record only actual evidence. Document-relative source paths resolve from the containing file. Keep evaluated revisions and report verdicts explicit; adding a header does not reverify content or extend earlier evidence. Whole-document maturity never turns a hypothesis in working notes into verified knowledge.

Read older headerless documents permissively. Add or repair metadata only within an authorized edit, preserving unknown fields, useful contents, links, and historical revision claims. A bulk header migration preserves historical bodies and adds only known descriptive metadata; do not infer authorship, maturity, review events, or completion. Explicit file-scope and read-only limits still apply.

These workflow documents remain in their owning homes outside the durable knowledge bundle; sharing frontmatter does not move them, bootstrap indexes, or declare all of `docs/` an OKF bundle. Save briefs and standalone reports only when authorized; inline summaries, general documentation, raw evidence, and skill/command configuration retain their own formats.

## OKF v0.2 Essentials

These are the parts of [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/62432a095456147ee71e70ac6e4dc0d2dea3ac30/okf/SPEC.md) that this workflow uses. The pinned specification is supplemental; this skill contains the rules needed to work without fetching or embedding it.

### Bundle and concept structure

- New bundles declare `okf_version: "0.2"` in their root `index.md`. Each repository or package bundle is independent; general docs, external knowledge homes, and feature workflow artifacts stay outside it.
- Every non-reserved Markdown concept has parseable YAML frontmatter with a non-empty `type`. This skill also produces `title` and a one-sentence `description`. Use normal YAML mappings and lists, including nested values; quote punctuation and date/time strings. Defaults are `Project`, `Project Guidance`, `Architecture Decision`, and `Playbook` for the four homes; catalogs use `Bundle Catalog` or `Knowledge Sources`.
- Reserve `index.md` and `log.md` at every depth. Indexes group directory-relative links and descriptions under headings. Only the root index has frontmatter, containing only the version. Optional `log.md` has no frontmatter and uses newest-first `## YYYY-MM-DD` headings with bullets; omit it when git history suffices.
- A concept ID is its bundle-relative path without `.md`. Prefer bundle-relative absolute links between concepts and directory-relative links in indexes. External-home and cross-bundle links belong in typed catalog concepts, not reserved indexes.

The root, project concept, and three collection indexes in the layout above are this skill's discovery requirements; base OKF makes indexes optional. Missing indexes are repair candidates, never grounds to reject readable knowledge.

### Provenance, review, and freshness

Use these optional fields when they convey verified information; absence is valid and must not be filled with invented authors, dates, or approval:

| Field | How this skill uses it |
| --- | --- |
| `sources` | Evidence behind the concept. Each entry needs `resource`; add a stable `id` when attributing a claim with a matching Markdown footnote. Prefer durable repository/web URLs for evidence outside the bundle; document the portability trade-off when only checkout-relative paths are available. |
| `generated` | Authorship and content-change time, with required `by` and optional `at`. Actor forms are `<producer>/<version>`, `human:<id>`, or `process:<id>`. Record only an identity and time actually known. |
| `verified` | Actual verification events as a list of `{ by, at }`; also accept a single mapping when reading. No field means unverified; non-human verifiers mean machine-confirmed; only an actual `human:<id>` review means human-reviewed. A commit or a human-authored source does not establish human review of the generated concept. |
| `status` | `draft`, `stable`, or `deprecated`. Mark bootstrap proposals `draft` until reviewed. Absent status means stable content, not verified content; surface deprecated knowledge as historical. |
| `stale_after` | An optional absolute revalidation deadline. Once reached, flag the knowledge for rechecking rather than silently trusting or deleting it. |

Timestamp-valued fields use ISO 8601 datetimes with an explicit UTC offset. Preserve verification history when editing, but do not present earlier verification as confirmation of new claims. Omit freshness deadlines without an evidence-backed expiry policy.

For example, a proposed guidance concept can cite an existing bundle decision:

```markdown
---
type: Project Guidance
title: Await asynchronous test setup
description: Complete fixture seeding before running database assertions.
status: draft
sources:
  - id: test-isolation
    resource: /decision-records/0003-test-isolation.md
---

Await fixture seeding so assertions cannot race database initialization.[^test-isolation]

[^test-isolation]: Accepted test isolation policy.
```

Top-level `resource`, when used, identifies the canonical underlying asset; `sources` identifies evidence. Keep the rationale in the body instead of treating metadata alone as proof.

### Reading and upgrading existing bundles

Consume permissively: preserve unknown types, fields, and nested values; tolerate missing optional metadata, missing indexes, and broken links. Report unfamiliar versions and attempt best-effort reading. Missing trust/freshness fields do not make a concept unreadable.

Continue reading v0.1 bundles: a legacy `timestamp` can supply content-change time only when `generated` is absent, and a legacy `# Citations` list remains usable evidence. Neither proves review. Do not rewrite an existing bundle or bump its declared version as a side effect of reading or syncing it. If a format upgrade is authorized, preserve every existing claim and extension, convert citations to `sources` with stable footnote IDs where needed, and map a legacy time into `generated.at` only when a real `generated.by` is known. Preserve legacy data rather than fabricate missing provenance. Validate before changing the version declaration.

### Collection Goals

The collections describe complementary views of the project and share the same review, promotion, and maintenance lifecycle:

| Home | Goal and typical content |
|---|---|
| `<bundle-root>/project.md` | Compact project identity, purpose, direction, and constraints; entry point to deeper understanding. |
| `<bundle-root>/steering/` | Broad current understanding: product/domain concepts, technology, structure, architecture, API and testing standards, security, deployment context, performance, conventions, risks, and lessons. |
| `<bundle-root>/decision-records/` | Specific decisions made as needs arise: the problem, context, choice, alternatives, rationale, and consequences. Each record explains one decision. |
| `<bundle-root>/runbooks/` | Procedural knowledge: prerequisites, ordered steps, validation, and recovery for deployment, rollback, troubleshooting, or other recurring operations. |
| `docs/specs/<capability>/spec.md` | Accepted capability requirements and their acceptance criteria. |
| `docs/tracks/<track-id>/` | One change's proposals, bugs, plans, running notes, and evidence. |

**Current understanding and decision history complement each other.** `tech.md` can explain the current datastore and how it is used, while a linked decision records why it was selected. `structure.md` can explain the architecture even when its design has ADRs. Keep decision history in its record and cite it from the current overview; an existing ADR does not remove the need for coherent project understanding. An observed gotcha belongs with its domain's guidance; a recovery sequence belongs in a runbook.

**`project.md` evolves**, so memory should also flag *significant drift* — when working reality has moved away from the stated contract — so the next session reconciles rather than trusting a stale assumption.

## The Cardinal Rule: Explain the Why

Every durable knowledge entry records **why it's true, not just what it says.** A rule without its rationale can't be re-evaluated — a future session can't tell when it has stopped applying, so it either follows a dead rule or distrusts a live one. Working notes may record unresolved hypotheses when clearly labeled and tied to a next check.

```
Weak:    Use cn() for conditional classNames.
Strong:  Use cn() for conditional classNames — hand-concatenation caused
         duplicate-class bugs in #142.
```

The "why" does triple duty: it's the **rationale** (so the rule can be applied with judgment), the **evidence/provenance** (so it's trustworthy), and the **staleness check** (when the why no longer holds, prune the rule). A durable entry must trace to verified code or documentation, a completed feature, an accepted decision, a verified failure, or a user-approved preference. Never promote an unverified assumption or a one-off behavior merely because it was written in the notes.

## The Golden Rule: Capture Patterns, Not Catalogs

The test for whether something belongs in memory at all: **if new code that follows the existing pattern wouldn't require a memory update, the pattern is captured well.** Document the principle that guides decisions — not an inventory a future session could re-derive just by looking at the code.

```
Catalog (bad):  components/Button.tsx, components/Card.tsx, components/Modal.tsx,
                hooks/useAuth.ts, hooks/useCart.ts ... (goes stale every commit)
Pattern (good): Feature-first organization — each feature owns its components,
                hooks, and tests under features/<name>/. Shared primitives live
                in components/ui/.
```

A catalog rots on every commit and adds nothing a `ls` couldn't show; a pattern survives and encodes judgment. When you catch yourself enumerating what's already visible in the tree, stop — capture the rule behind the arrangement instead. This is also why memory is *derived from the codebase* during bootstrap, not invented: the patterns you record should be ones the code actually exhibits.

## Three Modes: Bootstrap, Migrate, and Sync

Resolve the active scope and existing knowledge owners first. A request only to read or summarize memory uses permissive consumption and the read-only verification checklist; it does not select a write mode, scaffold missing indexes, normalize metadata, or create a commit. Track-note updates use the running-notes workflow below and do not require an OKF bundle. Choose one of these modes only for authorized bundle changes, from the state of the active `<memory-root>/knowledge/` bundle:

**Bootstrap** — no legacy layout exists and `<bundle-root>/index.md`, `<bundle-root>/project.md`, or a required collection index is missing. Generate or repair the active repository or package bundle by *analyzing its codebase scope*: README, config and dependency files, directory structure, naming and import patterns. Extract patterns (per the Golden Rule), don't interrogate the user for what the code already shows. The research areas — product/direction, tech/stack, structure/conventions, and domain patterns — are independent and can be gathered in parallel. Use the potential steering files below to choose useful, evidence-backed concepts without scaffolding every example. Write OKF-conformant concepts and indexes, then present the result for review before treating it as source of truth.

In the bootstrap handoff, explicitly present the generated guidance as a proposal for review, cite the verified source facts, and identify any unresolved inferences. A local commit may package that proposal as a reviewable diff; it does not count as review or approval.

**Migrate** — project rules, existing memory pointers, or the user's instructions identify an earlier memory layout, and the task authorizes its migration. Its homes may include `<memory-root>/project.md`, `steering/`, `decisions/`, or `runbooks/`, or custom paths discovered above. If a confirmed legacy memory layout and `<memory-root>/knowledge/` both exist, reconcile unresolved ownership with the user; reuse any ownership decision already supplied. Otherwise inventory and move the identified legacy artifacts, repair missing required profile files from verified codebase evidence, add concept frontmatter, rewrite links, and update rules-file pointers in one reviewable change. Established external ADR/runbook homes are preserved unless their migration is authorized. Preflight reserved legacy `index.md` and `log.md` names: keep files that already have the reserved meaning, but rename ambiguous concept collisions with user approval and rewrite inbound links. Before trimming a human-authored rules file, route its unique durable facts into the bundle and preserve its tool-specific controls. Never bootstrap a second copy, leave compatibility copies or symlinks claiming the same canonical home, or discard partial legacy content. Without migration authorization, read the legacy layout best-effort and keep changes in its existing homes. For a bundle collection rename, move `<bundle-root>/decisions/` to `<bundle-root>/decision-records/` and rewrite its index entries, concept links, and source references together; preserve record contents, numbering, metadata, and the declared OKF version. Reading an older `decisions/` collection alone never authorizes this migration.

**Bridge the agent's rules file to memory (pointer only).** After bootstrap or migration writes a bundle, update the existing rules file at the same scope — repository `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`, etc., or a package-local rules file for a package bundle. Create `AGENTS.md` only when no rules file exists and the user wants one. This block does **not** duplicate memory; it is a signpost.

For a new repository bundle (use the actual declared version for an existing bundle):

```markdown
## Project memory
Durable knowledge is an OKF v0.2 bundle under `docs/knowledge/`. Read these at session start:
- `docs/knowledge/index.md` — bundle map and OKF version
- `docs/knowledge/project.md` — project contract, direction, constraints
Use the root index to load collection indexes and individual concepts on demand; don't inline their contents here.
```

For a package bundle, use the same block with
`packages/<pkg>/docs/knowledge/index.md` and
`packages/<pkg>/docs/knowledge/project.md`. If the package has no local rules
file, keep the repository rules pointer unchanged and add the package bundle to
the typed root `docs/knowledge/bundles.md` catalog instead; do not put a
cross-bundle pointer in a reserved index.

Keep each block to those pointers. The rules file is a *bridge*, not a second copy of memory — canonical content stays in the OKF bundle, and this block is the one place the tool-specific layer touches it (**link, don't restate**). On Sync, refresh the applicable block only if its bundle location or explicitly upgraded version changes; indexes absorb everything else.

**Sync** — the OKF bundle exists; keep it aligned with reality. This is the ongoing maintenance loop, and it works as **bidirectional drift detection**:

If the requested facts already have canonical homes and discovery indexes, finish with links to those sources. This is a no-op: do not create or modify files (including `AGENTS.md`), add a rules pointer, or make a commit merely to demonstrate that the skill ran. Apply the read-only completion checks unless the user separately requests a discovery repair.

- **Memory → Code**: an entry references something that no longer exists (a deleted file, a removed tool, a dropped convention) → a **prune candidate**. Flag it; don't auto-delete.
- **Code → Memory**: a pattern the code now follows that memory doesn't capture yet → an **update candidate**.

**Sync updates are additive, and human-written content is sacred.** A sync proposes *additions* and explicit *supersessions* through review — it never silently overwrites an entry a person wrote. Preserve unknown OKF types and frontmatter keys when round-tripping. Broken links and missing profile indexes are repair candidates, not reasons to reject the bundle. When in doubt, add rather than replace.

## Running Notes Throughout the Workflow

**Workflow notes:** Read `docs/tracks/<track-id>/notes.md` at entry to every phase and on resume. Update it as useful context changes throughout discovery, specification, planning, implementation, testing, debugging, verification, review, PR transitions, release, and cleanup. Use the current checkpoint and relevant unresolved notes rather than loading every historical track.

Create the file when an authorized track begins, with its current phase, source links, and next action; honor explicit file-scope restrictions. Before a track exists, keep discovery in the authorized brief and link it when the track is created. A standalone question or read-only/no-op request does not create a track or a note file.

When resuming a track with the former `memory-delta.md` filename, read it first. In an authorized edit, rename it to `notes.md` and update its active links, preserving useful contents and provenance. If both files exist, reconcile them into one notes file without dropping unresolved items. Keep historical reports and evaluated revisions intact; reading alone does not trigger migration.

Keep three small sections, omitting empty optional ones:

```markdown
---
type: Working Notes
title: "[Track] working notes"
description: "Current context, observations, and follow-ups for [track]."
status: draft
---

# Notes: [Track]

## Resume
- Phase and current step: ...
- Next action and blocker, if any: ...
- Sources: links to the spec or bug report, task, and current evidence.

## Notes
- Hypothesis — suspected cause; evidence still needed; next check.
- Observed — attempted action and actual outcome, with evidence/revision.
- Decision — chosen approach and concise rationale; approval state if relevant.
- Rejected or superseded — what changed and why; link to the replacement.

## Follow-ups and promotion candidates
- Knowledge, skill improvement, workflow improvement, or ad hoc follow-up — evidence/status, proposed destination, next action or disposition.
```

Write after meaningful discoveries, decisions, attempts, failures, user corrections, and phase transitions, and before pause, handoff, or context compaction. Do not append a status line after every tool call or fill a phase with empty boilerplate. A next session must be able to identify what is known, what is uncertain, and what to do next.

Notes can preserve failed approaches to avoid repeating them, but a failed experiment is not automatically a reusable lesson. Keep observations, hypotheses, approval status, and verification status distinct; recheck stale or conflicting observations against current code and evidence. A note is context, not permission, an accepted requirement, or a PASS report.

The file can hold reusable knowledge, ideas for improving skills or workflows, and ad hoc reminders or questions. At phase handoff and closeout, triage actionable items: knowledge → propose its canonical owner for the promotion gate below; skill/workflow improvement → the relevant project file when accepted and within the authorized change, otherwise a linked follow-up track or task; temporary context → retain in this track or condense when obsolete. Record the rationale, evidence, destination, and disposition. A suggestion may be recorded before it is proven; verify an accepted improvement before treating it as an established practice.

Link to authoritative specs, plans, task ledgers, bug reports, reviews, and verification results rather than duplicating their bodies or raw logs. Refresh the resume checkpoint and condense superseded detail into brief outcomes with evidence links; retain useful causal history. Record concise observations and decisions, not a transcript of every action.

For an immutable verification or release target, keep note updates in an authorized track workspace or a follow-up documentation change. Never mutate the pinned target to record notes or treat note-only commits as expanded verification coverage.

## How Knowledge Gets Saved: Notes → Review → Promote

Discovered knowledge does not get written straight into durable memory. It flows through review:

1. **Throughout a track**, capture working context in `docs/tracks/<track-id>/notes.md`. Mark verified, reusable findings as promotion candidates when they emerge; observations, hypotheses, and local execution notes remain working context. The file's existence or a phase completing does not establish durable knowledge.
2. **At ship or closeout, resolve scope first.** For work with no production launch, use the completed closeout review as the promotion gate; perform it autonomously within authorization, seeking human input only for unresolved critical ownership, intent, or authority. Never call an agent review human approval. Choose the memory root before the concept type: `docs/` for repo-wide or cross-package knowledge; `packages/<pkg>/docs/` only for an established or justified independent package bundle. Otherwise keep package-scoped knowledge in the repository bundle. The target OKF bundle is `<memory-root>/knowledge/`.
3. **GO — review, record, and promote.** Review the reusable-knowledge candidates for bundle promotion; skill/workflow improvements and ad hoc follow-ups use their own destinations above. Give each knowledge candidate a disposition with rationale: accepted, rejected as unverified, or retained as track-local. Route accepted items within the resolved bundle: project direction or constraints → `<bundle-root>/project.md`; specific choices and their rationale → `<bundle-root>/decision-records/`; current project/domain understanding, standards, risks, or lessons → `<bundle-root>/steering/`; repeatable procedures → `<bundle-root>/runbooks/`. At repository scope these resolve to `docs/knowledge/project.md`, `docs/knowledge/decision-records/`, `docs/knowledge/steering/`, and `docs/knowledge/runbooks/`. Create or update an OKF concept with the required frontmatter, update the affected collection index, and keep the root index current. Promote the accepted set in **one batched PR** and record target links in `notes.md`.
4. **NO-GO — preserve workflow state.** Record why the launch was blocked, leave every candidate unpromoted in `notes.md`, and make no durable-memory edit. A later GO decision performs the review and promotion.
5. **Knowledge discovered outside a track** (a standalone correction, a preference, or an incident with no active track) resolves root-versus-package scope and goes straight to its canonical home through a reviewable commit/PR; do not create a track just to store the note.

The promotion chain for procedural knowledge extends one step further: **note → lesson → runbook.** After an incident, a lesson ("DB failover needs X") that proves recurring and procedural graduates into a runbook *step*.

Memory concepts **cite** `docs/tracks/<track-id>/review.md` and other permanent evidence rather than copying it. For v0.2 concepts, record evidence in `sources` and use matching footnote IDs for claim-level attribution. Prefer durable repository/web URLs when the bundle may be distributed independently; use checkout-relative links only when that portability trade-off is explicit.

## How Memory Gets Loaded: Progressive Disclosure

Never load all of memory at once. Load the context appropriate to the current work:

- **Project core** — `docs/knowledge/index.md` + `docs/knowledge/project.md` when the bundle exists. Small, durable, and read at session start: the bundle map plus project identity.
- **Active-track context** — read the resume checkpoint and relevant notes in `docs/tracks/<track-id>/notes.md` at each phase entry and resume, alongside the linked capability specs and current task. Missing track notes do not require bootstrapping an OKF bundle.
- **Load-on-demand** — load the relevant `steering/`, `decision-records/`, or `runbooks/` index on demand from the root map, then load only the concepts that index says the current task needs.

Each `index.md` does real work — it is **not** a bare table of contents. It carries a one-line summary per entry plus the path to the full file, so a session can often answer a question from the index alone and only open the full file when it needs detail. *Surface context at the level the moment requires.*

## How Memory Is Organized: Organize by Domain, Not by Knowledge-Type

Organize steering by the topic a reader needs to understand. Each file brings together that topic's current model, conventions, risks, and lessons. For example, auth knowledge belongs together in `auth.md`; a project-wide `risks.md` would scatter that context. [Kiro's steering guidance](https://kiro.dev/docs/steering/) illustrates useful foundation and specialist topics. The following files are possibilities, chosen to fit the project; only the collection index is required by this profile.

```
docs/knowledge/steering/
  index.md                      → compact summaries + discovery paths (load on demand)
  product.md                    → users, domain vocabulary, journeys, and product context
  tech.md                       → stack, tooling, integrations, and technical constraints
  structure.md                  → organization, module boundaries, naming, and imports
  architecture.md               → system responsibilities, interactions, and data flows
  # standards and working context
  api-standards.md               → API conventions, auth, errors, and versioning
  testing-standards.md            → test strategy, fixtures, mocking, and expectations
  code-conventions.md            → coding patterns, examples, and anti-patterns
  security-policies.md           → trust boundaries and secure development standards
  components-form-validation.md → form patterns, validation, and accessibility
  deployment.md                 → environments, release model, and CI/CD context
  troubleshooting.md            → failure patterns, symptoms, and diagnostic context
  performance.md                → budgets, bottlenecks, and optimization principles
  commands.md                   → command entry points and environment quirks
  preferences.md                → team working preferences
  # project-specific domains; nest as their knowledge grows
  auth.md                       → auth/session.md → auth/session/fixation.md
  billing.md                    → billing concepts, conventions, risks, and lessons
```

Use descriptive names at the needed scope: `api-rest-conventions.md`, `testing-unit-patterns.md`, or `performance-optimization.md` can specialize a broader topic. Existing `api.md`, `testing.md`, and `conventions.md` are equally valid; extend the established file instead of creating synonyms. Domain-specific knowledge stays with its domain, and cross-cutting files hold project-wide guidance. Create only files with useful content.

Keep `project.md` as the compact identity and direction anchor. Add `steering/product.md` only when deeper product/domain understanding warrants it, linking to the anchor rather than repeating its contract. Combine `structure.md` and `architecture.md` when one coherent explanation suffices. Deployment and troubleshooting understanding can live in steering while executable sequences live in linked `runbooks/deploy.md`, `runbooks/rollback.md`, or `runbooks/troubleshooting-guide.md`; route by content, not filename.

**Lead every file with its *why*.** Open a domain file with a one- or two-line philosophy/rationale before the specifics. The why lets a future session apply the guidance with judgment and know when it has stopped applying; examples and before/after comparisons make conventions concrete.

**One domain per file.** A file covers exactly one concern. Don't merge unrelated topics to cut file count, and don't let one file accumulate several — that's what keeps the index and pruning clean.

**Size by signal, not by a line cap.** There is no fixed ceiling — prioritize clarity and easy retrieval over arbitrary limits.
- **Split** a file when it holds 2+ distinct concepts, or has grown hard to scan.
- **Merge** files when they overlap, or when one is too small to stand alone (rule of thumb: under ~20 lines). This is the only hard threshold, and it's a *floor* — resist splitting a cohesive single-topic file just because it got long.
- As a *soft* calibration, ~100–200 lines (a 2–3 minute read) is a healthy size. Treat drift well past it as a smell worth checking for a second concept, not a rule that forces a split. Split by concept, never because a line count tripped.

**Start flat, nest as a domain grows.** A small project's `auth.md` is one file. When it gets big, decompose by topic — `auth.md → auth/session.md → auth/session/fixation.md` — and have the parent list its children in a **"Related files"** section (the per-level equivalent of the top-level index). Prefer depth over a sprawl of flat top-level files, but don't pre-build a deep hierarchy before the content justifies it. Good: `auth/session-fixation.md`. Bad: `auth_session_risk.md` (flat, underscored).

**Runbooks turn project understanding into repeatable action.** Keep prerequisites, ordered steps, validation, and recovery in `runbooks/`, linking to steering for background. Reference actual scripts, CI config, and `steering/commands.md` rather than copying command text that will drift.

## Monorepos: Two-Level Memory

A monorepo breaks the single-bundle assumption — one repository bundle covering many packages eventually makes unrelated package concepts noisy. The fix is a shared OKF bundle plus independent package bundles. Each bundle has its own concept-ID namespace and `okf_version: "0.2"` declaration for new bundles.

```
docs/knowledge/                         # repo-wide OKF bundle
  index.md
  project.md                            # monorepo contract and shared direction
  bundles.md                            # typed catalog of independent package bundles, when needed
  steering/index.md + <domain>.md       # shared project understanding and standards
  decision-records/index.md + NNNN-*.md # cross-package decisions
  runbooks/index.md + <procedure>.md    # workspace procedures

packages/<pkg>/docs/knowledge/          # independent package OKF bundle
  index.md
  project.md                            # package contract, direction, constraints
  steering/index.md + <domain>.md
  decision-records/index.md + NNNN-*.md
  runbooks/index.md + <procedure>.md
```

The required package core resolves exactly to `packages/<pkg>/docs/knowledge/index.md`,
`packages/<pkg>/docs/knowledge/project.md`,
`packages/<pkg>/docs/knowledge/steering/index.md`,
`packages/<pkg>/docs/knowledge/decision-records/index.md`, and
`packages/<pkg>/docs/knowledge/runbooks/index.md`.

**Routing rule:** resolve scope before type. A fact that affects **one package** lives in `packages/<pkg>/docs/knowledge/` when that independent bundle exists; until the split is justified, it remains in `docs/knowledge/` with the package named in its concept ID, title, or tags. A fact that affects multiple packages or the workspace itself always lives in the repository bundle. Within the chosen bundle, route project contract → `project.md`, a specific decision → `decision-records/`, current project/domain understanding → `steering/`, and procedure → `runbooks/`. A cross-package contract is a root-bundle ADR. Reference it from a package concept using a durable repository URL when independent bundle portability matters.

**Loading stays progressive:** always load `docs/knowledge/index.md` and `docs/knowledge/project.md`. When the active package has its own bundle, also load `packages/<pkg>/docs/knowledge/index.md` and `packages/<pkg>/docs/knowledge/project.md`. Consult each bundle's collection indexes on demand; never load every package bundle. If discovery from the root is needed, add package links to a typed `docs/knowledge/bundles.md` concept. Do not put cross-bundle links in `steering/index.md`, because a reserved OKF index inventories only its own directory.

**Start lighter, split when justified.** For a small monorepo, keep each package as a domain concept in the root bundle — `docs/knowledge/steering/foo.md`, `docs/knowledge/steering/bar.md`. Promote a package to `packages/<pkg>/docs/knowledge/` only when it needs multiple concepts. Create the entire required package profile together: root index, project concept, and the three collection indexes.

## Pruning: Cut for Wrongness, Not Size

Memory hygiene is two-sided. Sprawl is one failure; **over-compression is the equal and opposite failure.**

Prune what is **stale, wrong, or superseded** — never what is merely large or rarely read. A stable preference consulted once a month still earns its place; deleting it to shrink a file destroys specificity that is far harder to recover than a few tokens are to carry. When you reorganize, the three actions per file are:

- **SPLIT** — a multi-concept file into focused, nested files (add a "Related files" section to the parent).
- **MERGE** — overlapping or tiny files into one (consolidate, dedupe, delete the originals).
- **KEEP + CLEAN** — an already-focused file: add structure, remove redundancy, resolve contradictions.

All of these are memory changes, so they go through the same commit/PR review as any other.

## Common Rationalizations

- *"I'll just remember this in the conversation."* — The conversation ends and the knowledge dies with it. If it's durable, write it down; if it's not durable, it doesn't belong in memory anyway.
- *"This might be useful someday, I'll save it just in case."* — Speculative memory is noise. Save what a future feature would *need*, not everything that *happened*. Apply the promotion test.
- *"I'll write the rule now and add the reasoning later."* — A rule without its why is unmaintainable from the moment it's written. The why is not optional polish; it's what makes the entry trustworthy and prunable.
- *"The file's getting long, I'll split it to be tidy."* — Length alone is not a reason to split. Split on *multiple concepts*, not on line count. A long single-topic file is fine.
- *"Memory is bloated, I'll trim the stuff nobody reads."* — Rarely-read ≠ stale. Prune for wrongness, not for size. You may be deleting the one fact that saves a future session hours.
- *"I'll just edit memory directly, the PR is overhead."* — The review is what keeps unverified assumptions out of durable memory. For a quick correction a single commit is fine, but the change must still be a reviewable diff, not a silent in-place mutation.
- *"The architecture already has ADRs, so steering has nothing to explain."* — Decision records explain particular choices. Steering explains the current system and links those choices into a coherent understanding without copying their history.
- *"Let me list the whole directory structure so the agent knows the layout."* — A file listing rots on the next commit and tells a session nothing it couldn't get from `ls`. Capture the *pattern* (how the tree is organized and why), not the inventory.
- *"The user said add it to memory, so I'll add it."* — If the fact already lives in `project.md` or an ADR, "add to memory" is best served by a pointer in the index, not a copy. Honor the intent (findability), not the literal duplication.

## Red Flags

- Memory entries that state a rule with no rationale or provenance.
- Knowledge saved from an unverified assumption or a single observation ("silent learning").
- The same fact copied into multiple files instead of one canonical location with links.
- A `steering/` file that has grown to cover several unrelated topics.
- Steering treated as leftover notes, or an entire suggested file catalog scaffolded without project-specific content.
- Pruning justified by size ("too long", "rarely used") rather than by wrongness.
- Content duplicated from `project.md`, an ADR, or a spec folder instead of linked.
- Memory written straight into durable files with no reviewable diff.
- Loading the entire `steering/` directory at session start instead of consulting the index.
- A runbook that pastes command text instead of pointing at the real script/CI source.
- An entry that catalogs what's already visible in the tree (file lists, dependency dumps) instead of the pattern behind it.
- Memorializing the agent's own scaffolding — `.claude/`, `.cursor/`, `.gemini/` and similar tooling dirs are not project knowledge.
- A new domain file that overlaps an existing one instead of extending it.
- A sync that overwrites a human-written entry instead of proposing an additive change.
- Treating all of `docs/` as the OKF bundle or imposing this document profile on unrelated guides and configuration.
- Using OKF `status` for task progress or a test verdict, or inventing review metadata during a header migration.
- A non-reserved bundle concept with missing or empty `type` frontmatter.
- Frontmatter on a collection `index.md`, or any root-index frontmatter beyond its `okf_version` declaration.
- Dropping unknown OKF types or extension keys during sync.
- Putting package-bundle links in a reserved collection index instead of a typed bundle-catalog concept.

## Verification

### Read-only consumption

- [ ] The answer reflects the available concepts and identifies unavailable evidence without inventing it.
- [ ] An unrecognized version is reported; unknown types, extension fields, absent optional metadata, missing indexes, and broken links are tolerated.
- [ ] Review and freshness signals are interpreted from evidence; missing signals never imply human review.
- [ ] Files and the declared version are unchanged. No scaffolding, normalization, index update, commit, or conformance claim is required to finish reading.

### Spec and track document changes

- [ ] Each authored or deliberately updated document has the required string fields and the appropriate artifact type; unknown metadata is preserved.
- [ ] Document maturity, workflow progress, approval, and evidence verdicts remain distinct. Header migrations preserve historical bodies and evaluated revisions without fabricating provenance.

For working notes, also confirm:

- [ ] The checkpoint names the current phase, next action, and relevant source links; stale claims are rechecked against current evidence.
- [ ] Observations, hypotheses, approval, and verification status remain distinct. Actionable knowledge and improvement ideas have proposed destinations and dispositions.
- [ ] Explicit read-only and file-scope boundaries and pinned targets remain intact. Notes alone do not trigger bundle-authoring checks.

### Bundle-authoring changes

Apply these checks to the authorized changes and their affected indexes, not as a mandate to normalize every imported concept. Preserve untouched imported metadata and versions; propose unrelated repairs separately. Full profile checks apply when creating a bundle or explicitly migrating it to this profile.

- [ ] Each new entry records **why**, not just what — with provenance (verified code/docs, feature, decision, failure, or approved preference).
- [ ] The active bundle root is `docs/knowledge/` or `packages/<pkg>/docs/knowledge/`; workflow and general docs remain outside it.
- [ ] A newly created or explicitly upgraded v0.2 bundle declares `okf_version: "0.2"`; new or explicitly repaired concepts have parseable frontmatter with non-empty `type`, `title`, and `description`. A sync preserves an imported bundle's declared version and does not imply whole-bundle conformance.
- [ ] Reserved `index.md` and any `log.md` follow the OKF structure; collection indexes have no frontmatter.
- [ ] Each entry captures a **pattern, not a catalog** — nothing that's just an inventory of what the code already shows.
- [ ] A new domain file doesn't duplicate an existing one; sync changes are additive, not silent overwrites of human-written content.
- [ ] Unknown types and frontmatter keys were preserved; optional fields, broken links, or missing optional indexes did not cause destructive normalization.
- [ ] New v0.2 provenance uses `sources`; optional authorship, verification, and expiry fields are evidence-backed. Bootstrap concepts remain `draft` until reviewed.
- [ ] The knowledge was routed to its resolved owner, preserving established external locations and formats; nothing duplicates `project.md`, an ADR, or a spec folder.
- [ ] Every fact has exactly one canonical location; everything else links to it.
- [ ] Any new track has a unique repository-wide `NNN-<name>` id; accepted capability requirements stay in their owning specs, with reconciliation or a justified no-change disposition recorded before review.
- [ ] The change went through a reviewable diff (commit/PR), not a silent in-place edit.
- [ ] The corresponding root or package-local bundle and collection index is updated so a future session can find the new content without reading everything.
- [ ] Each file covers one concern; tiny/overlapping files were merged, multi-topic files split.
- [ ] Steering provides coherent current understanding, decision records explain individual choices, and runbooks contain procedures; suggested filenames remain optional and overlapping sources are linked.
- [ ] Any pruning removed something *stale or wrong*, and preserved stable-but-rare facts.
- [ ] Runbooks link to real scripts/CI rather than restating commands.
