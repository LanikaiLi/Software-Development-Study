//Create a file called egg-timer.js which allows you to type node egg-timer.js 10 into the terminal. When you hit enter, it should begin a countdown: logging the number 10, then, after a delay of exactly one second, the number 9, then 8, then 7, all the way down to 0, at which point it should stop. You should be able to replace 10 with any number of your choice and have it still work. 

// my logic: colect the number from user input and then use a for loop to countdown from the number to 0, use a function to make sure the delay is exactly one second - use setTimeout(), how to collect user input from the parameter? - use process.argv how to use process.argv to collect user input? - use process.argv[2] to collect the user input

const eggTimer = () => {
    const number = process.argv[2]
    for (let i = number; i >= 0; i--) { 
        setTimeout(() => {
            console.log(i)
        }, (number - i) * 1000)  // 0s for 10, 1s for 9, ..., 10s for 0
    }
}

eggTimer()

// with user input validation
const startTime = parseInt(process.argv[2])
if (isNaN(startTime) || startTime <= 0) {
    console.log("Input must be a positive integer.")
} else {
    if (process.argv.length > 3) {
        console.log("The program can only accept one integer at a time as an input.")
    }
    console.log(startTime)
    let currentTime = startTime
    
    const interval = setInterval(() => {
        if (currentTime <= 1) {
            clearInterval(interval)
        }
        currentTime -= 1
        console.log(currentTime)
    }, 1000)
}