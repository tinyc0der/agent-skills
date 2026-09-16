# Using agent-skills with Grok Build

[Grok Build](https://docs.x.ai/build/features/skills-plugins-marketplaces) is the `grok` coding CLI. It installs this repository as a plugin and loads the shared skills and agent personas. The commands below were checked with Grok Build 1.0.30.

## Install

Install directly from GitHub:

```bash
grok plugin install tinyc0der/agent-skills
```

Accept the plugin trust prompt, then start a new Grok session. You do not need to register a marketplace for this direct install.

For a local clone:

```bash
git clone https://github.com/tinyc0der/agent-skills.git
grok plugin install ./agent-skills
```

Grok 1.0.30 copies the local plugin into its installation directory. To refresh edited files, follow the local refresh steps under [Update or remove](#update-or-remove).

## Verify

```bash
grok plugin list
grok plugin details agent-skills
```

The plugin should appear as `agent-skills`. In your project, use `grok inspect --json` to check which skills, agents, and plugins Grok discovers. This pack provides 30 skills and four agent personas.

## Usage

Open `/skills` in a Grok session to browse the installed skills. Invoke a skill by its name:

```text
/using-agent-skills
/spec-driven-development
/test-driven-development
/verification-and-validation
```

Start with `/using-agent-skills` to load the workflow selection rules, or ask for a skill in plain language:

> Use the code-review-and-quality skill to review my changes.

Grok can also select skills when a task matches their descriptions. See the [official skills documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces#skills).

## Update or remove

Update an installation from GitHub:

```bash
grok plugin update agent-skills
```

For a local clone, remove the installed copy and install it again. `--keep-data` preserves the plugin's saved data:

```bash
grok plugin uninstall agent-skills --keep-data
grok plugin install /path/to/agent-skills
```

Start a new session after updating. To uninstall:

```bash
grok plugin uninstall agent-skills
```

## How it works

The root `plugin.json` supplies the plugin name and version. Grok discovers the existing `skills/` and `agents/` directories. A separate copy of the skills or a Grok-specific manifest is not needed.

Grok also supports Claude Code plugins and can discover existing Claude Code installations. See the [compatibility documentation](https://docs.x.ai/build/features/skills-plugins-marketplaces#claude-code-compatibility).

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| `grok plugin` is unavailable | Run `grok update`, then check `grok plugin --help`. |
| The plugin is installed but skills are missing | Open `/plugins` and check that `agent-skills` is enabled. Start a new session and check `/skills` or `grok inspect --json`. |
| `/spec` or `/verify` is unavailable | Use the skill entry points `/spec-driven-development` or `/verification-and-validation`. |
| Local skill edits are missing | Follow the [local refresh steps](#update-or-remove), then start a new session. |

For the full command list, see the [Grok CLI reference](https://docs.x.ai/build/cli/reference) or run `grok plugin --help`.
