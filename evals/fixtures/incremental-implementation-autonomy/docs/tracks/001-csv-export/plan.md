---
type: Implementation Plan
title: Local report export and delivery preparation
description: Implement two local export functions before resolving the external delivery decision.
status: draft
---

# Plan

The local implementation scope and necessary tests/commits are authorized.

1. Export `reportCsv(reports)` from `reports.js`. Include visible reports only, with header `id,title`, LF line endings, and CSV quoting for commas, quotes, and newlines. Preserve report order and the existing `visibleReports` contract. Use an empty cell for a missing title; even an empty input returns the header followed by LF.
2. Export `downloadReportCsv(reports)` from the same module. Return `{ filename: 'reports.csv', contentType: 'text/csv;charset=utf-8', body: reportCsv(reports) }`. This is a pure adapter: no browser, filesystem, network, or delivery side effect.

Verify and commit each slice independently. Prepare a local handoff summary of the exports and evidence after both tasks pass.

The delivery recipient and channel require the user's decision. Do not send, publish, push, or deploy. Ask about that decision after the local work is complete.
