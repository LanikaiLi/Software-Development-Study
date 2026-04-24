// Rotate an Array:

// Move the first element of an array to the end.

// rotate([1, 2, 3]) // [2, 3, 1] // [3,1,2] / [1,2,3]

// Extension:
// Rotate n times -- put in a parameter (n) and "rotate" it that number of times.

// my logic:
// I first split the array into two parts, the first part contains the first n elements, 
// the second part contains the rest of the elements. then I change the order of the two, and concatenate them.

const rotate = (array, n) => {
    let firstPart = array.slice(0, n)
    let secondPart = array.slice(n)
    return secondPart.concat(firstPart)
}

console.log(rotate([1, 2, 3], 1)) // [2, 3, 1]
console.log(rotate([1, 2, 3], 2)) // [3, 1, 2]
console.log(rotate([1, 2, 3], 3)) // [1, 2, 3]