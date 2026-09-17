---
type: Working Notes
title: Harness blueprint research and review notes
description: Scope, evidence, and next actions for the harness review and memory design research.
status: draft
---

# Harness blueprint research and review notes

## Current checkpoint

- Phase: memory design research complete. The user requested independent research by multiple agents, mutual validation, and an update to `blueprint.md`.
- The user confirmed the design must stay platform-neutral: define memory types, ownership, and lifecycle. File layouts, record formats, and storage products remain implementation choices.
- [The blueprint](../../../blueprint.md#memory-work-state-and-recovery) now defines four logical record types, their ownership and lifecycle, and a separate recovery contract. [The research brief](memory-research.md) records eight alternatives, primary sources, peer disagreements, and the proposed workflow trial.
- Three agents researched independently, each reviewed both peers, and all three approved the final documentation with no material required fixes. This is design review, not runtime proof or human approval of an implementation.
- Reuse the current linked worktree and branch. This is a design task; it does not implement or migrate the memory system.

## Memory design evidence

- Reviewed base: `a70b2974bf0057712254dc2976823300a44d9067`, plus the scoped documentation changes. Reviewed Git file versions: `blueprint.md` = `9e463330ffd81b87e5d54ccab1123da678d86f5e`; `memory-research.md` = `82ef2b97e301cb803ae5123e99d9e43586027887`.
- Documentation checks passed: `node scripts/validate-markdown-links.js` checked 154 Markdown files with zero errors; Ruby `YAML.safe_load` parsed both track document headers and confirmed non-empty `type`, `title`, and `description`; `git diff --cached --check` found no whitespace errors.
- No memory runtime tests or performance measurements were run for this design task. The research brief defines the needed trial and keeps the current capability contract separate from proposed changes.

## Earlier harness review

- The user requested a review of the existing harness against [the blueprint](../../../blueprint.md), then requested a rebase onto `main` during that review.
- Rebase completed without conflicts onto `af972f10622f4644e28dd36a4104393508b2690d`. All ten blueprint patches remained equivalent. The evaluated revision is `d7bb02a7708b1790b3f03fb0915e5ca25c2fe9d5`.
- [The review](review.md) records two reproduced optional-hook defects and seven further blueprint gaps. No harness implementation was changed.
- All 74 Node tests and 171 routing checks passed on the rebased code. Hook tests also passed, despite the two defects exposed by separate runtime probes.
- [Probe evidence](evidence/runtime-probes.json) and [the reproduction script](evidence/runtime-probes.py) preserve the observations without retaining temporary source workspaces.

## Earlier review decisions and limits

- The blueprint at the earlier reviewed revision was the comparison target. Distinguish its new design requirements from regressions in the previous architecture; the later memory design does not expand that review's coverage.
- Keep review findings separate from implementation. The user has not requested remediation in this task.
- Include the reflection and Git policy work from `main`; do not report those capabilities as absent.
- Live model behavior, host installation, and time/token savings remain unmeasured in this review.
- Track number 013 was allocated after checking the rebased repository, whose previous highest track number was 012.

## Next action

For implementation, begin with the research brief's bounded workflow trial. Reconcile the memory capability's promotion, concurrent updates, correction delivery, and deletion/recovery rules in a verified follow-up change. The earlier implementation findings remain open; this research does not establish that a proposed correction works.
