// https://openlibrary.org/search.json

// Use this public API to make a fetch request searching for a specific book of your choice. Once the book is successfully fetched, log the title, author, and the year it was first published.

// The API works by adding a query parameter to the end of the URL. For example, here is the URL endpoint to search for the book The Hobbit.
// https://openlibrary.org/search.json?q=The%20Hobbit

const bookTitle = 'Gone with the Wind'
const URL = `https://openlibrary.org/search.json?q=${bookTitle}`

async function fetchBook() {
    const response = await fetch(URL)
    const data = await response.json()
    return data
}

const book = await fetchBook()
console.log("Title: " + book.docs[0].title)
console.log("Author: " + book.docs[0].author_name[0])
console.log("Year: " + book.docs[0].first_publish_year)
