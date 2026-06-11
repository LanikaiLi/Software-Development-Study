// Write a function called getMostCommonWord that takes in an array of strings (words), and returns whichever word appears most frequently. If multiple words are tied for most common, return any one of them. If the array is empty, return undefined.

// my logic: create a dictionary to store the frequency of each word in the array. then loop through the dictionary and return the word with the highest frequency.

const getMostCommonWord = (words) => {
    let frequency = {}
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if (frequency[word]) { // frequency[word] can contain real values or undefined, undefined is falsy, so it will be treated as false in if statement. You can learn more about falsy values here: https://developer.mozilla.org/en-US/docs/Glossary/Falsy, values that are not falsy are truthy and will be treated as true in if statement.
            frequency[word]++
        } else {
            frequency[word] = 1
        }
    }
    return frequency
}

console.log(getMostCommonWord(["apple", "banana", "apple", "orange", "banana", "apple"]))