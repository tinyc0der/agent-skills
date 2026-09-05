---
type: Implementation Plan
title: Adopt workflow document metadata
description: Update the shared profile and its producers, migrate headers, and verify preservation.
status: draft
sources:
  - resource: ./spec.md
---

# Plan: OKF Workflow Documents

1. Define the shared document profile in memory-management and update phase guidance and artifact templates.
2. Add headers to repository specs and tracks without changing historical bodies. Extend existing execution expectations for metadata and scope preservation.
3. Parse adopted headers and templates, compare historical bodies, run existing repository checks, review, and record revision-scoped evidence.

This is a Markdown and fixture-expectation change. Existing checks plus direct YAML parsing and body comparisons provide proportionate local verification; no new runtime dependency, custom YAML parser, or implementation-mirroring test suite is needed.

See [todo.md](todo.md) for task state and [notes.md](notes.md) for the resume checkpoint.
