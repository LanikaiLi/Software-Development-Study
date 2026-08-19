// Given a list of numbers, write a function that determines whether the list contains any duplicates.

// O(n^2)
// the space complexity is O(1) because we are not using any additional memory, this one is the best in terms of space complexity
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
// this one uses more space than the first one because we are sorting the array
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
// even though this is the best time complexity, it is not the best space complexity
// space complexity means the amount of local memory used by our code (algorithm)
// in this case, we are using an object to store the numbers we have seen
// so the space complexity is O(n)
// in most cases, space is not as important as time
// but if you are dealing with robotics, or medical devices where the chip is very small and tiny, you need to consider space complexity
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