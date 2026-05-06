// 1. write a function that reads all the posts from the DB
// 2. create a form that allows users to make a POST request and create a new post

const baseUrl = "http://localhost:3000"

const form = document.getElementById("post-form")

const getPosts = async() => {
    const response = await fetch(`${baseUrl}/posts`)
    const data = await response.json()

    //console.log(data)
    return data
}

//getPosts()

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const newPost = await fetch(
        `${baseUrl}/posts`, 
        {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                body: document.getElementById("post-body").value,
                author: document.getElementById("user").value,
            })
        }
    ).then((response) => {
        return response.json()
    })
})