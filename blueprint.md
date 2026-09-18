# Harness design blueprint

This blueprint guides how we build, evaluate, and improve a harness for an AI team. The core principles express promises the human can hold the team to. Use them to judge proposed capabilities, compare designs, and diagnose where the harness falls short.

The details describe design responsibilities and ways to assess them. The architecture, tools, storage, and workflows used to fulfill these responsibilities can vary.

The Harness Design section defines capability families, component responsibilities, and their relationships. Implementations can choose their own platforms, storage, formats, and organization while fulfilling the same principles.

## Core principles

| Principle | Promise |
|---|---|
| **Understand the requirement** | Establish the intended outcome, constraints, and acceptance criteria. |
| **Deliver real quality and demonstrate it** | Meet the agreed standard, verify the actual result, and report gaps honestly. |
| **Work independently within agreed boundaries** | Complete agreed work, ask before exceeding your authority, and follow human direction. |
| **Maintain shared understanding** | Keep agreements, decisions, and rationale consistent across agents, sessions, and tasks. |
| **Make progress inspectable and recoverable** | Show intermediate work and evidence, with trusted checkpoints for recovery and redirection. |
| **Learn to work smarter** | Apply verified lessons to improve future work and reduce repeated mistakes and wasted effort. |

## 1. Understand the requirement

The harness should help the human and AI team establish a clear agreement about the desired outcome and recognize when that agreement needs clarification or revision.

1. **Make the intended outcome explicit.** Support a shared description of what the human needs, why it matters, and what is outside the task. Preserve relevant constraints and distinguish an outcome from a suggested way of achieving it.

2. **Connect the request to its context.** Make relevant facts, prior decisions, and existing conditions available when interpreting the request. Help the team detect when a literal interpretation would miss the underlying need or conflict with an established constraint.

3. **Make success assessable.** Establish what an acceptable result would look like and how it could be judged. Use examples or measurable criteria where useful, and surface subjective trade-offs that require human judgment. The criteria should reflect the value the human expects.

4. **Expose consequential uncertainty.** Distinguish known requirements, assumptions, and unresolved questions. Support investigation of factual unknowns and focused questions when a remaining ambiguity materially affects the result. Keep uncertainty visible until it is resolved.

5. **Allow the agreement to evolve.** Support corrections and accepted changes in direction. Identify which decisions, work, and evidence those changes affect, preserve their rationale, and keep the current agreement clear to everyone involved.

6. **Evaluate alignment with intent.** Use clear, incomplete, ambiguous, and changing requests. Assess whether the team identifies the intended outcome, recognizes conflicting constraints, challenges unsuitable approaches, and adapts without inventing requirements.

## 2. Deliver real quality and demonstrate it

The harness should help the team produce a result that meets the agreed standard and make the strength and limits of its evidence visible.

1. **Define quality through the task's purpose.** Establish the dimensions that matter, such as correctness, usefulness, completeness, reliability, and preservation of existing work. Make essential requirements distinguishable from optional improvements.

2. **Provide credible ways to assess the result.** Enable checks that directly support the claims being made. Match their depth to the consequences and uncertainty of the work, including independent assessment where shared assumptions could hide a mistake. Assess interactions when the outcome depends on several parts.

3. **Connect claims to actual evidence.** Make it possible to identify what was checked, which result was checked, under what conditions, and what was observed. Keep proposed actions, completed actions, observations, and inferences distinguishable.

4. **Preserve the standard under pressure.** Make shortcuts, omitted checks, and changes to acceptance criteria visible. Require a legitimate change in the agreement before lowering an established requirement. Support correction of the underlying problem when a result falls short.

5. **Represent limitations and change honestly.** Distinguish satisfied, failed, uncertain, and unassessed requirements. Reassess evidence when the result or relevant conditions change. Make unsupported completion claims and unresolved gaps visible to the human.

