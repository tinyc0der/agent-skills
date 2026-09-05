# Capability: Memory Management

## Objective

Preserve trustworthy project knowledge across sessions while keeping accepted capability requirements, change history, and reusable lessons in their canonical homes.

## Ownership and Discovery

- Accepted capability requirements live at `docs/specs/<capability>/spec.md`, with one stable capability id across changes.
- Individual changes live at `docs/tracks/<track-id>/`, using repository-wide `NNN-<name>` ids starting at `001`. Allocate above the highest existing number, preserve ids and gaps, and resolve concurrent collisions before merge.
- Tracks use a change spec or bug report and only the plan, tasks, verification, review, candidate-memory, and launch files needed for the work. They link affected capability specs without copying whole contracts.
- Reusable project knowledge lives in an OKF bundle under `docs/knowledge/`, or the owning package's knowledge directory. Discover established ADR and runbook homes before applying defaults; preserve their ownership, numbering, and format.
- Rules files point to the knowledge bundle. Indexes provide concise discovery; external homes are linked through typed catalog concepts instead of copied into bundle concepts.

## Reconciliation and Promotion

- Before review, reconcile implemented, verified requirement changes into the owning capability specs in the same implementation PR. Record target links or a justified no-change disposition in the track's spec or bug report.
- Deferred, canceled, and unverified requirements remain in the track. Mark the track complete after merge and retain it as history.
- Candidate reusable knowledge stays in the track's memory delta until the applicable review and promotion gate is satisfied. Record acceptance, rejection, or deferral with rationale and target links.
- Route project constraints, deliberate decisions, declarative guidance, and repeatable procedures to their resolved canonical owners. Cite track evidence and capability specs rather than duplicating them.
- Preserve only verified, reusable lessons and durable preferences. Discard session chatter and ineffective, reverted experiments that established no reusable constraint. An already-recorded fact produces a no-op with links.

## Format, Trust, and Maintenance

- New bundles use the relevant OKF v0.2 subset embedded in the skill: typed concepts, discovery indexes, provenance, actual verification metadata, and evidence-backed freshness.
- Continue reading v0.1 and unfamiliar versions permissively. Preserve unknown fields and legacy evidence; do not migrate or change a version declaration as a side effect of reading.
- Never invent authors, dates, review, or evidence. Bootstrap output remains a draft proposal until actually reviewed; a local commit does not establish human approval.
- Prune based on accuracy, redundancy, ownership, and usefulness. File size alone does not justify losing distinct guidance.
- Canonical specs and track artifacts remain outside OKF bundles and do not require OKF frontmatter.
