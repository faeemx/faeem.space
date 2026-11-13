---
title: "Demystifying Database Indexes: From B-Trees to Query Plans"
description: "A deep dive into how relational database indexes work under the hood, how B-Trees optimize disk I/O, and how to read EXPLAIN ANALYZE outputs."
pubDate: 2026-11-10
tags:
  - databases
  - performance
  - sql
category: Deep Dive
draft: false
---

Database performance issues almost always trace back to disk I/O. When an application queries a table containing millions of rows, the difference between an unindexed sequential scan and an index lookup is often the difference between seconds and sub-millisecond response times.

Yet, despite indexes being the most foundational tool in database engineering, they are frequently treated as magical black boxes. In this article, we peel back the abstraction layer to see how B-Tree indexes are laid out on disk and how query planners leverage them.

## The Problem with Sequential Scans

Consider a standard relational table storing customer transactions:

```sql
SELECT id, amount, status 
FROM transactions 
WHERE customer_id = 98421;
```

Without an index on `customer_id`, PostgreSQL or MySQL has no prior knowledge of where rows matching `customer_id = 98421` reside. The storage engine must sequentially read every 8KB disk page from disk into the buffer pool, inspect every tuple, and filter out non-matching records.

If your table is 50GB, this query forces 50GB of sequential reads across the storage controller. Even on NVMe drives, this saturates I/O bandwidth and destroys cache efficiency.

## How B-Trees Structure Data

A **B-Tree** (Balanced Tree) solves this by organizing key-pointer pairs in a self-balancing hierarchical tree structure. 

Crucially, in a database B-Tree:
- **Internal Nodes** store routing keys and page pointers directing traversals down the hierarchy.
- **Leaf Nodes** store the indexed values alongside a tuple pointer (`TID` or row ID) pointing to the physical location on the heap table.
- **Doubly Linked Leaves:** Leaf pages are linked to their left and right neighbors, making range queries (`WHERE amount BETWEEN 100 AND 500`) blazing fast since the engine can seek once to the starting leaf and traverse horizontally without climbing back up the tree.

```text
               [ Root Page: Keys 100, 500 ]
              /              |             \
      [ Pages < 100 ]   [ Pages 100-500 ]   [ Pages > 500 ]
          /    \              /     \             /     \
     [Leaf 1]<->[Leaf 2] <-> [Leaf 3]<->[Leaf 4] <-> [Leaf 5]
```

Because each 8KB index page can hold hundreds of keys, B-Trees have massive branching factors (fan-out). A 3-level B-Tree can comfortably index tens of millions of records, meaning any single row lookup requires at most 3 or 4 page reads!

## Anatomy of an EXPLAIN ANALYZE

To verify that your query planner is choosing the right index, always inspect the query execution plan:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, amount, status 
FROM transactions 
WHERE customer_id = 98421;
```

A healthy plan shows an `Index Scan` or `Bitmap Index Scan`:

```text
Index Scan using idx_transactions_customer_id on transactions  (cost=0.43..8.45 rows=1 width=32) (actual time=0.038..0.040 rows=1 loops=1)
  Index Cond: (customer_id = 98421)
  Buffers: shared hit=4
Planning Time: 0.125 ms
Execution Time: 0.065 ms
```

Notice `Buffers: shared hit=4`. The database resolved the query in only four buffer page lookups (3 for the B-Tree height, 1 for the heap table tuple), taking a mere **0.065 milliseconds**.

## The Composite Index Gotcha: Column Order Matters

When creating multi-column (composite) indexes, the left-to-right ordering of columns is critical:

```sql
CREATE INDEX idx_user_status_created 
ON accounts (tenant_id, status, created_at);
```

Because the B-Tree sorts first by `tenant_id`, then by `status`, and finally by `created_at`:
- Queries filtering by `tenant_id` can use the index.
- Queries filtering by `tenant_id` AND `status` can use the index.
- Queries filtering **only** by `status` or `created_at` **cannot** use the index efficiently!

Always order your composite index columns from highest selectivity (equality filters) to lowest (range filters).

## Summary

Indexes are not magic; they are deliberate data structures engineered to trade write amplification and disk space for logarithmic search complexity. 

Understanding B-Tree mechanics allows you to design minimal, high-impact indexes that keep your production databases fast and predictable.
