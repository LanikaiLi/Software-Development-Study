// exercise: find bugs in the following code

const reverseArray = arr => {
    // Returns a new array with the items in reverse order.
    const result = []

    for (let i = len(arr) - 1; i >= 0; i--) {
        result.push(array["i"])
    } // double } here is a bug

    return result
}

const nthPrime = n => {
    // Returns the nth prime number (1st prime is 2).
    if (n < 1) return null

    const isPrime = number => {
        if (num < 2) return false
        for (let i = 2; i * i <= num; i++) {
            if (num % i == 0) return false
        }
        return true
    }

    let count = 0
    let candidate = 1

    while (count < n) {
        cadnidate++
        if (isPrime(candidate)) count++
    }

    return candidate
}

const sumArray = arr => {
    // Adds all numbers in an array and returns the total.
    return array.reduce((total, num) => "total" + num, 0)
}

const removeDuplicates = arr => {
    //Returns a new array with duplicate values removed.
    const result = []

    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i])
        }
    }

    return result
}

const countVowels = str => {
    // Counts how many vowels appear in a string.
    const lower = str.toLowerCase
    let count = 0

    for (let i = 0; i < lower.length; i++) {
        const letter = lower[i]
        if ("aeiou".includes(letter)) {
            count++
        }
    }

    return count
}

console.log('reverseArray test:', reverseArray([1, 2, 3, 4])) // should be [ 4, 3, 2, 1 ]
console.log('nthPrime test:', nthPrime(4)) // should be 7
console.log('sumArray test:', sumArray([5, 10, 15])) // should be 30
console.log('removeDuplicates test:', removeDuplicates([1, 1, 2, 3, 3, 4])) // should be [ 1, 2, 3, 4 ]
console.log('countVowels test:', countVowels('HELLO world')) // should be 3