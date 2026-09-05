# Lucas Memory Profile for OKF v0.1

This profile applies the [Open Knowledge Format v0.1 draft](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/ee67a5ca27044ebe7c38385f5b6cffc2305a9c1a/okf/SPEC.md) to Lucas Harness durable project memory. The source is pinned to the v0.1 revision because upstream `main` now describes a newer format. OKF remains the interoperability baseline; the requirements for a root index, project concept, and collection indexes are stricter Lucas profile rules for reliable progressive disclosure.

## Contents

- [Bundle boundary](#bundle-boundary)
- [Required profile](#required-profile)
- [Reserved files](#reserved-files)
- [Links and citations](#links-and-citations)
- [Legacy layout migration](#legacy-layout-migration)
- [Producer and consumer behavior](#producer-and-consumer-behavior)

## Bundle boundary

Use a dedicated bundle so general documentation and feature workflow state are not accidentally subject to OKF conformance:

```text
docs/knowledge/                         # repository-wide bundle
packages/<pkg>/docs/knowledge/          # optional package-owned bundle
```

Each directory is an independent knowledge bundle and unit of distribution. Its concept ID is the concept path relative to that bundle with `.md` removed. For example, `docs/knowledge/steering/auth.md` has concept ID `steering/auth` in the repository bundle.

Keep `docs/specs/<slug>/`, `docs/intent/`, `docs/ideas/`, `docs/migrations/`, and general documentation outside the bundle.

## Required profile

Every bundle contains:

```text
<bundle-root>/
  index.md
  project.md
  steering/index.md
  decisions/index.md
  runbooks/index.md
```

The bundle-root `index.md` declares the version. It is the only index allowed to have frontmatter, and that frontmatter contains only the version declaration:

```markdown
---
okf_version: "0.1"
---

# Project knowledge

* [Project](project.md) - Project contract, direction, and constraints.
* [Steering](steering/) - Conventions, risks, and lessons.
* [Decisions](decisions/) - Architecture decisions.
* [Runbooks](runbooks/) - Operational procedures.
```

Every non-reserved `.md` file is a UTF-8 OKF concept with parseable YAML frontmatter. `type` is required and non-empty; Lucas producers also provide `title` and a one-sentence `description` so indexes and previews remain useful.

For deterministic generation and validation, Lucas producers serialize a flat top-level YAML mapping whose values are scalars or inline scalar lists; quote values containing `#`, `:`, brackets, or other YAML punctuation. This canonical producer subset is still valid YAML. It does not restrict consumers: imported concepts may use any parseable YAML, and unknown or nested extension values must be preserved when round-tripping.

```yaml
---
type: Architecture Decision
title: Use transactional migrations
description: Run schema migrations atomically to prevent partial changes.
tags: [database, migrations]
timestamp: 2026-07-11T00:00:00Z
---
```

Use these descriptive producer defaults while tolerating any unknown type:

| Concept | Default `type` |
|---|---|
| `project.md` | `Project` |
| `steering/**/*.md` | `Project Guidance` |
| `decisions/NNNN-*.md` | `Architecture Decision` |
| `runbooks/**/*.md` | `Playbook` |
| a cross-bundle catalog such as `bundles.md` | `Bundle Catalog` |
| an external-home catalog such as `external-knowledge.md` | `Knowledge Sources` |

`resource`, `tags`, and `timestamp` are optional. Use `resource` only for a canonical underlying asset URI. Use an ISO 8601 timestamp only when it communicates a meaningful content change; git remains the authoritative history.

## Reserved files

`index.md` and `log.md` are reserved at every hierarchy level and are never concept documents.

- A non-root `index.md` has no frontmatter. Organize it under headings and use relative Markdown links with the linked concept's description, as in the required-profile example above.
- The root `index.md` follows the same body format plus the `okf_version: "0.1"` exception above.
- `log.md` is optional, has no frontmatter, and groups flat bullet entries under newest-first `## YYYY-MM-DD` headings. Do not create it by default because reviewed git history already supplies chronology and attribution.
- An index inventories its own directory. Put links to independent package bundles in a typed `bundles.md` concept, not in a reserved collection index.

## Links and citations

Use standard Markdown links and describe the relationship in surrounding prose.

- Between concepts in the same bundle, prefer absolute bundle-relative links:

  ```markdown
  [auth decision](/decisions/0004-auth.md)
  ```
- Inside an `index.md`, use directory-relative links as shown above.
- For workflow evidence under `docs/specs/`, another package bundle, or any source outside the bundle, use a durable repository or web URL under `# Citations` when portability matters. A checkout-relative `../../specs/...` link is acceptable only when the project deliberately accepts that it will break if the bundle is distributed alone.
- Never rewrite or reject a bundle merely because a cross-link is broken; flag it as drift and continue best-effort consumption.

## Legacy layout migration

Before bootstrap, inspect project rules, documentation indexes, ADR/runbook conventions, and configuration such as `.adr-dir` throughout the active scope. Existing paths and formats take precedence over the profile defaults. A path named `decisions/` or `runbooks/` alone is not evidence of a legacy memory layout.

Keep established external homes canonical unless their migration is authorized. Route new decisions or procedures there and, when discovery is needed, link to them from a typed `external-knowledge.md` concept listed in the bundle's root index. Do not duplicate their contents or impose OKF frontmatter on them. Follow the cross-boundary citation rules above. This permits an existing `docs/adr/` collection and a knowledge bundle to coexist without competing owners.

For an earlier memory layout identified by rules, memory pointers, or user instructions, resolve migration authorization before moving files. Without it, consume best-effort and update the existing homes; do not bootstrap a replacement.

- If a confirmed legacy memory layout and `knowledge/` both exist, reconcile unresolved ownership with the user, even if one looks empty; reuse any ownership decision already supplied. Never infer that a scaffold is disposable.
- If migration is authorized and only a partial or complete legacy layout exists, inventory every identified legacy artifact, including custom paths, and move them under `knowledge/` in one reviewable change. Derive any missing required project concept or collection index from verified codebase evidence; do not invent or discard content.
- If only `knowledge/` exists, do not migrate. If neither exists, bootstrap directly.

Preflight reserved-name collisions before moving. A legacy `index.md` that is already a directory map can keep that role; a legacy concept named `index.md` or `log.md` must be renamed with user approval and every inbound link rewritten. Treat ambiguous files as a stop condition.

Before reducing an existing rules file to bundle pointers, inventory its content. Promote unique durable facts to their canonical concepts, preserve tool-specific controls in the rules file, and remove only reviewed duplicates. Do not leave compatibility copies or symlinks: two paths would claim to be canonical. Keep feature workflow and general documentation outside the bundle.

## Producer and consumer behavior

Before claiming that a generated bundle conforms, verify recursively that every non-reserved Markdown file has parseable frontmatter and a non-empty `type`, and that every present `index.md` or `log.md` follows its reserved structure.

When reading, syncing, or migrating a bundle:

- tolerate unknown types;
- preserve unknown frontmatter fields or keys when round-tripping;
- tolerate missing optional fields, broken links, and missing optional indexes;
- warn on an unrecognized declared OKF version and attempt best-effort consumption instead of refusing the bundle;
- treat a missing Lucas profile index as a repair candidate, not as base-OKF nonconformance;
- never overwrite human-authored content to normalize formatting.

The permissive consumer contract is part of OKF interoperability. Lucas's required discovery indexes govern what its producers create, not what its consumers are allowed to read.

A read-only request ends after best-effort consumption and reporting limitations; it requires no edits, commit, or v0.1 conformance claim. For a sync, validate authored changes while preserving untouched imports and their declared version. Apply full profile verification only when creating a bundle or explicitly migrating it to this profile.
