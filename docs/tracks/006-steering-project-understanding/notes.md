---
type: Working Notes
title: Steering project understanding working notes
description: Scope, interpretation, and verification context for the steering guidance update.
status: draft
---

# Notes

## Resume

- Phase: implementing the user-authorized rename to `decision-records/`; next action is validation and review of the updated revision. The track remains unmerged.
- Scope and acceptance: [change spec](spec.md); owner: [memory-management capability](../../specs/memory-management/spec.md).
- Earlier evidence: [verification](verification.md) and [review](review.md) cover `dea534f2c25a5600c25ae851a6ace50b83c529de`; the rename requires fresh evidence before handoff.
- Local changes and a local commit are within the requested endpoint. No merge or publishing is requested.

## Notes

- User correction: steering supports broad understanding; decisions record individual choices; runbooks are procedural. Inclusion modes are excluded.
- Accepted follow-up: rename the default collection to `decision-records/` to distinguish historical records from current project understanding. Update the repository/package examples, standalone ADR default, and four fixture file paths. Preserve external `docs/adr/` fixtures and historical reports.
- The existing skill's repeated residue/fallback framing conflicts with that purpose. Definitions, routing, examples, and verification guidance are updated together.
- Keep the compact project anchor; optional product guidance expands domain understanding. Existing ADRs can support current architecture overviews without replacing them.
- File examples are suggestions, not scaffolding requirements. Verification uses existing validators and manual content review; no new wording-matching tests are warranted for this documentation change.
