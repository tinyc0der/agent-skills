---
type: Launch Dossier
title: 'Launch Dossier: Durable Feature Workflow Artifacts'
description: Rollout prerequisites, monitoring, rollback, and ownership for feature development workflow.
---

# Launch Dossier: Durable Feature Workflow Artifacts

**Release inclusion:** Pending

## Rollout prerequisites

- All deterministic tests and validators pass on the implementation revision.
- Claude, Gemini, and Antigravity command adapters remain discoverable.
- Plugin manifests and command counts remain valid.
- Release notes include legacy artifact migration guidance.

## Migration and compatibility

- Existing feature branches may move their global spec and task artifacts into a bundle derived from their branch.
- Ambiguous legacy artifacts require human ownership resolution.
- Existing PR, CI, release, and deployment records remain authoritative.

## Success thresholds

- Skill, command, artifact-path, lifecycle, reference-link, and Markdown-link validation remain green.
- Routing evals retain the configured rank-1 floor.
- A clean installation can execute the lifecycle from `/spec` through zero-argument `/ship` discovery.

## Monitoring

- Watch plugin installation and command-discovery failures after publication.
- Watch reports of missing specs, plans, task ledgers, or stale evidence after upgrade.

## Rollback triggers

- A lifecycle command cannot find an artifact produced by the preceding phase.
- Existing feature work cannot be migrated without data loss.
- `/ship` mutates or evaluates a different release target than the one confirmed.

## Rollback steps

1. Stop package or marketplace rollout.
2. Restore the previous published plugin version.
3. Revert the durable-artifact migration commits.
4. Reproduce the failure and add a regression case before republishing.

## Ownership

- Release authorization: human release manager
- Workflow maintenance: agent-skills maintainers
- Recovery-time target: one publication cycle

## Deployment record

Pending; append the immutable release or deployment identifier in a follow-up documentation change.
