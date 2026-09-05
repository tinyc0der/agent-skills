---
name: memory-management
description: Maintains durable memory as Open Knowledge Format (OKF) bundles. Use when saving verified lessons or team preferences for future sessions, bootstrapping a knowledge bundle, or pruning and syncing stale memory. Covers canonical knowledge ownership and permissive reading of imported bundles.
---

# Memory Management

## Overview

A project should get faster to work in over time. Every session, feature, fix, and failure leaves behind knowledge — but most of it dies when the session ends, so the next session re-derives it from scratch. Memory management fixes that: it captures the *durable* knowledge, routes it to a home where future sessions will actually find it, and keeps it from rotting.

The core skill is **knowing what to keep and where to put it.** Memory is not a dumping ground for everything that happened — it's the small, curated set of facts a future session genuinely needs and could not quickly re-derive. Save too little and the agent hallucinates project conventions; save too much (or save wrong things) and the signal drowns in noise.

This skill is **tool-agnostic**. It assumes a git-backed project but makes no assumptions about Claude Code, Cursor, or any specific tool's memory mechanism. Git is the common substrate: durable memory lives in tracked files, and changes to it go through reviewable commits. The one place it touches the tool layer is a thin *pointer* in the agent's rules file (`CLAUDE.md`/`AGENTS.md`/…) that signposts memory's location — never a copy of it (see Bootstrap).

## When to Use

Trigger this skill — even when the user doesn't say "memory":

- **A feature ships.** Promote what was learned during the work into durable memory.
- **The user states a durable preference or corrects you** in a way that should outlive this session ("we always run migrations in a transaction", "don't use default exports here").
- **A failure is diagnosed and reproducible.** The failure mode and its cause are worth keeping.
- **A session starts and feels familiar** — load the relevant memory rather than re-exploring.
- **Memory looks stale, sprawling, or wrong** — it contradicts the current code, or files have grown unscannable. Pruning and reorganizing is part of this skill, not a separate one.
- **Setting up a project's durable-memory core** for the first time (Bootstrap mode — derive it from the codebase), or deciding where a new piece of knowledge belongs.

If a piece of knowledge only matters to the current conversation, it does **not** belong in memory. Memory is for what survives the session.

## A Note on Terms: Memory vs. `steering/`

**Memory** is the whole durable-knowledge system: the portable OKF knowledge bundle plus the shipped `specs/` history that supplies workflow evidence. The bundle contains `project.md`, `decisions/`, `steering/`, and `runbooks/`; feature workflow state stays outside it.

**`steering/`** is one part of that system: the directory holding durable knowledge that has no more specific home. It used to be called `memory/`; it's renamed to `steering/` precisely so "memory" can keep its broader meaning without the directory name colliding with it.

So: *memory* = the system; *`steering/`* = the residue directory inside it.

## The Mental Model: Three Tiers

Knowledge lives at one of three levels, and only earns promotion upward when it's useful, scoped, evidence-backed, and reviewable:

```
Session memory   → what this agent has in context right now (most of it is disposable)
Workflow state   → task-specific state for one feature        (lives in docs/specs/<slug>/)
Project memory   → durable knowledge reused across features   (docs/knowledge/ OKF bundle)
```

The promotion test for project memory: **"Would a future feature that has nothing to do with this one still need this fact?"** If yes, it belongs in durable memory — and if it has no more specific home, in `steering/`. If no, it stays in the feature's workflow state. Shipped feature folders remain as provenance, but feature-local facts are not promoted into the always-discovered core.

An abandoned or reverted experiment that established no reusable constraint stays in session or workflow history. Do not save an ineffective parameter change merely as context for a verified fix, or turn "it made no difference in this session" into a general rule.

## Where Knowledge Lives

Durable memory is separated into homes. The skill's first move is always to ask *"does this belong somewhere more specific?"* and only land in `steering/` when the answer is no.

