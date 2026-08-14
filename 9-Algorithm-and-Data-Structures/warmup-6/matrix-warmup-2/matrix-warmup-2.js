const board = [
    ["O", " ", "X"],
    [" ", "O", "X"],
    ["O", " ", "X"],
]

// This matrix represents a tic-tac-toe board. Try writing the following functions.
// For all these functions, return either "X", "O", or false
// Assume the board passed in will be a 3x3 matrix containing only " ", "X", and "O".

// Find out whether either player has 3-in-a-row horizontally.
// my logic:
// loop through the board and check if the row is all X or O
const findHorizontalWins = (board) => {
    let listOfWins = []
    for (const row of board) {
        if (row.every(cell => cell === "X")) listOfWins.push("X")
        if (row.every(cell => cell === "O")) listOfWins.push("O")
    }
    return listOfWins.length > 0 ? listOfWins : false
}

// Find out whether either player has 3-in-a-row vertically.
// my logic:
// this is basically checking (0,0), (1,0), (2,0) (0,1), (1,1), (2,1) (0,2), (1,2), (2,2)
// for each three cells, check if they are all X or O
// loooking at the pattern, when we loop, we can keep the y column a constant value, and only loop through the x column
const findVerticalWins = (board) => {
    let listOfWins = []
    for (let x = 0; x<3; x++){
        if (board[x][0] == "X" && board[x][1] == "X" && board[x][2] == "X") listOfWins.push("X")
        if (board[x][0] == "O" && board[x][1] == "O" && board[x][2] == "O") listOfWins.push("O")
    }
    return listOfWins.length > 0 ? listOfWins : false
}

// Find out whether either player has 3-in-a-row diagonally.
// my logic:
// 
const findDiagonalWins = (board) => {}

// Find out whether either player has won.
const findWins = (board) => {
    return findHorizontalWins(board) || findVerticalWins(board) || findDiagonalWins(board)
}

module.exports = {
    findHorizontalWins,
    findVerticalWins,
    findDiagonalWins,
    findWins,
}
