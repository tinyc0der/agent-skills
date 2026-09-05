# 0001: Use PostgreSQL for job storage

## Status

Accepted

## Context

Job claims must be atomic across workers.

## Decision

Use PostgreSQL transactions to claim jobs because they prevent duplicate work.

## Consequences

Workers share a transactional store; database availability gates job claims.