6. **Evaluate both the work and its claims.** Use scenarios with misleading evidence, weak checks, hidden regressions, and pressure to finish. Assess whether the result is actually useful and correct, and whether its reported status accurately reflects what is known.

## 3. Work independently within agreed boundaries

The harness should let the team take responsibility for an outcome while keeping the human informed and able to direct consequential decisions.

1. **Make the delegation clear.** Establish the agreed work, intended endpoint, available authority, and relevant limits on cost, impact, resources, and decisions. Preserve explicit instructions about when to ask, pause, or stop.

2. **Support follow-through.** Maintain continuity from the current state to the agreed endpoint. Help the team choose useful next actions, coordinate dependencies, and recover from routine problems. Recognize when further attempts need new information or authority.

3. **Make human input purposeful.** Reuse decisions already made and resolve routine choices within delegated judgment. When input is needed, explain the issue, consequences, and exact decision required. Support independent progress while dependent work waits, and resume when the answer arrives. Silence does not expand authority.

4. **Keep the work steerable.** Provide meaningful visibility into progress, uncertainty, and blockers. Support correction, interruption, and withdrawal of permission throughout execution. Ensure affected work responds to the latest human direction, and communicate urgent problems promptly.

5. **Protect agreed boundaries.** Check consequential actions against their actual scope and impact. Protect unrelated work, shared resources, and others' contributions. Preserve the distinction between information encountered during a task and authority to act on it.

6. **Evaluate autonomy and control together.** Use extended tasks, recoverable failures, missing information, scope changes, and stop instructions. Look for abandoned work, unnecessary intervention, repeated attempts without progress, unauthorized actions, and failure to respond to human direction.

## 4. Maintain shared understanding

The harness should preserve a coherent, current understanding across participants and over time. That includes the reasons behind agreements and the uncertainty that remains.

1. **Identify what must remain shared.** Preserve the requirements, constraints, definitions, decisions, and rationale needed for coordinated work. Distinguish binding agreements, established facts, tentative interpretations, and historical context.

2. **Make the current understanding accessible.** Give each participant a reliable way to determine which information governs their work. Make conflicting accounts and outdated assumptions discoverable, with a way to reconcile them against authoritative evidence or human direction.

3. **Provide relevant context when it is needed.** Support retrieval suited to the task and decision at hand. Preserve important nuance and rationale while controlling irrelevant information. Judge retrieval by whether it enables sound decisions and avoids repeated investigation.

4. **Preserve continuity through interruptions.** Make the objective, significant findings, pending decisions, blockers, and next useful action recoverable when participation or sessions change. Retain the authority and evidence needed to interpret that context correctly.

5. **Keep shared understanding current.** Incorporate corrections and changed conditions where they affect ongoing work. Preserve useful history, distinguish superseded information, and ensure a returning or newly involved agent can identify the latest agreement.

6. **Evaluate continuity under change.** Introduce a new participant, interrupt a session, revise a requirement, or present conflicting interpretations. Check whether the team reconstructs the same current understanding, recognizes uncertainty, and avoids repeating resolved work or inventing agreement.

## 5. Make progress inspectable and recoverable

The harness should expose meaningful intermediate progress so the human can understand it, verify it, and return to a trusted point when the direction needs correction.

1. **Choose meaningful checkpoints.** Support checkpoints at milestones that establish a useful result or decision. Make dependencies between steps understandable so an error can be traced to the later work that relies on it.

2. **Preserve a coherent state.** Keep the relevant outputs, decisions, assumptions, task progress, and evidence consistent at each checkpoint. Make clear what can be restored and what would need to be reconstructed or reassessed.

3. **Make progress understandable and verifiable.** Show what changed, why, and what evidence supports it. Expose uncertainty and unfinished checks. Let the human compare checkpoints and decide which progress to trust without requiring approval at every step.

4. **Support recovery and redirection.** Allow continuation from a chosen checkpoint while preserving useful work and later history. Invalidate dependent conclusions and evidence that no longer apply. Keep current human corrections and permission limits in force when restoring earlier execution state.

