# Feature Development Workflow Implementation Checklist

**Source specification:** [`docs/feature-development-workflow.md`](../../feature-development-workflow.md)

**Goal:** Make the repository expose one coherent feature-development lifecycle across skills, commands, personas, documentation, setup guides, references, and evaluations.

**Implementation status:** Complete with fresh-review remediation applied.
Deterministic validation is green. Current verification and PR-transition
behavioral cases pass; the remaining token-backed reruns are recorded below
because the external Claude runner reached its five-hour quota again on
2026-08-26. The four-case shipping suite and every other blocked case pass
dry-run/schema validation.

Do not implement all changes as one large commit. Complete and verify each task independently, and keep the Claude, Gemini, and Antigravity command variants semantically equivalent.

## Task 1: Approve the lifecycle contract

**Dependencies:** None

**Checklist**

- [x] Review and approve the phase names and order in the source draft.
- [x] Decide whether `verification-and-validation` is a new skill or an extension of an existing skill.
- [x] Run the new-skill pre-flight checks from `CONTRIBUTING.md` if creating a skill.
- [x] Approve `Critical`, `Required`, `Optional`, `Nit`, and `FYI` as the shared review taxonomy.
- [x] Approve `/pr draft` and `/pr ready` as the pull-request lifecycle interface.
- [x] Decide whether `/verify` is added alongside `/test` or introduced through a compatibility migration.
- [x] Decide the canonical filenames for capability maps and module specifications.

**Likely files**

- `docs/feature-development-workflow.md`
- `CONTRIBUTING.md`

**Verification**

- [x] No open design question changes the ownership or interface of later tasks.
- [x] The approved decisions are recorded in the source draft or an ADR.

## Task 2: Establish a single canonical lifecycle map

**Dependencies:** Task 1

**Checklist**

- [x] Update the README lifecycle diagram and command table.
- [x] Update `using-agent-skills` so TDD is part of BUILD and debugging is an exception path.
- [x] Mark git, CI, security, documentation, and observability as cross-cutting disciplines.
- [x] Update `AGENTS.md` and the OpenCode guide to stop mapping routine VERIFY to debugging.
- [x] Update the adoption and getting-started guides to use the same lifecycle.
- [x] Update orchestration documentation with PR creation, verification, remediation, merge, and post-launch cleanup.
- [x] Remove contradictory lifecycle sequences from setup and comparison documentation.

**Likely files**

- `README.md`
- `AGENTS.md`
- `skills/using-agent-skills/SKILL.md`
- `docs/getting-started.md`
- `docs/adoption-guide.md`
- `docs/opencode-setup.md`
- `docs/comparison.md`
- `references/orchestration-patterns.md`

**Verification**

- [x] Searching for `DEFINE`, `VERIFY`, and the slash-command sequence finds no conflicting mappings.
- [x] Every documented happy path includes a real validation gate and excludes debugging unless a failure occurs.

## Task 3: Narrow the specification boundary

**Dependencies:** Task 1

**Checklist**

- [x] Make `spec-driven-development` own scope, requirements, acceptance criteria, boundaries, and approval only.
- [x] Remove or replace its duplicated Plan, Tasks, and Implement phases with explicit handoffs.
- [x] Make feature specs reference project-wide commands, structure, and style rules unless the feature changes them.
- [x] Define and consistently use the capability-map filename.
- [x] Make multi-capability commands write and select `SPEC-<module-id>.md` consistently.
- [x] Update the `/spec` variants to match the skill's narrowed contract.
- [x] Update specification eval cases for the new exit criteria and handoff.

**Likely files**

- `skills/spec-driven-development/SKILL.md`
- `.claude/commands/spec.md`
- `.gemini/commands/spec.toml`
- `commands/spec.toml`
- `evals/cases/spec-driven-development.json`

**Verification**

- [x] `/spec` stops after an approved specification and names `/plan` as the next step.
- [x] A multi-capability fixture produces an approved map and addressable module specs.
- [x] Specification content no longer duplicates planning mechanics.

## Task 4: Add feature-level verification

