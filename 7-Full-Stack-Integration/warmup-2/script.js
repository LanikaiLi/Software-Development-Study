const book = {"title":"Pride and Prejudice","author":"Jane Austen","language":"English","year":1813,"tags":["Romance","Classic"],"publishingCompany":"T. Egerton, Whitehall","serial":"PR4034.P7","inventory":2,"unitsSold":4}

// Write a function called buyBook to run when a customer purchases a book. This function should take in a book object (like the one above) as an argument, and then:
    // reduce "inventory" by 1
    // increase "unitsSold" by 1
    // if "inventory" is reduced to 0, add " (out of stock)" to the end of the book's title.
    // return the modified book object
    // if "inventory" is already at 0, do none of the above, and instead return a string saying "that book is out of stock"

function buyBook(book) {
    if (book.inventory === 0) {
        return "that book is out of stock";
    }else {
        book.inventory--;
        book.unitsSold++;
        if (book.inventory === 0) {
            book.title += " (out of stock)";
        }
        return book;
    }
}

console.log(buyBook(book));