5. **Account for effects that cannot simply be undone.** Identify consequential changes outside the team's recoverable state. Make their recovery options and limits clear before relying on a checkpoint as protection. Preserve unrelated work during recovery.

6. **Evaluate a late-discovered mistake.** Introduce an error whose consequences appear several steps later. Assess whether a human can understand what happened, choose a trusted point, and redirect the work while retaining useful effort. Verify that dependent work is reassessed and the final result is checked again.

## 6. Learn to work smarter

The harness should turn verified experience into improvements that affect future work. Learning should produce observable gains in decisions, results, or effort.

1. **Capture useful experience.** Support evidence from human corrections, repeated failures, successful recoveries, unnecessary effort, and task outcomes. Preserve enough context to understand what happened and avoid treating a tentative interpretation as a general lesson.

2. **Find the underlying cause.** Distinguish missing knowledge, overlooked guidance, a flawed decision process, and inadequate capabilities. Investigate whether the problem is specific to one situation or likely to recur before choosing a correction.

3. **Improve the mechanism that caused the problem.** Prefer the smallest justified change and make its rationale reviewable. Different causes call for different responses.

   | Observed cause | Improvement to consider |
   |---|---|
   | Missing or outdated information | Improve the knowledge available at the relevant decision point. |
   | Important guidance overlooked | Improve how guidance is prioritized, presented, or recalled. |
   | A flawed decision or checking process | Revise how the team chooses actions or assesses results. |
   | Insufficient capabilities or feedback | Improve what the team can do or observe. |
   | An uncertain or isolated observation | Preserve it as context until a broader conclusion is supported. |

4. **Validate the improvement.** Compare the proposed change with the previous approach on the problem it should solve and related situations. Check for regressions, weaker standards, and added cost. Keep unverified changes identifiable and preserve human authority over consequential changes.

5. **Make future work benefit.** Ensure the relevant agents and future sessions receive and apply the verified improvement. Evaluate actual adoption and changed behavior so a recorded lesson has a clear path to influencing work.

6. **Measure and refine the effect.** Assess repeated mistakes, unnecessary interventions, rework, quality, and effort. Account for variation before drawing conclusions. Extend useful improvements and revise or withdraw ineffective ones while retaining the evidence behind those decisions.

## Rules

Use these rules when implementing and reviewing the harness.

- **Use simple English.** Write short, direct sentences in skills and documentation. Explain unfamiliar terms. Preserve exact commands, identifiers, and technical meaning.
- **Make instructions actionable.** State when guidance applies, what to do, and how to know the work is complete.
- **Make obligations clear.** Distinguish required steps, optional advice, and conditions that need human input.
- **Keep skills self-contained.** Keep required instructions and supporting files inside each skill. References outside the skill may point only to other skills, listed as dependencies.
- **Track sources and review updates.** Record sources, adopted and reviewed versions, local changes, and update decisions in the skill's maintenance docs, such as `README.md`. Verify updates before adopting them.
- **Give shared guidance one owner.** Reference its owning skill and keep dependent guidance consistent.
- **Keep procedures proportional.** Add steps and artifacts when they help achieve or verify the intended outcome.
- **Automate repeatable work.** Use tested automation for frequent steps with clear inputs, checks, and outcomes. Use agents for decisions and exceptions that need judgment. Preserve progress and evidence so work can resume after recovery.

Make rules that govern agent behavior available through the relevant skills or hooks, and check that behavior through evaluations.

## Harness Design

Build the harness around **skills, hooks, evals, and scripts**. References and documentation support those components. Commands and agent personas are outside the supported harness scope.

This design defines what each part owns and how the parts work together. File layouts, storage schemas, installation formats, and platform integrations belong to implementation. Judge an implementation by whether it fulfills the responsibilities and promises described here.

### Skill set

