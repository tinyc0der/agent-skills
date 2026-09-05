# Notes: Test Startup

## Resume

- Phase: debugging, paused before checking the startup sequence.
- Next: run the [reproduction](../../../scripts/reproduce-startup.cjs) and compare its event order with the [bug report](bug.md).

## Notes

- Observed — Raising the connection pool limit from 10 to 25 made no difference in the earlier attempt; the change was reverted.
- Hypothesis — The database might need a larger connection pool. This remains unverified; inspect the startup sequence before another tuning attempt.
- Ad hoc — CI may omit the lockfile hash from its cache key. Nobody has checked this yet.
