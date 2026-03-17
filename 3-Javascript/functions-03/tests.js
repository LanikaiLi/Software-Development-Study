const logProblemResult = (result) => {
  if (result.passed) {
    console.log(`PASS: ${result.name}`)
  } else {
    console.log(`FAIL: ${result.name} - ${result.reason}`)
  }
}

const testFlipCoin = () => {
  const name = "flipCoin"
  const validValues = new Set(["heads", "tails"])

  for (let i = 0; i < 200; i += 1) {
    const result = flipCoin()

    if (!validValues.has(result)) {
      return {
        name,
        passed: false,
        reason: `returned \"${result}\" on run ${i + 1}; expected \"heads\" or \"tails\"`
      }
    }
  }

  return { name, passed: true }
}

const testRemoveNonAWords = () => {
  const name = "removeNonAWords"
  const input = ["apple", "banana", "Australia", "piano", "avocado", "Apricot"]
  const expected = ["apple", "Australia", "avocado", "Apricot"]
  const actual = removeNonAWords(input)

  if (!Array.isArray(actual)) {
    return {
      name,
      passed: false,
      reason: "did not return an array"
    }
  }

  if (actual.length !== expected.length) {
    return {
      name,
      passed: false,
      reason: `returned ${actual.length} words; expected ${expected.length}`
    }
  }

  for (let i = 0; i < expected.length; i += 1) {
    if (actual[i] !== expected[i]) {
      return {
        name,
        passed: false,
        reason: `mismatch at index ${i}; expected \"${expected[i]}\", got \"${actual[i]}\"`
      }
    }
  }

  return { name, passed: true }
}

const testIsPrime = () => {
  const name = "isPrime"
  const primeCases = [2, 3, 5, 7, 11, 13, 97]
  const nonPrimeCases = [0, 1, -3, 4, 6, 8, 9, 12, 100]

  for (const value of primeCases) {
    if (isPrime(value) !== true) {
      return {
        name,
        passed: false,
        reason: `${value} should be prime`
      }
    }
  }

  for (const value of nonPrimeCases) {
    if (isPrime(value) !== false) {
      return {
        name,
        passed: false,
        reason: `${value} should be non-prime`
      }
    }
  }

  return { name, passed: true }
}

const runTests = () => {
  const statusIcon = document.getElementById("status-icon")
  const results = [testFlipCoin(), testRemoveNonAWords(), testIsPrime()]

  for (const result of results) {
    logProblemResult(result)
  }

  const passed = results.every((result) => result.passed)

  if (passed) {
    if (statusIcon) {
      statusIcon.textContent = "⭐"
      statusIcon.setAttribute("title", "All tests passed")
    }

    console.log("All tests passed.")
  } else {
    if (statusIcon) {
      statusIcon.textContent = "⚙️"
      statusIcon.setAttribute("title", "Tests failed")
    }

    console.log("Some tests failed.")
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runTests)
} else {
  runTests()
}
