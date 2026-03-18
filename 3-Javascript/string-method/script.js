const string = "Phoenix is a good girl!"

console.log(string.length)
console.log(string.toUpperCase())
console.log(string.toLowerCase())
console.log(string.indexOf("good"))
console.log(string.slice(0, 5))
console.log(string.replace("good", "great"))
console.log(string.split(" "))
console.log(string.charAt(0))
console.log(string.charCodeAt(0))
console.log(string.concat(" and she is a good girl"))
console.log(string.startsWith("Phoenix"))
console.log(string.endsWith("girl"))
console.log(string.includes("good"))

function reverseWords(string) {
    resultarray = []
    splitString = string.split(" ")
    for (let i = 0; i<splitString.length; i++) {
        splitString[i] = splitString[i].split("").reverse().join("")
        resultarray.push(splitString[i])
        console.log(resultarray)
    }
    return resultarray.join(" ")
}

console.log(reverseWords(string))