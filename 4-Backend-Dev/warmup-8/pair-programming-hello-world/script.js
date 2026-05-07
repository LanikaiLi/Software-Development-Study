// Write your JS code here.
// Your goal is to try to write "Hello world." to the page without editing index.html at all.
// If you do this succesfully, try as a challenge to then also write the numbers 1 to 1000 to the page, again without editing index.html.

const body = document.getElementById("main-body") //getElementsById 
body.innerText = "Hello world."

let number = document.createElement("p")
body.appendChild(number)

numberList = []
for (let i = 1; i <=1000; i++) {
    numberList.push(i)
}

number.innerText = numberList.join(" ")