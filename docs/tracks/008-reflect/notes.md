---
type: Working Notes
title: Reflect working notes
description: Record the scope, source adaptation, and evaluation progress for the reflect skill.
status: draft
---

# Reflect working notes

## Resume

- Phase: verification of the skill, eval fixtures, catalog integration, and canonical contract.
- Next action: finish independent fixture execution, inspect resulting artifacts, then record verification and review.
- Source: [change spec](spec.md).

## Notes

- Observed: the working tree started clean on `tinyc0der/add-reflect-skill-harness`.
- Observed: baseline structural checks pass for 29 skills; routing passes 163 checks at 98% rank-1 (100/102), with the 95% floor unchanged.
- Decision: use `reflect` as the name, interpreting the request's “relect” as a typo consistent with the linked skill.
- Decision: keep the skill self-contained and use the active conversation/digest without a provider-specific transcript scanner or required reviewer models.
- Decision: evidence selects between an existing skill edit, description change, structural enforcement, memory routing, deferred work, and no change. Reuse authorization for local work; never infer external actions from a reflection request.
- Observed: the first description passed the routing floor but displaced `idea-refine` for its developer-retention prompt (97%, 102/105). Diagnosed the broad improvement vocabulary with the existing ranker; narrowed only the new description and added that unchanged prompt as a negative case. Behavioral evals were already running; the workflow body is unchanged.
- Observed: final routing restores the baseline rate: 170 checks pass at 98% rank-1 (103/105). All three new positive prompts rank `reflect` first.
- Observed: the standard behavioral runner stopped before execution because the configured Claude OAuth session expired and could not refresh. No behavioral result was produced. Used skill-creator's independent forward-testing procedure with fresh agents and the same three fixture requests; each workspace is disposable and isolated from the source repository.
- Observed: the Markdown-link check caught the adoption guide's old catalog anchor after the count changed. Updated that inbound link and current catalog counts; historical verification counts remain intact.
