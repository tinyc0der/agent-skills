# Feature Development Workflow Implementation Checklist

**Source draft:** [`docs/feature-development-workflow.md`](../docs/feature-development-workflow.md)

**Goal:** Make the repository expose one coherent feature-development lifecycle across skills, commands, personas, documentation, setup guides, references, and evaluations.

Do not implement all changes as one large commit. Complete and verify each task independently, and keep the Claude, Gemini, and Antigravity command variants semantically equivalent.

## Task 1: Approve the lifecycle contract

**Dependencies:** None

**Checklist**

- [ ] Review and approve the phase names and order in the source draft.
- [ ] Decide whether `verification-and-validation` is a new skill or an extension of an existing skill.
- [ ] Run the new-skill pre-flight checks from `CONTRIBUTING.md` if creating a skill.
- [ ] Approve `Critical`, `Required`, `Optional`, `Nit`, and `FYI` as the shared review taxonomy.
- [ ] Approve `/pr draft` and `/pr ready` as the pull-request lifecycle interface.
- [ ] Decide whether `/verify` is added alongside `/test` or introduced through a compatibility migration.
- [ ] Decide the canonical filenames for capability maps and module specifications.

**Likely files**

- `docs/feature-development-workflow.md`
- `CONTRIBUTING.md`

**Verification**

- [ ] No open design question changes the ownership or interface of later tasks.
- [ ] The approved decisions are recorded in the source draft or an ADR.

## Task 2: Establish a single canonical lifecycle map

**Dependencies:** Task 1

**Checklist**

- [ ] Update the README lifecycle diagram and command table.
- [ ] Update `using-agent-skills` so TDD is part of BUILD and debugging is an exception path.
- [ ] Mark git, CI, security, documentation, and observability as cross-cutting disciplines.
- [ ] Update `AGENTS.md` and the OpenCode guide to stop mapping routine VERIFY to debugging.
- [ ] Update the adoption and getting-started guides to use the same lifecycle.
- [ ] Update orchestration documentation with PR creation, verification, remediation, merge, and post-launch cleanup.
- [ ] Remove contradictory lifecycle sequences from setup and comparison documentation.

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

- [ ] Searching for `DEFINE`, `VERIFY`, and the slash-command sequence finds no conflicting mappings.
- [ ] Every documented happy path includes a real validation gate and excludes debugging unless a failure occurs.

## Task 3: Narrow the specification boundary

**Dependencies:** Task 1

**Checklist**

- [ ] Make `spec-driven-development` own scope, requirements, acceptance criteria, boundaries, and approval only.
- [ ] Remove or replace its duplicated Plan, Tasks, and Implement phases with explicit handoffs.
- [ ] Make feature specs reference project-wide commands, structure, and style rules unless the feature changes them.
- [ ] Define and consistently use the capability-map filename.
- [ ] Make multi-capability commands write and select `SPEC-<module-id>.md` consistently.
- [ ] Update the `/spec` variants to match the skill's narrowed contract.
- [ ] Update specification eval cases for the new exit criteria and handoff.

**Likely files**

- `skills/spec-driven-development/SKILL.md`
- `.claude/commands/spec.md`
- `.gemini/commands/spec.toml`
- `commands/spec.toml`
- `evals/cases/spec-driven-development.json`

**Verification**

- [ ] `/spec` stops after an approved specification and names `/plan` as the next step.
- [ ] A multi-capability fixture produces an approved map and addressable module specs.
- [ ] Specification content no longer duplicates planning mechanics.

## Task 4: Add feature-level verification

**Dependencies:** Tasks 1 and 2

**Checklist**

- [ ] Implement the approved verification skill strategy.
- [ ] Define acceptance-criteria traceability, runtime validation, integration/E2E checks, and full repository checks.
- [ ] Include conditional migration, feature-flag, compatibility, security, accessibility, performance, documentation, and observability checks.
- [ ] Add a `/verify` command in all supported command formats.
- [ ] Keep `/test` focused on RED-GREEN-REFACTOR rather than presenting it as post-build validation.
- [ ] Route verification failures to `debugging-and-error-recovery` without classifying debugging as the verification phase.
- [ ] Add structural, routing, behavioral, and pressure evals for verification.

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

