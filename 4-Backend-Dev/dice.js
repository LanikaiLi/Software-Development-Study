// The game Dungeons and Dragons uses 7 different kinds of dice: 4-sided, 6-sided,
// 8-sided, 10-sided, 12-sided, and 20-sided.
// When the rules tell you to roll a dice, they use this notation:
// "Roll 2d6", means roll 2 6-sided dice, and add the results together.
// Write a function that simulates this. For example:
// dndDice("3d8")
// should simulate 3 8-sided dice, returning an integer between 3 and 24.

const dndDice = (instruction) => {
    let total = 0
    if (instruction.includes("d")) {
        let [numberOfDice, numberOfSides] = instruction.split("d")
        for (let i = 0; i < numberOfDice; i++) {
            total += Math.floor(Math.random() * numberOfSides) + 1
        }
    } else {
        total = parseInt(instruction)
    }
    return total
}


// Add the functionality for notation like this: "2d6 - 3" or "2d6 + 1d8"
const dndDiceAdvanced = (instruction) => {
    let [firstRoll, operator, secondRoll] = instruction.split(" ")
    // console.log(firstRoll)
    // console.log(operator)
    // console.log(secondRoll)
    if (operator === "+") {
        return dndDice(firstRoll) + dndDice(secondRoll)
    } else if (operator === "-") {
        return dndDice(firstRoll) - dndDice(secondRoll)
    } else if (operator === "*") {
        return dndDice(firstRoll) * dndDice(secondRoll)
    } else if (operator === "/") {
        return dndDice(firstRoll) / dndDice(secondRoll)
    }
}

const input = process.argv[2]
console.log(dndDice(input)) // and then you try type 'node dice.js "3d8"' in the terminal