Organize skills into five families. A family identifies the responsibility a skill owns; each skill still provides an actionable procedure with clear activation conditions and assessable results.

| Family | Responsibility | Examples |
|---|---|---|
| **Workflow** | Coordinate activities toward a complete outcome. | Deliver a change, investigate a failure, produce a research report. |
| **Memory** | Preserve, retrieve, and reconcile shared understanding. | Restore context, maintain decisions, consolidate verified knowledge, retire stale information. |
| **Method** | Provide a reusable approach to performing an activity well. | Clarify requirements, plan work, analyze causes, assess evidence, review a result. |
| **Expertise** | Apply knowledge specific to a field, technology, or tool. | Assess accessibility, design a data model, operate a browser, manage repository changes. |
| **Meta** | Select, compose, evaluate, and improve harness capabilities. | Route requests to skills, resolve overlapping guidance, evaluate behavior, improve a skill. |

#### Boundaries and composition

- **Workflow coordinates; Method provides the approach.** A workflow connects activities and their dependencies. Methods provide reusable ways to perform those activities. A focused request can use one method directly.
- **Memory maintains understanding; Meta improves the harness.** Memory owns retrieval, reconciliation, and maintenance of knowledge. Meta uses evidence from experience to improve capability selection and behavior. A verified project fact belongs in project knowledge; a correction to a flawed procedure belongs in the skill that owns it.
- **Expertise covers both domains and tools.** Keep domain and tool as descriptive tags within this family. A general method such as root-cause analysis can draw on database expertise and the operating procedures of a particular diagnostic tool.
- **Each skill has one primary home.** Classify it by its main responsibility and describe other concerns through tags and dependencies. Reuse shared procedures across families. Split a skill when its responsibilities can be selected and improved independently.

The families guide discovery, ownership, and evaluation. Organize the catalog so the relevant skills and their dependencies are easy to identify. Keep each skill's identity and responsibility clear across different storage and distribution arrangements.

Every skill should make its purpose, required context, procedure, outputs, completion evidence, and conditions for returning control understandable. A family assignment does not change its authority or replace shared rules.

### Component responsibilities

| Component | Responsibility |
|---|---|
| **Skills** | Own reusable procedures, workflow coordination, decision criteria, and evidence requirements across the five families. Make required guidance and dependencies accessible when a skill is used. |
| **Hooks** | Respond to defined events by making relevant context available or invoking the appropriate skill or script. Keep event handling focused and shared decision rules in their owning skills. |
| **Evals** | Define scenarios, fixtures, and expectations for discovery and observed behavior. Assess individual skills and interactions that determine whether the six promises hold. |
| **Scripts** | Automate repeatable operations, validation, and evaluation execution. Give each script a clear owner and make its inputs, outputs, failures, and effects understandable to its callers. |

References supply supporting knowledge, and documentation explains behavior, decisions, and usage. Give shared guidance a clear owner and make it accessible to the components that need it. Knowledge and work records preserve the context and evidence needed for continuity and recovery.

The execution environment provides access to models, tools, events, and controls. Define which capabilities the harness needs from that environment and make their availability and limits visible. Implementations may satisfy these needs in different ways.

### How work flows

Human requests and direction enter an execution context. Meta guidance helps select a workflow or a focused skill. Workflow skills coordinate the required methods and expertise; Memory skills supply and maintain relevant understanding. Skills use available tools and scripts to perform operations and collect evidence, then return results or the decisions needed to continue.

An execution context runs work. It may be one session, a sequence of handoffs, or a graph of dependent steps. It is not the harness. The harness is the skills, hooks, evals, scripts, and owned records that keep the six promises when the participant, session, or arrangement of work changes. A graph of steps can coordinate dependencies, parallel work, and recovery. It does not replace shared understanding, evidence, authority, or learning.

Maintain clear responsibility for reaching the agreed endpoint. Choose subsequent work from observed results, preserve the current agreement, and respond to human direction. Hooks support this process at relevant events, such as resuming work or completing an action. Hook-triggered work remains subject to the same scope and authority as other work.

