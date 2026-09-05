# Bug: Test Startup Reads an Empty Database

Status: diagnosis in progress; no fix or verification has been completed.

Expected: database seeding completes before tests read the seeded rows.
Actual: the startup check sees zero rows and exits with a failure.
Reproduction: from the fixture project root, run `node scripts/reproduce-startup.cjs`.

The current task is to resume diagnosis and update [notes.md](notes.md). Implementation is a later task.
