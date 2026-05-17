//build your own method of Javascript's filter method. Your function should be called "myFilter" and it should take in two parameters: an array and a function. It should return a new array which includes only the elements from original array which, when passed into the function, cause it to return true.
// myFilter ([1,2,3], (isEven) => {return isEven % 2 === 0}) // [2]
// myLogic: loop through the array and pass each element into the function, if the function returns true, add the element to a new array. return the new array.

const myFilter = (array, callback) => { // note that here you cannot use 'function' keyword, because it is a reserved keyword used for function declarations, here we are not declaring a function, we are passing a function as an argument.
    let filteredArray = []
    
    array.forEach(element => {
        if (callback(element)) {
            filteredArray.push(element)
        }
    })
    return filteredArray
}

console.log(myFilter([1, 2, 3], (isEven) => isEven % 2 === 0))


//alternative solution:
// this is a prototype method, it is a method that is added to the Array prototype, so that all arrays can use it.
Array.prototype.myFilter = function (funct) {
    const newArray = []
    this.forEach(item => {
        if (funct(item)) {
            newArray.push(item)
        }
    })
    return newArray
}