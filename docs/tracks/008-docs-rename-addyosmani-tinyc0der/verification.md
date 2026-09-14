---
type: Verification Report
title: tinyc0der URL retarget verification
description: Acceptance and repository-gate evidence for retargeting clone and install URLs to tinyc0der/agent-skills.
status: draft
---

# Verification: PASS

**Implementation revision:** `2cefcf850d0c641b52555c4df93e63a9c3a4a050`.

Baseline: `d06ba0b1ae72365d80c580de60fa3e912af33e40` (`main`). Checks below ran against the implementation content at the revision above. This report and the sibling track files are evidence-only additions after that revision.

## Acceptance trace

| Criterion from [spec](spec.md) | Evidence | State |
|---|---|---|
| Clone and install commands use `tinyc0der/agent-skills` | Grep of README and setup docs: `npx skills add`, `git clone`, `agy plugin install`, `gemini skills install`, `codex plugin marketplace add`, `cmd skills add`, and Copilot marketplace commands all use `tinyc0der/agent-skills`. No remaining install/clone command uses `addyosmani/agent-skills`. | PASS |
| Marketplace name is `tinyc0der-agent-skills` and matches CI | `.claude-plugin/marketplace.json` `name` is `tinyc0der-agent-skills`; owner is `tinyc0der`; plugin source/homepage is `tinyc0der/agent-skills`. CI installs `agent-skills@tinyc0der-agent-skills`. Docs use the same identifier. | PASS |
| New skill-gap issues point at this fork | CONTRIBUTING skill-gap form is `https://github.com/tinyc0der/agent-skills/issues/new?template=skill-gap.yml`. Skill-lint tracker URL is `https://github.com/tinyc0der/agent-skills/issues`. | PASS |
| Historical original-repo links and creator credit remain | Remaining `addyosmani` hits are Trendshift alt text, `addyosmani.com` image, README creator row, and issue/PR links `#35`, `#36`, `#272`, `#351`, `#361`, `#445` on `addyosmani/agent-skills`. LICENSE copyright is unchanged. | PASS |

## Repository gates

Commands exited 0 on the implementation revision unless noted.

| Check | Command | Result |
|---|---|---|
| Full Node regression suite | `node --test scripts/*-test.js scripts/lib/*-test.js` | 71 tests pass, 0 fail, 0 skip. |
| Routing and case schema | `node scripts/run-evals.js --min-rank1 95` | 163 checks pass; rank-1 98% (100/102). |
| Skill structure | `node scripts/validate-skills.js` | 29 skills pass. |
| Command parity | `node scripts/validate-commands.js` | 11 commands pass. |
| Lifecycle contracts | `node scripts/validate-lifecycle-contracts.js` | PASS. |
| Artifact paths | `node scripts/validate-artifact-paths.js` | 34 guarded consumers pass. |
| Markdown links | `node scripts/validate-markdown-links.js` | 123 Markdown files pass at the implementation revision. |
| Shared references | `node scripts/validate-reference-links.js` | 29 skills pass. |
| Manifest versions | `node scripts/validate-versions.js` | Manifests remain aligned at 0.7.0. |
| Session-start hook | `bash hooks/session-start-test.sh` | JSON payload OK. |
| Simplify hook | `bash hooks/simplify-ignore-test.sh` | 21 assertions pass. |
| Plugin manifest | `claude plugin validate .` | Marketplace validation passed. |
| Diff hygiene | `git diff tinyc0der/main...HEAD --check` | PASS. |
| CI on this SHA | [Test Plugin Installation #34834127526](https://github.com/tinyc0der/agent-skills/actions/runs/34834127526) | All four jobs success, including plugin install of `agent-skills@tinyc0der-agent-skills`. |

Application build, lint, format, and type-check scripts are not present in this documentation pack: **NOT APPLICABLE**. Skill-creator SKILL.md validation is **NOT APPLICABLE**; no `SKILL.md` files changed.

## Runtime and integration evidence

- Consumer-observable install path for this revision: GitHub Actions job [Test plugin installation](https://github.com/tinyc0der/agent-skills/actions/runs/34834127526/job/103944057455) added the local marketplace and installed `agent-skills@tinyc0der-agent-skills` at `2cefcf850d0c641b52555c4df93e63a9c3a4a050`. **PASS**.
- Live `npx` / Gemini / Antigravity / Command Code installs consume published GitHub `main`, not this PR revision: **NOT APPLICABLE**.
- No browser UI, API, or migration runtime applies: **NOT APPLICABLE**.

## Conditional checks

- Security: **NOT APPLICABLE** — public clone/install URLs only; no secrets, auth, or trust-boundary change.
- Accessibility: **NOT APPLICABLE** — no user-facing UI.
- Performance: **NOT APPLICABLE** — no runtime budget.
- Migration/compatibility: **PASS** — marketplace identifier change is documented; docs, manifest, and CI agree. Existing registrations of `addy-agent-skills` need a re-add of this marketplace.
- Observability: **NOT APPLICABLE**.
- Documentation: **PASS** — this change is the documentation/config retarget; capability specs unchanged (justified no-change in [spec](spec.md)).

## Blockers and limitations

None for the requested local retarget. This report does not claim merge, release, or that every third-party installer was invoked against unpublished `main`.
