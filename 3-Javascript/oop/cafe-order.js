class MenuItem {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    getPriceFor(quantity) {
        return (this.price * quantity).toFixed(2)
    }

    placeOrder(quantity) {
        console.log(`${this.name} ×${quantity}: $${this.getPriceFor(quantity)}`)
    }
}

class DrinkItem extends MenuItem {
    constructor(name, price, size) {
        super(name, price)
        this.size = size
    }

    getSizeUpcharge() {
        if (this.size === "small") {
            return 0
        } else if (this.size === "medium") {
            return 0.75
        } else if (this.size === "large") {
            return 1.25
        }
    }

    getPriceFor(quantity) {
        return ((this.price + this.getSizeUpcharge()) * quantity).toFixed(2)
    }
}

const bagel = new MenuItem ("bagel", 2.50)
new MenuItem ("muffin", 3.00)
const coffee = new DrinkItem ("coffee", 1.75, "large")
new DrinkItem ("tea", 1.50, "large")

bagel.placeOrder(1)
coffee.placeOrder(2)