**Discover existing owners before applying the defaults below.** Inspect project rules, documentation indexes, existing ADRs and runbooks, and configuration such as `.adr-dir`. Established homes such as `docs/adr/` or `Documentation/Decisions/` remain canonical, including their numbering, format, and links. Follow `documentation-and-adrs` for decisions in those homes. Directory names alone do not identify a legacy memory layout or authorize moving it.

When an established home is outside the bundle, route its new knowledge there. If bundle discovery is needed, add a typed `external-knowledge.md` concept (`type: Knowledge Sources`) linking to those canonical homes with descriptions, and list that concept in the root index. Use the cross-boundary citation rules below; do not copy their contents into bundle concepts or put external links in reserved collection indexes. Required bundle indexes may stay empty for externally owned collections. External documents keep their existing format and are not subject to OKF concept frontmatter. All routing below uses these resolved owners; the illustrated homes are defaults for knowledge with no established owner.

**Every durable artifact has a resolved memory root.** Resolve scope first: the repository memory root is `docs/`; a package-owned memory root is `packages/<pkg>/docs/`. The OKF bundle root is always `<memory-root>/knowledge/`. Per-feature workflow state remains in repository `docs/specs/<slug>/`, outside the bundle, regardless of memory scope. The repository layout is:

```
docs/knowledge/
  index.md              → OKF bundle entrypoint and version declaration
  project.md            → stable (but evolving) project contract, direction, constraints
  decisions/            → deliberate, dated architecture decisions
    index.md
    NNNN-*.md
  steering/             → declarative cross-workflow knowledge with no more specific home
    index.md
    <domain>.md
  runbooks/             → repeatable operational procedures
    index.md
    <procedure>.md

docs/specs/<slug>/      → feature workflow: spec → plan → memory delta → review → ship
```

Each bundle has a root `index.md`; each durable collection under `<memory-root>/knowledge/` carries its own `index.md`. These maps provide one-line summaries and discovery paths so a session can find the right concept without reading the whole directory.

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
    resource: /decisions/0003-test-isolation.md
---

Await fixture seeding so assertions cannot race database initialization.[^test-isolation]

[^test-isolation]: Accepted test isolation policy.
```

Top-level `resource`, when used, identifies the canonical underlying asset; `sources` identifies evidence. Keep the rationale in the body instead of treating metadata alone as proof.

### Reading and upgrading existing bundles

Consume permissively: preserve unknown types, fields, and nested values; tolerate missing optional metadata, missing indexes, and broken links. Report unfamiliar versions and attempt best-effort reading. Missing trust/freshness fields do not make a concept unreadable.

Continue reading v0.1 bundles: a legacy `timestamp` can supply content-change time only when `generated` is absent, and a legacy `# Citations` list remains usable evidence. Neither proves review. Do not rewrite an existing bundle or bump its declared version as a side effect of reading or syncing it. If a format upgrade is authorized, preserve every existing claim and extension, convert citations to `sources` with stable footnote IDs where needed, and map a legacy time into `generated.at` only when a real `generated.by` is known. Preserve legacy data rather than fabricate missing provenance. Validate before changing the version declaration.

