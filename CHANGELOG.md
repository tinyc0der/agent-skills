# Changelog

## Unreleased

## 0.7.1

### Added

- `reflect` skill for turning scoped session evidence into verified harness corrections.
- Grok Build setup, plus Grok as the default runner for delegated implementation and independent verification.
- Epic parent and child tracks: independently shippable features get their own track, worktree, PR, and verification, with parent `todo.md` indexing children.

### Changed

- Implementation requests include a scoped draft pull-request handoff once the repository, base branch, and access are established.
- New work branches are created in linked worktrees; the primary checkout stays on the default branch.
- Pull-request merge methods are chosen from policy, recorded with a head guard, and verified against the landed result.
- Clone and install URLs, marketplace identity, and setup docs use `tinyc0der/agent-skills`. Codex plugin removal is documented.
- Feature+map work stays on one track; independently shippable children use the delivery fork. Parent `/build` and `/verify` cover parent planning or assembled-revision integration.

### Fixed

- Delegated sessions stay bounded and recover when a worker does not report completion.
- Pull-request readiness requires revision-matched verification evidence.

## 0.7.0

### Added

- Feature-level verification and explicit workflows for bounded tasks, bugs, refactoring, and multi-feature initiatives.
- Durable project memory, running track notes, shared OKF document metadata, and separate capability specifications and numbered change tracks.
- Skills for risk-based test-case design and review, and for coordinating engineering phases through Orca.

### Changed

- Authorized workflows progress autonomously, with clearer human decision gates, actionable questions, and prompt notification of active incidents.
- Steering describes broad current project understanding and offers foundation and specialist file suggestions. Individual choices use `decision-records/`; runbooks hold procedures.
- Skill discovery, review evidence, context budgeting, and operational guidance have been strengthened.

### Compatibility

- Existing memory bundles and established external ADR homes remain readable. Rename an older `decisions/` collection only as an authorized migration, updating its index, links, and source references while preserving record contents and the OKF version. See [memory migration guidance](skills/memory-management/SKILL.md#three-modes-bootstrap-migrate-and-sync).
- For capability-spec and numbered-track adoption, see the [workflow compatibility guidance](docs/feature-development-workflow-release-notes.md#compatibility-guidance).
