// Queue: FIFO (First In First Out)
// A queue is a data structure that follows the FIFO principle.
// The first element added to the queue is the first element to be removed.
// The last element added to the queue is the last element to be removed.

// shift() to remove the first element from the queue
// push() to add a new element to the end of the queue

const tacoQueue = [
    { name: "Marie", hungry: true },
    { name: "Bob", hungry: true },
    { name: "Carlos", hungry: true },
    { name: "Sara", hungry: true },
    { name: "Emma", hungry: true }
  ];

  tacoQueue.push({ name: "John", hungry: true }); // notice how this new person is added to the end of the queue
  
  while (tacoQueue.length > 0) {
      const person = tacoQueue.shift(); // notice how this person is removed from the beginning of the queue
      person.hungry = false;
      console.log(`${person.name} got their taco. Hungry: ${person.hungry}`);
  }
  
  console.log("Line is empty!");

