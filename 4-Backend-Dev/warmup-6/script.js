// WARMUP PROBLEM:

// Valid Parentheses
// Write a function called “validateParentheses” that takes in a string and returns either true or false, depending on whether the use of (), [], and {} is “valid”. For example:

// “(123[456]7{}89)10” <-- valid
// “[a{bc(d)}ef]” <-- valid
// “)123456]7{{{89)[[10” <-- not valid
// “(abcd[ef)g{]}hi” <-- not valid

//Every opener needs a matching closer, and if they’re nested they need to be cleanly nested.

// my logic: I first extract all the opening and closing parentheses, brackets, and braces from the string. then I put them in a list, if the number of items in the list is odd, then it is not valid, otherwise, I continue to split the list into two parts, te first part is the first half of the list, the second part is the second half of the list. then I reverse the first list and compare it with the second list one item by one item in order, if any item cannot be matched, then it is not valid, otherwise, it is valid.


// const validateParentheses = (string) => {
//     let opening = ["(", "[", "{"]
//     let closing = [")", "]", "}"]
//     let list = []
//     for (let i = 0; i < string.length; i++) {
//         if (opening.includes(string[i])) {
//             list.push(string[i])
//         }
//         else if (closing.includes(string[i])) {
//             list.push(string[i])
//         }
//     }
//     if (list.length % 2 !== 0) {
//         return false
//     }
//     else {
//         let firstHalf = list.slice(0, list.length/2)
//         let secondHalf = list.slice(list.length/2)
//         console.log(secondHalf)
//         secondHalf.reverse()
//         console.log(firstHalf)
//         console.log(secondHalf)
//         for (let i = 0; i < firstHalf.length; i++) {
//             if (firstHalf[i] === "(" && secondHalf[i] !== ")") {
//                 return false
//             }
//             else if (firstHalf[i] === "[" && secondHalf[i] !== "]") {
//                 return false
//             }
//             else if (firstHalf[i] === "{" && secondHalf[i] !== "}") {
//                 return false
//             }
//         }
//         return true
//     }
// }

// console.log(validateParentheses("(123[456]7{}89)10"))
// console.log(validateParentheses("(123[456]7{}89)10"))

// my new logic: I first extract all the opening and closing parentheses, brackets, and braces from the string. then I put them in a list, if the number of items in the list is odd, then it is not valid, otherwise, I loop through the list and if the item is an opening, I push it to a list, if the item is a closing, I pop the last item from the list, if the item is not the same as the last item in the list, then it is not valid.

const opening = ["(", "[", "{"]
const closing = [")", "]", "}"]

const validateParentheses = (string) => {
    const brackets = []
    for (let i = 0; i < string.length; i++) {
        const c = string[i]
        if (c === "(" || c === "[" || c === "{" || c === ")" || c === "]" || c === "}") {
            brackets.push(c)
        }
    }

    if (brackets.length % 2 !== 0) return false

    const stack = []
    for (let i = 0; i < brackets.length; i++) {
        const ch = brackets[i]
        if (opening.includes(ch)) {
            stack.push(ch)
        } else {
            if (stack.length === 0) return false
            const top = stack.pop()
            const ok =
                (ch === ")" && top === "(") ||
                (ch === "]" && top === "[") ||
                (ch === "}" && top === "{")
            if (!ok) return false
        }
    }
    return stack.length === 0
}

console.log(validateParentheses("(123[456]7{}89)10"))
