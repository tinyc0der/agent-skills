---
name: test-case-design-review
description: Designs and reviews automated test cases using the smallest risk-based set that gives meaningful regression confidence. Use when planning, writing, pruning, or reviewing unit, integration, end-to-end, or regression tests, especially when a suite risks becoming repetitive, implementation-coupled, or larger than the behavior warrants. Do not use to enforce test-first development or perform a general code review unrelated to tests.
---

# Lean Test Design and Review

## Overview

Maximize confidence per test, not test count. Build the minimum sufficient test set: every retained case protects a distinct observable contract against a credible failure mode at a cost justified by its risk.

Coverage percentage and branch count are supporting signals, not reasons by themselves to add tests. Do not target a fixed number of cases.

This skill selects and critiques test cases. It does not dictate test-first sequencing or expand a test review into unrelated production-code review.

## When to Use

- Planning tests for a behavior or change before implementation
- Writing tests for existing code when test-first sequencing is not the task
- Reviewing a suite for redundant, brittle, misplaced, or missing cases
- Pruning slow or repetitive unit, integration, end-to-end, or regression coverage
- Deciding whether a change needs a new test and at which layer

**When NOT to use:** Use `test-driven-development` when the task is to implement or fix behavior through RED-GREEN-REFACTOR. Use `code-review-and-quality` for a general production-code review whose scope is broader than tests. These skills can compose when both concerns are present.

## Process

### 1. Establish the Testing Scope

Before proposing tests:

1. Read the requested behavior, changed code, and nearby existing tests.
2. Identify the observable contracts that changed or could regress. Separate them from implementation details.
3. Map those contracts to existing coverage and identify only material gaps.
4. Estimate impact and likelihood for each gap. Spend more test effort on costly, subtle, or historically fragile behavior.

Apply these defaults deliberately:

- **Pure refactor with no intended behavior change:** Add no tests by default. Add a characterization test only for material behavior directly touched by the refactor when existing tests cannot detect a plausible regression and no cheaper verification is available; do not backfill unrelated historical coverage.
- **Bug fix:** Ensure one focused test reproduces the reported failure, preferably by extending the nearest existing case. Add another only when the fix changes a second contract or the same root cause has a known, materially different manifestation; do not add adjacent unreported edge cases for symmetry.
- **New behavior:** Cover the smallest representatives needed for each materially different outcome and policy transition. For a validation threshold, normally test the passing edge and first failing value; do not add below/at/above triplets unless all three have different expected behavior or known risks.
- **Wiring or integration change:** Test the contract at the boundary that could actually break; do not duplicate all lower-level cases end to end.

### 2. Apply the Test Admission Gate

Add or retain a test only when all of these questions have defensible answers:

- What plausible defect or regression would this case catch?
- What observable contract at the selected test boundary does it protect, and why does that contract matter to this change?
- Why would the existing suite not already catch that defect?
- Is this the cheapest reliable test layer that can observe it?
- Is its confidence worth its runtime, maintenance, setup, and flake risk?

If the first three answers are not specific, omit the case or recommend merging or removing it. A rationale such as "for completeness," "another edge case," or "to improve coverage" is insufficient.

For a non-trivial change, use a compact ledger before coding:

| Behavior or risk | Existing coverage | Decision | Layer and rationale |
| --- | --- | --- | --- |
| Distinct contract or failure | Exact test, or none | Keep, add, merge, or omit | Cheapest layer that detects it |

Skip the ledger for an obviously sufficient one-test change.

### 3. Choose High-Value Cases

- Partition inputs by behavior. Use one representative from each partition unless values carry distinct risk.
- Test a boundary only where behavior, policy, parsing, arithmetic, ownership, or integration semantics change at that boundary.
- Test combinations only when the contract defines cross-input behavior, or when shared parsing, normalization, precedence, or state creates a failure that single-input cases cannot expose. Otherwise test inputs independently; never enumerate their Cartesian product.
- Use parameterization when cases exercise the same invariant and execution path. Keep cases separate when their setup, expected behavior, or likely diagnosis differs.
- Parameterization does not waive the admission gate: every row must represent a distinct behavior partition, boundary transition, or known regression. Remove rows that differ only in data while exercising the same contract and failure mode.
- Choose unit tests for isolated decisions, integration tests for component contracts, and end-to-end tests for a small number of critical journeys or system-wiring risks.
- Assert stable outcomes and externally visible effects. Assert calls or ordering only when that collaboration is itself the contract.
- Keep all assertions needed to prove one behavior together. Do not split tests merely to achieve one assertion per test.

