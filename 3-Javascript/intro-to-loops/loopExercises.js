// LOOPS PRACTICE

// PROBLEM 1: Sum Numbers
// Write a while loop that adds all integers from 1 to 10 and returns the result.

// PROBLEM 2: Sum Array
// Write a for loop that takes in an array of numbers and returns the sum of all the numbers in the array.

// PROBLEM 3: Where's Waldo?
// Write a function that takes in the following array of people and returns Waldo's location.

let people = [
    { name: "Elena", location: "Marseille, France" },
    { name: "Marcus", location: "Nairobi, Kenya" },
    { name: "Sofia", location: "Barcelona, Spain" },
    { name: "Amir", location: "Sydney, Australia" },
    { name: "Waldo", location: "Cusco, Peru" },
    { name: "Sean", location: "Marrakesh, Morocco" },
    { name: "Yuki", location: "Kyoto, Japan" },
]

// PROBLEM 4: How Many Vowels?
// Write a function that takes in a string and returns the number of vowels contained in that string.

const howManyVowels = (string) => {
    let vowels = ["a", "e", "i", "o", "u"]
    let count = 0
    for (let i = 0; i<string.length; i++) {
        if (vowels.includes(string[i])){
            count++
        }
    }
    return count
}

// PROBLEM 5: Average Score
// Write a function that takes in the following array of students and returns the average score for the group.

let students = [
    { name: "Emma", score: 92 },
    { name: "Sylvie", score: 95 },
    { name: "Liam", score: 78 },
    { name: "Olivia", score: 88 },
    { name: "Melanie", score: 72 },
    { name: "Marco", score: 89 },
]

const averageScore = (anArray) => {
    let total = 0
    for (let i = 0; i<anArray.length; i++) {
        total += anArray[i].score
    }
    return total / anArray.length
}
// PROBLEM 6: High Score
// Write a function that takes in that same array of students and returns the name of the student with the highest score.

const highestScore = (anArray) => {
    let highest = 0
    for (let i = 0; i<anArray.length; i++) {
        if (anArray[i].score > highest) {
            highest = anArray[i].score
        }
    }
    return highest
}

// PROBLEM 7: Calculate Total Cost
// Write a function that takes in the following array of items with prices and quantities and returns the total cost of all items combined.
// Don't forget the quantities. For example, the total amount spend on apples was 4.50

let items = [
    { product: "apple", price: 1.50, quantity: 3 },
    { product: "milk", price: 2.75, quantity: 1 },
    { product: "peanut butter", price: 4.5, quantity: 1 },
    { product: "onion", price: .75, quantity: 2 },
    { product: "bread", price: 3, quantity: 1 },
]

// PROBLEM 8: Word Search
// Write a function that takes in a word and a string, then returns the number of times that word appears in the string. For example...

// wordSearch("the", "the quick brown fox jumps over the lazy dog")

// ...should return 2, because the word "the" appears 2 times in the string.
// You're going to want to use the split method for this one:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

// PROBLEM 9: Sort Fruits
// Write a function that takes in this list of fruits and sorts them by color:
let fruits = [
    { name: "kiwi", color: "green" },
    { name: "lemon", color: "yellow" },
    { name: "lime", color: "green" },
    { name: "apple", color: "red" },
    { name: "avocado", color: "green" },
    { name: "banana", color: "yellow" },
]
// It should return an object that looks like this:
const sortedFruits = {
    green: ["kiwi", "lime", "avocado"],
    red: ["apple"],
    yellow: ["banana", "lemon"],
}