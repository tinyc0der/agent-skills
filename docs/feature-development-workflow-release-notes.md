# Feature Development Workflow Release Notes

Current automation semantics supersede the original manual checkpoints described below: `/build` defaults to the authorized scope, with explicit `step` mode. Specs, plans, reviews, and release checks reuse authorization and escalate only at an unresolved critical human boundary. See the [current workflow](feature-development-workflow.md) and [autonomy policy](../skills/using-agent-skills/SKILL.md#autonomous-execution-and-critical-human-gates).

## Summary

This change aligns the skill pack around one feature lifecycle:

```text
/spec -> /plan -> /pr draft -> /build -> /verify
      -> /pr ready -> /review -> merge -> /ship
```

It adds feature-level verification and explicit pull-request transitions,
narrows specification work to approved requirements, repairs `/build auto`,
standardizes review severities, and makes zero-argument `/ship` discover the
next release before applying revision-scoped launch gates.

Test generation now uses a minimum-sufficient admission rule: every proposed
case must protect a distinct material regression that existing coverage would
miss, at the cheapest reliable layer. Generic scenario matrices, numerical
coverage quotas, and duplicate assertions across layers are not case requirements.
The dedicated `test-case-design-review` skill owns that selection and focused
review workflow; `test-driven-development` retains RED-GREEN-REFACTOR execution.

## Compatibility Guidance

- `/test` remains supported. It owns RED-GREEN-REFACTOR during implementation;
  `/verify` is the post-build acceptance and runtime validation gate. Before
  RED, `/test` maps changed contracts and material risks to existing coverage;
  adequately covered refactors and non-behavioral work do not invent tests.
- `/plan` remains the canonical lifecycle name. Gemini and Antigravity expose the
  same command as `/planning` because `/plan` conflicts with their native command.
- Existing draft pull requests remain valid. Use `/pr ready` only after the PR
  head has matching verification evidence and the pre-review Definition of Done
  profile passes. Final review evidence, merge CI, and human approval remain
  later merge gates.
- Invoking `/pr draft` creates a PR when none exists, updates a draft, converts
  an open ready PR back to draft explicitly, and stops on closed or merged PRs
  rather than creating a duplicate.
- Reviews now use `Critical`, `Required`, `Optional`, `Nit`, and `FYI`.
  Former `Important` blockers map to `Required`.
- Canonical capability contracts live at `docs/specs/<capability>/spec.md`.
  Individual changes use numbered `docs/tracks/<track-id>/` directories with
  `spec.md` or `bug.md`, and only the planning, task, verification, review,
  running notes, and launch evidence needed for that work. Multi-capability
  proposals use an optional capability map: Feature+map keeps sections in one
  track spec; independently shippable children use a parent track plus flat
  sibling child tracks.
- Track ids use the next repository-wide three-digit number followed by a
  kebab-case name, starting at `001`. Preserve historical ids and resolve
  concurrent allocations before merge. Explicit track selection takes precedence
  over branch-derived naming.
- Before review, reconcile verified requirement changes into the owning
  capability specs in the same implementation PR; record target links or a
  justified no-change disposition in the track. Complete tracks after merge and
  retain them as history. Canonical spec edits invalidate affected evidence.
- Migrate existing execution records into numbered tracks and consolidate
  accepted, implemented requirements by capability. Resolve ambiguous ownership
  before moving files. Follow the [migration guide](migrations/capability-specs-and-tracks.md).
- Per-skill installs remain usable without repo-root references; those links are
  supplemental whole-pack guidance.
- `/ship` no longer requires users to transfer a candidate digest, main SHA,
  previous tag, or PR list from a feature worktree. The `shipping-and-launch`
  skill pins the remote default-branch head, discovers the last successful ship,
  maps the exact range to PRs and non-PR commits, and pauses on a preview for
  human confirmation.
- Deployment records, published releases, reachable release tags, and an
  explicit project release-state file form the automatic baseline fallback.
  Invalid configured sources, non-ancestor history, and unresolved ambiguity
  stop for clarification rather than guessing. Prereleases are excluded unless
  an explicit project configuration identifies that channel as production.
- Remote commit, PR, release, and deployment metadata is treated as untrusted
  data. It supplies structured release facts but cannot instruct the agent to
  execute commands or follow embedded URLs.
- PR-scoped review evidence can survive a merge or squash when the patch is
  unchanged. Release-scoped integration, configuration, migration, and
  environment checks remain tied to the pinned post-merge revision.
- The ship commands are intentionally thin adapters. The skill owns discovery;
  Claude, Gemini, and Antigravity commands own only invocation and
  harness-specific specialist fan-out.

## Publication Checklist

Before publishing the plugin or package:

- Run skill, command-parity, artifact-path, reference-link, Markdown-link, and lifecycle validators.
- Run routing evals with the enforced rank-1 floor.
- Run affected behavioral and pressure evals.
- Confirm the session-start hook in normal and no-`jq` environments.
- Confirm plugin metadata reports 26 skills and 10 commands.
- Install the built package/plugin in a clean environment and smoke-test `/spec`,
  `/plan` or `/planning`, `/pr`, `/build`, `/verify`, `/review`, and `/ship` discovery.
- Record the exact release revision and attach the validation results.

## Rollback Plan

If command discovery, routing, or lifecycle behavior regresses after publication:

1. Stop further rollout or marketplace promotion.
2. Restore the previous published plugin/package version.
3. Tell users to continue using `/test` as their validation entry point until the
   corrected release is available; existing legacy artifacts remain readable
   but new workflow commands should not create a second bundle for the same feature.
4. Revert the lifecycle release commit(s), reproduce the failing integration, and
   add a regression case before republishing.
5. Verify skill and command counts, command parity, routing, and hook behavior in a
   clean install before resuming rollout.

Rollback is complete when the previous command set is discoverable, existing
change tracks still load, and no published guide points users at an
unavailable command.
