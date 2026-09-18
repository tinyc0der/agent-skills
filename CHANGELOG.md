# Changelog

## Unreleased

### Changed

- Epic and multi-capability work uses a delivery fork: Feature+map stays one track; independently shippable children get flat sibling tracks; parent `todo.md` indexes children; `/build` and `/verify` on a parent do not stand in for child implementation or integration evidence.

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
