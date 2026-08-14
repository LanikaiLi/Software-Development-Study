// "The love you take is equal to the love you make."
// -- The Beatles, The End

const sentenceGraph = {"the":{"love":2},"love":{"you":2},"you":{"take":2,"make":1},"take":{"is":1},"is":{"equal":1},"equal":{"to":1},"to":{"the":1},"make":{}}

// 1. Write a function that takes in a word and returns a list of possible words that could come next, based on the graph. If the word is not in the graph, return null. If the word is in the graph but has no following words (like "make"), return an empty array. The word "the" is followed by the word "love" twice, so it should return this array: ["love", "love"]

const getNextWords = (word) => {
    if (!sentenceGraph[word]) return null

    const result = []
    const nextWords = Object.keys(sentenceGraph[word])
    for (const nextWord of nextWords) {
        for (let i = 0; i < sentenceGraph[word][nextWord]; i++) {
            result.push(nextWord)
        }
    }
    return result
}

console.log(getNextWords("the"))

// 2. Write a function that uses getNextWords to probabalistically predict what word will come after a given word. For example, if you input "you", there should be a 50% chance of it returning "take" and a 50% chance of it returning "make".

const getCount = (wordlist) => {
    const probability = {}
    for (const word of wordlist) {
        if (probability[word]) {
            probability[word]++
        } else {
            probability[word] = 1
        }
    }
    return probability
}

console.log(getCount(["the", "love", "love"]))

const getProbability = (words) => {
    const count = getCount(words)
    const probability = {}
    for (const word of Object.keys(count)) {
        probability[word] = count[word] / words.length
    }
    return probability
}

console.log(getProbability(["the", "love", "love"]))

const predictNextWord = (word) => {
    const nextWords = getNextWords(word)
    //console.log(nextWords)
    const probability = getProbability(nextWords)
    //console.log(probability)
    let highestProbability = 0
    let highestWord = null
    for (const word of Object.keys(probability)) {
       if (probability[word] > highestProbability) {
        highestProbability = probability[word]
        highestWord = word
       }
    }
    return highestWord
}

console.log(predictNextWord("you"))

// 3. Write a function that takes in a string and creates a sentence graph of it in the same style as sentenceGraph. Assume the input will have no punctuation marks.

//my logic: 
// every time I see a word, I add it to the object as a key, then I check what's after the word and if there is no value for the key previously, I add this next word as the key and the value is 1. If the key already exists, I increment the value by 1.

const createSentenceGraph = (sentence) => {
    const words = sentence.split(" ")
    const graph = {}
    for (i = 0; i< words.length; i++) {
        const word = words[i]
        if (!graph[word]) { // the word is not in the graph before
            graph[word] = {}
            graph[word][words[i+1]] = 1
        }
        else{ // the word is in the graph before
            if (graph[word][words[i+1]]) {
                graph[word][words[i+1]]++
            }
            else{
                graph[word][words[i+1]] = 1
            }
        }
    }
    return graph
}

console.log(createSentenceGraph("The love you take is the love you make"))

// 4. Write a function that predicts the next x words in a chain. If you reach a "dead end" word (like "make" in the above graph), restart with the startingWord.

// my logic:
// given a word, I can use predictNextWord to get the next word
// then I can use the next word to get the next word again
// I can do this x times or until I reach a dead end word or the length of the sentence is x
// if I reach a dead end word, I can restart with the startingWord
// I can return the list of words

const predictXWords = (startingWord, x) => {
    const result = []
    let currentWord = startingWord
    for (let i = 0; i < x; i++) {
        const nextWord = predictNextWord(currentWord)
        if (nextWord) {
            result.push(nextWord)
            currentWord = nextWord
        }
        else{
            currentWord = startingWord
        }
    }
    return result
}

console.log ("predict x NEXT WORDS:")
console.log(predictXWords("the", 10))

// 5. Write a function that finds the shortest path from one word to another in the sentence graph. Return an array of words showing the path, or null if no path exists.

const findShortestPath = (startWord, endWord) => {}

if (typeof module !== 'undefined') {
    module.exports = {
        sentenceGraph,
        getNextWords,
        predictNextWord,
        createSentenceGraph,
        predictXWords,
        findShortestPath
    }
}