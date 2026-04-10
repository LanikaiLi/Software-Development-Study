const input = process.argv.slice(2, process.argv.length)

const randomIndex = Math.floor(Math.random() * input.length)

console.log(randomIndex)

const randomArg = () => {
    return input[Math.floor(Math.random() * input.length)]
}

console.log(randomArg()) // and then you try type 'node pick-random-arg.js "apple" "banana" "cherry"' in the terminal