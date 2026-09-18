---
type: Idea Brief
title: Memory structure for the AI-team harness
description: Compare memory designs, record independent peer review, and recommend platform-neutral types, ownership, and lifecycle.
status: draft
---

# Memory structure for the AI-team harness

**Recommend four logical record types: current agreement, active work state, evidence and history, and reusable knowledge.** Give each a clear owner and traceable updates. Assemble context from those records. Keep recovery checkpoints distinct from replaceable summaries and search indexes.

This is the best fit identified for the [blueprint](../../../blueprint.md#memory-work-state-and-recovery), subject to a workflow trial. It is a design judgment, not a measured winner. Research and peer review completed on 2026-09-17. No memory implementation or runtime benchmark was changed or run for this proposal.

## Problem and scope

How might a human and an AI team resume the same agreed work, use current evidence, and learn from experience without repeatedly reconstructing context?

Success means correct continuation after interruption or correction, inspectable decisions, and useful learning at an acceptable maintenance cost. The user confirmed a platform-neutral result: memory types, ownership, and lifecycle. Folder layouts, schemas, products, and model choices are outside this design task.

The [existing memory contract](../../specs/memory-management/spec.md) and [memory skill](../../../skills/memory-management/SKILL.md) already provide canonical homes, progressive retrieval, working notes, and reviewed promotion. The main design gap is how agents preserve a shared current understanding when they write concurrently, receive corrections at different times, or recover from different checkpoints.

## Alternatives considered

The options cluster into three directions: reconstruct from history, curate current records, or automate a growing knowledge network. These comparisons are engineering judgments against the blueprint. Some options can be combined.

| Option | Useful property | Main weakness | Disposition |
|---|---|---|---|
| Reconstruct from live sources | Little memory maintenance; useful freshness baseline. | Loses private decisions and repeats expensive investigation. | Baseline for short tasks. |
| Load the full interaction history | Preserves original wording and sequence. | Requires repeated interpretation of old and current claims. | Retain useful evidence; avoid making full replay the default context. |
| One rolling notebook | Easy to start, inspect, and hand over. | Rewrites can lose qualifications; concurrent updates can conflict. | Baseline; small implementations may combine logical roles in one artifact. |
| Private memory for each agent | Supports independent exploration. | Shared agreements drift and become dependent on individual handoffs. | Use for scratch work; publish shared context to its owner. |
| Semantic search over observations | Finds related material expressed in different words. | Similarity does not settle authority, freshness, or missing evidence. | Optional retrieval method over owned records. |
| Evolving or temporal knowledge graph | Makes relationships and changing facts easier to query. | Generated links, entity matching, and updates need their own validation. | Defer until ordinary retrieval shows relevant failures. |
| Complete event history with reconstructed state | Makes transitions and replay explicit. | Adds ordering, reconstruction, retention, and deletion machinery. | Keep useful revision history; defer comprehensive event sourcing. |
| Owned current records with linked evidence | Makes current work clear while preserving its basis. | Requires disciplined publication and revalidation. | Recommended foundation. |

Curated records offer the clearest match to the human's needs: understand what governs the work, see what remains uncertain, and recover without losing corrections. Their value comes from these responsibilities. Extra labels or files alone provide no benefit.

## Evidence and its limits

Primary sources were checked during independent research and cross-review. They support parts of the recommendation; none proves this assembled design works in this harness.

| Source | Supported finding | Use and limit here |
|---|---|---|
| [CoALA](https://arxiv.org/html/2309.02427v3) | Separates working, factual, experiential, and procedural memory. | Supports distinct purposes. Our four record types adapt that framework to agreements and teamwork. |
| [LangGraph memory overview](https://docs.langchain.com/oss/python/concepts/memory) | Distinguishes recall scope, information type, and update timing. | Supports treating these as separate dimensions, without adopting its runtime or formats. |
| [MemGPT](https://arxiv.org/abs/2310.08560) and [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Explore external memory, selective context, compaction, and persistent notes. | Support a small working context with access to more detail. They do not establish multi-agent agreement. |
| [W3C PROV-DM](https://www.w3.org/TR/prov-dm/) | Describes attribution, derivation, revision, and responsible actors. | Supports tracing claims to their basis. Full schema adoption is unnecessary. |
| [RFC 9110, If-Match](https://www.rfc-editor.org/rfc/rfc9110.html#section-13.1.1) | Conditional updates prevent accidental overwrites based on stale versions. | A proven example of update control. It cannot resolve conflicting meanings or authorize a decision. |
| [Zep](https://arxiv.org/html/2501.13956v1) and [A-Mem](https://arxiv.org/html/2502.12110v11) | Explore temporal relationships and evolving linked memories. | Keep the ability to express applicability and relationships. Their benchmark results do not justify requiring a graph here. |
| [LongMemEval](https://arxiv.org/abs/2410.10813) | Tests extraction, reasoning across sessions, time, updates, and abstention; separates indexing, retrieval, and reading. | Reuse these failure classes. Chat recall scores do not measure safe workflow recovery. |
| [AMemGym](https://arxiv.org/abs/2603.01966) | Evaluates memory during evolving, simulated interactions. | Supports testing writes and later use together. Its personalization setting differs from this harness. |
| [Beyond Memory Majority](https://arxiv.org/abs/2608.19701) | Studies false corroboration from agent memories sharing upstream sources. | This August 2026 preprint motivates a copied-evidence test. It does not establish a need for its learned arbitration method. |
| [MINJA](https://arxiv.org/abs/2503.03704) | Demonstrates malicious memory insertion through query interactions in the evaluated agents. | Supports keeping retrieved content distinct from authority. The proposed controls are not a demonstrated complete defense. |
| [Chandy–Lamport snapshots](https://lamport.azurewebsites.net/pubs/chandy.pdf) | A distributed snapshot accounts for process and communication state under the paper's assumptions. | Include pending coordination in recovery. We are not adopting its snapshot algorithm. |
| [LangGraph replay and idempotency](https://docs.langchain.com/oss/python/langgraph/functional-api#idempotency) and [AWS safe retries](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) | Partial execution can require retries; safe repetition depends on saved results and operation support. | Missing receipts do not prove an action failed. A checkpoint alone cannot prevent duplicate external effects. |

## Independent research and mutual validation

Three agents received the same task and repository context. Each completed a separate first proposal before reading peers' reports. In the second round, each reviewed both other proposals. The coordinating agent compared all six reports and checked key primary sources.

| Researcher | Independent proposal | Changes after reviewing both peers |
|---|---|---|
| A | Five purposes, including procedures; emphasized publication ownership and correction propagation. | Adopted four types. Kept procedures with existing owners and added pending coordination to recovery. |
| B | Four types; emphasized independent scope, authority, evidence, and lifecycle properties. | Corrected its description of checkpoints as replaceable views. Distinguished maintenance responsibility from decision authority and publication permission. |
| C | Five types, including improvement candidates; emphasized external effects and recovery limits. | Treated candidates as a lifecycle state in work records. Adopted explicit decision ownership and four types. |

The review resolved these choices:

- **Four types are sufficient.** Procedures belong to reusable knowledge but retain their skill or operational owner. An improvement candidate is unfinished work with evidence, a proposed destination, and a disposition. It does not need a fifth enduring type.
- **Ownership is accountability.** It identifies who maintains a record and resolves disputes within authority. It does not add one global publisher or human approval for every write. Authorized, independent changes can proceed under update checks.
- **Checkpoints have a separate recovery contract.** Some contain unique runtime state or pending results. Calling them disposable risks losing recovery information.
- **Launch readiness and lesson validity are independent.** A blocked release can produce a verified finding. Neither release success nor failure proves a lesson. This changes the proposed design, not the current promotion implementation.
- **Deletion can reduce recoverability.** If required checkpoint state must be removed, mark that checkpoint limited or unusable. A deletion record must not repeat the deleted content.
- **Receipt is not compliance.** A worker acknowledging a correction does not prove its next action used it. Check the action boundary and state what happens to work already in progress.

This convergence narrows the design. It is not independent empirical confirmation: agents can share sources and assumptions.

## First trial and acceptance evidence

Use one bounded workflow with two parallel workers, then replace an interrupted worker. Include a later task that can use a verified lesson. Compare the proposed structure with a simple notebook and an uninterrupted run, using the same tasks, model settings, and resource limits. Repeat trials when model behavior varies.

| Scenario | Evidence required |
|---|---|
| Interrupt and replace a worker | The replacement identifies the current objective, constraints, uncertainty, evidence, and next action without repeating resolved investigation. |
| Two writers update the same claim | Both contributions remain attributable; a stale update cannot silently replace a newer accepted record. Any unresolved disagreement stays visible. |
| Change requirements or withdraw permission during work | The next affected action uses the current applicable agreement. Already completed or unstoppable actions are reported honestly. |
| Change a source or supply a stale summary | Dependent conclusions are rechecked; the old summary is not presented as current evidence. |
| Repeat one false claim through several agents | Shared origin remains visible; repetition is not counted as independent confirmation. |
| Remove source access or add a misleading stored instruction | Unauthorized content is not supplied. Missing evidence remains explicit; stored instructions do not gain authority. |
| Lose the receipt after an external action succeeds | The team checks the outside result or uses supported safe repetition. It does not repeat the effect blindly or claim an unconfirmed outcome. |
| Delete content, then restore an older checkpoint | Deleted content and revoked permission do not return to use. Missing required state limits the stated recovery guarantee. |
| Adopt a lesson and run a related task | The later task retrieves and applies the lesson. Compare errors, rework, and effort, and check related cases for regression. |

Record task success, unsupported claims, missed corrections, repeated investigation, recovery time, retrieval failures, maintenance effort, latency, and context cost. Establish acceptable cost limits for the actual workflow before judging the trial. No numerical performance claim is established by this research.

## Assumptions and deferred scope

The strongest counterargument is maintenance cost. Simple notes may already solve short tasks well. The design allows several logical roles in one artifact and requires richer machinery to earn its cost.

- **Host controls are the critical dependency.** Verify stale-update rejection, access enforcement, correction delivery, and action checks in the actual environment. Documentation alone cannot provide those guarantees.
- **Ownership must survive handoff.** Test reassignment when an agent stops, and measure whether shared updates wait unnecessarily.
- **Relevant knowledge must remain findable.** Measure missed evidence and unresolved candidates before adding automatic links, richer indexes, or a graph.
- **Retention and recovery must be compatible.** Establish which copies the host controls and how deletion affects restore points before making erasure or recovery promises.

Defer a fixed folder tree or schema, a storage vendor, automatic graph construction, learned conflict arbitration, distributed consensus, full event replay, automatic procedure rewriting, and universal age-based deletion. These choices are not needed to state the responsibilities, and this research does not establish their value for the initial workflow.

## Repository disposition

The blueprint now carries the recommended logical contract. The current [memory capability specification](../../specs/memory-management/spec.md) remains the implementation contract; this design-only change does not claim its proposed behavior has been built or verified.

A follow-up implementation should reconcile the release-linked promotion rule, concurrent publication, correction delivery, and deletion/recovery behavior with that capability. The earlier [harness review](review.md) remains evidence for its recorded revision only. This research neither fixes its findings nor expands its runtime verification.
