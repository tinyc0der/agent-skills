# Migration: Capability Specs and Change Tracks

## Purpose

Capability specs describe the accepted behavior of the current repository revision. Tracks retain the proposals, plans, tasks, and evidence for individual changes.

## Procedure

1. Inventory existing branch-based specification bundles and identify the capability or capabilities each changes. Resolve ambiguous ownership before moving anything.
2. Allocate a repository-wide `NNN-<name>` track id, starting at `001` and taking the next unused three-digit number above the highest existing prefix. Move each bundle's change specification, plan, task ledger, review, verification, candidate memory, and launch dossier into `docs/tracks/<track-id>/`. Preserve report contents and evaluated revisions. Existing module specifications become per-capability sections in the track's specification, with their original revisions retained in Git history. Preserve ids and gaps; resolve concurrent number collisions before merge.
3. Establish one `docs/specs/<capability>/spec.md` per capability from accepted, implemented behavior. Pending proposals remain in the track. Do not copy task histories or review reports into canonical specs.
4. Link each track specification or bug report to the capability specs it affects. Update repository-relative links and command, skill, fixture, and validator path consumers together.
5. Verify that only canonical capability specifications remain under `docs/specs/`, all active workflows resolve their tracks, and all path, link, lifecycle, and routing checks pass.

## Completion

During future work, reconcile verified requirement changes into the owning capability specs in the same PR as the implementation. Record the affected paths and disposition in the track's specification or bug report. A bug that restores the existing contract records why no canonical edit is needed. Deferred and canceled changes do not enter canonical specs. Retain completed tracks after merge; do not rename them when branches are deleted.

## Rollback

Revert the migration commits together so artifact locations and their readers return to the same convention. Preserve any subsequent work before reverting, repair its links, then rerun the artifact-path, Markdown-link, and lifecycle checks. No external data or deployment migration is involved.
