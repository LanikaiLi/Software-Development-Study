const assert = require('assert')
const {
  findHorizontalWins,
  findVerticalWins,
  findDiagonalWins,
  findWins,
} = require('../matrix-warmup-2')

describe('tic-tac-toe win checks', () => {
  it('detects a horizontal win for X', () => {
    const board = [
      ['X', 'X', 'X'],
      ['O', ' ', 'O'],
      [' ', 'O', ' '],
    ]

    assert.strictEqual(findHorizontalWins(board), 'X')
  })

  it('detects a vertical win for O', () => {
    const board = [
      ['X', 'O', ' '],
      ['X', 'O', ' '],
      [' ', 'O', 'X'],
    ]

    assert.strictEqual(findVerticalWins(board), 'O')
  })

  it('detects a diagonal win for X', () => {
    const board = [
      ['X', ' ', 'O'],
      [' ', 'X', 'O'],
      ['O', ' ', 'X'],
    ]

    assert.strictEqual(findDiagonalWins(board), 'X')
  })

  it('returns the winning player when either side has won', () => {
    const board = [
      ['O', ' ', 'X'],
      ['O', 'X', ' '],
      ['O', ' ', 'X'],
    ]

    assert.strictEqual(findWins(board), 'O')
  })
})
