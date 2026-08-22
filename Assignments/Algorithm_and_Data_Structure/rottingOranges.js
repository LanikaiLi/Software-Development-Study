/**
 * Rotting Oranges — LeetCode 994 (Medium)
 *
 * @param {number[][]} grid  m x n grid; 0 empty, 1 fresh, 2 rotten
 * @return {number} minutes until all oranges rot, or -1 if impossible
 */

// my logic:
// before we start the loop, we need to do a sanity check:
//// 1. if there are any 2 in the grid, if not, return -1
//// 2. if there are any 1 in the grid, if not, return 0
// only if there are both 1 and 2, we can start the loop
// this problem is basically calculating max of all distances from the starting point of 2, to all the 1's in the grid
// that's why it is related to BFS, because BFS is the best way to find the shortest path in a grid, we just do BFS from every 2 
// how to do that?

// my logic of multi-source BFS:
// 1. enqueue all the 2's in the grid
// 2. pop the first element from the queue, and rot the adjacent oranges
// how to rot? 
// you check the 4 directions from current node, when I say 4 directions, I mean up, down, left, right
//// up: row - 1, col -> [-1,0]
//// down: row + 1, col -> [1,0]
//// left: row, col - 1 -> [0,-1]
//// right: row, col + 1 -> [0,1]
//// if the new position is 0: do nothing
//// if the new position is 1: rot the orange (change 1 to 2, change the grid), and enqueue the new position, and add 1 min to total time
//// if the new position is 2: do nothing
//// if the new position is out of bounds: do nothing
// 3. count how many oranges are rotten, if it is 1, continue the loop, if it is 0, check if there are any 1's in the grid, if not, return the total time, if there are, return -1

export function orangesRotting(grid) {
  // TODO: implement multi-source BFS.
  //
  // Suggested steps:
  // 1. Count fresh oranges and enqueue every rotten orange [row, col].
  // 2. BFS 4-directionally. After each "minute" (queue level), increment time
  //    only if at least one fresh orange became rotten.
  // 3. Return -1 if any fresh oranges remain; otherwise return minutes.
  //
  // You may mutate `grid` in place.

  //sanity check:
  let hasFresh = false
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        hasFresh = true
      }
    }
  }
  if (!hasFresh) {
    return 0
  }
  let hasRotten = false
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        hasRotten = true
      }
    }
  }
  if (!hasRotten) {
    return -1
  }


  // multi-source BFS:
  let queue = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j])
      }
    }
  }
  let time = 0
  while (queue.length > 0) {
    let size = queue.length 
    let rotten = 0
    for (let i = 0; i < size; i++) { // for each rotten orange in the queue
      let [row, col] = queue.shift()
      let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      for (let direction of directions) {
        let newRow = row + direction[0]
        let newCol = col + direction[1]
        if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
          continue
        }
        if (grid[newRow][newCol] === 1) {
          grid[newRow][newCol] = 2
          queue.push([newRow, newCol])
          rotten++
        }
        if (grid[newRow][newCol] === 2 || grid[newRow][newCol] === 0) {
          continue
        }
      }
    }
    if (rotten > 0) {
      time++
    }
  }

  // check if there are any 1's in the grid
  let hasFreshafter = false
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 1) {
        hasFreshafter = true
      }
    }
  }
  if (hasFreshafter) {
    return -1
  }
  return time


  throw new Error("Not implemented: fill in orangesRotting");
}
