const cartItems = [
    { name: 'milk', price: 4 },
    { name: 'bread', price: 3 },
    { name: 'apples', price: 5 },
    { name: 'toothpaste', price: 6 },
    { name: 'shampoo', price: 8 }
]

// In this cartItems list, each item has a name and a price. Try writing the following functions:

getNumberOfItems = (cart) => {
    // returns the number of items in the cart.
    return cart.length
}

getTotalPrice = (cart) => {
    // returns the total price of the items in the cart.
    let total = 0
    cart.forEach (item => {
        total += item.price
    })
    return total
}

getMostExpensiveItem = (cart) => {
    // returns the name of the most expensive item in the cart.
    let mostExpensiveItem = cart[0]
    cart.forEach (item => {
        if (item.price > mostExpensiveItem.price) {
            mostExpensiveItem = item
        }
    })
    return mostExpensiveItem.name
}