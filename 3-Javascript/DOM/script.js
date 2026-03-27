[{"body":"Foundation pour completed for Building A. Concrete is curing as expected.","author":{"username":"Maria Gonzalez","id":401},"time":1774562647010,"id":501},{"body":"Framing materials arrived on-site this morning. Scheduled to start installation tomorrow.","author":{"username":"Liam O'Connor","id":402,"canDeletePosts":true},"time":1774562664689,"id":502},{"body":"Noticed a minor crack on the east side of the foundation — marking it for inspection.","author":{"username":"Maria Gonzalez","id":401},"time":1774562671439,"id":503},{"body":"Inspection scheduled for 2 PM today. Will update once we have the report.","author":{"username":"Ethan Wright","id":403},"time":1774562689000,"id":504},{"body":"Electrical team confirmed rough-in work will begin on Monday.","author":{"username":"Aisha Khan","id":404},"time":1774562705123,"id":505},{"body":"Weather delay expected tomorrow due to heavy rain — outdoor work paused.","author":{"username":"Liam O'Connor","id":402,"canDeletePosts":true},"time":1774562730001,"id":506},{"body":"Inspection complete: crack is superficial, no structural concerns.","author":{"username":"Ethan Wright","id":403},"time":1774562802456,"id":507},{"body":"Framing started on the ground floor. Progress is on schedule so far.","author":{"username":"Maria Gonzalez","id":401},"time":1774562856789,"id":508},{"body":"Received updated blueprints from the architect — reviewing changes to stairwell layout.","author":{"username":"Aisha Khan","id":404},"time":1774562901123,"id":509},{"body":"Safety check completed for the week. All crews are compliant with site regulations.","author":{"username":"Ethan Wright","id":403},"time":1774562953345,"id":510}] // this is the data we will be using to render the blog posts

let container = document.getElementById("container")

const updateDOM = (listOfPosts) => {
    container.innerHTML = ""
    for (let i = 0; i < listOfPosts.length; i++) {
        let newListItem = document.createElement("li")
        newListItem.innerText = `${listOfPosts[i].body} —${listOfPosts[i].author.username}`

        container.appendChild(newListItem)
    }
}

updateDOM(posts)

let textInput = document.getElementById("text-input")

textInput.addEventListener("input", () => {
    const searchString = textInput.value.toLowerCase()
    let filteredPosts = []
    posts.forEach(post => {
        if (post.body.toLowerCase().includes(searchString)) {
            filteredPosts.push(post)
        }
    })
    updateDOM(filteredPosts)
})