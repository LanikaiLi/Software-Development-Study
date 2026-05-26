// Using a file called user-object.js containing the following user object...

const exampleUser = {
    username: "Super Mario",
    timeJoined: 1779830792566,
    posts: [
        {
            time: 1779834314145,
            content: "It's a me, Mario!"
        },
        {
            time: 1779834410654,
            content: "Wahoo!"
        },
        {
            time: 1779834676218,
            content: "Let's a go!"
        },
    ]
}


// my logic: use process.argv to collect the user input, then use a switch statement to handle the different inputs.
// for example, if the user input is "username", I should return the username of the user.
// if the user input is "age", I should return the number of minutes since the user joined.
// if the user input is "posts", I should return a list of the contents of all the user's posts.
// if the user input is "lastpost", I should return the number of seconds since the last time the user posted.
// if the user input is "averagepostlength", I should return the average number of characters per post, rounded to 1 decimal place.

user_input = process.argv[2]

const input = process.argv[2]

switch (input) {
    case "username":
        console.log(`Username: ${exampleUser.username}`)
        break;
    case "age":
        const millisecondAge = Date.now() - exampleUser.timeJoined
        console.log(`This user joined ${(millisecondAge / 60000).toFixed(2)} minutes ago.`)
        break;
    case "posts":
        console.log(exampleUser.posts.map(post => post.content))
        break;
    case "lastpost":
        let mostRecentPost = {time : 0}
        exampleUser.posts.forEach(post => {
            if (post.time > mostRecentPost.time) {
                mostRecentPost = post
            }
        })
        const milisecondsSincePosted = Date.now() - mostRecentPost.time
        console.log(`This user's most recent post was made ${Math.round(milisecondsSincePosted / 1000)} seconds ago.`)
        break;
    case "averagepostlength":
        let totalPostLength = 0
        exampleUser.posts.forEach(post => {
            totalPostLength += post.content.length
        })
        const averageLength = totalPostLength / exampleUser.posts.length
        console.log(`The average length for this user's posts is ${averageLength.toFixed(1)} characters.`)
        break;
    default:
        console.log(`Command "${input}" not recognized.`)
        break;
}

// ...write a script which can accept the following inputs through the terminal to produce the following results

// user-object.js username
    // Returns the username ("Super Mario")
// user-object.js age
    // Returns the number of minutes since the user joined
// user-object.js posts
    // Returns a list of the contents of all the user's posts.
// user-object.js lastpost
    // Returns the number of seconds since the last time the user posted.
// user-object.js averagepostlength
    // Returns the average number of characters per post, rounded to 1 decimal place