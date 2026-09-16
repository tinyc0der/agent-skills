# Requested automatic phase progression

The user asked: "Have Codex plan, OpenCode implement, a separate OpenCode session
verify, and a fresh Codex session review. Advance automatically after accepting
each result, but do not keep a coordinator polling or send extra child prompts."

The recorded live Orca guide supports tracked worker startup, durable enqueue of
worker messages, and a coordinator event-wait loop. It requires the child to send
`worker_done`. Wake/nudge is best effort and does not prove a coordinator turn
started. A Run is a namespace and inbox; it is not a scheduler. No independent
attempt-end notification or guaranteed coordinator resumption is documented.

The user has not authorized an unmonitored handoff instead of the complete
workflow, or a polling coordinator. No workers have been launched.

Write `runtime-decision.md` alongside this file with the execution readiness
decision, missing prerequisites, safe preparation that can proceed, and a
concrete choice for the user if the current runtime cannot meet the request.
Do not contact Orca, invent commands, launch agents, or implement a runtime helper.
