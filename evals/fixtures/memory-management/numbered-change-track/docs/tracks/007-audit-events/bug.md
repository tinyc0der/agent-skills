# Bug: Missing Failed Sign-In Events

**Status:** Complete

Failed sign-ins were omitted from the audit log. The fix restored the existing
authentication contract and merged after verification and review.

## Spec reconciliation

No capability spec change was needed: failed attempts were already required to
be audited by `docs/specs/authentication/spec.md`.
