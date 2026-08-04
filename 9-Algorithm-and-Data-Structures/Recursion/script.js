// 1. Count down. Write a recursive function that takes in a non-negative integer and returns an array counting down from that number to 0.

// recursion算法的精髓其实是： 先找到一个baseline, 然后找到一个可以不断缩小问题范围的方法，然后不断调用自己，直到达到baseline。

const countDown = (n) => {
    if (n === 0) {
        return [0]
    }

    return [n].concat(countDown(n - 1))
}

// 2. Sum an array. Write a recursive function that takes in an array of numbers and returns the total.

// my logic: [1,2,3] means to loop through the array and add each element together, so the baseline can be arr[0], and we can trace back to baseline by arr[n-1] + arr[n-2] + ... until we reach the baseline.

const sumArray = (arr) => {
    while (arr.length > 0) {
        return arr[0] + sumArray(arr.slice(1))
    }
    return 0
}

console.log(sumArray([1,2,3]))
// 3. Bubble sort. To prepare for the next problem, implement a bubble sort. Write a function that takes in an array of numbers and returns that same array, but sorted lowest to highest.

// 4. Recursive bubble sort. Write a function that takes in an array of numbers and returns a new array sorted from lowest to highest using recursion instead of loops.