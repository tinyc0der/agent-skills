# Feature Development Workflow Release Notes

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
- Feature lifecycle artifacts now live together under
  `docs/specs/<feature-slug>/`. Single-capability specs use `spec.md`;
  multi-capability work uses `capability-map.md` and
  `spec-<module-id>.md`; planning, task, verification, review, candidate-memory,
  and launch evidence remain beside them.
- Existing in-flight artifacts migrate by deriving the feature slug from their
  branch, moving `specs/SPEC.md` to the bundle's `spec.md`, moving capability
  files into the same directory with lowercase names, and moving
  `tasks/plan.md` and `tasks/todo.md` beside them. Do not auto-migrate when the
  old directories contain artifacts for more than one feature; resolve the
  ownership first.
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
feature bundles still load, and no published guide points users at an
unavailable command.
