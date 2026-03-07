const runTests = () => {
    let passed = 0
    let total = 7

    if (averageSpeed(100, 2) === 50) passed++
    if (minutesToSeconds(2) === 120) passed++
    if (numberIsOdd(3) === true && numberIsOdd(4) === false) passed++
    if (squareNumber(5) === 25) passed++
    if (firstThreeLetters("javascript") === "jav") passed++
    if (celsiusToFahrenheit(0) === 32) passed++
    if (makeFullName("John", "Doe") === "John Doe") passed++ // "John Doe"

    console.log(`Passed ${passed} out of ${total} tests`)

    const checkMark = document.getElementById("check-mark") // This is a DOM element, it is used to get the element by its id
    if (checkMark && passed === total) {
        checkMark.textContent = "⭐"
    } else if (checkMark) {
        checkMark.textContent = "⚙️"
    }
}

runTests()