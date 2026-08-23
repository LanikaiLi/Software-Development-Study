import { test } from "node:test";
import assert from "node:assert/strict";
import { networkDelayTime } from "./networkDelayTime.js";

test("example 1: last node receives at time 2", () => {
  assert.equal(
    networkDelayTime(
      [
        [2, 1, 1],
        [2, 3, 1],
        [3, 4, 1],
      ],
      4,
      2,
    ),
    2,
  );
});

test("example 2: single edge from source", () => {
  assert.equal(networkDelayTime([[1, 2, 1]], 2, 1), 1);
});

test("example 3: source cannot reach the other node", () => {
  assert.equal(networkDelayTime([[1, 2, 1]], 2, 2), -1);
});

test("single node needs zero time", () => {
  assert.equal(networkDelayTime([], 1, 1), 0);
});

test("cheaper two-hop path beats expensive direct edge", () => {
  assert.equal(
    networkDelayTime(
      [
        [1, 2, 5],
        [1, 3, 1],
        [3, 2, 1],
      ],
      3,
      1,
    ),
    2,
  );
});

test("disconnected node returns -1", () => {
  assert.equal(
    networkDelayTime(
      [
        [1, 2, 1],
        [2, 3, 1],
      ],
      4,
      1,
    ),
    -1,
  );
});

test("zero-weight edges still propagate", () => {
  assert.equal(
    networkDelayTime(
      [
        [1, 2, 0],
        [2, 3, 0],
      ],
      3,
      1,
    ),
    0,
  );
});

test("must take the slower branch because it is the only way to the last node", () => {
  assert.equal(
    networkDelayTime(
      [
        [1, 2, 1],
        [1, 3, 4],
        [2, 3, 1],
        [3, 4, 1],
      ],
      4,
      1,
    ),
    3,
  );
});
