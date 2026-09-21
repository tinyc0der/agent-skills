---
type: Change Specification
title: Import rollout
description: Approved requirements for the imports capability rollout.
status: draft
role: feature
---

# Import rollout

The scope and routine technical choices are approved. Plan only; do not implement, push, merge, or deploy.

There is one canonical capability, `imports`. Users will see one launch after all work is ready. The existing system must keep working during rollout. New paths can merge behind a disabled flag. Existing upload and job contracts are stable.

## Required outcomes

1. Accept large CSV uploads into a queue with an upload id. Verify size limits and durable storage before accepting the job.
2. Show a validated preview of the queued upload. Reject invalid rows and report their locations. Depends on the upload contract.
3. Import approved rows with retry and idempotency protection. Depends on preview approval and the job contract.
4. Undo an import without deleting pre-existing records. Depends on the import execution record.

Each outcome needs roughly 250–400 changed source lines plus focused tests. Reviewers need to inspect different failure risks at each stage. None of the later stages works before its prerequisite exists, and product does not want four user releases.

## Acceptance

- Each outcome has observable acceptance evidence for its stated risks.
- Existing imports remain available until the complete new path is enabled.
- The rollout order and prerequisites are explicit.
