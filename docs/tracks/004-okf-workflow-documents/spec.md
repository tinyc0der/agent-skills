---
type: Change Specification
title: OKF metadata for workflow documents
description: Apply a common document header while preserving capability ownership and workflow evidence.
status: draft
workflow_status: planned
---

# Change Spec: OKF Workflow Documents

The user approved adding a minimal OKF header to capability specs and track documents. A shared format preserves their different authority and lifecycle roles.

**Capabilities:** [Memory management](../../specs/memory-management/spec.md), [Feature development workflow](../../specs/feature-development-workflow/spec.md).

## Requirements

- Require non-empty string `type`, `title`, and `description` in YAML frontmatter for newly authored or deliberately updated capability specs and track documents. Keep their existing paths and Markdown body structures.
- Use descriptive types for capability specifications, change specifications, bug reports, implementation plans, task lists, reviews, verification reports, working notes, capability maps, and launch dossiers.
- Keep OKF `status` limited to document maturity (`draft`, `stable`, `deprecated`). Workflow progress, approval evidence, task completion, and report verdicts remain separate. A stable plan does not establish completed implementation.
- Populate optional provenance, authorship, and verification fields only from actual evidence. Preserve unknown metadata and historical claims; a header migration does not reverify a report or complete a track.
- Apply the header convention to current repository capability specs and track documents. Preserve historical report bodies and evaluated revisions. Read-only consumers tolerate older documents without rewriting them.
- Keep specs and tracks outside the durable knowledge bundle. Shared headers do not bootstrap bundle indexes, move documents, or promote proposals into canonical requirements.
- Update the memory skill, phase guidance, artifact templates, and affected behavioral expectations consistently.

## Acceptance and Verification

- Parse all adopted headers as YAML and check required string fields and type-to-artifact mappings.
- Compare migrated historical bodies with the baseline to prove no evidence content was rewritten.
- Validate embedded artifact templates, skill structure, paths, links, command parity, and existing routing cases.
- Reuse the numbered-track and running-note execution scenarios to cover header authoring with strict file scope; report unavailable execution honestly.

## Spec reconciliation

Pending implementation and local verification. Reconcile the shared header and lifecycle rules into the two linked capability specs before review; keep this track open until verification follow-up and merge.
