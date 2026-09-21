# Review and repair decisions

Prepared only. No workers, checks, or cleanup actions ran. The current `review-repair.md` controls each project. A incorporates only the **Accepted requirements** from adjacent `request.md`; that separate request’s Antigravity choice and independent-verification plan do not replace A’s recorded owner and accepted plan.

| Project | Next assignment | Verification owner | Review owner |
| --- | --- | --- | --- |
| A | Repair in Grok `export-impl-1` | Same implementer; self-verification | Reuse Codex `export-review-1` for bounded rereview |
| B | Independent verification in a fresh OpenCode session | OpenCode, as explicitly assigned | Fresh Codex initial review; retain for bounded rereviews |
| C | Repair in a fresh Grok replacement session | Same replacement; self-verification, preserving any saved mandatory independence gate | Fresh Codex for every changed revision, as the project requires |

## Shared gates and assignment contract

- Keep work in `/work/export`, `/work/tenant`, and `/work/old-export`, respectively. Implementation and reviewer conversations stay separate. Permit one implementation writer; freeze implementation during verification/review and keep reviewers idle during repairs. Verification/review may write assigned reports and evidence only, never implementation or tests.
- New follow-up assignments need new Task/Dispatch identities, receipts, and actual worker completion reports after accepted settlement. Never reopen completed identities. Failed-assignment retries follow the runtime recovery contract and retain their history. Missing completion means unknown/incomplete until resolved; do not invent success, nudge for completion, or start a duplicate worker.
- Every packet includes accepted requirements/plan, worktree/branch, exact commit plus reproducible dirty snapshot if needed, input paths, allowed writes, checks, report destination, and coordinator as result owner. Resolve missing branch names, exact permitted package paths, project commands, and absolute lifecycle `SKILL.md` paths before execution. Apply the project repair/testing workflow, `verification-and-validation`, and `code-review-and-quality` for their respective phases. Reused sessions reread current inputs and applicable instructions.
- Reports use `implementation.md`, `verification.md`, and `review.md` in each named worktree. Each handoff records phase/runner, verification mode, actual lifecycle/session identities, target, skills, delivery, artifacts, evidence/verdict, blockers, and next action. Workers write their result and stop; they do not start subsequent phases or descendants.
- Verification maps every acceptance criterion to evidence, exact commands and exit statuses, and relevant observed runtime behavior. Mark checks PASS, FAIL, NOT RUN, or NOT APPLICABLE with reasons. Required missing evidence means INCOMPLETE; a required failure means FAIL. Neither unlocks dependent review or acceptance. The coordinator accepts actual completion, scope, and required PASS evidence before progression; final review must cover that same final target. Changed code invalidates earlier verification/review approval.

## A: Ordinary export validation

**Repair.** Reuse available, useful Grok `export-impl-1` at `/work/export`, starting from `export-r1`. Its `task-export` / `dispatch-export-1` are settled; create new identities for repair attempt 1. Inputs: accepted plan, request’s filename requirements, `/work/export/implementation.md`, and `/work/export/review.md`. Bound writes to the export package, its tests, and implementation/verification reports. Fix backslash acceptance and any necessary change to the shared empty-name guard within that scope.

**Concrete checks.** The same session self-verifies: reject `""`, `a/b`, and `a\b`; preserve valid names exactly, including spaces and non-ASCII characters; produce a readable error before writing any export file for invalid input. Exercise the changed empty-name guard and run affected checks plus project regression gates. Verification itself remains read-only for implementation; return to repair before fixing a failure. No independent verifier is required by these recorded facts: no project independence gate, high-risk change, or credibility problem exists.

**Rereview.** After coordinator acceptance of current self-verification PASS, reuse Codex `export-review-1`. Its accepted initial report and settled `task-export-review` / `dispatch-export-review-1` permit a new bounded assignment with new identities. Supply the prior reviewed target `export-r1`, prior findings, current target, **all changes since the prior review**, and refreshed verification evidence. Reject the proposed packet that asks only to close the backslash finding. The reviewer must assess the fix, shared empty-name guard, all new changes, affected surrounding behavior, and evidence, then write a new verdict for the current target in `/work/export/review.md`. Prior approval cannot carry forward.

