newTrainCar = (name, passengers) => {
    return {
        name: name,
        passengers: passengers,
        next: null
    };
}

let head = newTrainCar("engine car", 0);

head.next = newTrainCar("second car", 30);
head.next.next = newTrainCar("third car", 23);
head.next.next.next = newTrainCar("dining car", 5);
head.next.next.next.next = newTrainCar("baggage car", 3);
head.next.next.next.next.next = newTrainCar("caboose", 7);

// This data structure is a LINKED LIST. Try writing the following functions that interact with it:

// 1. Find car by name. Write a function that takes in a name (ie, "dining car") and returns the node with that name. If there is no such node, return null.

findCarByName = (name) => {
    let currentCar = head;
    while (currentCar !== null) {
        if (currentCar.name === name) {
            return currentCar;
        }
        currentCar = currentCar.next;
    }
    return null;
}

console.log("############# 1. find car by name #############");
console.log(findCarByName("dining car"));
console.log(findCarByName("fake car"));

// 2. Write a function that adds a new car to the end of the list. It can call the "newTrainCar" function if you want, but it must then actually add the car to the end of the train (after the caboose).

// my logic: find the last car first,  then add the new car to the end of the list.

addNewCarToEnd = (name, passengers) => {
    let newCar = newTrainCar(name, passengers);
    let currentCar = head;
    while (currentCar.next !== null) {
        currentCar = currentCar.next;
    }
    currentCar.next = newCar;
}

console.log("############# 2. Add new car to end #############");
addNewCarToEnd("new car", 10);
console.log(head);

// 3. Get last car. Write a function that returns the last node in the linked list. If the list is empty, return null.
findLastCar = (head) => {
    let currentCar = head;
    if (currentCar === null) {
        return null;
    }
    while (currentCar.next !== null) {
        currentCar = currentCar.next;
    }
    return currentCar;
}

console.log("############# 3. Get last car #############");
console.log(findLastCar(head));
console.log(head)

// 4. Remove car by name. Write a function that takes in a name and removes the first node with that name. If the name is not found, do nothing.

// my logic: think about how people will remove a car from the train. they just connect the previous car and the car after the one they want to remove. For example, originally it is A->B->C, now they want to remove B, the train becomes A->C.
// so we need to first find out the car we want to remove, then find out its previous car and the car after it. and we set the previous car's next to the car after the one we want to remove.

findPreviousCar = (name) => {
    let currentCar = head;
    while (currentCar.next !== null) {
        if (currentCar.next.name === name) {
            return currentCar;
        }
        currentCar = currentCar.next;
    }
    return null;
}

//console.log(findPreviousCar("dining car"));

removeCarByName = (name) => {
    carToRemove = findCarByName(name);
    if (carToRemove === null) {
        return;
    }
    console.log("carToRemove", carToRemove);
    previousCar = findPreviousCar(carToRemove.name);
    console.log("previousCar", previousCar);
    if (previousCar === null) {
        head = carToRemove.next;
    }
    else {
        previousCar.next = carToRemove.next;
    }
    console.log("previousCar", previousCar);
}

console.log("############# 4. Remove car by name #############");
removeCarByName("new car");
console.log(head);

console.log(findLastCar(head));