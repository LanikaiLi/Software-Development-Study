const assert = require('assert')
const {
    sentenceGraph,
    getNextWords,
    predictNextWord,
    createSentenceGraph,
    predictXWords,
    findShortestPath
} = require('../sentence-graph.js')

describe('sentence graph helpers', () => {
    it('getNextWords returns repeated next words', () => {
        assert.deepStrictEqual(getNextWords('the'), ['love', 'love'])
    })

    it('predictNextWord returns the only possible next word', () => {
        assert.strictEqual(predictNextWord('the'), 'love')
    })

    it('createSentenceGraph builds the expected graph', () => {
        assert.deepStrictEqual(
            createSentenceGraph('hello sun hello moon'),
            {
                hello: { sun: 1, moon: 1 },
                sun: { hello: 1 },
                moon: {}
            }
        )
    })

    it('predictXWords follows a simple chain', () => {
        assert.deepStrictEqual(predictXWords('the', 2), ['love', 'you'])
    })

    it('findShortestPath returns the shortest path', () => {
        assert.deepStrictEqual(
            findShortestPath('love', 'the'),
            ['love', 'you', 'take', 'is', 'equal', 'to', 'the']
        )
    })
})
