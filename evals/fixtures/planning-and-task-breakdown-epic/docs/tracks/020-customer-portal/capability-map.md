---
type: Capability Map
title: Customer portal capability map
description: Capability boundaries and intended child deliveries for the customer portal.
status: draft
---

# Capability Map: Customer portal

| Module id | Responsibility | Depends on | Delivery | Canonical path |
|---|---|---|---|---|
| identity | Accounts, sessions, SSO | — | portal-identity | docs/specs/identity/spec.md |
| billing | Plans, invoices, payments | identity | portal-billing | docs/specs/billing/spec.md |
| notifications | Email and webhook fan-out | identity | portal-notifications | docs/specs/notifications/spec.md |
| reporting | Usage dashboards | billing, notifications | portal-reporting | docs/specs/reporting/spec.md |

Build order: identity → billing, notifications → reporting