`steering/` and `runbooks/` are siblings that split durable knowledge by *shape*: `steering/` holds **declarative** facts (what's true — conventions, risks, lessons), and `runbooks/` holds **imperative** procedures (what to do — deploy, rollback, incident response). They share the same lifecycle (durable, synced, promoted, reviewed); the split is just declarative-vs-imperative.

`steering/` is the **residue** — the institutional knowledge that lives *between* the other documents:

| Goes elsewhere | Belongs in `steering/` |
|---|---|
| Product direction → `<bundle-root>/project.md` | Conventions the code follows but no doc states |
| A deliberate architecture decision → `<bundle-root>/decisions/` | Build / test / verify / deploy commands and env quirks |
| One feature's requirements → `docs/specs/<slug>/` | Known risks and fragile areas found while working |
| A step-by-step operational procedure → `<bundle-root>/runbooks/` | Recurring failure modes |
| | Lessons from completed features ("tried X, failed because Y") |
| | User/team working preferences too informal for a spec |

**ADR vs. memory lesson:** a *deliberate* architecture choice gets an ADR; an *observed* gotcha or failure with no formal decision attached is a memory lesson. Memory links to the ADR rather than restating it.

**`project.md` evolves**, so memory should also flag *significant drift* — when working reality has moved away from the stated contract — so the next session reconciles rather than trusting a stale assumption.

## The Cardinal Rule: Explain the Why

Every memory entry records **why it's true, not just what it says.** A rule without its rationale can't be re-evaluated — a future session can't tell when it has stopped applying, so it either follows a dead rule or distrusts a live one.

```
Weak:    Use cn() for conditional classNames.
Strong:  Use cn() for conditional classNames — hand-concatenation caused
         duplicate-class bugs in #142.
```

The "why" does triple duty: it's the **rationale** (so the rule can be applied with judgment), the **evidence/provenance** (so it's trustworthy), and the **staleness check** (when the why no longer holds, prune the rule). This is also why silent learning is banned — a memory entry must trace to a completed feature, an accepted decision, a verified failure, or a user-approved preference. Never write memory from an unverified assumption or a one-off behavior.

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

Resolve the active scope and existing knowledge owners first. A request only to read or summarize memory uses permissive consumption and the read-only verification checklist; it does not select a write mode, scaffold missing indexes, normalize metadata, or create a commit. For authorized memory changes, choose a mode from the state of the active `<memory-root>/knowledge/` bundle:

**Bootstrap** — no legacy layout exists and `<bundle-root>/index.md`, `<bundle-root>/project.md`, or a required collection index is missing. Generate or repair the active repository or package bundle by *analyzing its codebase scope*: README, config and dependency files, directory structure, naming and import patterns. Extract patterns (per the Golden Rule), don't interrogate the user for what the code already shows. The research areas — product/direction, tech/stack, structure/conventions, and domain patterns — are independent and can be gathered in parallel. Write OKF-conformant concepts and indexes, then present the result for review before treating it as source of truth.

In the bootstrap handoff, explicitly present the generated guidance as a proposal for review, cite the verified source facts, and identify any unresolved inferences. A local commit may package that proposal as a reviewable diff; it does not count as review or approval.

**Migrate** — project rules, existing memory pointers, or the user's instructions identify an earlier memory layout, and the task authorizes its migration. Its homes may include `<memory-root>/project.md`, `steering/`, `decisions/`, or `runbooks/`, or custom paths discovered above. If a confirmed legacy memory layout and `<memory-root>/knowledge/` both exist, reconcile unresolved ownership with the user; reuse any ownership decision already supplied. Otherwise inventory and move the identified legacy artifacts, repair missing required profile files from verified codebase evidence, add concept frontmatter, rewrite links, and update rules-file pointers in one reviewable change. Established external ADR/runbook homes are preserved unless their migration is authorized. Preflight reserved legacy `index.md` and `log.md` names: keep files that already have the reserved meaning, but rename ambiguous concept collisions with user approval and rewrite inbound links. Before trimming a human-authored rules file, route its unique durable facts into the bundle and preserve its tool-specific controls. Never bootstrap a second copy, leave compatibility copies or symlinks claiming the same canonical home, or discard partial legacy content. Without migration authorization, read the legacy layout best-effort and keep changes in its existing homes.

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

## How Memory Gets Saved: Delta → Review → Promote

Discovered knowledge does not get written straight into durable memory. It flows through review:

