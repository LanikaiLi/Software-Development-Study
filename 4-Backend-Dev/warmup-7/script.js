// Warmup for May 5th: Two Sum

// Given an array of integers and a target, return the indices of the pairs which add up to the target. For example:

// twoSum([1, 2, 3, 7, 4, 3], 6)
// should return [[1, 4], [2, 5]]

// my new logic: I loop through the list and check if the target - the current number is in the list. if it is, I return the indices of the two numbers. if the number if bigger than the target, I skip it

const twoSum = (array, target) => {
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (array[i] > target) {
            continue
        }
        else {
            if (array.includes(target - array[i])) {
                result.push([i, array.indexOf(target - array[i])])
            }
        }
    }
    return result
}

// const twoSum = (array, target) => {
//     let result = []
//     for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j < array.length; j++) {
//             if (i === j) {
//                 continue
//             }
//             else {
//                 if (array[i] + array[j] === target) {
//                     result.push([i, j])
//                 }
//             }
//         }
//     }
//     return result
// }

// my logic: I first double the list, so I have one list that represents the first number and the second list that represents the second number. then I loop through the list and check if the sum of the two numbers is equal to the target. if it is, I return the indices of the two numbers. But note, when looping through the list, I need to skip the first number, because I already checked it. (Basically all distinct combinations)

const twoSum_2 = (array, target) => {
        let result = []
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] + array[j] === target) {
                    result.push([i, j])
                }
            }
        }
        return result
    }


console.log(twoSum([1, 2, 3, 7, 4, 3], 6))