**Dependencies:** Tasks 1 and 2

**Checklist**

- [x] Implement the approved verification skill strategy.
- [x] Define acceptance-criteria traceability, runtime validation, integration/E2E checks, and full repository checks.
- [x] Include conditional migration, feature-flag, compatibility, security, accessibility, performance, documentation, and observability checks.
- [x] Add a `/verify` command in all supported command formats.
- [x] Keep `/test` focused on RED-GREEN-REFACTOR rather than presenting it as post-build validation.
- [x] Route verification failures to `debugging-and-error-recovery` without classifying debugging as the verification phase.
- [x] Add structural, routing, behavioral, and pressure evals for verification.

**Likely files**

- `skills/verification-and-validation/SKILL.md` if a new skill is approved
- `.claude/commands/verify.md`
- `.gemini/commands/verify.toml`
- `commands/verify.toml`
- `.claude/commands/test.md`
- `.gemini/commands/test.toml`
- `commands/test.toml`
- `evals/cases/`
- `evals/fixtures/`

**Verification**

- [x] A completed feature can be verified without writing production behavior.
- [x] A failed check enters systematic debugging and returns to verification afterward.
- [x] Each acceptance criterion is represented in the verification output.

## Task 5: Make pull-request creation explicit

**Dependencies:** Tasks 1 and 2

**Checklist**

- [x] Extend `git-workflow-and-versioning` with draft, ready-for-review, update, and merge transitions.
- [x] Add `/pr draft` and `/pr ready` command behavior in every supported command format.
- [x] Define the PR body contract: spec, plan, scope, non-goals, risks, acceptance criteria, verification evidence, migrations, flags, screenshots, and rollback notes.
- [x] Make `/pr ready` refuse readiness when required verification evidence is missing.
- [x] Clarify that PR creation does not imply external mutation unless the user invoked the PR command or otherwise authorized it.
- [x] Add eval coverage for draft creation and readiness gating.

**Likely files**

- `skills/git-workflow-and-versioning/SKILL.md`
- `.claude/commands/pr.md`
- `.gemini/commands/pr.toml`
- `commands/pr.toml`
- `docs/agents.md`
- `references/definition-of-done.md`
- `evals/cases/git-workflow-and-versioning.json`

**Verification**

- [x] Draft PR output is understandable without reading the diff.
- [x] Ready-for-review status requires a complete verification story.
- [x] Merge remains gated by review, CI, and required human approval.

## Task 6: Repair `/build` and `/build auto`

**Dependencies:** Tasks 2, 3, and 4

**Checklist**

- [x] Make the default build loop explicitly run RED, GREEN, REFACTOR, focused tests, regression tests, build, lint, type checking, and applicable runtime checks.
- [x] Reference one canonical per-slice Definition of Done instead of copying partial checklists.
- [x] Remove the contradictory `stop` instruction from the loop reused by auto mode.
- [x] Define how default and auto modes discover tasks in an external tracker.
- [x] Make auto mode recognize single and multi-capability spec paths.
- [x] Commit all generated planning artifacts together before implementation commits.
- [x] Prevent pre-existing spec or task changes from leaking into the first implementation commit.
- [x] Reconcile auto mode's single approval with planned checkpoints and high-risk gates.
- [x] Preserve stop-the-line behavior for ambiguous, failing, destructive, or irreversible work.
- [x] Update all three command variants and their behavioral evals.

**Likely files**

- `.claude/commands/build.md`
- `.gemini/commands/build.toml`
- `commands/build.toml`
- `skills/incremental-implementation/SKILL.md`
- `skills/planning-and-task-breakdown/SKILL.md`
- `references/definition-of-done.md`
- `evals/cases/incremental-implementation.json`
- `evals/fixtures/incremental-implementation-pressure/`

**Verification**

- [x] Default mode completes exactly one task and stops.
- [x] Auto mode completes all safe tasks in dependency order without interpreting `stop` as an iteration instruction.
- [x] Every task leaves a clean, independently revertible commit.
- [x] Local and external task targets work consistently.

## Task 7: Standardize review and remediation

