---
type: Implementation Plan
title: Epic parent and child tracks implementation plan
description: Skill, command, canonical-spec, and eval updates for the delivery fork.
status: draft
---

# Implementation Plan: Epic parent and child tracks

## Overview

Extend existing skills and command adapters so the Epic route and artifact layout are mechanically followable. No new skill directory.

## Architecture Decisions

- Single home for the fork: `using-agent-skills` Epic section
- Child-track allocation and parent `todo.md` format: `planning-and-task-breakdown`
- Active-track resolution and load rules: `context-engineering`
- Optional graph metadata: `memory-management`
- Commands stay thin and point at the skills

## Task List

- [x] Track spec, plan, todo, notes
- [x] Skills
- [x] Command adapters
- [x] Canonical workflow spec and feature-development-workflow doc
- [x] Evals
- [x] Validators and local commit
