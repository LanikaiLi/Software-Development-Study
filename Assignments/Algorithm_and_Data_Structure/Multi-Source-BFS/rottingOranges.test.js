import { test } from "node:test";
import assert from "node:assert/strict";
import { orangesRotting } from "./rottingOranges.js";

function clone(grid) {
  return grid.map((row) => row.slice());
}

function check(grid, expected) {
  assert.equal(orangesRotting(clone(grid)), expected);
}

test("example 1: all oranges rot in 4 minutes", () => {
  check(
    [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
    4,
  );
});

test("example 2: unreachable fresh orange returns -1", () => {
  check(
    [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ],
    -1,
  );
});

test("example 3: no fresh oranges returns 0", () => {
  check([[0, 2]], 0);
});

test("single fresh orange never rots", () => {
  check([[1]], -1);
});

test("single rotten orange is already done", () => {
  check([[2]], 0);
});

test("empty cells only", () => {
  check(
    [
      [0, 0],
      [0, 0],
    ],
    0,
  );
});

test("all fresh: impossible", () => {
  check(
    [
      [1, 1],
      [1, 1],
    ],
    -1,
  );
});

test("rot spreads from two sources at once", () => {
  check(
    [
      [2, 1, 1],
      [1, 1, 1],
      [0, 1, 2],
    ],
    2,
  );
});

test("chain of oranges along one row", () => {
  check([[2, 1, 1, 1, 1]], 4);
});

test("fresh orange blocked by empty cells", () => {
  check(
    [
      [2, 0, 1],
      [0, 0, 0],
      [1, 0, 2],
    ],
    -1,
  );
});
