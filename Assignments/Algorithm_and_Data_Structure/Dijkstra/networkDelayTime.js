/**
 * Network Delay Time — LeetCode 743 (Medium)
 *
 * @param {number[][]} times  directed edges [from, to, weight]
 * @param {number} n          nodes labeled 1..n
 * @param {number} k          source node
 * @return {number} time for all nodes to receive the signal, or -1
 */
export function networkDelayTime(times, n, k) {
  // TODO: implement Dijkstra from node k.
  //
  // Suggested steps:
  // 1. Build an adjacency list for the directed graph.
  // 2. dist[1..n] = Infinity, dist[k] = 0.
  // 3. While there is an unvisited node with finite dist:
  //      pick the one with smallest dist (array scan or min-heap)
  //      mark it visited
  //      relax each outgoing edge
  // 4. Let answer = max(dist[1..n]). Return answer if finite, else -1.

  // my logic:
  // Before starting the algorithm, we need to preprocess the input to create a more human-friendly format. 
  // my idea is to turn the matrix into an object that maps each node to its neighbors and the weight of the edge.
  // for example, the matrix [[2,1,1], [2,3,1], [3,4,1]] would become:
  // {
  //   1: { reachable: null, distance: null},
  //   2: { reachable: [1,3], distance: [1,1]},
  //   3: { reachable: [4], distance: [1]},
  //   4: { reachable: null, distance: null},
  // }
  // This format allows us to easily access the neighbors and weights of each node.

  let graph = {}
  let nodes = []
  for (let [from, to, weight] of times) {
    nodes.push(from)
    nodes.push(to)
  }
  const deduplicate = (arr) => [...new Set(arr)]
  nodes = [...new Set(nodes)]
  //console.log(nodes)


  for (let [from, to, weight] of times) {
    if (!graph[from]) {
      graph[from] = { reachable: [], distance: [] }
    }
    graph[from].reachable.push(to)
    graph[from].distance.push(weight)
  }

  for (let node of nodes) {
    if (!graph[node]) {
      graph[node] = { reachable: [], distance: [] }
    }
  }

  //console.log(graph)

  // we also need to do a sanity check before we start the algorithm.
  // First sanity check - if the graph is non-empty
  // under this case, things that may cause failure are:
  // 1. source node is invalid, source node is not in the graph
  if (!graph[k] && Object.keys(graph).length > 0) {
    return -1
  }

  //Second sanity check - if the graph is empty
  // under this case, things that may cause failure are:
  // 1. if there is only one node in the graph, return 0. if there are more than one node but connection between them is not provided, return -1.
  if (Object.keys(graph).length === 0 && n === 1) {
    return 0
  }

  // Third sanity check - if the number of nodes we want to reach is greater than the number of nodes in the graph, no matter the graph is empty or not, that always means there is no way to reach all nodes, return -1.
  if (n > Object.keys(graph).length) {
    return -1
  }

  // Next, we can start the algorithm.
  // we start by setting the distance to the source node to 0. and the rest to Infinity.
  // we use a visited queue to keep track of the nodes we have visited.
  // we start by adding the source node to the visited queue.
  // while the visited queue is not empty, we dequeue a node and mark it as visited.
  // for the node we dequeued, we do following things:
  // 1. find the reachable nodes and the distance of the edges to them.
  // 2. for each reachable node, we calculate the smallest distance to reach it from the current node.
  // how to calculate the smallest distance to a reachable node?
  // we can use the formula: smallest distance to a reachable node = min(current distance + distance to the reachable node, smallest distance to the reachable node).

  let distances = {}
  for (let node of Object.keys(graph)) {
    distances[node] = Infinity
  }
  distances[k] = 0

  let visited = []
  visited.push(k)
  while (visited.length > 0) {
    let currentNode = visited.shift()
    let reachableNodes = graph[currentNode].reachable // [1,3]
    let distancesToReachableNodes = graph[currentNode].distance // [1,1]
    for (let i = 0; i < reachableNodes.length; i++) {
      let reachableNode = reachableNodes[i] // first 1, then 3
      let distanceToReachableNode = distancesToReachableNodes[i] // first 1, then 1
      if (distances[reachableNode] > distances[currentNode] + distanceToReachableNode) {
        distances[reachableNode] = distances[currentNode] + distanceToReachableNode
        visited.push(reachableNode)
      }
    }
  }
  //console.log(distances)

  
  // Finally, after all visitable nodes are visited (which means visited queue is empty), we need to do one last check
  // 1. if any node has a distance of Infinity, return -1.ß
  // 2. otherwise, return the maximum of all distances to nodes
  //throw new Error("Not implemented: fill in networkDelayTime");

  for (let node of Object.keys(distances)) {
    if (distances[node] === Infinity) {
      return -1
    }
  }
  return Math.max(...Object.values(distances))

}

