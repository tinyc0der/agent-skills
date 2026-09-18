---
type: Change Specification
title: Customer portal initiative
description: Initiative outcomes for a separately shippable customer portal.
status: draft
workflow_status: planned
role: initiative
---

# Spec: Customer portal

**Authorization and readiness:** Product authorized the initiative. Finance must sign off on billing independently of the dashboard.
**Affected capabilities:** identity, billing, notifications, reporting (intended canonical paths; not created yet)

## Objective

Customers manage accounts, pay for a plan, receive notifications, and view usage. Each area is owned by a different team and must be shippable and verifiable on its own.

## Non-Goals

Webhook retry policy. Mobile apps.

## Success Criteria

- Identity, billing, notifications, and reporting each have their own merged child track
- The assembled portal satisfies cross-feature acceptance on a revision that includes those children
- Deferred webhook retries remain out of canonical specs

## Spec reconciliation

Deferred until children land.
