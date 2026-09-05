# Capability: Memory Management

## Objective

Preserve trustworthy project knowledge across sessions while keeping accepted capability requirements, change history, and reusable lessons in their canonical homes.

## Ownership and Discovery

- Accepted capability requirements live at `docs/specs/<capability>/spec.md`, with one stable capability id across changes.
- Individual changes live at `docs/tracks/<track-id>/`, using repository-wide `NNN-<name>` ids starting at `001`. Allocate above the highest existing number, preserve ids and gaps, and resolve concurrent collisions before merge.
- Tracks use a change spec or bug report, running notes, and only the plan, tasks, verification, review, and launch files needed for the work. They link affected capability specs without copying whole contracts.
- Reusable project knowledge lives in an OKF bundle under `docs/knowledge/`, or the owning package's knowledge directory. Discover established ADR and runbook homes before applying defaults; preserve their ownership, numbering, and format.
- Rules files point to the knowledge bundle. Indexes provide concise discovery; external homes are linked through typed catalog concepts instead of copied into bundle concepts.

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
- Candidate reusable knowledge stays in the track's notes until the applicable release GO or approved closeout review for work without a production launch. Record acceptance, rejection, or deferral with rationale and target links.
- Route project constraints, deliberate decisions, declarative guidance, and repeatable procedures to their resolved canonical owners. Cite track evidence and capability specs rather than duplicating them.
- Promote only verified, reusable lessons and durable preferences. Ineffective, reverted experiments that established no reusable constraint stay out of the knowledge bundle; retain them in track notes when they help avoid repeated work. An already-recorded fact produces a no-op with links.

## Format, Trust, and Maintenance

- New bundles use the relevant OKF v0.2 subset embedded in the skill: typed concepts, discovery indexes, provenance, actual verification metadata, and evidence-backed freshness.
- Continue reading v0.1 and unfamiliar versions permissively. Preserve unknown fields and legacy evidence; do not migrate or change a version declaration as a side effect of reading.
- Never invent authors, dates, review, or evidence. Bootstrap output remains a draft proposal until actually reviewed; a local commit does not establish human approval.
- Prune based on accuracy, redundancy, ownership, and usefulness. File size alone does not justify losing distinct guidance.
- Canonical specs and track artifacts remain outside OKF bundles and do not require OKF frontmatter.
