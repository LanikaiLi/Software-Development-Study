//LINKED LIST: A linked list is a data structure that consists of a series of nodes. Each node contains a value and a pointer to the next node in the list. The last node in the list points to null.

// This data structure represents a train with 6 linked cars. We need to make sure everybody paid for their ticket. Write a function that takes in the variable "head", and counts how many total passengers are on board the train.

// If you're not sure how to get started, try copying this whole thing into a browser console and running the code. Then explore the value of "head".

addTrainCar = (name, passengers) => {
    return {
        name: name,
        passengers: passengers,
        next: null
    };
}

const head = addTrainCar("engine", 0);

head.next = addTrainCar("secondCar", 30);
head.next.next = addTrainCar("thirdCar", 13);
head.next.next.next = addTrainCar("diningCar", 5);
head.next.next.next.next = addTrainCar("fifthCar", 27);
head.next.next.next.next.next = addTrainCar("caboose", 7);

// my logic: 

// imagine I am like a ticket inspector, I start from the head car of the train and loop till the last car of the train, on each train, I do same things:
// - I cound number of passengers in current car
// - I add the number of passengers in the current car to the total number of passengers
// - then I move to the next car. 
// At start, the total number of passengers is 0, as I count, the total number of passengers is updated, until I go through all the cars of the train.

const countPassengers = (head) => {
    let totalPassengers = 0;
    let currentCar = head;
    while (currentCar !== null) {
        totalPassengers += currentCar.passengers;
        currentCar = currentCar.next;
    }
    return totalPassengers;
}

console.log(countPassengers(head));