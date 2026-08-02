// Write a function that takes in a string and returns true if every opening parenthesis has a matching closing parenthesis, or false otherwise.

// Examples:
// isValidParentheses("(())") -> true
// isValidParentheses("hi (hello)") -> true
// isValidParentheses("(()") -> false
// isValidParentheses("hello ) there") -> false

// my logic: put the parantheses into a stack. if the current paranthesis is an opening paranthesis, push it into the stack. if the current paranthesis is a closing paranthesis, pop the stack and check if the popped paranthesis is the matching opening paranthesis. if it is, continue, if it is not, return false. in the end, if the stack is empty, return true.

class Stack {
    constructor() {
      this.items = [];
    }
  
    // Add an item to the top of the stack
    push(element) {
      this.items.push(element);
    }
  
    // Remove and return the top item
    pop() {
      if (this.isEmpty()) return undefined;
      return this.items.pop();
    }
  
    // View the top item without removing it
    peek() {
      if (this.isEmpty()) return undefined;
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Return the size of the stack
    size() {
      return this.items.length;
    }
  
    // Clear all items from the stack
    clear() {
      this.items = [];
    }
  }


const isValidParentheses = (str) => {
    let stack = new Stack();
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') {
            stack.push(str[i]);
        } else if (str[i] === ')') {
            if (stack.isEmpty()) {
                return false;
            }
            stack.pop();
        }
    }
    if (stack.isEmpty()) {
        return true;
    } else {
        return false;
    }
}

console.log(isValidParentheses("(())"));
console.log(isValidParentheses("hi (hello)"));
console.log(isValidParentheses("(()"));
console.log(isValidParentheses("hello ) there"));
console.log(isValidParentheses("))("));