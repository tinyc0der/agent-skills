---
type: Change Specification
title: Empty import message
description: Approved copy change for the existing empty import list.
status: draft
role: task
---

# Empty import message

Change the existing empty-list message from “Nothing here” to “No imports yet.” This is one line in the existing import-list component. Its rendered empty-state check already covers the message. No new behavior, layout, rollout, or dependencies are needed. The change can land separately from the new import rollout.

The scope is approved. Plan only; do not implement or perform external actions.

Acceptance: the empty list shows the new message, and a list with imports is unchanged.
