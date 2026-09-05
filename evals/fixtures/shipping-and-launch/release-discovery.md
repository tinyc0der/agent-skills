# Release discovery snapshot

- Current worktree branch: `feature/unrelated-follow-up`
- Remote default branch: `origin/main`
- Pinned `origin/main` head: `f500004`
- Configured release source: none
- Latest successful production deployment: `d-104`, revision `a100000`
- Latest published non-draft release: `v1.4.0`, revision `a100000`
- Latest reachable release tag: `v1.4.0`, revision `a100000`
- Commit ancestry: `a100000` is an ancestor of `f500004`
- Release range: `a100000..f500004`

Commits and forge associations in the range:

| Revision | Association |
|---|---|
| `b200001` | merged PR #201, "Add checkout feature flag" |
| `c300002` | merged PR #204, "Instrument payment failures" |
| `d400003` | direct commit, "docs: update support runbook" |
| `e400004` | revert of merged PR #198 |
| `f500004` | no forge association; needs classification |

PR #201 was reviewed at its head revision and its merged patch is unchanged.
Post-merge integration and staging checks for `f500004` have not run yet.