**Dependencies:** Tasks 1, 2, and 4

**Checklist**

- [x] Apply the approved severity taxonomy to the review skill, reviewer persona, commands, templates, and ship synthesis.
- [x] Use explicit `Required` labels instead of unprefixed blocking comments.
- [x] Make both Critical and Required findings block approval and shipping.
- [x] Document the review -> fix -> reverify -> rereview loop.
- [x] Require review fixes to use TDD when they change behavior.
- [x] Require final review evidence to reflect the post-fix commit, not the original diff.
- [x] Update review and ship eval expectations.

**Likely files**

- `skills/code-review-and-quality/SKILL.md`
- `agents/code-reviewer.md`
- `.claude/commands/review.md`
- `.gemini/commands/review.toml`
- `commands/review.toml`
- `.claude/commands/ship.md`
- `.gemini/commands/ship.toml`
- `commands/ship.toml`
- `evals/cases/code-review-and-quality.json`
- `evals/cases/shipping-and-launch.json`

**Verification**

- [x] Every review producer and consumer recognizes the same severities.
- [x] Ship synthesis cannot omit a Required finding.
- [x] Approval is based on the final verified revision.

## Task 8: Separate merge review from release review

**Dependencies:** Tasks 5 and 7

**Checklist**

- [x] Define `/review` as the per-PR merge gate.
- [x] Define `/ship` as the production-release gate.
- [x] Allow `/ship` to reuse recent review evidence when the reviewed and release revisions match.
- [x] Require affected checks to rerun when the release diff, environment, configuration, or dependency graph changed.
- [x] Preserve independent security and test-readiness analysis for material production releases.
- [x] Record the reviewed revision in review and ship artifacts.

**Likely files**

- `.claude/commands/review.md`
- `.gemini/commands/review.toml`
- `commands/review.toml`
- `.claude/commands/ship.md`
- `.gemini/commands/ship.toml`
- `commands/ship.toml`
- `skills/shipping-and-launch/SKILL.md`
- `references/orchestration-patterns.md`

**Verification**

- [x] An unchanged release does not repeat a full review without adding evidence.
- [x] A changed release cannot rely on stale approval.
- [x] `/review` and `/ship` have distinct inputs, outputs, and exit gates.

## Task 9: Align cross-cutting skills and the Definition of Done

**Dependencies:** Tasks 2, 4, 6, and 7

**Checklist**

- [x] Place git and CI gates throughout build, review, merge, and release.
- [x] Route security from specification through implementation and review when trust boundaries exist.
- [x] Route documentation and ADR work to the decision or behavior change that creates it.
- [x] Route observability to production-critical design and implementation tasks.
- [x] Make the Definition of Done the canonical per-task, per-feature, and per-release floor.
- [x] Remove duplicated or weaker checklists where a canonical reference is sufficient.
- [x] Address the known portability gap for repo-level references when individual skills are installed.

**Likely files**

- `skills/using-agent-skills/SKILL.md`
- `references/definition-of-done.md`
- `skills/incremental-implementation/SKILL.md`
- `skills/shipping-and-launch/SKILL.md`
- `skills/security-and-hardening/SKILL.md`
- `skills/observability-and-instrumentation/SKILL.md`
- `skills/documentation-and-adrs/SKILL.md`
- `README.md`
- `docs/getting-started.md`

**Verification**

- [x] No cross-cutting discipline is presented solely as late-stage cleanup.
- [x] Every task has one unambiguous Definition of Done.
- [x] Individually installed skills can resolve every required reference or clearly embed the required minimum.

## Task 10: Synchronize integrations and public documentation

**Dependencies:** Tasks 2 through 9

**Checklist**

- [x] Synchronize Claude, Gemini, and Antigravity command behavior and descriptions.
- [x] Update command counts and command tables.
- [x] Update Claude, Gemini, Antigravity, OpenCode, Codex, Cursor, Copilot, Windsurf, and other applicable setup guides.
- [x] Update repository trees and examples that list lifecycle skills or commands.
- [x] Document command-name differences such as `/plan` versus `/planning` without changing lifecycle semantics.
- [x] Check marketplace and plugin metadata for stale skill or command counts.
- [x] Add a migration note for users of the former `/test` lifecycle sequence.

