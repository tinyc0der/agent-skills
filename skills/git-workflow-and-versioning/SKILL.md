---
name: git-workflow-and-versioning
description: Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, splitting uncommitted work in a messy working tree into clean atomic commits, opening, updating, or reviewing a pull request (PR), pushing to a remote, or when you need to organize work across multiple parallel streams. Use when cutting a release, choosing a semantic version bump, tagging, or writing a changelog.
---

# Git Workflow and Versioning

## Overview

Git is your safety net. Treat commits as save points, branches as sandboxes, and history as documentation. With AI agents generating code at high speed, disciplined version control is the mechanism that keeps changes manageable, reviewable, and reversible.

**Workflow notes:** For an active track, read `docs/tracks/<track-id>/notes.md` at phase entry or resume and update it when useful context changes or before handoff. Capture observations, tentative ideas, outcomes, blockers, and next actions with evidence links. Follow the memory-management running-note and document-metadata protocols; honor explicit read-only or file-scope limits and keep writes outside pinned verification or release targets.

## When to Use

Always. Every code change flows through git.

Before creating a branch or editing repository files, complete the worktree check below.

## Core Principles

### Trunk-Based Development (Recommended)

Keep `main` always deployable. Work in short-lived feature branches that merge back within 1-3 days. Long-lived development branches are hidden costs — they diverge, create merge conflicts, and delay integration. DORA research consistently shows trunk-based development correlates with high-performing engineering teams.

```
main ──●──●──●──●──●──●──●──●──●──  (always deployable)
        ╲      ╱  ╲    ╱
         ●──●─╱    ●──╱    ← short-lived feature branches (1-3 days)
```

This is the recommended default. Teams using gitflow or long-lived branches can adapt the principles (atomic commits, small changes, descriptive messages) to their branching model — the commit discipline matters more than the specific branching strategy.

- **Dev branches are costs.** Every day a branch lives, it accumulates merge risk.
- **Release branches are acceptable.** When you need to stabilize a release while main moves forward.
- **Feature flags > long branches.** Prefer deploying incomplete work behind flags rather than keeping it on a branch for weeks.

### 1. Commit Early, Commit Often

Each successful increment gets its own commit. Don't accumulate large uncommitted changes.

```
Work pattern:
  Implement slice → Test → Verify → Commit → Next slice

Not this:
  Implement everything → Hope it works → Giant commit
```

Commits are save points. If the next change breaks something, you can revert to the last known-good state instantly.

### 2. Atomic Commits

Each commit does one logical thing:

```
# Good: Each commit is self-contained
git log --oneline
a1b2c3d Add task creation endpoint with validation
d4e5f6g Add task creation form component
h7i8j9k Connect form to API and add loading state
m1n2o3p Add task creation tests (unit + integration)

# Bad: Everything mixed together
git log --oneline
x1y2z3a Add task feature, fix sidebar, update deps, refactor utils
```

### 3. Descriptive Messages

Commit messages explain the *why*, not just the *what*:

```
# Good: Explains intent
feat: add email validation to registration endpoint

Prevents invalid email formats from reaching the database.
Uses Zod schema validation at the route handler level,
consistent with existing validation patterns in auth.ts.

# Bad: Describes what's obvious from the diff
update auth.ts
```

**Format:**
```
<type>: <short description>

<optional body explaining why, not what>
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `test` — Adding or updating tests
- `docs` — Documentation only
- `chore` — Tooling, dependencies, config

### 4. Keep Concerns Separate

Don't combine formatting changes with behavior changes. Don't combine refactors with features. Each type of change should be a separate commit — and ideally a separate PR:

```
# Good: Separate concerns
git commit -m "refactor: extract validation logic to shared utility"
git commit -m "feat: add phone number validation to registration"

# Bad: Mixed concerns
git commit -m "refactor validation and add phone number field"
```

**Separate refactoring from feature work.** A refactoring change and a feature change are two different changes — submit them separately. This makes each change easier to review, revert, and understand in history. Small cleanups (renaming a variable) can be included in a feature commit at reviewer discretion.

### 5. Size Your Changes

Target ~100 lines per commit/PR. Changes over ~1000 lines should be split. See the splitting strategies in `code-review-and-quality` for how to break down large changes.

```
~100 lines  → Easy to review, easy to revert
~300 lines  → Acceptable for a single logical change
~1000 lines → Split into smaller changes
```

## Branching Strategy

### Feature Branches

```
main (always deployable)
  │
  ├── feature/task-creation    ← One feature per branch
  ├── feature/user-settings    ← Parallel work
  └── fix/duplicate-tasks      ← Bug fixes
