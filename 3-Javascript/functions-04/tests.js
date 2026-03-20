let passed = 0
let failed = 0

// 1
if (
    square(1) === 1 &&
    square(4) === 16 &&
    square(5) === 25
) {
    console.log(`1. square: ✅`)
    passed += 1
} else {
    console.log(`1. square: ❌`)
    failed += 1
}

// 2
if (
    digitCount(100) === 3 &&
    digitCount(9999) === 4 &&
    digitCount(12345) === 5
) {
    console.log(`2. digitCount: ✅`)
    passed += 1
} else {
    console.log(`2. digitCount: ❌`)
    failed += 1
}

// 3
if (
    !isValidPassword("Abcdefgh") &&
    !isValidPassword("123abcde") &&
    !isValidPassword("12AbC") &&
    isValidPassword("123AbCde")
) {
    console.log(`3. isValidPassword: ✅`)
    passed += 1
} else {
    console.log(`3. isValidPassword: ❌`)
    failed += 1
}

// 4
if (
    birdCounter(["hawk", "hawk", "blue jay", "hawk"], "hawk") === 3 &&
    birdCounter(["vulture", "crow", "vulture"], "vulture") === 2 &&
    birdCounter(["pigeon", "robin"], "duck") === 0
) {
    console.log(`4. birdCounter: ✅`)
    passed += 1
} else {
    console.log(`4. birdCounter: ❌`)
    failed += 1
}

// 5
if (
    secondBirdCounter(["Turkey", "duck", "Duck  ", "turkey", "turkey "], "duck") === 2 &&
    secondBirdCounter([" Robin", "robin ", "ROBIN"], "robin") === 3 &&
    secondBirdCounter(["eagle", "hawk"], "duck") === 0
) {
    console.log(`5. secondBirdCounter: ✅`)
    passed += 1
} else {
    console.log(`5. secondBirdCounter: ❌`)
    failed += 1
}

// 6
if (
    hasDuplicates(["Washington", "Adams", "Monroe", "Adams"]) &&
    hasDuplicates(["x", "x", "y", "y"]) &&
    !hasDuplicates(["red", "blue", "green"])
) {
    console.log(`6. hasDuplicates: ✅`)
    passed += 1
} else {
    console.log(`6. hasDuplicates: ❌`)
    failed += 1
}

// 7
if (
    JSON.stringify(toolCounts(["hammer", "nails", "hammer"])) === JSON.stringify({ hammer: 2, nails: 1 }) &&
    JSON.stringify(toolCounts(["saw"])) === JSON.stringify({ saw: 1 })
) {
    console.log(`7. toolCounts: ✅`)
    passed += 1
} else {
    console.log(`7. toolCounts: ❌`)
    failed += 1
}

// 8
if (
    mostCommonBird(["sparrow", "sparrow", "wren", "sparrow", "wren"]) === "sparrow, 3" &&
    mostCommonBird(["crow", "crow", "crow", "nightjar"]) === "crow, 3" &&
    (
        mostCommonBird(["turkey", "turkey", "dove", "dove"]) === "turkey, 2" ||
        mostCommonBird(["turkey", "turkey", "dove", "dove"]) === "dove, 2"
    )
) {
    console.log(`8. mostCommonBird: ✅`)
    passed += 1
} else {
    console.log(`8. mostCommonBird: ❌`)
    failed += 1
}

// 9
if (
    countValidBarcodes(["12345678", "12A45678", "00000000"]) === 2 &&
    countValidBarcodes(["11111111", "22222222", "3333333"]) === 2 &&
    countValidBarcodes(["abc", "1234", "A2345678"]) === 0
) {
    console.log(`9. countValidBarcodes: ✅`)
    passed += 1
} else {
    console.log(`9. countValidBarcodes: ❌`)
    failed += 1
}

// 10
if (
    titleCase("sAtuRn") === "Saturn" &&
    titleCase("JUPITER") === "Jupiter" &&
    titleCase("earth") === "Earth"
) {
    console.log(`10. titleCase: ✅`)
    passed += 1
} else {
    console.log(`10. titleCase: ❌`)
    failed += 1
}

// 11
if (
    raiseToThePowerOf(3, 4) === 81 &&
    raiseToThePowerOf(2, 5) === 32 &&
    raiseToThePowerOf(7, 1) === 7
) {
    console.log(`11. raiseToThePowerOf: ✅`)
    passed += 1
} else {
    console.log(`11. raiseToThePowerOf: ❌`)
    failed += 1
}

// 12
if (
    heaviestPackage([{ name: "lamp", weight: 4.1 }, { name: "statue", weight: 9.3 }]) === "statue" &&
    heaviestPackage([{ name: "a", weight: 3 }, { name: "b", weight: 2 }]) === "a" &&
    (
        heaviestPackage([{ name: "a", weight: 1 }, { name: "b", weight: 1 }]) === "a" ||
        heaviestPackage([{ name: "a", weight: 1 }, { name: "b", weight: 1 }]) === "b"
    )
) {
    console.log(`12. heaviestPackage: ✅`)
    passed += 1
} else {
    console.log(`12. heaviestPackage: ❌`)
    failed += 1
}

// 13
if (
    chessKnightMoves(0, 1) &&
    JSON.stringify(chessKnightMoves(0, 1).sort()) === JSON.stringify([[1, 3], [2, 0], [2, 2]].sort()) &&
    JSON.stringify(chessKnightMoves(3, 3).sort()) === JSON.stringify([[1, 2], [1, 4], [2, 1], [2, 5], [4, 1], [4, 5], [5, 2], [5, 4]].sort())
) {
    console.log(`13. chessKnightMoves: ✅`)
    passed += 1
} else {
    console.log(`13. chessKnightMoves: ❌`)
    failed += 1
}

console.log(`${passed}/${passed + failed}`)

const statusIcon = document.getElementById('status-icon')

if (statusIcon) {
    if (passed === 13) {
        statusIcon.textContent = '🐓'
    } else if (passed > 6) {
        statusIcon.textContent = '🐣'
    } else {
        statusIcon.textContent = '🥚'
    }
}