Usually reject:

- Multiple examples from the same equivalence class with no distinct regression history.
- Tests of language, framework, or third-party-library behavior already guaranteed by that dependency.
- Tests for invariants already guaranteed by the compiler or type system, unless an untyped runtime boundary can violate them.
- Tests for trivial pass-throughs, accessors, or constants without meaningful policy.
- Tests coupled to private helpers, incidental call sequences, or mock choreography.
- The same behavioral assertion repeated at unit, integration, and end-to-end layers without a distinct layer-specific failure mode.
- Broad snapshots when a few stable semantic assertions express the contract better.
- Cases added solely to hit every line, branch, enum member, or numerical coverage target.
- Setup variations that do not change the observable outcome or failure mode.

### 4. Write the Selected Cases

1. State the contract and distinct regression each proposed test protects.
2. Reuse existing fixtures and helpers when they reduce noise without hiding the behavior.
3. Implement the smallest set that passes the admission gate.
4. For a bug fix, confirm the focused regression test fails against the known-bad behavior when practical and safe.
5. Run the narrow relevant tests first, then the proportionate broader suite.
6. Re-read the completed set and merge or remove accidental overlap.

Prefer deterministic tests with minimal setup. Do not weaken production design merely to expose internals to tests.

Repeated setup text can be worthwhile when it keeps a test locally understandable. Remove repeated behavioral coverage, not harmless textual duplication.

### 5. Review Existing Tests

Review the behavior, implementation, and existing nearby suite together. Do not infer redundancy from similar names alone; compare the semantic path, assertions, and defects each case can catch.

Classify each questioned case as:

- **Keep:** Protects a distinct, worthwhile risk.
- **Merge:** Duplicates a path or invariant and can be expressed more clearly through one test or parameterized cases.
- **Rewrite:** Protects a real risk but is brittle, unclear, over-mocked, or at the wrong layer.
- **Remove:** Has no distinct behavioral value or its cost exceeds its signal.
- **Add:** Closes a material uncovered risk; do not suggest low-value symmetry cases.
- **Omit:** A proposed case does not pass the admission gate and should not enter the suite.

Lead review output with actionable findings. For every removal, merge, rewrite, addition, or omission, name the exact overlap or missing defect signal. Separate required coverage from optional cleanup. If the user requested review only, do not edit tests.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "More cases always mean more confidence" | Repeated cases can add runtime, flake risk, and maintenance without detecting a new defect. |
| "We need one case for every scenario label" | Labels are prompts for analysis, not requirements; retain only materially different outcomes or risks. |
| "Coverage dropped, so add whatever reaches the line" | Coverage points to an area to inspect but does not establish a missing observable contract. |
| "The E2E test is safer even though a unit test covers it" | A higher layer is justified only when it detects a distinct wiring or journey failure. |
| "Similar names prove these tests are duplicates" | Redundancy depends on semantic paths, assertions, and defect signals, not names alone. |

## Red Flags

- A proposed case has no named plausible defect or observable contract.
- Several rows differ only in data while exercising the same behavior partition.
- The same assertion appears at multiple layers with no layer-specific failure mode.
- Tests assert private helpers, incidental call order, or mock choreography instead of behavior.
- A review recommends removals based only on test names or coverage percentage.
- A review-only request expands into production-code edits or a general code review.
- Test generation continues after every material changed contract and credible risk is covered.

## Verification

The test set is sufficient when:

- [ ] Every materially changed contract, and every material failure risk introduced or directly exposed by this change, maps to at least one retained test.
- [ ] Every added, modified, or questioned test in scope has a one-sentence distinct-defect rationale.
- [ ] No cases protect the same defect unless different layers provide demonstrably different signal or justified defense in depth.
- [ ] Assertions verify behavior rather than incidental implementation.
- [ ] The relevant tests pass and remain readable, deterministic, and proportionate to the change.
- [ ] Residual risk is reported explicitly instead of being hidden by speculative cases.

Stop adding tests once these conditions hold.
