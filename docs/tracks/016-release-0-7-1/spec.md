---
type: Change Specification
title: Release Agent Skills 0.7.1
description: Publish plugin manifests and changelog at 0.7.1 for changes merged since 0.7.0.
status: draft
workflow_status: completed
role: task
---

# Spec: Release 0.7.1

**Route:** Bounded task. The user asked to upgrade to 0.7.1.

**Authorization and readiness:** Explicit request to publish `0.7.1`. The 0.7.0 release (PR #4) is the process template: five manifests, changelog, annotated tag pushed with the branch.

**Affected capabilities:** None. Release metadata only.

## Objective

Cut plugin release `0.7.1` so consumers can install the work merged since tag `0.7.0`.

## Non-Goals

- Merging this PR to `main`
- Creating a GitHub Releases asset beyond the annotated git tag
- Changing capability contracts, skill bodies, or open PR #13
- Bumping to a minor version; the requested identity is `0.7.1`

## Acceptance criteria

1. All five plugin and marketplace manifests report version `0.7.1`.
2. `CHANGELOG.md` has a `0.7.1` section covering consumer-facing work merged since `0.7.0`, and `Unreleased` is empty.
3. An annotated `0.7.1` tag points at the release-metadata commit so `node scripts/validate-versions.js` passes.
4. Other manifest fields are unchanged.

## Scope

- In: version fields in `plugin.json`, `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, and `.agents/plugins/marketplace.json`; `CHANGELOG.md`; the annotated tag; this track's workflow evidence; the release PR.
- Out: merge, GitHub marketplace promotion, capability-spec edits, and unrelated open work.

## Testing Strategy

Existing `scripts/validate-versions.js` and `scripts/validate-versions-test.js` compare manifests to the latest reachable release tag. Run the repository validator suite after the tag exists. No new test is warranted: the gate already encodes the contract.

## Spec reconciliation

No `docs/specs/<capability>/spec.md` contract changed. Disposition: justified no-change for existing capability specs.
