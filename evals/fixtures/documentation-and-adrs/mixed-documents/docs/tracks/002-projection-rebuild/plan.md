# Plan: Rebuild order projections

**Status:** In progress

1. Implement replay into an isolated projection.
2. Verify the rebuilt projection against the existing read model.
3. Switch reads after validation and retain the previous projection for rollback.
