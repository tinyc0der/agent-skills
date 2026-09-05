---
type: Implementation Plan
title: 'Plan: Workflow Memory Notes'
description: Implementation steps, dependencies, and verification approach for workflow notes.
---

# Plan: Workflow Memory Notes

1. Expand the memory skill's note lifecycle and update all phase consumers, including standalone skill use and command adapters.
2. Extend the existing lifecycle-contract fixture and one regression case to catch missing note reads/updates in an early phase. Add one execution scenario for resuming notes and rejecting an unverified hypothesis.
3. Reconcile the capability specs, run local checks, review the change, and record evidence. Behavioral execution is currently unavailable until the previously reported Claude quota resets at 18:10 Asia/Ho_Chi_Minh.

Task status lives in [todo.md](todo.md); working context lives in [notes.md](notes.md). The change is reversible through Git and introduces no new command or service.
