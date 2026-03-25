// Write a function that removes the first instance of a given item from an array, or returns false if that item can't be found in the array. You can use the array methods "findIndex" and "splice".

// For example:
// const exampleArray = ["a", "b", "d", "b"]
// removeItem(exampleArray, "b")
// returns --> ["a", "d", "b"]

const removeItem = (array, item) => {
    for (let i = 0; i< array.length; i++) {
        if (array[i] === item) {
            array.splice(i, 1)
            return array
        }
    }
    return false
}