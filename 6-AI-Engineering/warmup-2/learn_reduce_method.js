let numbers = [5, 3, 5, 7, 1, 2, 9]

// basically, reduce method works like this: reduce(a function, accumulator), where the accumulator is the initial value of the result you want to get.
// the function is applied to each element of the array, for example, numbers below is the array
let sumTotal = numbers.reduce((acc, number) => acc + number, 0)

console.log(sumTotal)

let words = ["Hi", "how", "are", "you"]

let sentence = words.reduce((acc, word) => `${acc} ${word}`, "")

console.log(sentence)