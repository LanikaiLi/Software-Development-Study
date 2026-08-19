// given an array of integers, return the indices of the two numbers that add up to a given target
// for example, given nums = [2, 7, 1, 11, 15], target = 9, because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1]

// my 1st logic:
// first, remove the numbers that are greater than the target
// then, loop through the array and check if the sum of any two numbers is equal to the target
// if it is, return the indices of the two numbers
// if not, return an empty array

// the time complexity of this solution is O(n^2) because we are looping through the array twice

function twoSum(nums, target) {
    nums = nums.filter(num => num <= target);
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log(twoSum([2, 7, 1, 11, 15], 9));

// my 2nd logic: 
// first, create a map to store the numbers and their indices
// then, loop through the array and check if the target - current number is in the map
// if it is, return the indices of the two numbers
// if not, add the current number and its index to the map
// if no two numbers are found, return an empty array

// the time complexity of this solution is O(n) because we are looping through the array once

function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
    return [];
}

console.log(twoSum([4,2,6,3,5], 10));

// this is not mine, this is super clever
// the logic:
// first, sort the array
// then, use two pointers to find the two numbers that add up to the target
// if the sum of the two numbers is equal to the target, return true
// if the sum of the two numbers is less than the target, move the left pointer to the right
// if the sum of the two numbers is greater than the target, move the right pointer to the left
// if no two numbers are found, return false    
// O(n log n)
const hasPairWithSum2 = (numbers, target) => {
    numbers.sort((a, b) => a - b)
    
    let left = 0
    let right = numbers.length - 1

    while (left < right) {
        const sum = numbers[left] + numbers[right]
        if (sum === target) {
            return true
        } else if (sum < target) {
            left += 1
        } else {
            right -= 1
        }
    }

    return false
}