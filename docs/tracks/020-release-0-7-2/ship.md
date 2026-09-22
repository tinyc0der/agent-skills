---
type: Launch Dossier
title: Launch dossier for Agent Skills 0.7.2
description: Rollout, monitoring, and rollback for the 0.7.2 plugin version cut.
status: draft
---

# Launch Dossier: Agent Skills 0.7.2

**Release inclusion:** [PR #19](https://github.com/tinyc0der/agent-skills/pull/19) is the version cut. It is open and not merged. No deployment identifier exists yet.

## Rollout prerequisites

- Five manifests and `CHANGELOG.md` match annotated tag `0.7.2`.
- `node scripts/validate-versions.js` passes on a descendant of that tag.
- Repository skill, command, link, lifecycle, and routing gates pass on the release branch.
- Open PR #13 is not included.

## Migration and compatibility

- Patch install over `0.7.1`. No stored data, flags, or dependency upgrades.
- Agents that follow the skills will split large intent into one pull request per track and will validate delegated review findings before editing. Those behaviors already landed on `main` in pull requests #16, #17, and #18.

## Success thresholds

- A checkout of tag `0.7.2` reports `0.7.2` from `git describe --tags --abbrev=0` and from all five manifests.
- Plugin validation accepts the marketplace manifest.
- No new validator or install failure appears on the release pull request.

## Monitoring

- Watch the release pull request's Test Plugin Installation workflow.
- After merge, confirm `git describe --tags --abbrev=0` on `main` is `0.7.2`.

## Rollback triggers

- Manifests and the nearest tag disagree.
- Install or marketplace validation fails on the release commit.
- The changelog omits a consumer-facing change from `0.7.1..a193689` or includes unmerged work.

## Rollback steps

1. Do not merge the release pull request.
2. Delete remote tag `0.7.2` only if it points at the abandoned release commit and a replacement tag has not been published.
3. Consumers stay on tag `0.7.1` (`f49fd6674622a5da9e34cc8857735d35122f9888`).
4. Retarget manifests to the restored tag before opening a replacement release.

Deleting a tag that anyone has already fetched is a published-history change and needs a separate decision. Until merge, `main` itself remains `0.7.1`.

## Ownership

- Release authorization: the user requested the `0.7.2` identity. Merge to `main` is still a separate authorization.
- Recovery-time target: minutes, by staying on `0.7.1` or reverting the unmerged branch.

## Deployment record

Pending. Append the merge commit after an authorized merge. Do not treat this dossier as a GO for merge.
