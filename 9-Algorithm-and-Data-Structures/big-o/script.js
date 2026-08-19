// Given a list of numbers, write a function that determines whether the list contains any duplicates.

// O(n^2)
const hasDuplicate = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] === numbers[j]) {
                return true
            }
        }
    }
    return false
}

// O(n log n)
const hasDuplicate2 = (numbers) => {
    numbers.sort((a, b) => a - b)

    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === numbers[i - 1]) {
            return true
        }
    }

    return false
}

// O(n)
const hasDuplicate3 = (numbers) => {
    const seen = {}

    for (let i = 1; i < numbers.length; i++) {
        if (seen[numbers[i]]) {
            return true
        }
        seen[numbers[i]] = true
    }

    return false
}