```

- Create each branch in a linked worktree, based on `main` (or the team's default branch unless the task specifies another base)
- Keep branches short-lived (merge within 1-3 days) — long-lived branches are hidden costs
- Delete branches after merge
- Prefer feature flags over long-lived branches for incomplete features

### Branch Naming

```
feature/<short-description>   → feature/task-creation
fix/<short-description>       → fix/duplicate-tasks
chore/<short-description>     → chore/update-deps
refactor/<short-description>  → refactor/auth-module
```

## Working with Worktrees

**Required for every new work branch**, including single-agent work, small fixes, and documentation changes. Keep the main (primary) worktree on `main` or the repository's configured default branch. A branch alone does not isolate the checkout: never use `git switch -c`, `git checkout -b`, or an equivalent in-place branch switch to start work. Creating a new branch from an existing linked worktree also requires a separate linked worktree.

1. **Inspect before branching.** Run `git worktree list --porcelain` and `git status --short --branch`. Identify the primary worktree, default branch, intended branch, and base revision; the current directory is not necessarily the primary worktree.
2. **Reuse or create the correct worktree.** If the intended branch already has a linked worktree, continue there. If it exists without a checkout, use `git worktree add <path> <branch>`. For a new branch, use `git worktree add -b <branch> <path> <base>`, with an explicit base and an unused directory following the repository's worktree convention. Use the workspace manager's worktree workflow when one governs the repository.
3. **Preserve existing work.** Leave unrelated staged, unstaged, and untracked changes where they are; transfer only authorized task changes when needed. If the primary worktree is already on a work branch, establish ownership and preserve its work in a linked worktree before restoring the default branch. Never force checkout, reset, clean, blindly stash, or remove someone else's worktree to satisfy this rule; pause only the affected action if ownership cannot be resolved.
4. **Work from the linked directory.** Set the shell/tool working directory to that worktree before editing, testing, or committing. Verify `git rev-parse --show-toplevel` and `git branch --show-current` there, and confirm the primary worktree still has the default branch with `git worktree list --porcelain`. Repeat this check before committing and at handoff.

```bash
# From the primary checkout, which stays on main
git worktree list --porcelain
git status --short --branch
git worktree add -b feature/task-creation ../project-task-creation main

# All task work happens here
cd ../project-task-creation
git rev-parse --show-toplevel
git branch --show-current
git worktree list --porcelain
```

Remove a task worktree with `git worktree remove <path>` only after its work is merged or otherwise safely retained and the directory has no needed uncommitted or untracked files. Keep the primary worktree on the default branch during cleanup.

## The Save Point Pattern

```
Agent starts work
    │
    ├── Makes a change
    │   ├── Test passes? → Commit → Continue
    │   └── Test fails? → Revert to last commit → Investigate
    │
    ├── Makes another change
    │   ├── Test passes? → Commit → Continue
    │   └── Test fails? → Revert to last commit → Investigate
    │
    └── Feature complete → All commits form a clean history
```

This pattern means you never lose more than one increment of work. If an agent goes off the rails, `git reset --hard HEAD` takes you back to the last successful state.

## Change Summaries

After any modification, provide a structured summary. This makes review easier, documents scope discipline, and surfaces unintended changes:

```
CHANGES MADE:
- src/routes/tasks.ts: Added validation middleware to POST endpoint
- src/lib/validation.ts: Added TaskCreateSchema using Zod

THINGS I DIDN'T TOUCH (intentionally):
- src/routes/auth.ts: Has similar validation gap but out of scope
- src/middleware/error.ts: Error format could be improved (separate task)

