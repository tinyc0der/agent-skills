# Approved module requirements

## Identity

Objective: give each customer account a stable opaque identifier and active or
suspended lifecycle state.

Success criteria:

- Creating an account returns a unique opaque account id.
- Suspended accounts cannot initiate billable work.
- Account state changes are auditable.

Identity owns the provider-side account contract consumed by billing. The
contract exposes account id and lifecycle state, but no credentials or profile
details.

## Billing

Objective: meter successful jobs per active account, generate monthly invoices,
and reconcile late events for seven days.

Success criteria:

- Replayed usage events are idempotent.
- Successful jobs are attributed to an account through identity's account contract.
- Late events within seven days appear as auditable invoice corrections.
- Finance can reconcile invoice totals to accepted usage events.

Non-goals for both modules: payment collection UI, tax calculation, notifications,
reporting dashboards, implementation planning, and production code.