- [ ] A completed feature can be verified without writing production behavior.
- [ ] A failed check enters systematic debugging and returns to verification afterward.
- [ ] Each acceptance criterion is represented in the verification output.

## Task 5: Make pull-request creation explicit

**Dependencies:** Tasks 1 and 2

**Checklist**

- [ ] Extend `git-workflow-and-versioning` with draft, ready-for-review, update, and merge transitions.
- [ ] Add `/pr draft` and `/pr ready` command behavior in every supported command format.
- [ ] Define the PR body contract: spec, plan, scope, non-goals, risks, acceptance criteria, verification evidence, migrations, flags, screenshots, and rollback notes.
- [ ] Make `/pr ready` refuse readiness when required verification evidence is missing.
- [ ] Clarify that PR creation does not imply external mutation unless the user invoked the PR command or otherwise authorized it.
- [ ] Add eval coverage for draft creation and readiness gating.

**Likely files**

- `skills/git-workflow-and-versioning/SKILL.md`
- `.claude/commands/pr.md`
- `.gemini/commands/pr.toml`
- `commands/pr.toml`
- `docs/agents.md`
- `references/definition-of-done.md`
- `evals/cases/git-workflow-and-versioning.json`

**Verification**

- [ ] Draft PR output is understandable without reading the diff.
- [ ] Ready-for-review status requires a complete verification story.
- [ ] Merge remains gated by review, CI, and required human approval.

## Task 6: Repair `/build` and `/build auto`

**Dependencies:** Tasks 2, 3, and 4

**Checklist**

- [ ] Make the default build loop explicitly run RED, GREEN, REFACTOR, focused tests, regression tests, build, lint, type checking, and applicable runtime checks.
- [ ] Reference one canonical per-slice Definition of Done instead of copying partial checklists.
- [ ] Remove the contradictory `stop` instruction from the loop reused by auto mode.
- [ ] Define how default and auto modes discover tasks in an external tracker.
- [ ] Make auto mode recognize single and multi-capability spec paths.
- [ ] Commit all generated planning artifacts together before implementation commits.
- [ ] Prevent pre-existing spec or task changes from leaking into the first implementation commit.
- [ ] Reconcile auto mode's single approval with planned checkpoints and high-risk gates.
- [ ] Preserve stop-the-line behavior for ambiguous, failing, destructive, or irreversible work.
- [ ] Update all three command variants and their behavioral evals.

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

- [ ] Default mode completes exactly one task and stops.
- [ ] Auto mode completes all safe tasks in dependency order without interpreting `stop` as an iteration instruction.
- [ ] Every task leaves a clean, independently revertible commit.
- [ ] Local and external task targets work consistently.

## Task 7: Standardize review and remediation

**Dependencies:** Tasks 1, 2, and 4

**Checklist**

- [ ] Apply the approved severity taxonomy to the review skill, reviewer persona, commands, templates, and ship synthesis.
- [ ] Use explicit `Required` labels instead of unprefixed blocking comments.
- [ ] Make both Critical and Required findings block approval and shipping.
- [ ] Document the review -> fix -> reverify -> rereview loop.
- [ ] Require review fixes to use TDD when they change behavior.
- [ ] Require final review evidence to reflect the post-fix commit, not the original diff.
- [ ] Update review and ship eval expectations.

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

- [ ] Every review producer and consumer recognizes the same severities.
- [ ] Ship synthesis cannot omit a Required finding.
- [ ] Approval is based on the final verified revision.

## Task 8: Separate merge review from release review

**Dependencies:** Tasks 5 and 7

**Checklist**

- [ ] Define `/review` as the per-PR merge gate.
- [ ] Define `/ship` as the production-release gate.
- [ ] Allow `/ship` to reuse recent review evidence when the reviewed and release revisions match.
- [ ] Require affected checks to rerun when the release diff, environment, configuration, or dependency graph changed.
- [ ] Preserve independent security and test-readiness analysis for material production releases.
- [ ] Record the reviewed revision in review and ship artifacts.

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

- [ ] An unchanged release does not repeat a full review without adding evidence.
- [ ] A changed release cannot rely on stale approval.
- [ ] `/review` and `/ship` have distinct inputs, outputs, and exit gates.

## Task 9: Align cross-cutting skills and the Definition of Done

