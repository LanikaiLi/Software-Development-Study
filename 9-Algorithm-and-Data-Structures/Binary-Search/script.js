// Given a sorted array of numbers and a target value, find the index of the target (or -1 if not present).
// For example: if numbers = [1, 3, 4, 5, 7, 9, 11, 15], and target = 9, it should return 5

// O(n)
const search = (numbers, target) => {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            return i
        }
    }
    return -1
}

// O(log n)
// if you don't understand, you simulate once on a piece of paper and you will understand
// you write down the number of iterations, and what's the value of left, right and middle at each iteration
const binarySearch = (numbers, target) => {
    let left = 0
    let right = numbers.length - 1
    
    while (left <= right) {
        const middle = Math.floor((left + right) / 2)

        if (numbers[middle] === target) {
            return middle
        } else if (numbers[middle] < target) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }

    return -1
}

// Extended homework:
// think about binary tree, binary search tree and how binary search is related with them
// think about practical applications of BT and BST in real life