POTENTIAL CONCERNS:
- The Zod schema is strict — rejects extra fields. Confirm this is desired.
- Added zod as a dependency (72KB gzipped) — already in package.json
```

This pattern catches wrong assumptions early and gives reviewers a clear map of the change. The "DIDN'T TOUCH" section is especially important — it shows you exercised scope discipline and didn't go on an unsolicited renovation.

## Pull Request Lifecycle

A pull request is the durable handoff between implementation, verification, review, and merge. Open it as a draft after the approved plan or first coherent implementation commit; do not wait until the entire diff is difficult to review.

For an ordinary repository implementation request, the scoped push and draft-PR handoff are included once the intended repository, base branch, and access are established. Do not wait for another PR command or ask the user to repeat that authorization. Honor explicit local-only, no-push, review-only, and phase-limited requests. A local-only endpoint written by the agent in its own spec or notes cannot narrow this default without a user or project constraint. Merge and deployment keep their separate authorization requirements.

### Draft

Create or update one PR for the current feature branch. Before mutating the remote, resolve the exact branch, remote, default branch, head revision, working-tree state, and any existing PR. Never create a duplicate because lookup was skipped.

Resolve the destination from the task, project configuration, and repository evidence; the presence of a remote alone is insufficient. If access, target, or ownership remains unresolved after inspection, prepare the scoped commits and PR body, report the precise blocker, and ask only for the missing input. Do not silently substitute local commits for the PR handoff or claim a blocker without checking.

Apply this state matrix after lookup:

| Existing PR state | `/pr draft` behavior |
|---|---|
| No PR | Create a new draft PR |
| Draft | Update the existing draft idempotently |
| Ready/open | Update it and explicitly convert it back to draft; editing the body alone is not a state transition |
| Closed or merged | Stop without reopening or creating a duplicate; report the state and ask whether to start a new branch/PR |

The draft body should stand alone:

```markdown
## Objective
[What and why]

## Scope and non-goals
- In: ...
- Out: ...

## Source of truth
- Spec: ...
- Plan/tasks: ...

## Acceptance criteria
- [Criterion + current evidence state]

## Design and risks
[Decisions, migrations, flags, compatibility, observability]

## Verification
- Current revision: ...
- Planned or completed evidence: ...

## Visual evidence
[Screenshots or before/after evidence for user-facing changes, otherwise why not applicable]

## Rollback
[When applicable]
```

Use a temporary file for CLI body input instead of interpolating Markdown or untrusted text into a shell command. Invoking `/pr draft` authorizes the scoped push and PR creation/update, but not merge or deploy.

Before the final implementation response, confirm the remote branch contains the current scoped commits and the PR body reflects their evidence. Return the PR URL and revision. If the PR handoff is excluded by an explicit scope limit or blocked by access, destination, or ownership, state that concrete reason and what preparation is complete; do not finish with an offer to create the PR later.

### Ready for review

Mark a draft ready only when:

- The working tree is clean and the remote contains the exact local head
- A `verification-and-validation` PASS report names that head revision
- Acceptance criteria and the pre-review Definition of Done profile are satisfied
- Spec reconciliation is recorded in the numbered track's spec or bug report: verified requirement changes update `docs/specs/<capability>/spec.md` in the same PR, or unchanged contracts have a justified no-change disposition
- The PR body, task state, screenshots, migration notes, and risk notes are current
- No known Critical or Required finding remains

Stale evidence is not transferable to a newer revision. Canonical spec changes and changes to a track's requirements, scope, or acceptance criteria invalidate affected evidence; they are not evidence-only commits. Rerun every affected check, update the PR, then mark it ready. `/pr ready` does not authorize merge.

### Review and merge

Use the loop `review -> fix -> reverify -> rereview` autonomously within scope. Required fixes that change behavior follow `test-driven-development`. Merge only when the user has authorized that endpoint, required reviews and CI pass, and the project's merge strategy permits it. Obtain human approval when enforced policy or an explicit user checkpoint requires it; do not add a separate human gate to an already authorized, policy-compliant merge or impersonate a required reviewer.

#### Merge method decision

Apply this procedure before every PR merge, including delegated integration:

1. **Resolve policy.** Read explicit user instructions, applicable project policy, and recorded decisions from earlier sessions. User instructions take precedence over project preferences; enforced repository rules still apply. Carry prohibitions and their sources forward until explicitly superseded. Enabled methods describe availability, not preference; past PRs, UI defaults, CLI defaults, and a large commit count do not authorize a method.
2. **Separate cleanup from integration.** Permission to squash local fixups does not select squash-and-merge. Permission to use a PR merge method does not authorize additional local history rewrites or force-pushes. Treat each decision in its own scope.
3. **Use the harness fallback.** When neither user instructions nor project policy selects a method, use **rebase merge**: preserve the logical commits in linear history, with rewritten commit IDs. Explicit merge-commit or squash policies remain supported. Check availability and branch/queue constraints against the effective policy. If the selected method is prohibited, unavailable, or incompatible with an enforced rule, report the conflict and ask only for the unresolved decision; do not silently substitute another method, change settings, or bypass a gate. A resolved, authorized method needs no repeated permission question.
4. **Pin and record the decision.** Confirm the repository, PR, base branch/revision, and reviewed head immediately before integration. In the existing merge record (PR/track/release record), save the selected method, policy source (user decision or file/section, including the fallback when used), relevant prohibitions, pinned head, and intended command arguments or API parameters. Hand this effective policy and its source to the integration owner; a fresh session must not infer it again from availability or history.
5. **Execute explicitly.** Select the method in the command or API call and guard the head against changes. For GitHub CLI, use exactly one of `--rebase`, `--merge`, or `--squash` with `--match-head-commit <reviewed-head>`, naming the repository and PR. A changed head requires fresh checks and a new decision record before retrying. If an enforced queue controls the method, verify its configured strategy matches the selected policy before enqueueing; do not bypass it. Record the actual arguments, timestamp, exit status, and outcome. Queued or auto-merge-enabled is pending, not merged.
6. **Verify the landed result.** Read authoritative merge metadata and the resulting commit graph; record the resulting commit or integrated range and verification outcome. A merge commit must retain the reviewed head in its ancestry. For rebase, compare the ordered logical changes in the landed range with the reviewed commits, accounting for new IDs and any already-applied or empty changes; do not require the original head to remain an ancestor. For squash, verify the selected combined change. A one-parent commit or matching file tree alone cannot distinguish squash from rebase. If the result differs from the policy or cannot be established, report that outcome, preserve the evidence, and stop dependent release work. Do not retry a completed merge or rewrite deployed history to conceal a mismatch.

GitHub-specific mechanics: [CLI merge flags and queue behavior](https://cli.github.com/manual/gh_pr_merge), [merge method semantics](https://docs.github.com/en/pull-requests/reference/pull-request-merges). Use the forge's equivalent explicit method and concurrency guard elsewhere.

## Pre-Commit Hygiene

Before every commit:

```bash
# 1. Check what you're about to commit
git diff --staged

