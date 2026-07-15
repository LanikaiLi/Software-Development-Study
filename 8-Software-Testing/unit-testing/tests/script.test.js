import {expect} from 'chai'
import {reverseArray, nthPrime, sumArray, removeDuplicates, countVowels} from '../script.js'

describe('Tests for script.js functions', () => {
    it('should reverse an array', () => {
        expect(reverseArray([1, 2, 3, 4])).to.deep.equal([4, 3, 2, 1]) // need to use deep because js by nature does not agree that [1,2,3] == [1,2,3], js is a wierd language
    })
})