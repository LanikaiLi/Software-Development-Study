# Project Summary — Network Delay Time (Dijkstra)

**Problem:** LeetCode 743. A directed network of `n` nodes (labeled `1..n`) has weighted travel times `times[i] = [from, to, weight]`. A signal starts at node `k`. Return the earliest time at which every node has received the signal, or `-1` if some node is unreachable.

**Outcome:** Implemented `networkDelayTime` by turning the edge list into an adjacency map, then relaxing edges from the source. All 8 tests pass, covering the three LeetCode examples, a cheaper two-hop path, zero-weight edges, a disconnected node, and the single-node empty-edge case.

---

## Wins

**Chose a usable in-memory graph before writing the search.** The input is a raw matrix of triples. I did not try to Dijkstra over that list. I first converted it into a hashmap from node to `{ reachable, distance }`, so each source maps to the neighbors it can reach and the weight of each edge. That preprocessing was my own design. Once the graph was in that shape, the rest of the algorithm became a loop over neighbors instead of a loop over the entire `times` array on every step.

The reusable lesson: shortest-path code should operate on an adjacency structure, not on the original edge list. The conversion is not busywork — it is what makes each relaxation `O(degree(u))` instead of `O(E)`.

---

## Difficulties

### 1. "Single node needs zero time" — empty edges are not an empty network

The case that broke my first version was `times = []`, `n = 1`, `k = 1`, expected `0`.

I built the graph only from rows in `times`. No edges meant no keys in the hashmap, so I treated the graph as invalid and returned `-1`. That mixed up two different facts:

- `times` is the **edge list**. Empty means nobody is connected to anybody.
- `n` is the **node count**. The network still has nodes `1..n`, even if there are no wires.

A network of one node and no edges is valid. The signal starts at the only person in the room, so everyone has already received it. Time is `0`, not `-1`. `-1` is for a node that can never hear the signal, which cannot happen when that node is the source and there is nobody else.

A related failure used the same root cause: edges `1→2→3` with `n = 4`. Node `4` never appeared in `times`, so it never entered `distances`, and I returned the max among `1..3` instead of `-1`. Isolated nodes still count. The node set is `1..n`, not "whatever showed up in the matrix."

### 2. The single-node fix is still a special case, not a general rule

I currently catch this with explicit sanity checks:

- empty hashmap and `n === 1` → `0`
- empty hashmap and `n > 1` → `-1`
- `n` larger than the number of keys in the hashmap → `-1`

Those branches pass the tests, but they are hardcoded around the failing cases. A cleaner model is: always create nodes `1` through `n` (empty neighbor lists if they have no edges), set `dist[k] = 0`, run the search, then return `-1` if any `dist[i]` is still `Infinity`, otherwise return `max(dist)`. The empty-graph and extra-node situations then fall out of the same loop. No extra `if` for "one lonely node."

---

## Next Steps

- Initialize the graph and `distances` for every index in `1..n`, then delete the empty-graph special cases.
- Pair each neighbor with its weight in one list (`[[to, weight], ...]`) instead of two parallel arrays (`reachable` / `distance`).
- Prefer classic Dijkstra: repeatedly expand the unvisited node with the smallest `dist`, rather than a FIFO queue. A queue is closer to BFS / SPFA; it happens to work here because weights are non-negative and we re-queue on a better distance, but picking the current minimum is the algorithm this problem is meant to practice.
