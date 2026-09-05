# Unsafe release-history snapshot

- Remote default branch: `origin/main`
- Pinned `origin/main` head: `cafef00`
- Configured authoritative release source: successful production deployment records
- Latest successful production deployment: `prod-882`, revision `deadbee`
- Git ancestry result: `deadbee` is not an ancestor of `cafef00`
- Latest published non-draft release: `v2.2.0`, revision `good123`
- `good123` is an ancestor of `cafef00`, but it is a lower-priority source than
  the explicitly configured production-deployment source.
- Root commit: `0000001`

The release manager has not explained whether production was deployed from a
different branch, the deployment metadata is corrupt, or main history was
rewritten.
