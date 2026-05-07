// 1. write a function that reads all the posts from the DB
// 2. create a form that allows users to make a POST request and create a new post

const form = document.getElementById("new-post-form")
const baseURL = `http://localhost:3000`

const getPosts = async () => {
    const response = await fetch(`${baseURL}/posts`)
    const posts = await response.json()

    addPostsToPage(posts)
    return posts
}

const addPostsToPage = (posts) => {
    const allPosts = document.getElementById("all-posts")
    allPosts.innerHTML = ""

    posts.reverse().forEach(post => {
        const newListItem = document.createElement("li")
        newListItem.className = "post"
        const postBody = document.createElement("p")
        postBody.className = "post-body"
        const postMeta = document.createElement("p")
        postMeta.className = "post-meta"

        postBody.innerText = post.body
        postMeta.innerText = post.author

        newListItem.appendChild(postBody)
        newListItem.appendChild(postMeta)

        allPosts.appendChild(newListItem)
    })
}

getPosts()

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    await fetch(
        `${baseURL}/posts`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                body: form.elements.body.value,
                author: form.elements.user.value
            })
        }
    ).then((response) => {
        return response.json()
    })

    getPosts()
    form.reset()
})