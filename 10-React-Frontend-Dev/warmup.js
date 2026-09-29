// Write a function that takes in a string and returns true if the string contains three repeated characters in a row, or false if it does not.

// my logic: first split the string by rows, then check if any row contains three repeated characters in a row, if yes, return true, if no, return false
// about how to check if a row contains three repeated chars, we can use a loop to check if the current char is the same as the next char, and the next char is the same as the char after that, if yes, return true, if no, return false
// if the loop is finished, and we haven't returned true, return false
string = "aabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"

function splitString(str) {
  return str.split('\n');
}

function hasThreeRepeatedCharsInRow(row) {
    for (let i = 0; i < row.length - 2; i++) {
        if (row[i] === row[i + 1] && row[i + 1] === row[i + 2]) {
            return true;
        }
    }
    return false;
}

function checkThreeRepeatedChars(str) {
    rows = splitString(str);
    console.log(rows);
    for (const row of rows) {
        if (hasThreeRepeatedCharsInRow(row)) {
            return true;
        }
    }
    return false;
}

console.log(checkThreeRepeatedChars(string));