# 2. Ensure no secrets
git diff --staged | grep -i "password\|secret\|api_key\|token"

# 3. Run tests
npm test

# 4. Run linting
npm run lint

# 5. Run type checking
npx tsc --noEmit
```

Automate this with git hooks:

```json
// package.json (using lint-staged + husky)
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## Handling Generated Files

- **Commit generated files** only if the project expects them (e.g., `package-lock.json`, Prisma migrations)
- **Don't commit** build output (`dist/`, `.next/`), environment files (`.env`), or IDE config (`.vscode/settings.json` unless shared)
- **Have a `.gitignore`** that covers: `node_modules/`, `dist/`, `.env`, `.env.local`, `*.pem`

## Using Git for Debugging

```bash
# Find which commit introduced a bug
git bisect start
git bisect bad HEAD
git bisect good <known-good-commit>
# Git checkouts midpoints; run your test at each to narrow down

# View what changed recently
git log --oneline -20
git diff HEAD~5..HEAD -- src/

# Find who last changed a specific line
git blame src/services/task.ts

# Search commit messages for a keyword
git log --grep="validation" --oneline
```

## Release & Versioning

Commits are how *you* track change; a **version** is how your *consumers* track it. The moment anything else depends on your code — another team, a published package, a deployed client — "latest on main" stops being a sufficient answer to "what am I running, and is it safe to upgrade?" A version number and a changelog are the contract that answers it.

### Semantic Versioning

For anything with consumers, version `MAJOR.MINOR.PATCH` and let the number carry meaning:

```
  MAJOR  breaking change — consumers must change their code to upgrade
  MINOR  new functionality, backward-compatible — safe to upgrade
  PATCH  bug fix, backward-compatible — safe to upgrade
```

