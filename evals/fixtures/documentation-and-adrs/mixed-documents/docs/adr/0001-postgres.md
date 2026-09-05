# 0001. Store orders in PostgreSQL

## Status

Accepted

## Context

Orders and order lines need transactional updates and relational constraints.

## Decision

Store order data in PostgreSQL.

## Consequences

The service depends on PostgreSQL migrations and database operations.
