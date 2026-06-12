// Write a function called predictNextWord that takes in a sentence, plus a word, and tells the user what word is most likely to come next.

// For example:

const sentence = "On weekends I usually go for a walk in the park near my house, and I usually stop for coffee afterwards. I usually go with a friend, but sometimes I go alone."

// This should return "go", because 2 out of 3 times the word "usually" appeared in the sentence, the next word was "go".

// Make it non-case-sensitive ("On" == "on" == "ON")

// If there's more than one equally likely word, just return one of them. If there's no next word info available, return an empty string.

// my logic: coop through the sentence, locate the word, and save its next word as a list, [go, with, alone], and then find the most common word in the list
// if there's a tie, return the first one of the tie, if there's nothing, return an empty string.

const getNextWords = (sentence, word) => {
    let words = sentence.split(" ")
    let nextWords = []
    for (let i = 0; i < words.length; i++) {
        if (words[i] === word) {
            nextWords.push(words[i + 1])
        }
    }
    return nextWords
}

const getMostCommonWord = (list) => {
    let wordInfo = {}

    list.forEach(word => {
        if (wordInfo[word]) {
            wordInfo[word] += 1
        } else {
            wordInfo[word] = 1
        }
    })

    let mostCommonSoFar = list[0]

    for (const word in wordInfo) {
        if (wordInfo[word] > wordInfo[mostCommonSoFar]) {
            mostCommonSoFar = word
        }
    }

    return mostCommonSoFar
}


const predictNextWord = (sentence, word) => {
    let nextWords = getNextWords(sentence, word)
    if (nextWords.length === 0) {
        return ""
    }else{
        let mostCommonWord = getMostCommonWord(nextWords)
        return mostCommonWord
    }
}

console.log(predictNextWord(sentence, "usually"))

// alternative
const predictNextWord_2 = (inputText, keyWord) => {
    const tokens = inputText.toLowerCase().split(/[ ,;\.]/).filter(token => token)
    const tokenRecords = {}

    tokens.forEach((token, index) => {
        if (tokenRecords[token]) {
            tokenRecords[token].followingWords.push(tokens[index + 1])
        } else {
            tokenRecords[token] = {
                token: token,
                followingWords: [tokens[index + 1]]
            }
        }
    })

    console.log(tokenRecords)
    return getMostCommonWord(tokenRecords[keyWord].followingWords)
}