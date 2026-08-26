---
description: Conduct a five-axis code review — correctness, readability, architecture, security, performance
---

Invoke the agent-skills:code-review-and-quality skill.

Review the current pull request when one exists; otherwise review the staged changes or explicitly selected commits. Record the exact head revision across all five axes:

1. **Correctness** — Does it match the spec? Edge cases handled? Tests adequate?
2. **Readability** — Clear names? Straightforward logic? Well-organized?
3. **Architecture** — Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** — Input validated? Secrets safe? Auth checked? (Use security-and-hardening skill)
5. **Performance** — No N+1 queries? No unbounded ops? (Use performance-optimization skill)

Categorize every finding as Critical, Required, Optional, Nit, or FYI. Critical and Required findings block approval.
Persist the structured review to `docs/specs/<feature-slug>/review.md` with specific file:line references, fix recommendations, dispositions, and the exact implementation revision. Copy or link it from the PR. After fixes, require affected behavior to be reverified and rereview the final revision before approval.
