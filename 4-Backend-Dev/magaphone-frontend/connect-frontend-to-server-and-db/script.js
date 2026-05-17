const form = document.getElementById("new-post-form")
// No trailing slash — `${baseURL}/posts` must not become ...com//posts
const baseURL = "https://software-development-study-2.onrender.com"

const getPosts = async () => {
    try {
        const response = await fetch(`${baseURL}/posts`)
        if (!response.ok) {
            throw new Error(`GET /posts failed: ${response.status}`)
        }
        const posts = await response.json()
        addPostsToPage(posts)
        return posts
    } catch (error) {
        console.error("Could not load posts:", error)
    }
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
        const deleteButton = document.createElement("a")
        deleteButton.className = "delete-button"
        deleteButton.innerText = "❌"

        postBody.innerText = post.body
        postMeta.innerText = post.author

        deleteButton.addEventListener("click", async () => {
            await fetch(
                `${baseURL}/posts/${post._id}`,
                { method: "DELETE" }
            )

            getPosts()
        })

        newListItem.appendChild(postBody)
        newListItem.appendChild(postMeta)
        newListItem.appendChild(deleteButton)

        allPosts.appendChild(newListItem)
    })
}

getPosts()

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const response = await fetch(`${baseURL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body: form.elements.body.value,
            author: form.elements.user.value
        })
    })
    if (!response.ok) {
        console.error("POST /posts failed:", response.status, await response.text())
        return
    }

    getPosts()
    form.reset()
})