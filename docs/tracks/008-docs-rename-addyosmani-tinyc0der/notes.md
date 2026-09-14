---
type: Working Notes
title: tinyc0der URL retarget notes
description: Resume context and verification evidence for retargeting install URLs to this fork.
status: draft
---

# Notes: tinyc0der URL retarget

## Resume
- Phase: verification complete for implementation `2cefcf850d0c641b52555c4df93e63a9c3a4a050`; draft PR #6 remains open. Next: review / ready after this evidence commit.
- Sources: [spec](spec.md), [verification](verification.md), [PR #6](https://github.com/tinyc0der/agent-skills/pull/6).

## Notes
- Decision — Marketplace identifier changed from `addy-agent-skills` to `tinyc0der-agent-skills` so install commands match the declared marketplace.
- Decision — Keep original-repo issue/PR links (`#35`, `#36`, `#272`, `#351`, `#361`, `#445`) and creator credit; those URLs are not this fork's issues.
- Observed — Local validators, 71 Node tests, routing evals, hook suites, and `claude plugin validate` passed on the implementation revision. GitHub Actions run 34834127526 installed `agent-skills@tinyc0der-agent-skills` successfully against the same SHA.
- Observed — Remaining `addyosmani` hits are the Trendshift badge, personal-site image, creator row, and the protected historical links.

## Follow-ups and promotion candidates
- None. Fork install identity is this change's local evidence, not a durable capability-contract lesson.
