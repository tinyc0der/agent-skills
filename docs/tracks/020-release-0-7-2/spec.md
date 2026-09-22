---
type: Change Specification
title: Release Agent Skills 0.7.2
description: Publish plugin manifests and changelog at 0.7.2 for changes merged since 0.7.1.
status: draft
workflow_status: completed
role: task
---

# Spec: Release 0.7.2

**Route:** Bounded task. The user asked to upgrade to 0.7.2.

**Authorization and readiness:** Explicit request to publish `0.7.2`. The 0.7.1 release (PR #15) is the process template: five manifests, changelog, and an annotated tag pushed with the branch. Merge to `main` stays outside this request.

**Affected capabilities:** None. Release metadata only.

## Release discovery

- Baseline: annotated tag `0.7.1` at `f49fd6674622a5da9e34cc8857735d35122f9888`, which is an ancestor of `main`.
- Target: `orgin/main` at `a193689d91dbeaa563baf73f7c042d2e58800607` (fetched 2026-09-22).
- Range: `0.7.1..a193689`.
- Included product pull requests:
  - [#16](https://github.com/tinyc0der/agent-skills/pull/16) — one focused pull request per implementation track, including optional `gh-stack` for dependent tracks. Landed at `34ecc7172b632e6c4de95bc3029841ea149483b0`.
  - [#17](https://github.com/tinyc0der/agent-skills/pull/17) — preserve delegate worker and reviewer sessions for bounded follow-ups. Landed at `19d6587b38f366a10921fe04c7925ade24e5b193`.
  - [#18](https://github.com/tinyc0der/agent-skills/pull/18) — validate delegated review findings before repairs. Landed at `a193689d91dbeaa563baf73f7c042d2e58800607`.
- Direct commits: `1b5f7f3` records the 0.7.1 merge outcome. It is release bookkeeping, not a new consumer change.
- Release bookkeeping already covered by 0.7.1: `6b07372`, `77ac483`, and merge `3a55f8d`.
- Reverts: none.
- Ambiguous commits: none.
- Excluded: open PR #13 (harness design principles) is not on `main`.
- Material risks: instruction-only workflow changes. No migrations, dependencies, environment, or infrastructure. The annotated tag must remain an ancestor of `main`, so a later merge of this pull request has to be a merge commit.

## Objective

Cut plugin release `0.7.2` so consumers can install the work merged since tag `0.7.1`.

## Non-Goals

- Merging this pull request to `main`
- Creating a GitHub Release asset beyond the annotated git tag
- Changing capability contracts, skill bodies, or open PR #13
- Bumping to a minor version; the requested identity is `0.7.2`

## Acceptance criteria

1. All five plugin and marketplace manifests report version `0.7.2`.
2. `CHANGELOG.md` has a `0.7.2` section covering consumer-facing work merged since `0.7.1`, and `Unreleased` is empty.
3. An annotated `0.7.2` tag points at the release-metadata commit so `node scripts/validate-versions.js` passes.
4. Other manifest fields are unchanged.

## Scope

- In: version fields in `plugin.json`, `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.agents/plugins/marketplace.json`; `CHANGELOG.md`; the annotated tag; this track's workflow evidence; the release pull request.
- Out: merge, GitHub marketplace promotion, capability-spec edits, and unrelated open work.

## Testing Strategy

Existing `scripts/validate-versions.js` and `scripts/validate-versions-test.js` compare manifests to the latest reachable release tag. Run the repository validator suite after the tag exists. No new test is warranted: the gate already encodes the contract.

## Spec reconciliation

No `docs/specs/<capability>/spec.md` contract changed. Disposition: justified no-change for existing capability specs. Pull requests #16, #17, and #18 already reconciled their own contracts on `main`.
