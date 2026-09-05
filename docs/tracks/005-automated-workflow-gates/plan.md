---
type: Implementation Plan
title: Align autonomous workflow gates
description: Update the central policy and its consumers, then verify autonomy and authorization boundaries.
status: draft
sources:
  - resource: ./spec.md
---

# Plan: Automated Workflow Gates

1. Define the autonomous default, critical escalation criteria, and authorization reuse in the workflow router and project guidance.
2. Align skill gates and spec/plan/build/review/ship adapters; keep verification, explicit step mode, and external safeguards.
3. Update affected eval expectations and the capability contracts. Run repository checks and a bounded independent review/behavioral evaluation, then fix demonstrated gaps.
4. Commit implementation and revision-scoped verification/review evidence. Leave unavailable evidence and merge follow-up explicit.

This changes Markdown workflow behavior and eval inputs. Reuse the existing validators and test suite; add no runtime dependency or wording-matching test matrix.
