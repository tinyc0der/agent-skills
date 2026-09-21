# Review and repair decisions

This is a prepared decision record. No sessions were started, messages sent, implementation changed, or checks run. The coordinator remains responsible for accepting each phase and the combined result.

The recorded project facts in `review-repair.md` control these decisions. For A, `request.md` supplies its **Accepted requirements** only. Its separate initial-workflow instructions do not replace A’s stated Grok owner or its accepted plan without independent verification. They also do not set B’s or C’s runner choices.

| Project | Next owner and session | Verification | Next review |
| --- | --- | --- | --- |
| A | Grok, reuse available `export-impl-1` | Routine self-verification in that same session | Fresh Codex session after accepted PASS |
| B | OpenCode, fresh independent verifier | Independent verification required for tenant permissions | Fresh Codex session after accepted independent PASS |
| C | Grok, fresh replacement implementation session | Routine self-verification in the replacement session, subject to any saved mandatory independence gate | Fresh Codex session after accepted required verification |

## Shared assignment and acceptance rules

- Keep each project in its recorded worktree. Only one implementation writer may be active there. Freeze implementation while verification or review examines it; retained implementation sessions stay idle.
- All recorded implementation Tasks and Dispatches are settled and their artifacts accepted. Each next assignment here is new follow-up work and needs a **new Task and Dispatch**, even when it reuses a conversation. Do not reopen `task-export` / `dispatch-export-1` or reuse completed identities for new work. Retries of a failed assignment follow the live recovery contract and retain their history; a new assignment must not bypass required recovery.
- Before actual dispatch, resolve the current branch, accessible accepted requirements and plan, project check commands, and absolute lifecycle `SKILL.md` paths from the named project. These are not fully supplied by this fixture. Do not invent them or run a new planning phase. Each packet must record these resolved values, its exact target, allowed writes, report paths, and result owner.
- Repairs apply the project’s `debugging-and-error-recovery`, implementation/testing workflow, and `verification-and-validation`. Fresh review applies `code-review-and-quality`; independent verification applies `verification-and-validation`. Each session must read its assigned skill, project instructions, and current inputs at entry, including reused sessions.
- Verification identifies the commit and any reproducible dirty snapshot. Map every acceptance criterion to evidence. Record exact commands, exit statuses, relevant runtime observations, and each check as PASS, FAIL, NOT RUN, or NOT APPLICABLE with a reason. Missing required evidence means INCOMPLETE; a required failing check means FAIL. Only complete passing evidence earns PASS.
- Each worker writes its designated report and a phase handoff with actual runner/session and Task/Dispatch identities, verification mode, worktree/branch, exact target, resolved skills, delivery status, artifacts, evidence/verdict, blockers, and recommended next action. Delivery completion is separate from implementation readiness.
- The coordinator validates actual worker completion provenance, scope, artifacts, and evidence before accepting a phase. A changed target invalidates earlier verification and review for final acceptance. Missing completion follows the runtime recovery contract; it never justifies invented success, a nudge to send completion, or a duplicate worker.
- Each assignment ends after its report or unresolved blocker. During execution, use the documented blocking question mechanism if a coordinator answer is necessary. Workers do not start later phases or spawn descendants.

## A: Ordinary export validation

**Repair packet.** Assign repair attempt 1 to Grok in `export-impl-1`, using a new Task and Dispatch. Its useful context, availability, settled prior assignment, and authorized retention support reuse. Work in `/work/export`, starting at `export-r1`. Read `/work/export/implementation.md`, `/work/export/review.md`, the accepted project plan, and the **Accepted requirements** in the supplied `request.md`.

Fix the specific condition that accepts backslash input. Keep the scope to the export package, its tests, `/work/export/implementation.md`, and `/work/export/verification.md`. Preserve every accepted requirement: reject an empty filename, slash, and backslash; preserve valid filenames exactly, including spaces and non-ASCII characters; return a readable validation error before writing an export file.

**Verification owner.** The same Grok session runs routine checks and the affected regression gates, labelled **self-verification**. Verify the backslash regression and the remaining filename requirements, including no export file being written for invalid input. Use project-owned commands once available. During the verification phase, write only reports/evidence; if a check fails, return to the repair phase before rerunning checks on the changed target.

Do not add an independent verifier for this recorded repair. A has no independence rule or high-risk change, and review explicitly found the worker’s evidence credible. The blocking code finding alone does not create an independence requirement.

**Review packet and evidence gate.** After the coordinator accepts the repaired target and its self-verification PASS, assign a fresh Codex session in `/work/export`. Supply the accepted requirements and plan, actual diff, updated implementation and verification reports, and the previous backslash finding. Allow only `/work/export/review.md` and assigned review evidence; no implementation or test edits. Review the updated target, confirm the fix and evidence, and report any remaining blockers. Coordinator acceptance requires current verification and review with no unresolved blocking finding.

**Cleanup.** Keep `export-impl-1` idle through review. An actionable further repair goes back to it under new lifecycle identities. Release each settled reviewer when no further assigned work needs it. Release the implementation session after the authorized endpoint, unless explicit retention still applies; preserve all reports.

## B: Tenant access control