1. **During a feature**, candidate knowledge accumulates in `docs/specs/<slug>/memory-delta.md` — a scratchpad. It is *not* durable memory yet; the feature might get reverted and take its "lessons" with it.
2. **At ship, resolve scope first.** For each candidate, choose the memory root before choosing the concept type. Use `docs/` for repo-wide or cross-package knowledge. For knowledge owned by one package, use `packages/<pkg>/docs/` only when that package already has (or now justifies) an independent bundle; otherwise keep it in the repository bundle with package scope encoded in the concept. The target OKF bundle is `<memory-root>/knowledge/`.
3. **GO — review, record, and promote.** Give every candidate a disposition with rationale: accepted, rejected as unverified, or retained as feature-local. Route accepted items within the resolved bundle: project direction or constraints → `<bundle-root>/project.md`; deliberate architecture choices → `<bundle-root>/decisions/`; declarative conventions, risks, or lessons → `<bundle-root>/steering/`; repeatable procedures → `<bundle-root>/runbooks/`. At repository scope these resolve to `docs/knowledge/project.md`, `docs/knowledge/decisions/`, `docs/knowledge/steering/`, and `docs/knowledge/runbooks/`. Create or update an OKF concept with the required frontmatter, update the affected collection index, and keep the root index current. Promote the accepted set in **one batched PR** and record target links in `memory-delta.md`.
4. **NO-GO — preserve workflow state.** Record why the launch was blocked, leave every candidate unpromoted in `memory-delta.md`, and make no durable-memory edit. A later GO decision performs the review and promotion.
5. **Knowledge discovered outside a feature** (a standalone correction, a preference, or an incident with no feature branch) skips the delta scratchpad, resolves root-versus-package scope, and goes straight to its canonical home through a reviewable commit/PR.

The promotion chain for procedural knowledge extends one step further: **delta → lesson → runbook.** After an incident, a lesson ("DB failover needs X") that proves recurring and procedural graduates into a runbook *step*.

Memory concepts **cite** `docs/specs/<slug>/review.md` and other permanent evidence rather than copying it. For v0.2 concepts, record evidence in `sources` and use matching footnote IDs for claim-level attribution. Prefer durable repository/web URLs when the bundle may be distributed independently; use checkout-relative links only when that portability trade-off is explicit.

## How Memory Gets Loaded: Progressive Disclosure

Never load all of memory at once. Split it into two tiers:

- **Always-loaded core** — `docs/knowledge/index.md` + `docs/knowledge/project.md`. Small, durable, and read at the start of every session: the bundle map plus project identity.
- **Load-on-demand** — load the relevant steering, decisions, or runbooks index on demand from the root map, then load only the concepts that index says the current task needs.

Each `index.md` does real work — it is **not** a bare table of contents. It carries a one-line summary per entry plus the path to the full file, so a session can often answer a question from the index alone and only open the full file when it needs detail. *Surface context at the level the moment requires.*

## How Memory Is Organized: Organize by Domain, Not by Knowledge-Type

The single most important structural rule: **a file is a domain, not a category of fact.** When you work on auth, you want auth's conventions, its risks, and its past lessons *together* — so they belong in `auth.md`, not scattered across a `conventions.md`, a `risks.md`, and a `lessons.md`. Both Kiro and Letta organize this way, and the reason is retrieval: you look things up by *what you're working on*, not by what type of knowledge it is. A `risks.md` that collects risks from every domain is a dumping ground that violates one-domain-per-file and makes conditional loading impossible.

```
docs/knowledge/steering/
  index.md          → compact summaries + discovery paths (load on demand)

  # cross-cutting type files — only for genuinely project-wide knowledge
  # that has no single domain to live in:
  conventions.md    → global rules (naming, no default exports, import patterns)
  commands.md       → build / test / verify / deploy commands + env quirks
  preferences.md    → team working preferences

  # domain files — the default home; each holds ITS OWN conventions,
  # risks, and lessons, and nests as it grows:
  auth.md           → auth/session.md → auth/session/fixation.md
  billing.md
  api.md
  testing.md

docs/knowledge/runbooks/      → sibling home for imperative procedures
  index.md          → compact summaries + discovery paths (load on demand)
  deploy.md
  rollback.md

docs/knowledge/decisions/     → architecture decision records
  index.md          → compact summaries + discovery paths (load on demand)
  0001-....md
  0002-....md
```

