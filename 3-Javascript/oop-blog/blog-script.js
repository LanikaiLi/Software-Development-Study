const allPosts = []
let nextUniqueId = 100

class User {
    constructor (username) {
        this.username = username
        this.timeJoined = Date.now()
        this.id = nextUniqueId++
    }

    makePost (text) {
        const newPost = new Post(text, this)
        allPosts.push(newPost)
        updateDOM()
    }
}

class Post {
    constructor (text, author) {
        this.body = text
        this.author = author
        this.time = Date.now()
        this.likes = 0
        this.id = nextUniqueId++
    }
}

class Admin extends User {
    constructor (username) {
        super(username) // call the constructor of the parent class
        this.canDeletePosts = true
    }

    deletePost (PostID) {
        if (!this.canDeletePosts) {
            console.log("You are not authorized to delete posts.")
            return false
        }
        const index = allPosts.findIndex((post) => post.id === PostID)
        if (index === -1) {
            return false
        }
        allPosts.splice(index, 1)
        updateDOM()
        console.log("Post deleted successfully.")
        return true
    }
}

let peter = new User("Peter Parker")
peter.makePost("Hi everybody.")
peter.makePost("I am spider man")

let Phoenix = new Admin("Phoenix")

interval = setInterval(() => {
    updateDOM()
}, 2000)