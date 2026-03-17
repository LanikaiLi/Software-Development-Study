// easy:
// Coin flipper.
// Write a function called flipCoin that returns either "heads" or "tails" at random.
// hint: remember the Math.random function.
const flipCoin = () => {
    return Math.random() < 0.5 ? "heads" : "tails"
}

// medium:
// A words.
// Write a function called removeNonAWords that filters an array of strings, returning a new array containing only the strings that start with "A" or "a".
// For example: removeNonAWords(["apple", "banana", "Australia", "piano"]) should return ["apple", "Australia"].
const removeNonAWords = (words) => {
    let nonAwords = []
    for (let i = 0; i<words.length; i++) {
        if (words[i][0] == "a" || words[i][0] == "A") {
            nonAwords.push(words[i])
        }
    }
    return nonAwords
}

// hard:
// Prime number detector.
// Write a function that determines whether a positive integer is prime.
// If the input is not a positive integer, return false.
const isPrime = (n) => {
    if (n <= 1) {
        return false
    }
    for (let i = 2; i<=Math.sqrt(n); i++) { // only need to check up to the square root of n because if n is divisible by a number greater than the square root of n, then it is divisible by a number less than the square root of n
        if (n % i == 0) {
            return false
        }
    } // if n is not divisible by any number up to the square root of n, then n is prime    
    return true
}

// if u try to redeclare the function, it will not work because the function is previously defined as const, meaning it is immutable and cannot be changed
// but ig you declare the function using 'funcion' like below, it will work because the function is now mutable and can be changed
// function isPrime(n) {
//     if (n <= 1) {
//         return false
//     }
//     for (let i = 2; i<=Math.sqrt(n); i++) { // only need to check up to the square root of n because if n is divisible by a number greater than the square root of n, then it is divisible by a number less than the square root of n
//         if (n % i == 0) {
//             return false
//         }
//     } // if n is not divisible by any number up to the square root of n, then n is prime    
//     return true
// }