**Verification packet.** Assign a fresh **OpenCode** session as an independent verifier in `/work/tenant`, targeting `tenant-r1` and its recorded working state. Permission checks decide access to another tenant’s data, so independent verification is required. The user’s explicit OpenCode choice overrides the default Grok verifier. Keep Grok `tenant-impl-1` retained and idle.

Supply the accepted tenant requirements and plan, actual change, environment and check instructions, and `/work/tenant/implementation.md`. That report’s unit-test PASS is useful context; it is not independent evidence. Resolve any omitted input paths before dispatch. The verifier may write `/work/tenant/verification.md` and assigned evidence only.

The OpenCode verifier must run applicable checks and observe the relevant access boundary itself. Map the approved tenant policy to allowed and denied read cases, including the cross-tenant access restrictions that the change is meant to enforce. Use meaningful integration or runtime evidence for the changed permission checks and confirm denied reads do not expose tenant data. Record setup, commands, exit statuses, results, and gaps against the exact target. Do not invent a new access policy from the export requirements.

**Evidence gate and review packet.** Accept the separate verifier’s PASS before fresh Codex review. Give review the tenant requirements and plan, actual diff, implementation report, and accepted independent verification report. Codex writes `/work/tenant/review.md` and assigned evidence only. Final acceptance requires independent PASS and review of the same final target, with every required acceptance criterion supported and no unresolved blocking finding.

A failed check goes to `tenant-impl-1` as a bounded repair with new lifecycle identities. Missing environment or requirements go to the coordinator. INCOMPLETE and FAIL do not unlock review or acceptance. Any repair requires routine self-verification, a fresh OpenCode independent pass on the new target, and fresh Codex review.

**Cleanup.** Retain the Grok implementation session through verification and review, idle whenever another session examines the checkout. Release settled independent verifier and reviewer sessions when their assigned work is complete. Release the implementation session at the accepted endpoint unless explicit retention remains. Preserve failed as well as passing evidence.

## C: Original session unavailable

**Repair packet.** Assign a fresh Grok implementation session in `/work/old-export`, starting at `old-export-r2`. Record the replacement reason: the original session positively exited, was released, and cannot resume. Its unavailable conversation does not require a new checkout.

Provide the saved accepted requirements and plan, `/work/old-export/implementation.md`, `/work/old-export/verification.md`, and `/work/old-export/review.md`. The packet must point to the recorded first failed fix, rejected approach, latest normalization finding, new evidence, and actionable correction. Resolve the saved requirements/plan filenames and exact permitted export paths before dispatch; do not claim their unseen contents were inspected.

Bound the repair to the normalization defect: preserve valid input exactly, especially the non-ASCII characters named by review, while meeting the saved validation requirements. Permit the affected export package, its tests, and `/work/old-export/implementation.md` and `/work/old-export/verification.md`. Add or update a focused regression check for the reported character loss and run affected checks plus project regression gates. Do not repeat the rejected approach without new evidence that addresses its failure.

**Attempt count and verification.** One repair already failed; this is **repair attempt 2**, not attempt 1. Carry both the repair history and runtime retry/circuit-breaker state into the new session. Session replacement resets neither limit. The latest review supplies an actionable correction, so this next bounded repair is justified. If the same blocker persists after two fixes without new evidence or an actionable next step, preserve the artifacts and escalate the concrete blocker rather than launching another blind attempt. Honor the runtime circuit breaker separately.

The replacement Grok session owns routine self-verification. The recorded code defect alone does not require independence. Preserve any mandatory independent-verification gate found in the saved project instructions; if one applies, obtain a fresh verifier using that project’s explicit runner choice or the skill default before review.

**Review packet and evidence gate.** After the coordinator accepts all required verification as PASS, assign fresh Codex review in `/work/old-export`. Supply the saved requirements and plan, exact updated target and diff, repair history, latest verification, and the normalization finding. Allow `/work/old-export/review.md` and assigned evidence only. The old `old-export-r2` reports remain context and cannot approve changed code. Final acceptance needs current evidence and review with no unresolved blocking issue.

**Cleanup.** The original session is already released; leave it released. Retain the replacement session idle through verification and review, then release it at the authorized endpoint unless explicit retention remains. Settle and release fresh verifier/reviewer assignments under the runtime contract, preserving artifacts and the repair count.

## Limits of this exercise

Only the supplied delegate skill, recorded fixture, and its adjacent request were read. Project source, full reports, branch names, exact lifecycle skill paths, command results, and live runtime state were not inspected. The recorded runtime facts support these decisions, but this artifact does not establish a new dispatch receipt, completed repair, verification PASS, review acceptance, or executed cleanup. No publication, PR, merge, or deployment is authorized or proposed.

## Skill version reconciliation

Checked `/var/folders/0z/bmq286gx6sn80k37gg5sn0340000gn/T/delegate-context-probe-s6u9cztn/SKILL.md` with SHA-256 `8eaa8f77b979f08d02c91ec33a4fdb70e8913c67ef92d5c42aa92e984bdc61a7`. No project owner, session, verification gate, repair count, or cleanup decision changed. The shared rules now explicitly distinguish new follow-up assignments from runtime retries of a failed assignment, which use the live recovery contract and retain their history.