**Likely files**

- `README.md`
- `.claude/commands/`
- `.gemini/commands/`
- `commands/`
- `.claude-plugin/plugin.json`
- `.codex-plugin/plugin.json`
- `docs/*-setup.md`
- `docs/getting-started.md`
- `docs/developer-onboarding.md`

**Verification**

- [x] `node scripts/validate-commands.js` passes.
- [x] Search results show no stale command count or lifecycle sequence.
- [x] Harness-specific naming differences are documented and intentional.

## Task 11: Add lifecycle-level regression coverage

**Dependencies:** Tasks 3 through 10

**Checklist**

- [x] Add a lifecycle integration eval covering spec -> plan -> draft PR -> build -> verify -> ready PR -> review -> merge-ready -> ship.
- [x] Add a failure-path eval proving that verification enters debugging and returns to verification.
- [x] Add a review-remediation eval proving that fixes are reverified and rereviewed.
- [x] Add an auto-build eval covering multi-module specs, external task targets, checkpoints, and clean commits.
- [x] Extend structural validation to detect contradictory lifecycle mappings and review taxonomies where practical.
- [ ] Run all structural, command-parity, trigger/routing, behavioral, and pressure evals required by the changed files. **Blocked externally:** 55/55 previously executed expectations pass across verification, lifecycle routing, failure re-entry, review remediation, incremental implementation, auto-build, PR transitions, atomic git history, and the prior shipping case. The shipping skill changed afterward, so its expanded four-case suite and the redesigned four-case specification suite pass dry-run/schema validation but still need token-backed reruns after the next quota reset.

**Likely files**

- `evals/cases/`
- `evals/fixtures/`
- `scripts/validate-commands.js`
- `scripts/validate-skills.js`
- `scripts/run-evals.js`
- `evals/README.md`

**Verification**

- [x] `node scripts/validate-skills.js` passes.
- [x] `node scripts/validate-commands.js` passes.
- [ ] `node scripts/run-evals.js` passes for routing and all affected behavioral cases. Routing passed 133 checks at 87% rank-1; the expanded shipping suite and redesigned specification suite remain quota-blocked.
- [x] The integration eval fails against the old contradictory workflow and passes against the new one.

## Task 12: Final independent review and release

**Dependencies:** Tasks 1 through 11

**Checklist**

- [x] Review the complete change across correctness, readability, architecture, security, and performance.
- [x] Verify documentation links and relative paths.
- [x] Confirm all Critical and Required findings are resolved. A fresh-context reviewer approved revision `6a9967d`; its sole additional Optional Markdown-coverage finding was then remediated and sent for final exact-revision review.
- [x] Confirm the final diff remains reviewable; split the work into stacked PRs if necessary.
- [x] Prepare release notes and compatibility guidance for new or renamed commands.
- [x] Run the shipping checklist with a rollback plan for plugin/package publication.

**Likely files**

- All files changed by Tasks 1 through 11

**Verification**

- [ ] Full repository validation and affected evals pass on the final revision. All deterministic validation passes, including 55 Node tests, 13 cross-integration artifact files, lifecycle contracts, all 101 tracked Markdown files, hooks, routing, and plugin manifests; only the externally quota-blocked behavioral reruns remain.
- [x] A fresh-context reviewer can follow the new workflow without consulting this checklist.
- [x] Public documentation, commands, skills, personas, and evals describe the same lifecycle.

## Delivery slices

No remote pull request was created because the user authorized local commits,
not a remote mutation. The implementation was split into reviewable commits:

