---
type: Working Notes
title: Steering project understanding working notes
description: Scope, interpretation, and verification context for the steering guidance update.
status: draft
---

# Notes

## Resume

- Phase: implementation is verified and reviewed at `5dea3642ed8363464a6526905938a8bd74e7d78a`; proceeding to PR creation and merge into `tinyc0der/agent-skills:main` under the user's follow-up authorization.
- Scope and acceptance: [change spec](spec.md); owner: [memory-management capability](../../specs/memory-management/spec.md).
- Current evidence: [verification](verification.md) and [review](review.md) cover the renamed revision and retain the earlier revision's evidence separately. No unresolved issue remains within the requested local endpoint.
- The user explicitly requested PR creation and merge into main. Follow the PR's checks and enforced review requirements; record completion in that PR after merge. Earlier reports' local-only authority statements describe the scope before this follow-up.

## Notes

- User correction: steering supports broad understanding; decisions record individual choices; runbooks are procedural. Inclusion modes are excluded.
- Accepted follow-up: rename the default collection to `decision-records/` to distinguish historical records from current project understanding. Update the repository/package examples, standalone ADR default, and four fixture file paths. Preserve external `docs/adr/` fixtures and historical reports.
- The existing skill's repeated residue/fallback framing conflicts with that purpose. Definitions, routing, examples, and verification guidance are updated together.
- Keep the compact project anchor; optional product guidance expands domain understanding. Existing ADRs can support current architecture overviews without replacing them.
- File examples are suggestions, not scaffolding requirements. Verification uses existing validators and manual content review; no new wording-matching tests are warranted for this documentation change.
