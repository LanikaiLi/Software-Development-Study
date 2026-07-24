// Bubble Sort: A sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order.

// a list of numbers: [5, 3, 8, 4, 2]

let list = [5, 3, 8, 4, 9, 2, 0];

// my logic:
// every time take the i and i+1 element to compare, if i<i+1 then swap them
// note down the swaps I did as well during the loop
// if I did any swaps, I will need to do the loop again, until I did not do any swaps in the loop.

let swapped = true;
let iterations = 0;

while (swapped == true) {
    swapped = false;
    for (let i = 0; i < list.length-1; i++) {
        if (list[i] > list[i+1]) {
            let temp = list[i];
            list[i] = list[i+1];
            list[i+1] = temp;
            console.log('Swapped');
            console.log(list);
            console.log(list[i], list[i+1]);
            swapped = true;
        } else {
            console.log('No swaps needed');
            console.log(list[i], list[i+1]);
        }
    }
}

console.log(list);
