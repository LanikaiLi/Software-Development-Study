function fibonacci(n) {
    if (n == 0) {
        return 0
    }
    if (n == 1) {
        return 1
    }
    // for (let i = 0; i<=n; i++) {
        result = fibonacci(n-1) + fibonacci(n-2) // don't use recursive function and for loop together because it will cause a stack overflow
        console.log(n + ": " + result)
        return result
    // }
}

// alternatively, we can use a for loop to calculate the fibonacci number
function fibonacci_2(n) {
    let first_number = 0
    let second_number = 1
    let next_number = 0
    for (let i = 2; i<=n; i++) {
        next_number = first_number + second_number
        first_number = second_number
        second_number = next_number
        console.log(i + ": " + next_number)
    }
    return next_number
}