Deliverable verification assesses the current task's result. Harness evals assess whether the components reliably select, perform, and assess work as intended. Use evidence from both to identify improvements, while keeping their claims distinct.

### Memory, work state, and recovery

Use **owned records of current understanding, linked to evidence and history**. Assemble each agent's working context from the relevant records. Keep memory purpose, scope, authority, and lifetime distinct; storing something for longer does not make it true or binding.

#### Memory types

| Type | Question it answers | Content and ownership |
|---|---|---|
| **Current agreement** | What governs this work? | Accepted outcomes, constraints, decisions, and authority references. The workflow maintains access; authorized decision owners control changes. |
| **Active work state** | Where are we, and what comes next? | Progress, dependencies, findings, assumptions, pending questions, blockers, and next actions. The responsible workflow maintains it. |
| **Evidence and history** | What happened, and why do we believe it? | Observations, action outcomes, checked revisions, decision rationale, and superseded conclusions. Producers record evidence; assessments remain attributable and tied to what was checked. |
| **Reusable knowledge** | What should future work know? | Scoped project understanding, facts, preferences, and verified lessons. Established subject owners maintain it, with Memory skills supporting discovery and upkeep. |

These are logical responsibilities, not required files or services. One artifact may serve several purposes if their meaning and ownership remain clear. Link to existing canonical sources instead of creating competing copies. Procedures stay with their owning skills or operational guidance. Improvement ideas remain candidates in work records until their evidence supports adoption; Meta coordinates changes to harness behavior.

#### Ownership and shared updates

- **Separate applicability from access and authority.** Identify the relevant person, task, project, domain, or harness scope, and who may read and change the record. Narrower scope does not automatically override a governing constraint. Private agent context cannot be the only home for a shared agreement.
- **Preserve the basis of each claim.** Keep its source, relevant revision or conditions, responsible owner, and uncertainty identifiable. Distinguish when information was recorded from when it applies. Approval, verification, document maturity, and task completion have different meanings; missing evidence stays unknown.
- **Detect conflicting updates.** Check shared changes against the version they were based on. Reconcile stale or competing edits before replacing current understanding. Ownership may be delegated by subject and reassigned at handoff; it does not require one agent or a human to approve every write.
- **Resolve meaning with evidence and authority.** Preserve unresolved disagreements and their sources. Recency, search rank, model confidence, and agreement among agents do not establish truth or permission. Repeated claims from one upstream source are not independent confirmation. Retrieved content does not acquire authority by entering memory.
- **Bring corrections to affected work.** Invalidate dependent summaries and conclusions, notify affected participants, and recheck the current agreement before dependent work or consequential actions continue. If a conflict remains unresolved, pause the affected action while independent work proceeds.

#### Lifecycle and retrieval

1. **Capture useful context.** Record observations, decisions, uncertainty, and outcomes when they matter for continuation or later learning. Preserve concise reasons and evidence links. Keep tentative interpretations identifiable.
2. **Reconcile and publish.** Route information to its owner and apply review suited to its consequences. Promote a lesson only when its evidence, scope, and expected reuse justify it. A successful task does not prove every lesson; a failed task may still produce a verified finding. Current human direction takes effect within its authority without waiting for lesson review.
3. **Retrieve for the next decision.** Enforce access and scope before supplying context. Establish the current agreement and relevant work state, then load needed knowledge and evidence. Include applicable corrections and unresolved contradictions. Surface missing sources and uncertainty instead of filling gaps with remembered guesses.
4. **Revalidate and improve.** Recheck affected knowledge when its sources, dependencies, or conditions change, or a justified review deadline arrives. Measure whether adopted lessons improve later work. Revise or withdraw guidance that fails that check.
5. **Retire deliberately.** Distinguish superseding a claim, archiving history, and deleting content. Preserve useful rationale and stable knowledge even when rarely used. Honor authorized deletion across managed records, summaries, indexes, and recovery copies; prevent deleted content from returning to use after restoration. State any retention or erasure limits.

