// Given a string, return the first non-repeating character in that string. Ignore case.

// Given a string, return the first character that appears twice in a row. Ignore case. If no character appears twice in a row, return an empty string.

// Given a string, return true if you can remove exactly one character to make it a palindrome. Ignore case. 

// firstNonRepeatingCharacter("Banana boat") --> "O" because it is not case sensitive and "O" is the first non-repeating character.

// my logic: create a dictionary to store the frequency of each character in the string. then loop through the dictionary and return the first character with a frequency of 1.

const firstNonRepeatingCharacter = (string) => {
    let frequency = {}
    for (let i = 0; i < string.length; i++) {
        let char = string[i].toLowerCase()
        if (frequency[char]) {
            frequency[char]++
        }
        else {
            frequency[char] = 1
        }
    }
    // return frequency
    // if the character is ' '  then continue
    // for (let char in frequency) {
    //     console.log(frequency[char]) // is the number of times the character appears in the string
    //     console.log(char) // is the character itself
    // }
    for (let char in frequency) {
        if (char === ' ') {
            continue
        }
        else {
            if (frequency[char] === 1) {
                return char
            }
        }
    }
    return ""
}

const input = process.argv[2]
console.log(firstNonRepeatingCharacter(input))