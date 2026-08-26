---
description: Start spec-driven development — write a structured specification before writing code
---

Invoke the agent-skills:spec-driven-development skill.

Begin by understanding what the user wants to build. Ask clarifying questions about:
1. The objective and target users
2. Core features and acceptance criteria
3. Tech stack preferences and constraints
4. Known boundaries (what to always do, ask first about, and never do)

Then generate a structured spec covering objective, non-goals, project context, affected structure, testing and verification, boundaries, success criteria, and open questions. Reference existing project-wide commands and conventions instead of copying them unless the feature changes them.

If the request bundles several independently testable capabilities, first propose a capability map (module ids, dependency direction, build order) per the skill's Phase 0 and get it approved, then spec each module in dependency order.

Save a single-capability spec as `specs/SPEC.md`. For a multi-capability initiative, save the approved map as `specs/capability-map.md` and each module spec as `specs/SPEC-<module-id>.md`. Confirm approval, then stop and hand off to `/plan`; do not create tasks or implementation code.
