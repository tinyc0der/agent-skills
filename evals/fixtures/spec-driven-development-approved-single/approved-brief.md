# Approved single-capability brief: Usage Billing

**Status:** Scope and requirements approved by product and finance

This is one finance-owned capability. Metering, invoice calculation, late-event
correction, and reconciliation must ship and be verified together; they are not
independently releasable modules.

## Objective

Replace flat monthly pricing with auditable usage billing based on successful
jobs per customer account.

## Approved decisions

- Meter: successful jobs, recorded by the existing job-completion service.
- Price: $0.02 per job after 1,000 free jobs per calendar month.
- Idempotency: each event carries a globally unique job id.
- Late events: accept for seven days and issue an auditable invoice correction.
- Migration: existing customers switch at their next billing-cycle boundary.
- Visibility: customer usage UI is a non-goal for this capability.
- Taxes and payment collection remain owned by the existing billing provider.

## Success criteria

- Replaying a job event never charges twice.
- Monthly allowance and price are calculated deterministically per account.
- Events arriving within seven days produce traceable corrections.
- Finance can reconcile every invoice line to accepted job ids.
- Existing customers remain flat-rate until their recorded cycle boundary.

## Boundaries

- Always preserve raw accepted events for audit.
- Ask before changing the existing customer-account or provider contracts.
- Never infer missing account ids or silently discard late events.
