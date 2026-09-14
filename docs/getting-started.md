# Getting Started with agent-skills

agent-skills works with any AI coding agent that accepts Markdown instructions. This guide covers the universal approach. For tool-specific setup, see the dedicated guides.

## How Skills Work

Each skill is a Markdown file (`SKILL.md`) that describes a specific engineering workflow. When loaded into an agent's context, the agent follows the workflow — including verification steps, anti-patterns to avoid, and exit criteria.

**Skills are not reference docs.** They're step-by-step processes the agent follows.

## Quick Start (Any Agent)

### 1. Clone the repository

```bash
git clone https://github.com/tinyc0der/agent-skills.git
```

### 2. Choose a skill

Browse the `skills/` directory. Each subdirectory contains a `SKILL.md` with:
- **When to use** — triggers that indicate this skill applies
- **Process** — step-by-step workflow
- **Verification** — how to confirm the work is done
- **Common rationalizations** — excuses the agent might use to skip steps
- **Red flags** — signs the skill is being violated

### 3. Load the skill into your agent

Copy the relevant `SKILL.md` content into your agent's system prompt, rules file, or conversation. The most common approaches:

**System prompt:** Paste the skill content at the start of the session.

**Rules file:** Add skill content to your project's rules file (CLAUDE.md, .cursorrules, etc.).

**Conversation:** Reference the skill when giving instructions: "Follow the test-driven-development process for this change."

### 4. Use the meta-skill for discovery

Start with the `using-agent-skills` skill loaded. It contains a flowchart that maps task types to the appropriate skill.

## Recommended Setup

Rolling out to a real project? The **[Adoption Guide](adoption-guide.md)** covers two end-to-end paths: the full lifecycle from day one for a greenfield project, and an incremental, verification-first rollout for an established codebase. The setup below is the quick version.

### Minimal (Start here)

Load three essential skills into your rules file:

1. **spec-driven-development** — For defining what to build
2. **test-driven-development** — For proving it works
3. **code-review-and-quality** — For verifying quality before merge

These three cover the most critical quality gaps in AI-assisted development.

### Full Lifecycle

For comprehensive coverage, load skills by phase:

```
Starting a project:  spec-driven-development → planning-and-task-breakdown
During development:  incremental-implementation + test-case-design-review when needed + test-driven-development
After implementation: verification-and-validation
Before merge:        code-review-and-quality; security-and-hardening when triggered
Before deploy:       shipping-and-launch
```

### Context-Aware Loading

Don't load all skills at once — it wastes context. Load skills relevant to the current task:

- Working on UI? Load `frontend-ui-engineering`
- Designing, pruning, or reviewing tests? Load `test-case-design-review`
- Debugging? Load `debugging-and-error-recovery`
- Setting up CI? Load `ci-cd-and-automation`

## Skill Anatomy

Every skill follows the same structure:

```
YAML frontmatter (name, description)
├── Overview — What this skill does
├── When to Use — Triggers and conditions
├── Core Process — Step-by-step workflow
├── Examples — Code samples and patterns
├── Common Rationalizations — Excuses and rebuttals
├── Red Flags — Signs the skill is being violated
└── Verification — Exit criteria checklist
```

See [skill-anatomy.md](skill-anatomy.md) for the full specification.

## Using Agents

The `agents/` directory contains pre-configured agent personas:

| Agent | Purpose |
|-------|---------|
| `code-reviewer.md` | Five-axis code review |
| `test-engineer.md` | Test strategy and writing |
| `security-auditor.md` | Vulnerability detection |
| `web-performance-auditor.md` | Core Web Vitals & performance audit (via `/webperf`) |

Load an agent definition when you need specialized review. For example, ask your coding agent to "review this change using the code-reviewer agent persona" and provide the agent definition.

## Using Commands

The `.claude/commands/` directory contains slash commands for Claude Code:

| Command | Skill Invoked |
|---------|---------------|
| `/spec` | spec-driven-development |
| `/plan` | planning-and-task-breakdown |
| `/pr draft`, `/pr ready` | git-workflow-and-versioning |
| `/build` | incremental-implementation + test-driven-development |
| `/build auto` | planning-and-task-breakdown when needed → incremental-implementation + test-driven-development (authorized scope; same as default `/build`, use `/build step` for one task) |
| `/verify` | verification-and-validation |
| `/test` | test-case-design-review + test-driven-development |
| `/review` | code-review-and-quality |
| `/code-simplify` | code-simplification |
| `/ship` | shipping-and-launch |
| `/webperf` | web-performance-auditor (specialist agent, web apps only) |

