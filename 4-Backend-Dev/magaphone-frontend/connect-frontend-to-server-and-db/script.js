const form = document.getElementById("new-post-form")
// No trailing slash — `${baseURL}/posts` must not become ...com//posts
//const baseURL = "https://software-development-study-2.onrender.com"
const baseURL = "http://localhost:3000"

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
        const postMeta = document.createElement("div")
        postMeta.className = "post-meta"
        const postTime = document.createElement("p")
        postTime.className = "post-time"
        const deleteButton = document.createElement("a")
        deleteButton.className = "delete-button"

        const timePosted = new Date(post.createdAt).getTime()
        const secondsSincePosted =Math.round((Date.now() - timePosted) / 1000)
        let unitOfTime = "second"
        let numberOfUnits = secondsSincePosted

        if (numberOfUnits >= 60) {
            unitOfTime = "minute"
            numberOfUnits = Math.round(numberOfUnits / 60)
        }

        if (numberOfUnits >= 60) {
            unitOfTime = "hour"
            numberOfUnits = Math.round(numberOfUnits / 60)
        }

        if (numberOfUnits >= 24) {
            unitOfTime = "day"
            numberOfUnits = Math.round(numberOfUnits / 24)
        }

        deleteButton.innerText = "🗑️"
        
        // Build the meta header: username and time posted
        const authorName = document.createElement("span")
        authorName.className = "author-name"
        authorName.textContent = post.author
        authorName.addEventListener("click", (event) => {
            console.log(event)
        })
        postMeta.appendChild(authorName)
        postMeta.appendChild(postTime)
        
        postTime.innerText = `posted ${numberOfUnits} ${unitOfTime}${numberOfUnits !== 1 ? "s" : ""} ago.`
        postBody.innerText = post.body

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
        postMeta.appendChild(postTime)

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