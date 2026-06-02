// Warmup for Thursday: HTML Form
// Create an HTML form that lets a user enter:
// Their name
// Their favorite color
// On submit, log their name to the console.
// Bonus: change the page background to their favorite color.

// my logic: i have he form in a separate html file, i only need to use this code to get the input name and favorite color, then log the name to the console, and change the page background to the favorite color.

// TODO: watch 7:00-7:10 PM recording, talks about how to get the input value from the event instead of the element's value. 

const nameForm = document.getElementById("name-form")
nameForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event)
    const name = document.getElementById("name").value
    const favoriteColor = document.getElementById("favorite-color").value
    console.log(name)
    console.log(event.target[0].value) // this is another way to get the input value from the event, it is more general and flexible than the previous way.

    document.body.style.backgroundColor = favoriteColor
})