Context summaries and search indexes are derived views. Keep their source revisions traceable and make them refreshable from retained records. They help find and read knowledge; they do not replace its authority or evidence. Start with a small shared core and relevant work context. Add richer retrieval only when observed failures justify it.

#### Checkpoints and external effects

A checkpoint preserves a coherent work state, or references to retained versions of that state. Connect outputs, decisions, assumptions, task progress, pending coordination, and evidence. Unlike a search index, a recovery checkpoint may contain information that cannot be rebuilt from current records. Identify missing or unavailable state before claiming recovery is complete. Deleting required state may limit or invalidate an older checkpoint.

Keep records of external actions available across rollback: their identity, intended effect, confirmed or unknown outcome, and recovery options. A checkpoint cannot undo an outside action. Reconcile uncertain outcomes before retrying, using operations that are safe to repeat or checking the existing result where supported.

Recovery must reassess dependent work and preserve the latest applicable human corrections, permission limits, and deletion decisions. Receiving a correction does not prove compliance. Define the update, access, coordination, and action controls required from the execution environment, including limits on stopping work already in progress. Make unsupported guarantees explicit.

#### Evaluate memory through behavior

Exercise a complete workflow with interruption, a replacement agent, conflicting writers, a human correction, changed evidence, an unavailable source, and a misleading stored instruction. Include an external action whose receipt is lost, deletion followed by restoration, and a verified lesson used in later work.

Check correct continuation, current authority, visible uncertainty, preserved evidence, and safe handling of external effects. Measure repeated investigation, missed corrections, retrieval failures, maintenance effort, latency, and context cost. Compare against simple notes under the same task and model conditions. Repeat variable trials; a better recall score alone does not establish reliable teamwork or recovery.

See the [memory design research](docs/tracks/013-draft-harness-principles/memory-research.md) for alternatives, sources, trade-offs, and remaining validation work.

### Improvement and adoption

Capture observations with the work that produced them. Use the cause of a problem to choose where to make a change. These areas guide improvements across the existing components; several areas may need to change together. Meta skills coordinate the assessment and improvement process within the agreed authority.

| Area | What to improve | Example |
|---|---|---|
| **Skills** | Instructions, decision criteria, and workflows. | Clarify an unclear completion rule. |
| **Memory** | Stored facts, decisions, and lessons within their relevant scope. | Correct an outdated project test command. |
| **Automation: scripts and hooks** | Repeatable operations, checks, and event triggers. | Run validation before a commit. |
| **Evaluations** | Scenarios and expectations that show whether the harness works. | Check whether the agent reports a failed test honestly. |
| **Tools and execution environment** | Available capabilities and controls, where changes are possible and authorized. | Provide a missing browser tool or reliable checkpoints. |

- **Distinguish memory content from memory procedures.** Route verified facts into scoped knowledge through Memory. Correcting a stored fact changes memory. Improving how facts are retrieved or maintained changes the responsible skill, script, or hook.
- **Treat scripts and hooks as automation.** Lint checks can follow fixed rules. Hooks respond to events and may invoke a model whose output varies, so the work they start is not always deterministic.
- **Check how guidance reaches the agent.** When correct guidance is missed, inspect skill selection and context loading. Improve the part responsible for delivering that guidance.

Fix the part that caused the problem. Use evaluations to compare a proposed behavior change with the previous approach on the original failure and related situations, including checks for new failures. Identify the version evaluated and verify that future sessions receive and apply the improvement. Preserve a way to withdraw changes that increase mistakes, rework, or unnecessary effort.

First demonstrate the structure through one complete workflow. Exercise human correction, interruption, resumption, a late-discovered mistake, recovery, and a verified lesson used in a later session. Use the results to decide which capabilities need strengthening before expanding the catalog or team size.