> **Note:** When installed as a Claude Code plugin you may see a warning like
> _"Default commands/ folder is ignored because the manifest sets 'commands'"_.
> This is expected. The root `commands/` directory belongs to the Antigravity CLI
> and is intentionally separate from `.claude/commands/`. All Claude Code slash
> commands load correctly from `.claude/commands/`; the warning is cosmetic.

## Using References

The `references/` directory contains supplementary checklists:

| Reference | Use With |
|-----------|----------|
| `testing-patterns.md` | test-driven-development |
| `performance-checklist.md` | performance-optimization |
| `security-checklist.md` | security-and-hardening |
| `accessibility-checklist.md` | frontend-ui-engineering |
| `definition-of-done.md` | all skills / every change |
| `observability-checklist.md` | observability-and-instrumentation |
| `orchestration-patterns.md` | doubt-driven-development |

Load a reference when you need detailed patterns beyond what the skill covers.

If you install one skill with `npx skills add ... --skill <name>`, only the
selected `skills/<name>/` directory is copied. Every skill embeds the required
workflow and exit criteria in `SKILL.md`, so these installs remain operational
without repo-level files. Links to shared `references/` are explicitly optional
expanded guidance for whole-pack installs. Copy one into the installed skill
only when you want that additional detail.

## Capability specs and change tracks

Canonical requirements live at `docs/specs/<capability>/spec.md`. Each change uses a numbered `docs/tracks/<track-id>/` directory (such as `001-user-auth`) with `spec.md` or `bug.md` and only the needed plan, task, verification, review, memory, and launch files. Before review, reconcile verified requirements into the owning capability specs in the same PR, or record why no canonical edit is needed. Complete the track after merge and retain its history. Treat active track artifacts as **living documents**:

- Keep them in version control during development so the human and the agent have a shared source of truth.
- Update them when scope or decisions change.
- Retain shipped change tracks after merge so later sessions can trace intent, evidence, review, and release inclusion without reconstructing them from conversation history.

### Working across sessions

The same artifacts are the handoff between sessions. For a small task, run the whole lifecycle in one session. For anything non-trivial, a fresh session per phase (spec → plan → build → review) keeps context focused — what carries the work forward is the approved files, not the conversation:

- the spec — `docs/tracks/<track-id>/spec.md` and its linked canonical capability specs
- `docs/tracks/<track-id>/plan.md` and `docs/tracks/<track-id>/todo.md` — or the external tracker the plan identifies, if you use one

**Before switching**, make sure those files reflect the decisions that still apply, the scope you approved, the questions still open, the next task, and the current verification state (which tests ran, against what).

**In the new session**, read the actual files and look at `git status` before doing anything. Don't assume approvals you can't see in the artifacts. Treat a recorded "tests pass" as a claim about a specific baseline: re-run the checks it covers if the code has moved since, if it doesn't say what was run against what, or if you're about to touch the area it covered. If the baseline still holds, take it and get on with the next task — the point is a check proportional to what changed, not a full suite at every handoff.

This doesn't need the `/spec` and `/plan` wrappers — plain requests work in any agent, including a `npx skills add` install that only has the skills:

> Read docs/tracks/<track-id>/spec.md, then break it into small verifiable tasks with acceptance criteria and dependency order. Save them to docs/tracks/<track-id>/plan.md and docs/tracks/<track-id>/todo.md. No product code yet — show me the plan first.

> Read docs/tracks/<track-id>/spec.md, docs/tracks/<track-id>/plan.md and docs/tracks/<track-id>/todo.md, then check where things actually stand — `git status`, plus re-running whatever checks the recorded verification state no longer covers. Tell me the next unchecked task and anything still open, then stop: I'll confirm the scope before you start it. If the plan looks incomplete, say what's missing rather than rewriting it.

## Tips

1. **Start with spec-driven-development** for any non-trivial work
2. **Load test-case-design-review** when selecting, pruning, or reviewing cases; then load **test-driven-development** when implementing changed behavior through RED-GREEN-REFACTOR
3. **Run verification-and-validation** on the assembled feature before review
4. **Load skills selectively** — more context isn't always better
5. **Use the agents for review** — different perspectives catch different issues
