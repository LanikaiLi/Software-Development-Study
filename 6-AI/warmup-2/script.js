const orders = [
    { customer: "Michael", amount: 20, item: "tennis racket" },
    { customer: "Wanda", amount: 25, item: "shirt" },
    { customer: "Michael", amount: 55, item: "shoes" },
    { customer: "Alexa", amount: 100, item: "soccer ball" },
    { customer: "Wanda", amount: 40, item: "jacket" },
    { customer: "Michael", amount: 25, item: "socks" },
  ]
  
  // Write a function that takes in a list in the above format and returns an object in the below format, detailing the total amount spent by each customer and what they bought:
  
//   const result = {
//       Michael: {
//           amount: 100,
//           items: ['tennis racket', 'shoes', 'socks']
//       },
//       Wanda: {
//           amount: 65,
//           items: ['shirt', 'jacket']
//       },
//       Alexa: {
//           amount: 100,
//           items: ['soccer ball']
//       }
//   }

// my logic: this is like a SQL group by operation, I need to select sum(amount) and group by customer, and also need to select distinct items for each customer. 
// to get the sum(amount) group by customer, I need to loop through the list, and eveyrtime I encounter a new customer, I need to add the amount to the total amount for that customer.
// to get the distinct items for each customer, I need to loop through the list, and every time I encounter a new item, I need to add the item to the list of items for that customer.

const getTotalAmountSpentByCustomer = (orders) => {
    let result = {}
    for (let i = 0; i < orders.length; i++) {
        let order = orders[i]
        //console.log(order)
        if (result[order.customer]) {
            result[order.customer].amount += order.amount
            result[order.customer].items.push(order.item)
            //console.log(result)
        }
        else {
            result[order.customer] = {
                amount: order.amount,
                items: [order.item]
            }
            //console.log(result)
        }
    }
    return result
}

console.log(getTotalAmountSpentByCustomer(orders))

// alternative solution using reduce method
const getCustomerInfo = (orderList) => {
    return orderList.reduce((accumulator, order) => {
        if (!accumulator[order.customer]) {
            accumulator[order.customer] = {
                amount: 0,
                items: []
            }
        }

        accumulator[order.customer].amount += order.amount
        accumulator[order.customer].items.push(order.item)

        return accumulator
    }, {})
}

console.log(getCustomerInfo(orders))