The number is a promise, so make the code match it. A "patch" that changes behavior consumers relied on is a major change wearing a disguise (Hyrum's Law — see the `api-and-interface-design` skill). When unsure whether a change is breaking, assume it is; a surprise major is far cheaper than a broken consumer.

### Tag the release, and let the tag be the source of truth

A release is an immutable point in history, not a moving branch. Tag it so it can always be reproduced:

```bash
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin v1.4.0
```

Derive the version from the tag rather than hand-editing it in scattered files, so the artifact, the tag, and the changelog can never disagree.

### Keep a changelog written for humans

A changelog is not `git log`. It's the curated, consumer-facing answer to "what changed and do I care?" — grouped by `Added / Changed / Fixed / Deprecated / Removed / Security`, newest on top, every entry phrased around user impact, not internal mechanics.

```markdown
## [1.4.0] - 2025-06-12
### Added
- Bulk task import via CSV
### Fixed
- Timezone drift in recurring task due dates
### Deprecated
- `GET /v1/tasks/all` — use the paginated `GET /v1/tasks` (removal in 2.0)
```

Write the entry in the same change that makes the change, while the impact is fresh — not reconstructed from commit archaeology at release time. Breaking changes get a migration note and a deprecation window (follow the `deprecation-and-migration` skill); shipping the actual release is the `shipping-and-launch` skill's job — this section is the versioning contract that feeds it.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll commit when the feature is done" | One giant commit is impossible to review, debug, or revert. Commit each slice. |
| "The message doesn't matter" | Messages are documentation. Future you (and future agents) will need to understand what changed and why. |
| "I'll squash it all later" | Squashing destroys the development narrative. Prefer clean incremental commits from the start. |
| "Branches add overhead" | Short-lived branches are free and prevent conflicting work from colliding. Long-lived branches are the problem — merge within 1-3 days. |
| "I'm the only agent; a branch here is enough" | Every new branch needs a linked worktree. Solo work and small edits still change the primary checkout if you switch its branch. |
| "I'll split this change later" | Large changes are harder to review, riskier to deploy, and harder to revert. Split before submitting, not after. |
| "I don't need a .gitignore" | Until `.env` with production secrets gets committed. Set it up immediately. |
| "It's just a small fix, bump the patch" | Check what consumers can observe. A behavior change they relied on is a major, whatever the diff size. |
| "The changelog is just the commit log" | Commits are for you; the changelog is for consumers, curated by impact. Generating one from raw commits buries what matters. |
| "We'll write the changelog at release time" | By then the impact is reconstructed from memory and half of it is missing. Write the entry with the change. |

## Red Flags

- Large uncommitted changes accumulating
- Commit messages like "fix", "update", "misc"
- Formatting changes mixed with behavior changes
- No `.gitignore` in the project
- Committing `node_modules/`, `.env`, or build artifacts
- Long-lived branches that diverge significantly from main
- Force-pushing to shared branches
- Creating a branch in place, leaving the primary worktree off the default branch, or editing and committing from the wrong worktree
- A breaking change shipped under a minor or patch version bump
- A release with no tag, or a version number hand-edited out of sync with the tag
- A user-facing release with no changelog entry, or a changelog that's just dumped commit messages
- A PR opened without resolving whether one already exists for the branch
- A PR marked ready with stale, FAIL, or INCOMPLETE verification evidence
- A merge performed without required review, green CI, or explicit authorization
- A merge method inferred from enabled options or past PRs, omitted from the command/record, or silently substituted after a conflict

## Verification

Before branch work and at handoff:

- [ ] `git worktree list --porcelain` shows the primary worktree on the default branch and the task branch in its linked worktree
- [ ] The working directory and branch were verified before edits and commits; an existing matching worktree was reused
- [ ] Unrelated changes and other worktrees were preserved; any removed task worktree had its work safely retained

For every commit:

- [ ] Commit does one logical thing
- [ ] Message explains the why, follows type conventions
- [ ] Tests pass before committing
- [ ] No secrets in the diff
- [ ] No formatting-only changes mixed with behavior changes
- [ ] `.gitignore` covers standard exclusions

For every release (anything with consumers):

- [ ] The version bump matches the change: breaking → major, additive → minor, fix → patch
- [ ] The release is tagged, and the version is derived from the tag, not hand-edited out of sync
- [ ] The changelog has a curated, human-readable entry grouped by impact for this version

For every pull request:

- [ ] The PR identifies its spec, plan, scope, non-goals, risks, and head revision
- [ ] Draft creation or readiness is within the user's authorized endpoint; existing authorization was reused before remote mutation
- [ ] The implementation handoff includes the current PR URL and revision, or the explicit scope limit or verified blocker that prevents it
- [ ] Ready status is backed by a PASS report for the exact head revision
- [ ] Critical and Required findings are resolved before merge
- [ ] Required human approval and CI gates pass before merge
- [ ] The [merge method decision](#merge-method-decision) is recorded with its policy source, pinned head, actual invocation, resulting commit/range, and verified outcome; handoffs preserve the effective policy
