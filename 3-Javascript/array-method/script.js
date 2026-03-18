const array = [1, 2, 3, 4, 5]

// console.log(array.length)
// console.log(array.push(6))
// console.log(array.pop())
// console.log(array.shift())
// console.log(array.unshift(0))
// console.log(array.splice(2, 1))
// console.log(array.slice(2, 4))
// console.log(array.join(" "))
// console.log(array.reverse())
// console.log(array.sort())

const isPalindrome = (string) => {
    string_unified = string.toLowerCase()// make the string lowercase
    reversedString = string_unified.split("").reverse().join("")
    return string_unified === reversedString
}

console.log(isPalindrome("racecar"))
console.log(isPalindrome("hello"))
console.log(isPalindrome("Otto"))