# Project Summary — Rotting Oranges (BFS)

**Problem:** LeetCode 994. Given an `m x n` grid of empty cells, fresh oranges, and rotten oranges, return the minimum number of minutes until no fresh orange remains, or `-1` if some orange can never rot.

**Outcome:** Implemented `orangesRotting` as a multi-source BFS in `O(m * n)` time and `O(m * n)` space. All 10 test cases pass, covering the three worked examples plus unreachable oranges, empty grids, single-cell grids, and multi-source spread.

---

## Difficulties

### 1. Scoping the elapsed-time counter correctly

The hardest defect was not algorithmic — it was variable scope. I declared the minute counter inside the BFS loop, which reset elapsed time to zero on every level. The function returned `0` or `1` instead of the true answer.

This is a general BFS trap, not a quirk of this problem. In single-source BFS the same variable represents **distance from the start**; in this problem it represents **minutes elapsed**. In both cases it describes how deep the search frontier has traveled, so it must be declared once, outside the traversal, and only ever incremented. Any variable that describes the frontier rather than the current node belongs outside the loop.

A second, related error: I computed the four neighbor coordinates inside a direction loop but ran the bounds check and the rot logic outside it. The coordinates were out of scope by then, so the traversal crashed before infecting a single neighbor. Both bugs came from the same root cause — placing state at the wrong loop level.

### 2. Understanding multi-source BFS

My prior BFS experience was single-source: one starting node, find the shortest route to a destination (for example, fewest flights between two countries). This problem has many starting points, and it was not obvious at first why that is still BFS, or why the answer is a maximum rather than a minimum.

**Single-source BFS:** one start node. The queue is seeded with one node. The result is the shortest distance from that node to a target.

**Multi-source BFS:** many start nodes, all at distance zero. The queue is seeded with *every* rotten orange before the first step. Everything else — the queue, the level-by-level processing, the visited marking — is identical.

The clarifying mental model: multi-source BFS is single-source BFS on a graph with one **virtual start node** wired to every rotten orange with a zero-cost edge. Run ordinary BFS from that virtual node and you get, for each fresh orange, its distance to the *nearest* rotten orange. That is exactly the minute it rots, because rot spreads from all sources simultaneously.

**Why the answer is a maximum of minimums:** BFS gives each fresh orange its own shortest time. The grid is only fully rotten when the *last* orange rots, so the answer is the largest of those shortest distances. The minimum is per-orange; the maximum is across the grid. Distinguishing those two layers was the key conceptual unlock.

The practical consequence is a performance one worth stating plainly: seeding all sources at once solves the problem in a single `O(m * n)` pass. Running a separate BFS from each rotten orange and combining results would be correct but far more expensive.

---

## Wins

**Decomposed an ambiguous rule into arithmetic.** The prompt describes rot spreading to "adjacent" oranges — vague, prose language. I translated it into four offset vectors `[-1,0], [1,0], [0,-1], [0,1]` added to the current coordinate, which turned an English rule into a loop over four deterministic cases: out of bounds, empty, fresh, already rotten. This was my own design, and it is the reusable part of the work — the same offset-vector pattern applies to any grid traversal problem.

**Derived the overall algorithm independently.** Before writing code I reasoned out the full flow: pre-check the grid, seed the queue with all rotten oranges, process one queue level per minute, and verify no fresh oranges remain at the end. The structure was correct on the first attempt; only the scope errors needed fixing.

**Built the correct termination condition.** Returning `-1` requires distinguishing "the queue emptied" from "everything rotted." Checking for remaining fresh oranges after BFS completes handles unreachable oranges correctly, including those walled off by empty cells.

---

## Next Steps

- Replace the two full-grid pre-scans with a single pass that counts fresh oranges and seeds the queue at the same time, then use that count as the termination check instead of re-scanning the grid at the end.
- Replace `queue.shift()` with an index pointer. `shift()` is `O(n)` on a JavaScript array, which makes the traversal `O(n^2)` in the worst case; a read pointer keeps it linear.
- Apply the same multi-source pattern to related problems (01 Matrix, Walls and Gates) to reinforce the concept.
