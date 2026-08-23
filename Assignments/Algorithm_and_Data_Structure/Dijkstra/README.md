# 743. Network Delay Time

**Difficulty:** Medium  
**Topic:** Dijkstra, Graph, Shortest Path

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = [ui, vi, wi]`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from `ui` to `vi`.

We send a signal from node `k`. Return the **minimum time** it takes for **all** `n` nodes to receive the signal. If it is impossible for all nodes to receive the signal, return `-1`.

---

## Examples

### Example 1

```
Input:  times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

Node `2` sends to `1` and `3` in 1 unit. Node `3` then sends to `4` in 1 more unit. The last node to hear the signal is `4` at time `2`.

### Example 2

```
Input:  times = [[1,2,1]], n = 2, k = 1
Output: 1
```

### Example 3

```
Input:  times = [[1,2,1]], n = 2, k = 2
Output: -1
```

Node `2` has no outgoing path to node `1`, so the signal never reaches everyone.

---

## Constraints

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`
- `ui != vi`
- `0 <= wi <= 100`
- All pairs `(ui, vi)` are unique

---

## Function signature

Implement `networkDelayTime(times, n, k)` in `networkDelayTime.js`.

```js
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function networkDelayTime(times, n, k) {
  // your code
}
```

---

## Why Dijkstra, not BFS?

BFS finds shortest paths when **every edge has the same cost** (fewest hops). Here edges have **different travel times**, all non-negative. A cheaper two-hop path can beat a expensive one-hop path, so expanding by hop count is wrong.

Dijkstra always expands the node with the **smallest known total time** from `k`. That is the weighted version of “always process the closest unvisited node.”

The return value is **not** the distance to one target. After you have shortest times from `k` to every node, the answer is the **maximum** of those times — the moment the last node receives the signal. If any node is still `Infinity`, return `-1`.

---

## Hints

1. Build an adjacency list: `node -> [[neighbor, weight], ...]`.
2. Keep `dist[i]` = shortest known time from `k` to node `i`. Initialize all to `Infinity`, set `dist[k] = 0`.
3. Repeatedly pick the unvisited node with the smallest `dist`. Relax its outgoing edges: if `dist[u] + w < dist[v]`, update `dist[v]`.
4. For `n <= 100`, a linear scan to find the min unvisited node is enough (`O(n^2)`). A min-heap is the usual improvement (`O(E log V)`).
5. After the loop, if `Math.max(...dist)` is finite, that is the answer; otherwise `-1`. Remember nodes are labeled `1..n`, not `0..n-1`.

---

## Complexity target

- **Time:** `O(n^2 + E)` with array min-scan, or `O(E log V)` with a heap  
- **Space:** `O(n + E)` for the graph and distance array

---

## How to run tests

From this folder:

```bash
cd Assignments/Algorithm_and_Data_Structure/Dijkstra
node --test networkDelayTime.test.js
```

There is **no solution file**. Fill in `networkDelayTime` until the tests pass.