**Dependencies:** Tasks 2, 4, 6, and 7

**Checklist**

- [ ] Place git and CI gates throughout build, review, merge, and release.
- [ ] Route security from specification through implementation and review when trust boundaries exist.
- [ ] Route documentation and ADR work to the decision or behavior change that creates it.
- [ ] Route observability to production-critical design and implementation tasks.
- [ ] Make the Definition of Done the canonical per-task, per-feature, and per-release floor.
- [ ] Remove duplicated or weaker checklists where a canonical reference is sufficient.
- [ ] Address the known portability gap for repo-level references when individual skills are installed.

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

- [ ] No cross-cutting discipline is presented solely as late-stage cleanup.
- [ ] Every task has one unambiguous Definition of Done.
- [ ] Individually installed skills can resolve every required reference or clearly embed the required minimum.

## Task 10: Synchronize integrations and public documentation

**Dependencies:** Tasks 2 through 9

**Checklist**

- [ ] Synchronize Claude, Gemini, and Antigravity command behavior and descriptions.
- [ ] Update command counts and command tables.
- [ ] Update Claude, Gemini, Antigravity, OpenCode, Codex, Cursor, Copilot, Windsurf, and other applicable setup guides.
- [ ] Update repository trees and examples that list lifecycle skills or commands.
- [ ] Document command-name differences such as `/plan` versus `/planning` without changing lifecycle semantics.
- [ ] Check marketplace and plugin metadata for stale skill or command counts.
- [ ] Add a migration note for users of the former `/test` lifecycle sequence.

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

- [ ] `node scripts/validate-commands.js` passes.
- [ ] Search results show no stale command count or lifecycle sequence.
- [ ] Harness-specific naming differences are documented and intentional.

## Task 11: Add lifecycle-level regression coverage

**Dependencies:** Tasks 3 through 10

**Checklist**

- [ ] Add a lifecycle integration eval covering spec -> plan -> draft PR -> build -> verify -> ready PR -> review -> merge-ready -> ship.
- [ ] Add a failure-path eval proving that verification enters debugging and returns to verification.
- [ ] Add a review-remediation eval proving that fixes are reverified and rereviewed.
- [ ] Add an auto-build eval covering multi-module specs, external task targets, checkpoints, and clean commits.
- [ ] Extend structural validation to detect contradictory lifecycle mappings and review taxonomies where practical.
- [ ] Run all structural, command-parity, trigger/routing, behavioral, and pressure evals required by the changed files.

**Likely files**

- `evals/cases/`
- `evals/fixtures/`
- `scripts/validate-commands.js`
- `scripts/validate-skills.js`
- `scripts/run-evals.js`
- `evals/README.md`

**Verification**

- [ ] `node scripts/validate-skills.js` passes.
- [ ] `node scripts/validate-commands.js` passes.
- [ ] `node scripts/run-evals.js` passes for routing and all affected behavioral cases.
- [ ] The integration eval fails against the old contradictory workflow and passes against the new one.

## Task 12: Final independent review and release

**Dependencies:** Tasks 1 through 11

**Checklist**

- [ ] Review the complete change across correctness, readability, architecture, security, and performance.
- [ ] Verify documentation links and relative paths.
- [ ] Confirm all Critical and Required findings are resolved.
- [ ] Confirm the final diff remains reviewable; split the work into stacked PRs if necessary.
- [ ] Prepare release notes and compatibility guidance for new or renamed commands.
- [ ] Run the shipping checklist with a rollback plan for plugin/package publication.

**Likely files**

- All files changed by Tasks 1 through 11

**Verification**

- [ ] Full repository validation and affected evals pass on the final revision.
- [ ] A fresh-context reviewer can follow the new workflow without consulting this checklist.
- [ ] Public documentation, commands, skills, personas, and evals describe the same lifecycle.

## Suggested delivery slices

- [ ] **PR 1 — Canonical model:** Tasks 1-3
- [ ] **PR 2 — Verification and PR lifecycle:** Tasks 4-5
- [ ] **PR 3 — Build and review contracts:** Tasks 6-8
- [ ] **PR 4 — Cross-cutting alignment and integrations:** Tasks 9-10
- [ ] **PR 5 — Evals and release:** Tasks 11-12
