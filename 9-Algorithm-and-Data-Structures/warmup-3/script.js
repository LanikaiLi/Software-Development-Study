// A new sandwich shop just opened in the neighborhood. The shop has two
// employees on the floor at a time: a cashier and a sandwich-maker.

// Write two functions:

// addSandwichToQueue(sandwich, customer)

// getSandwichFromQueue()

// When the cashier takes an order, they will run the first function, recording
// the name of the sandwich and the name of the customer who ordered it:

// addSandwichToQueue("tuna melt", "Ben G.")

// When the sandwich-maker is ready to start making a sandwich, they will run:

// getSandwichFromQueue()

// The function should tell them what sandwich to make next and who it's for.
// The customers will get very upset if the sandwiches are not made in the same
// order that they were bought.

// Implement a QUEUE that meets the sandwich shop's needs.

// (If you finish with time leftover: make it so getSandwichFromQueue also tells
// the sandwich-maker how long the customer has been waiting since their order was
// added to the queue.)

// my logic:
// first think about what this queue will look like
// [(sandwich, customer), (sandwich, customer), (sandwich, customer)]

// next think about what the functions will do / return:
// before running addSandwichToQueue: the queue should look like []
// after running addSandwichToQueue once: the queue should look like [("tuna melt", "Ben G.")]
// after running addSandwichFromQueue twice: the queue should look like [("tuna melt", "Ben G."), ("tomato cheese", "John D.")]

// now if we run  getSandwichFromQueue once: the queue should look like [("tomato cheese", "John D.")] and it should return "tuna melt", "Ben G."
// now if we run  getSandwichFromQueue twice: the queue should look like [] and it should return "tomato cheese", "John D."

let queue = [];

function addSandwichToQueue(sandwich, customer) {
    queue.push([sandwich, customer]);
}

function getSandwichFromQueue() {
    if (queue.length === 0) {
        return "No sandwiches in the queue";
    }
    return queue.shift();
}

addSandwichToQueue("tuna melt", "Ben G.");
console.log(queue);
addSandwichToQueue("tomato cheese", "John D.");
console.log(queue);
let sandwich_1 = getSandwichFromQueue();
console.log(sandwich_1);
console.log(queue);

let sandwich_2 = getSandwichFromQueue();
console.log(sandwich_2);
console.log(queue);


let sandwich_3 = getSandwichFromQueue();
console.log(sandwich_3);
console.log(queue);