// Write a function that takes in a nested array of numbers like this:
// [1, [3, 4, [15, [1]], [3, 1, 2]], 9, [8]]
// and returns the sum of all the numbers.
// For a more challenging problem, write a recursive solution.

// my logic:
// find the lowest level of the array and then sum the numbers at that level
// then move up one level and sum the numbers at that level
// continue until you have summed all the numbers in the array



function sumNested(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            sum += sumNested(array[i]);
        } else {
            sum += array[i];
        }
    }
    return sum;
}

console.log(sumNested([1, [3, 4, [15, [1]], [3, 1, 2]], 9, [8]]));