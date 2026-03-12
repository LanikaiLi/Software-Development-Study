const timeDisplay = document.getElementById('time')
const startButton = document.getElementById('start-btn')
const stopButton = document.getElementById('stop-btn')

let startTime = Date.now()
let elapsedTime = 0

let stopwatchIsRunning = false

const updateDisplay = () => {
    if (stopwatchIsRunning) {
        elapsedTime  = Date.now() - startTime
        timeDisplay.innerText = (elapsedTime / 1000).toFixed(2)
    } else {
        timeDisplay.innerText = (elapsedTime / 1000).toFixed(2)
    }
}

startButton.onclick = () => {
    stopwatchIsRunning = true
    startTime = Date.now()
    updateDisplay()
    setInterval(updateDisplay, 50)
    startButton.disabled = true
    stopButton.disabled = false
}

stopButton.onclick = () => {
    stopwatchIsRunning = false
    updateDisplay()
    startButton.disabled = false
    stopButton.disabled = true
}