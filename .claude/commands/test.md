---
description: Run risk-based TDD — select the minimum sufficient failing tests, implement, verify. For bugs, use Prove-It.
---

Invoke agent-skills:test-case-design-review to select the cases, then agent-skills:test-driven-development to execute RED-GREEN-REFACTOR.

Before writing a test, inspect nearby coverage and apply `test-case-design-review`'s admission gate. Every new case must protect a distinct material regression at the cheapest reliable layer. Do not create cases for completeness, symmetry, numerical coverage, or a generic scenario matrix.

For new features:
1. Map materially changed outcomes and risks to existing tests
2. Write only the smallest missing behavior cases and confirm they FAIL
3. Implement the code to make them pass
4. Refactor while keeping tests green

For bug fixes (Prove-It pattern):
1. Write one focused test that reproduces the bug (must FAIL); add another only for a materially different contract or known manifestation
2. Confirm the test fails
3. Implement the fix
4. Confirm the test passes
5. Run the full test suite for regressions

For adequately covered pure refactors or non-behavioral changes, do not invent a new test. Record why no case passes the admission gate and run the relevant existing or executable checks.

For browser-related issues, also invoke agent-skills:browser-testing-with-devtools to verify with Chrome DevTools MCP.