**Cleanup.** Retain both `export-impl-1` and separate `export-review-1` through the repair cycle. Keep the reviewer idle during repair and implementer idle during rereview. Release them under the runtime contract when the authorized endpoint is accepted and no further retention applies; preserve reports.

## B: Tenant access control

**Independent verification.** Assign a fresh OpenCode verifier in `/work/tenant` against `tenant-r1` and its recorded working state. Tenant permission changes require independence; the unit-test PASS in `/work/tenant/implementation.md` does not supply it. Inputs include accepted tenant requirements/plan, actual diff, implementer report, environment, and project check instructions. Write `/work/tenant/verification.md` and assigned evidence only.

**Concrete checks and progression.** Independently run applicable checks and observe the access boundary: allowed reads under the approved tenant policy, required denial of unauthorized cross-tenant reads, and no tenant-data exposure in denied responses. Return acceptance-mapped integration/runtime evidence and project regression results for the exact target. Do not derive tenant policy from export requirements. After accepted independent PASS, assign a fresh Codex initial review with requirements, full diff, and accepted verification; output `/work/tenant/review.md`. Final acceptance requires current independent PASS and review with no unresolved blocker.

**Failure and cleanup.** Keep Grok `tenant-impl-1` retained and idle during verification/review. Route bounded fixes back to it under new identities, followed by self-verification, fresh independent OpenCode verification, and Codex review. Once the initial reviewer exists, retain and reuse it for bounded rereviews with the full changed diff and current evidence. Missing prerequisites go to the coordinator. Release settled independent verifiers when no further assigned work needs them; retain implementer/reviewer through the cycle, then release at the accepted endpoint unless retention remains.

## C: Original session unavailable

**Repair and context.** Use a fresh Grok implementation session in `/work/old-export` at `old-export-r2`. Record the reason: the original Grok session positively exited, was released, and cannot resume. Carry saved requirements/plan, `/work/old-export/implementation.md`, `/work/old-export/verification.md`, `/work/old-export/review.md`, the first failed attempt, rejected approach, latest normalization finding, and actionable correction. Resolve unspecified saved input filenames before dispatch; do not recreate context from memory.

Bound writes to the affected export package/tests and assigned implementation/verification reports. Correct normalization that loses required non-ASCII characters. Verify valid non-ASCII input is preserved exactly, then rerun affected validation checks and project regression gates. The replacement owns self-verification; preserve any mandatory independent-verification gate in the saved project instructions.

**Attempt count.** This is repair attempt **2**. A new session resets neither the one prior failed fix nor runtime retry limits. New evidence and an actionable correction justify this repair. If the same blocker persists after two attempts without new evidence or an actionable next step, preserve reports and escalate the concrete blocker; honor the separate runtime circuit breaker.

**Review and cleanup.** After accepted required verification PASS, use a **fresh Codex reviewer for the changed revision**, even if the prior reviewer remains available. The explicit project rule overrides default reviewer reuse. Supply prior target/findings, all changes since that review, affected behavior, and current evidence; require a new `/work/old-export/review.md` verdict for the exact current target. Leave the released original implementer released. Retain the replacement implementer idle through review. Do not reserve an old reviewer for another changed revision; release settled reviewers when no other authorized work needs them. Release the replacement at the accepted endpoint unless retention remains.

## Provenance and limits

Checked the supplied `SKILL.md` with SHA-256 `45b70bb04e3d3937a8f09d9e0962460abb67071bd5bf5d10d7660a5189a124c6`. Only the three supplied input files were read. No application source, complete project reports, runnable commands, or live runtime were available for inspection. This artifact prepares assignments; it does not claim dispatch, repair, PASS, acceptance, or cleanup occurred. No external actions are proposed.