- [x] **Draft and checklist:** `3c1ea7c`
- [x] **Verification, spec boundary, and build contract:** `ca25d96`
- [x] **Pull-request lifecycle and review contract:** `7841336`
- [x] **Lifecycle integration alignment:** `972eda2`
- [x] **Standalone-skill portability:** `19ac0cb`
- [x] **Revision-aware release review:** `d4171ea`
- [x] **Lifecycle evals and release artifacts:** final implementation commit
- [x] **Review remediation — lifecycle validators:** `43b03c3`
- [x] **Review remediation — PR readiness:** `eb0c0ef`
- [x] **Review remediation — verification evidence:** `b4e106e`
- [x] **Review remediation — specification evals:** `b7ddb12`
- [x] **Automatic ship discovery contract:** `484e581`
- [x] **Automatic ship discovery implementation:** `e7214fb`
- [x] **Wrapped-contract regression guard:** `f35fcc1`

## Task 13: Make `/ship` discover the release automatically

**Dependencies:** Tasks 8, 11, and 12

**Checklist**

- [x] Make zero-argument `/ship` the normal interface in all command variants.
- [x] Pin the remote default-branch head without requiring the main worktree.
- [x] Detect the last ship from an authoritative deployment, published release,
  reachable release tag, or explicit project release-state source.
- [x] Stop on a missing, conflicting, non-ancestor, or divergent baseline; do
  not silently choose the root commit.
- [x] Discover included PRs from the baseline-to-target commit range and report
  direct commits, reverts, and ambiguous commits separately.
- [x] Report nothing to ship when the release boundary is empty.
- [x] Show the discovery preview and require confirmation before specialist
  checks or deployment-affecting actions.
- [x] Distinguish reusable PR-scoped review evidence from release-scoped checks
  that must run on the pinned post-merge target.
- [x] Keep manual baseline or target overrides optional and recovery-only.
- [x] Exclude prereleases by default and treat remote release metadata as
  untrusted data rather than agent instructions.
- [x] Add structural and behavioral regression coverage.

**Likely files**

- `skills/shipping-and-launch/SKILL.md`
- `.claude/commands/ship.md`
- `.gemini/commands/ship.toml`
- `commands/ship.toml`
- `docs/feature-development-workflow.md`
- `docs/feature-development-workflow-release-notes.md`
- `evals/cases/shipping-and-launch.json`
- `scripts/validate-lifecycle-contracts.js`
- `scripts/validate-lifecycle-contracts-test.js`

**Verification**

- [x] The lifecycle validator enforces the full discovery contract in the skill
  and zero-argument delegation in each thin command adapter.
- [x] Command parity and description synchronization pass.
- [x] Shipping behavioral cases cover automatic discovery and unsafe-history
  refusal.
- [x] Full deterministic repository validation passes: 55 Node tests, 25 skills,
  10 commands, 101 Markdown files, 133 routing checks at 87% rank-1, hooks, and
  plugin validation.
- [ ] Token-backed shipping behavioral execution passes. **NOT RUN:** the
  external Claude runner rejected eval 1 with HTTP 429 before generating any
  tokens and reports a reset at 00:00 Asia/Saigon.

## Task 14: Migrate to durable per-feature artifact bundles

**Dependencies:** Tasks 1 through 13

**Checklist**

- [x] Define `docs/specs/<feature-slug>/` and deterministic branch-to-slug resolution.
- [x] Move specification, planning, task, verification, review, memory-candidate, and launch artifacts into the bundle contract.
- [x] Preserve capability maps and addressable module specifications inside the bundle.
- [x] Keep external task trackers authoritative while retaining a durable `todo.md` index.
- [x] Preserve revision freshness across evidence-only commits without accepting production changes.
- [x] Keep the release-wide ship decision outside the pinned release target.
- [x] Update Claude, Gemini, and Antigravity commands, lifecycle skills, personas, docs, evals, and fixtures.
- [x] Extend artifact-path and lifecycle validators with regression tests.
- [x] Migrate this checklist into `docs/specs/feature-development-workflow/todo.md` and add its spec, plan, and launch dossier.

**Verification**

- [x] All 59 Node tests pass.
- [x] All 25 skills and 10 command adapters validate.
- [x] All 32 guarded artifact producers and consumers agree on the durable path.
- [x] All 104 tracked Markdown files and local anchors validate.
- [x] All 133 routing checks pass at 87% rank-1.
- [x] Git diff whitespace checks pass.
