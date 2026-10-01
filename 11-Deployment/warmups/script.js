// Write a function that takes in an array of tic-tac-toe moves and returns the result of the game.
// Each move is a board index from 0-8:
//
//    0 | 1 | 2
//   ---+---+---
//    3 | 4 | 5
//   ---+---+---
//    6 | 7 | 8
//
// X always goes first, and players take turns.
// For example, [4, 0, 2] means X played the center, O played the top-left, then X played the top-right.
// Return "X" or "O" if that player won, "draw" if the board is full with no winner,
// or "" if the game isn't finished yet.

// my logic:
// 1. document down success as lists, for example, [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
// 2. from the input array, separate the moves into X and O, and check if the moves are in the success lists, if yes, return the player, if no, check if the board is full, if yes, return "draw", if no, return ""

function ticTacToe(moves) {
    const success = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const xMoves = [];
    const oMoves = [];
    for (let i = 0; i < moves.length; i++) {
        if (i % 2 === 0) {
            xMoves.push(moves[i]);
        } else {
            oMoves.push(moves[i]);
        }
    }
    console.log(xMoves, oMoves);
    for (let i = 0; i < success.length; i++) {
        if (success[i].every(move => xMoves.includes(move))) {
            return "X";
        }
        if (success[i].every(move => oMoves.includes(move))) {
            return "O";
        }
    }
    if (moves.length === 9) {
        return "draw";
    }
    return "";
}

console.log(ticTacToe([4, 0, 2])); // "X"
console.log(ticTacToe([4, 0, 2, 6, 8, 1, 3, 5, 7])); // "X"
console.log(ticTacToe([4, 0, 2, 6, 8, 1, 3, 5, 7, 2])); // "O"
console.log(ticTacToe([4, 0, 2, 6, 8, 1, 3, 5, 7, 2, 8])); // "X"

// other solutions:
const getWinner = moves => {
    const board = ["", "", "", "", "", "", "", "", ""]

    for (let i = 0; i < moves.length; i++) {
        if (i % 2 === 0) {
            board[moves[i]] = "X"
        } else {
            board[moves[i]] = "O"
        }
    }

    const lines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for (const line of lines) {
        const a = board[line[0]]
        const b = board[line[1]]
        const c = board[line[2]]
        if (a !== "" && a === b && b === c) {
            return a
        }
    }

    return moves.length === 9 ? "draw" : ""
}