**The routing rule that kills the ambiguity:** domain-specific knowledge goes in its domain file; only knowledge with *no single domain* goes in a cross-cutting type file. An auth token-lifetime rule → `auth.md`. A risk found in billing → `billing.md`. A truly project-wide rule like "no default exports" → `conventions.md`. There is no catch-all `risks.md` or `lessons.md`.

**Lead every file with its *why*.** Open a domain file with a one- or two-line philosophy/rationale before the specifics (Kiro structures every steering file this way). The why is what lets a future session apply the rules with judgment and know when they've stopped applying.

**One domain per file.** A file covers exactly one concern. Don't merge unrelated topics to cut file count, and don't let one file accumulate several — that's what keeps the index and pruning clean.

**Size by signal, not by a line cap.** There is no fixed ceiling — prioritize clarity and easy retrieval over arbitrary limits.
- **Split** a file when it holds 2+ distinct concepts, or has grown hard to scan.
- **Merge** files when they overlap, or when one is too small to stand alone (rule of thumb: under ~20 lines). This is the only hard threshold, and it's a *floor* — resist splitting a cohesive single-topic file just because it got long.
- As a *soft* calibration, ~100–200 lines (a 2–3 minute read) is a healthy size. Treat drift well past it as a smell worth checking for a second concept, not a rule that forces a split. Split by concept, never because a line count tripped.

**Start flat, nest as a domain grows.** A small project's `auth.md` is one file. When it gets big, decompose by topic — `auth.md → auth/session.md → auth/session/fixation.md` — and have the parent list its children in a **"Related files"** section (the per-level equivalent of the top-level index). Prefer depth over a sprawl of flat top-level files, but don't pre-build a deep hierarchy before the content justifies it. Good: `auth/session-fixation.md`. Bad: `auth_session_risk.md` (flat, underscored).

**Runbooks are memory's imperative half — their own top-level home.** Most of memory is declarative (facts, conventions, lessons) and lives in `steering/`; a runbook is an ordered, executable procedure for a recurring operation, so it sits in a sibling `runbooks/` directory rather than inside `steering/`. Keep them honest with one rule: **link, don't restate** — a runbook references the actual scripts, CI config, and `steering/commands.md` rather than copying command text that will drift.

## Monorepos: Two-Level Memory

A monorepo breaks the single-bundle assumption — one repository bundle covering many packages eventually makes unrelated package concepts noisy. The fix is a shared OKF bundle plus independent package bundles. Each bundle has its own concept-ID namespace and `okf_version: "0.2"` declaration for new bundles.

```
docs/knowledge/                         # repo-wide OKF bundle
  index.md
  project.md                            # monorepo contract and shared direction
  bundles.md                            # typed catalog of independent package bundles, when needed
  steering/index.md + <domain>.md       # rules that apply across packages
  decisions/index.md + NNNN-*.md        # cross-package decisions
  runbooks/index.md + <procedure>.md    # workspace procedures

packages/<pkg>/docs/knowledge/          # independent package OKF bundle
  index.md
  project.md                            # package contract, direction, constraints
  steering/index.md + <domain>.md
  decisions/index.md + NNNN-*.md
  runbooks/index.md + <procedure>.md
```

The required package core resolves exactly to `packages/<pkg>/docs/knowledge/index.md`,
`packages/<pkg>/docs/knowledge/project.md`,
`packages/<pkg>/docs/knowledge/steering/index.md`,
`packages/<pkg>/docs/knowledge/decisions/index.md`, and
`packages/<pkg>/docs/knowledge/runbooks/index.md`.

