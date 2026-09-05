---
type: Implementation Plan
title: Search index rebuild plan
status: stable
workflow_status: in_progress
vendor_extension:
  owner: search-platform
  labels: [nightly, rebuild]
---

# Plan: Rebuild the Search Index

This plan has been reviewed and is ready for use. Implementation remains in progress.

1. Build the replacement index.
2. Verify result parity before switching readers.
3. Retain the previous index until the observation window ends.
