---
type: Change Specification
title: Automate workflow transitions within authorized scope
description: Replace routine permission prompts with verification and reserve human gates for unresolved critical decisions.
status: draft
workflow_status: in_progress
---

# Spec: Automated Workflow Gates

**Authorization:** The user prefers workflow automation and human gates only at critical steps the agent cannot handle itself. This authorizes the workflow update; it does not authorize unrelated remote actions or establish human review of this document.

**Affected capabilities:** [Feature development workflow](../../specs/feature-development-workflow/spec.md), [Memory management](../../specs/memory-management/spec.md).

## Requirements

- Continue planning, implementation, testing, debugging, review, documentation, and local commits within the agreed scope without routine confirmation. Reuse existing decisions and authorization; preserve explicit read-only, stepwise, and endpoint limits.
- Keep requirements, plans, task checkpoints, evidence, review, CI, and release safeguards. A quality gate requires evidence or remediation, not automatically a human response.
- Resolve ordinary implementation choices from project evidence. Escalate only when an unresolved material intent/trade-off, unavailable access or external approval, or consequential action/risk outside the established authorization requires the user. Complete safe preparation and continue independent work first.
- Default `/build` to executing the authorized task scope; preserve `auto`/`all` aliases and provide explicit `step` mode for one task. Diagnose and fix failures before escalating a blocker that cannot be resolved autonomously.
- Automate suitable cross-model review using available, already-authorized tools/providers. Preserve scoped read-only execution and actual evidence; disclose an unavailable optional review and continue with the best available review. Missing mandatory coverage remains incomplete. No per-cycle permission prompt when the existing authorization covers the review.
- Align discovery, specification, planning, security/browser boundaries, PR/release, and knowledge-promotion guidance with this policy. Do not infer human approval or waive externally required checks.
- Preserve historical track bodies, unrelated recent workflow-selection changes, artifact ownership, and command parity.

## Verification

Validate the changed skills, command adapters, links, lifecycle contracts, and routing. Update existing behavioral expectations for authorization reuse and add minimal execution coverage that exercises autonomous progress and a critical boundary. Review the policy independently for both unnecessary pauses and unintended external authority. Record actual revision-scoped results and any unavailable behavioral evidence.

## Spec reconciliation

Pending implementation and verification. Reconcile the automation and escalation rules into the affected capability specs before review. Complete this track after verification and merge.
