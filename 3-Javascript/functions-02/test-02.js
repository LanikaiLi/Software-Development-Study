const runTests = () => {
    let passedTests = 0
    const totalTests = 4

    if (getInitials("James", "Bond") === "JB") {
        passedTests++
    }

    if (movieLengthInSeconds(2, 13) === 7980) {
        passedTests++
    }

    if (isAMultipleOfSeven(14) && !isAMultipleOfSeven(100)) {
        passedTests++
    }

    if (convertNumberToString(100) === "100") {
        passedTests++
    }

    return passedTests + " / " + totalTests + " tests passed."
}

console.log(
    runTests()
)