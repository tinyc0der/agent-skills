---
type: Change Specification
title: Retarget clone and install URLs to tinyc0der/agent-skills
description: Point this fork's docs and plugin manifests at tinyc0der/agent-skills while keeping original-repo history and creator credit.
status: draft
---

# Retarget clone and install URLs

**Route:** Bounded task. The user asked to replace `addyosmani/agent-skills` with `tinyc0der/agent-skills` in docs and related skills. Implement, verify, and open a draft PR; merge remains a separate endpoint.

## Acceptance criteria

1. Clone and install commands in README and setup docs use `tinyc0der/agent-skills`.
2. The declared marketplace name is `tinyc0der-agent-skills` and CI installs `agent-skills@tinyc0der-agent-skills`.
3. New skill-gap issues point at `tinyc0der/agent-skills`.
4. Historical original-repo issue/PR links, LICENSE copyright, and Addy Osmani creator credit remain.

## Scope

- In: README, CONTRIBUTING, AGENTS.md, CLAUDE.md, setup docs, plugin/marketplace manifests, CI plugin-install command, and the skill-lint issue tracker URL.
- Out: LICENSE text, Trendshift badge and `addyosmani.com` image, plugin `author` name, and numbered issue/PR URLs that exist only on `addyosmani/agent-skills`.

## Spec reconciliation

No `docs/specs/<capability>/spec.md` contract changed. This retargets this fork's install identity; capability workflows are unchanged. Disposition: justified no-change for existing capability specs.
