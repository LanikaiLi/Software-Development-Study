# 994. Rotting Oranges

**Difficulty:** Medium  
**Topic:** Breadth-First Search (BFS), Matrix, Queue

You are given an `m x n` grid where each cell can have one of three values:

- `0` — empty cell
- `1` — fresh orange
- `2` — rotten orange

Every minute, any **fresh** orange that is **4-directionally adjacent** (up, down, left, right) to a **rotten** orange becomes rotten.

Return the **minimum number of minutes** that must elapse until **no cell has a fresh orange**. If this is impossible, return `-1`.

---

## Examples

### Example 1

```
Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

Minute 0:

```
2 1 1
1 1 0
0 1 1
```

After 4 minutes every orange is rotten. No shorter sequence exists.

### Example 2

```
Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
```

The orange at the bottom-left never becomes adjacent to a rotten orange, so it never rots.

### Example 3

```
Input:  grid = [[0,2]]
Output: 0
```

There are no fresh oranges, so the answer is already `0`.

---

## Constraints

- `1 <= m, n <= 10`
- `m == grid.length`
- `n == grid[i].length`
- `grid[i][j]` is `0`, `1`, or `2`

*(The official LeetCode bound is larger (`<= 10` here keeps local tests fast; your algorithm should still be `O(m * n)`.)*

---

## Function signature

Implement `orangesRotting(grid)` in `rottingOranges.js`.

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
function orangesRotting(grid) {
  // your code
}
```

You may mutate `grid` in place.

---

## Hints

1. This is **multi-source BFS**: every initially rotten orange starts rotting neighbors at the same time. Enqueue **all** of them before the first minute.
2. Track how many fresh oranges remain. If any are left when the queue is empty, return `-1`.
3. Process the queue **level by level** (or store the minute on each cell). Each level is one minute.
4. Do not count a minute if nothing new became rotten in that step. A common off-by-one is returning the last processed level even when there were no fresh oranges to begin with.

---

## Complexity target

- **Time:** `O(m * n)` — each cell is enqueued at most once  
- **Space:** `O(m * n)` — queue in the worst case (all cells rotten)

---

## How to run tests

From this folder:

```bash
node --test rottingOranges.test.js
```

Starter tests cover the examples plus a few extra cases. Fill in `orangesRotting` until they pass.

There is **no solution file**. Use BFS, not DFS or a simulation that rescans the whole grid every minute unless you can still prove `O(m * n)` overall.
