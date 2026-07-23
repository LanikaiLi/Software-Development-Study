// Stack: FILO (First In Last Out)
// A stack is a data structure that follows the FILO principle.
// The last element added to the stack is the first element to be removed. 

// push() to add a new element to the top of the stack
// pop() to remove the top element from the stack

const tacoStack = [
    { name: "Marie", hungry: true },
    { name: "Bob", hungry: true },
    { name: "Carlos", hungry: true },
    { name: "Sara", hungry: true },
    { name: "Emma", hungry: true }
  ];

tacoStack.push({ name: "John", hungry: true }); // notice how this new person is added to the top of the stack


while (tacoStack.length > 0) {
    const taco = tacoStack.pop();
    console.log(`${taco.name} got their taco.`);
}