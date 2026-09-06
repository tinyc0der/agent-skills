# Export filename validation

The requirements and implementation plan below are approved. Prepare the remaining delegation workflow; implementation has not started.

## Accepted requirements

- An export filename must be nonempty and must not contain a slash or backslash.
- A valid filename is preserved exactly, including spaces and non-ASCII characters.
- Invalid input produces a readable validation error before an export file is written.

## Accepted implementation plan

1. Inspect the existing export boundary and project-owned checks.
2. Implement the validation and appropriate regression tests in the export package.
3. Independently verify the completed behavior against the requirements.
4. Review the verified revision before coordinator acceptance.

## Execution constraints

- Use Antigravity for implementation and fixes. Use the default verifier runner and Codex for review.
- Keep every phase in the current worktree; separate sessions may share it sequentially.
- Sessions can read this request, shared local artifacts, and installed project skills directly. Use file and section references for inputs and preserve each lifecycle skill's report format and location.
- Implementation may edit the export package and its tests. The verifier and reviewer may write their reports and evidence only.
- Use the project's own check commands once execution starts; no source tree or runnable application is included in this preparation fixture.
- Do not publish, create a PR, merge, or deploy.

## Requested artifact

Write `delegation-plan.md` alongside this request. Include phase owners, dependencies, bounded task packets, a shared phase handoff template referencing local artifacts and skills, evidence needed before advancing, and the route for failed or missing verification evidence. Keep the coordinator accountable for the combined result.

Only prepare the plan. Do not contact a live Orca runtime, launch sessions, or claim any worker has completed the work.
