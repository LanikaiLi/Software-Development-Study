// Write a function that takes in an array of integers and returns a new array containing doubled versions of all the values from the original array which were less than 10.
// For example: conditionalDoubling([1, 5, 19, 9, 10, 6, 4])
// Should return: [2, 10, 18, 12, 8]

const conditionalDoubling = (nums) => nums.filter(n => n < 10).map(n => n * 2)