---
type: Capability Specification
title: 'Capability: Memory Management'
description: Accepted requirements, ownership, and acceptance criteria for Memory Management.
---

# Capability: Memory Management

## Objective

Preserve trustworthy project knowledge so future sessions can understand the project broadly, explain individual decisions, and execute recurring procedures. Keep accepted capability requirements, change history, current guidance, and reusable lessons in their canonical homes.

## Ownership and Discovery

- Accepted capability requirements live at `docs/specs/<capability>/spec.md`, with one stable capability id across changes.
- Individual changes live at `docs/tracks/<track-id>/`, using repository-wide `NNN-<name>` ids starting at `001`. Allocate above the highest existing number, preserve ids and gaps, and resolve concurrent collisions before merge.
- Tracks use a change spec or bug report, running notes, and only the plan, tasks, verification, review, and launch files needed for the work. They link affected capability specs without copying whole contracts.
- Reusable project knowledge lives in an OKF bundle under `docs/knowledge/`, or the owning package's knowledge directory. Discover established ADR and runbook homes before applying defaults; preserve their ownership, numbering, and format.
- Rules files point to the knowledge bundle. Indexes provide concise discovery; external homes are linked through typed catalog concepts instead of copied into bundle concepts.

## Knowledge Collection Goals

- `project.md` anchors compact project identity, purpose, direction, and constraints.
- `steering/` provides broad, enduring understanding of the current project: product/domain context, technology, structure, architecture, standards, risks, and lessons. Organize by topic and explain its rationale, with concrete examples where useful.
- `decision-records/` records individual contextual choices as they arise: the problem, choice, alternatives, rationale, and consequences. Current architecture and technology overviews may cite these records while the records retain decision history. Repository and package bundles use this collection name.
- Read existing `decisions/` collections permissively. When their rename is authorized, move records and update indexes, concept links, and source references together, preserving contents, numbering, metadata, and the OKF version. Established external ADR homes retain their locations unless separately included in the migration.
- `runbooks/` holds procedural knowledge: prerequisites, ordered steps, validation, and recovery for recurring operations. Link to steering for background and to scripts/configuration for executable details.
- Potential steering topics include product, tech, structure, architecture, APIs, testing, code conventions, security, component/form patterns, deployment context, troubleshooting, performance, commands, preferences, and project-specific domains. These are optional, content-driven suggestions, not a required file catalog. Extend existing concepts and combine overlapping topics.
- Keep deeper product context distinct from the compact `project.md` anchor. Route deployment and troubleshooting overviews to steering and their executable procedures to runbooks according to content, regardless of filename. Each source retains its purpose and links to related knowledge instead of duplicating contracts or decision histories.

## Working Notes

- `docs/tracks/<track-id>/notes.md` is the AI's running notebook. Create its initial checkpoint when authorized tracked work begins; read it at each phase entry and resume throughout discovery, specification, planning, build, testing/debugging, verification, review, PR transitions, release, and cleanup.
- Update useful discoveries, decisions, attempts and outcomes, blockers, and next actions at meaningful changes and before pause, handoff, or compaction. Keep a concise resume checkpoint and source links; do not require a write after every tool call or duplicate authoritative artifacts and raw logs.
- Capture ad hoc observations, reminders, reusable knowledge, and skill/workflow improvement ideas. Distinguish hypotheses, observations, approval, and verification. Recheck stale claims; failed approaches may remain useful track context without becoming permanent guidance.
- Triage actionable items at handoff and closeout. Propose knowledge for its canonical owner under the promotion gate; apply accepted in-scope skill/workflow improvements to their owning files or link a follow-up task. Record evidence, rationale, destination, and disposition; retain useful temporary context in the track.
- Notes do not authorize changes or override specs, task state, code, or evidence. Respect read-only/no-op and explicit file-scope requests. Before a track exists, use its authorized brief; keep note updates outside pinned verification/release targets.
- On authorized resumption, migrate the former `memory-delta.md` file into `notes.md`, preserving useful content, unresolved items, provenance, and active links. Read-only consumption leaves it unchanged. Historical reports retain their evaluated revisions.

## Reconciliation and Promotion

- Before review, reconcile implemented, verified requirement changes into the owning capability specs in the same implementation PR. Record target links or a justified no-change disposition in the track's spec or bug report.
- Deferred, canceled, and unverified requirements remain in the track. Mark the track complete after merge and retain it as history.
- Candidate reusable knowledge stays in the track's notes until the applicable release GO or completed closeout review for work without a production launch. Perform the review autonomously within authorization; reserve human input for unresolved critical ownership, intent, access, or authority. Record acceptance, rejection, or deferral with rationale and target links, and never label an agent review as human approval.
- Route project constraints, specific decisions, current project/domain understanding, and repeatable procedures to their resolved canonical owners. Cite track evidence and capability specs rather than duplicating them.
- Promote only verified, reusable project knowledge and durable preferences, including current understanding grounded in verified code or documentation. Ineffective, reverted experiments that established no reusable constraint stay out of the knowledge bundle; retain them in track notes when they help avoid repeated work. An already-recorded fact produces a no-op with links.

## Format, Trust, and Maintenance

- Newly authored or deliberately updated capability specs, track documents, and authorized saved workflow briefs or standalone reports have parseable YAML frontmatter with non-empty string `type`, `title`, and `description`. Use the artifact types defined in the memory-management profile and keep their Markdown bodies and canonical ownership.
- OKF `status` describes document maturity (`draft`, `stable`, `deprecated`). New unreviewed documents start as `draft`. Workflow progress may use `workflow_status`; approval, task checkboxes, report verdicts, and evaluated revisions retain their separate meanings. Do not duplicate authoritative progress fields or convert an existing prose status into OKF maturity automatically.
- Optional provenance and verification metadata require actual evidence. Read legacy headerless documents permissively; preserve unknown metadata and respect read-only/file-scope limits. Authorized header migrations preserve historical bodies and revision claims without inventing authorship, maturity, or review.
- New bundles use the relevant OKF v0.2 subset embedded in the skill: typed concepts, discovery indexes, provenance, actual verification metadata, and evidence-backed freshness.
- Continue reading v0.1 and unfamiliar versions permissively. Preserve unknown fields and legacy evidence; do not migrate or change a version declaration as a side effect of reading.
- Never invent authors, dates, review, or evidence. Bootstrap output remains a draft proposal until actually reviewed; a local commit does not establish human approval.
- Prune based on accuracy, redundancy, ownership, and usefulness. File size alone does not justify losing distinct guidance.
- Canonical specs and track artifacts remain outside the durable knowledge bundle while sharing its document metadata conventions. This does not bootstrap bundle indexes, declare all documentation an OKF bundle, or promote a track proposal into accepted requirements.
- Documentation authoring discovers the artifact's owner and format before writing. Bundle ADRs and runbooks follow their concept types and indexes; established external ADR/runbook homes, reserved indexes/logs, general guides, configurations, inline contributions, and raw evidence retain their owning formats.