**Routing rule:** resolve scope before type. A fact that affects **one package** lives in `packages/<pkg>/docs/knowledge/` when that independent bundle exists; until the split is justified, it remains in `docs/knowledge/` with the package named in its concept ID, title, or tags. A fact that affects multiple packages or the workspace itself always lives in the repository bundle. Within the chosen bundle, route project contract → `project.md`, deliberate decision → `decisions/`, declarative domain knowledge → `steering/`, and procedure → `runbooks/`. A cross-package contract is a root-bundle ADR. Reference it from a package concept using a durable repository URL when independent bundle portability matters.

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
- *"This decision should go in memory."* — If it's a deliberate architecture decision, it's an ADR. Memory is for the observed, the conventional, and the procedural — link to the ADR instead of restating it.
- *"Let me list the whole directory structure so the agent knows the layout."* — A file listing rots on the next commit and tells a session nothing it couldn't get from `ls`. Capture the *pattern* (how the tree is organized and why), not the inventory.
- *"The user said add it to memory, so I'll add it."* — If the fact already lives in `project.md` or an ADR, "add to memory" is best served by a pointer in the index, not a copy. Honor the intent (findability), not the literal duplication.

## Red Flags

- Memory entries that state a rule with no rationale or provenance.
- Knowledge saved from an unverified assumption or a single observation ("silent learning").
- The same fact copied into multiple files instead of one canonical location with links.
- A `steering/` file that has grown to cover several unrelated topics.
- Pruning justified by size ("too long", "rarely used") rather than by wrongness.
- Content duplicated from `project.md`, an ADR, or a spec folder instead of linked.
- Memory written straight into durable files with no reviewable diff.
- Loading the entire `steering/` directory at session start instead of consulting the index.
- A runbook that pastes command text instead of pointing at the real script/CI source.
- An entry that catalogs what's already visible in the tree (file lists, dependency dumps) instead of the pattern behind it.
- Memorializing the agent's own scaffolding — `.claude/`, `.cursor/`, `.gemini/` and similar tooling dirs are not project knowledge.
- A new domain file that overlaps an existing one instead of extending it.
- A sync that overwrites a human-written entry instead of proposing an additive change.
- Treating all of `docs/` as the OKF bundle and accidentally imposing concept frontmatter on specs, migration guides, or general documentation.
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

### Authored changes

Apply these checks to the authorized changes and their affected indexes, not as a mandate to normalize every imported concept. Preserve untouched imported metadata and versions; propose unrelated repairs separately. Full profile checks apply when creating a bundle or explicitly migrating it to this profile.

- [ ] Each new entry records **why**, not just what — with provenance (feature, decision, failure, or approved preference).
- [ ] The active bundle root is `docs/knowledge/` or `packages/<pkg>/docs/knowledge/`; workflow and general docs remain outside it.
- [ ] A newly created or explicitly upgraded v0.2 bundle declares `okf_version: "0.2"`; new or explicitly repaired concepts have parseable frontmatter with non-empty `type`, `title`, and `description`. A sync preserves an imported bundle's declared version and does not imply whole-bundle conformance.
- [ ] Reserved `index.md` and any `log.md` follow the OKF structure; collection indexes have no frontmatter.
- [ ] Each entry captures a **pattern, not a catalog** — nothing that's just an inventory of what the code already shows.
- [ ] A new domain file doesn't duplicate an existing one; sync changes are additive, not silent overwrites of human-written content.
- [ ] Unknown types and frontmatter keys were preserved; optional fields, broken links, or missing optional indexes did not cause destructive normalization.
- [ ] New v0.2 provenance uses `sources`; optional authorship, verification, and expiry fields are evidence-backed. Bootstrap concepts remain `draft` until reviewed.
- [ ] The knowledge was routed to its resolved owner, preserving established external locations and formats; nothing duplicates `project.md`, an ADR, or a spec folder.
- [ ] Every fact has exactly one canonical location; everything else links to it.
- [ ] The change went through a reviewable diff (commit/PR), not a silent in-place edit.
- [ ] The corresponding root or package-local bundle and collection index is updated so a future session can find the new content without reading everything.
- [ ] Each file covers one concern; tiny/overlapping files were merged, multi-topic files split.
- [ ] Any pruning removed something *stale or wrong*, and preserved stable-but-rare facts.
- [ ] Runbooks link to real scripts/CI rather than restating commands.
