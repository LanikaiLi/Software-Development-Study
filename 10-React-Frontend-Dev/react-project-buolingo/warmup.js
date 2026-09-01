// Given this array:
const users = [
  ["charlie", "brown"],
  ["snoopy"],
  ["peppermint", "patty"],
  [],
  ,
  []
];

// Write a getDisplayName(user) function that takes in one of these arrays and returns the full name as a string with the first letter of each name capitalized, or returns "Unknown" if there is neither a first nor last name.

// const getDisplayName = (users) => {
//     result = []
//     users.forEach(user => {
//         if (user.length === 0) {
//             result.push("Unknown")
//         }
//         else if (user.length === 1) {
//             result.push(user[0].charAt(0).toUpperCase() + user[0].slice(1))
//         }
//         else if (user.length === 2) {
//             result.push(user[0].charAt(0).toUpperCase() + user[0].slice(1) + " " + user[1].charAt(0).toUpperCase() + user[1].slice(1))
//         }
//         else {
//            result.push("format error")
//            console.log(user)
//         }
//     })
//     return result.join(" ")
// }


// console.log(getDisplayName(users))

// alternative solution
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const getDisplayName = (user) => {
    if (user?.length === 0) return "unknown"

    const [firstName, lastName] = user

    return [firstName, lastName].filter(Boolean).map(capitalize).join(" ")
}

users.forEach(user => {
    console.log(getDisplayName(user))
})