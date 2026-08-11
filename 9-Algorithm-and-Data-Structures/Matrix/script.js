// MINESWEEPER

const matrix = [
    [" ", " ", " ", "!"],
    ["!", " ", "!", " "],
    ["!", " ", " ", " "],
    [" ", "!", "!", "!"],
]

// This matrix is a 4 by 4 grid. The exclamation marks represent bombs. Write a function called countBombs that takes in x, y coordinates designating a square on the grid, then returns the number of bombs adjacent to that square -- including diagonals, and including the square itself. For example, countBombs(0, 0) indicates the top-left square, and should return 1. countBombs(0, 2) indicates the third square down from the top on the left side, and should return 3.

// my logic:
// for (x,y) in matrix, we should check:
// - the square itself
// - the squares to the left, right, up, down, and the 4 diagonals
// --- which is:
// (x-1, y), (x+1, y), (x, y-1), (x, y+1), (x-1, y-1), (x+1, y-1), (x-1, y+1), (x+1, y+1)
// if the square is a bomb, we should increment the count
// if the square is out of bounds, we should not increment the count
// we should return the count

const countBombs = (x, y) => {
    let count = 0
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                if (matrix[y][x] === "!") count++
                console.log(x,y)
                console.log("the square itself is a bomb")
                continue
            }
            if (x + i < 0 || x + i >= matrix.length || y + j < 0 || y + j >= matrix[0].length) {
                console.log(y + i, x + j)
                console.log("the square is out of bounds")
                continue
            }
            if (matrix[y + j][x + i] === "!") {
                count++
                console.log(x + i, y + j)
                console.log("the connectedsquare is a bomb")
                console.log(matrix[x + i][y + j])
            }
            else {
                console.log(x + i, y + j)
                console.log("the connectedsquare is not a bomb")
            }
        }
    }
    return count
}


console.log(countBombs(0, 2)) // 3

console.log(countBombs(0, 0)) // 1