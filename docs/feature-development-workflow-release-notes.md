# Feature Development Workflow Release Notes

## Summary

This change aligns the skill pack around one feature lifecycle:

```text
/spec -> /plan -> /pr draft -> /build -> /verify
      -> /pr ready -> /review -> merge -> /ship
```

It adds feature-level verification and explicit pull-request transitions,
narrows specification work to approved requirements, repairs `/build auto`,
standardizes review severities, and lets `/ship` reuse revision-matched evidence.

## Compatibility Guidance

- `/test` remains supported. It owns RED-GREEN-REFACTOR during implementation;
  `/verify` is the post-build acceptance and runtime validation gate.
- `/plan` remains the canonical lifecycle name. Gemini and Antigravity expose the
  same command as `/planning` because `/plan` conflicts with their native command.
- Existing draft pull requests remain valid. Use `/pr ready` only after the PR
  head has matching verification evidence.
- Reviews now use `Critical`, `Required`, `Optional`, `Nit`, and `FYI`.
  Former `Important` blockers map to `Required`.
- Single-capability specs use `specs/SPEC.md`. Multi-capability work uses
  `specs/capability-map.md` and `specs/SPEC-<module-id>.md`.
- Per-skill installs remain usable without repo-root references; those links are
  supplemental whole-pack guidance.

## Publication Checklist

Before publishing the plugin or package:

- Run skill, command-parity, artifact-path, reference-link, and lifecycle validators.
- Run routing evals with the enforced rank-1 floor.
- Run affected behavioral and pressure evals.
- Confirm the session-start hook in normal and no-`jq` environments.
- Confirm plugin metadata reports 25 skills and 10 commands.
- Install the built package/plugin in a clean environment and smoke-test `/spec`,
  `/plan` or `/planning`, `/pr`, `/build`, `/verify`, `/review`, and `/ship` discovery.
- Record the exact release revision and attach the validation results.

## Rollback Plan

If command discovery, routing, or lifecycle behavior regresses after publication:

1. Stop further rollout or marketplace promotion.
2. Restore the previous published plugin/package version.
3. Tell users to continue using `/test` as their validation entry point until the
   corrected release is available; no user artifact migration is destructive.
4. Revert the lifecycle release commit(s), reproduce the failing integration, and
   add a regression case before republishing.
5. Verify skill and command counts, command parity, routing, and hook behavior in a
   clean install before resuming rollout.

Rollback is complete when the previous command set is discoverable, existing
spec/task artifacts still load, and no published guide points users at an
unavailable command.
