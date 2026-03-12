const getInitials = (firstName, lastName) => {
    // Input: "James", "Bond"
    // Output: "JB"
    firstNamefirstLetter = firstName[0];
    lastNamefirstLetter = lastName[0];
    capitalLetters = firstNamefirstLetter + lastNamefirstLetter;
    return capitalLetters;
}

const movieLengthInSeconds = (hours, minutes) => {
    // Input: 2, 13
    // Output: 7980
    hoursInSeconds = hours * 3600;
    minutesInSeconds = minutes * 60;
    totalSeconds = hoursInSeconds + minutesInSeconds;
    return totalSeconds;
}

const isAMultipleOfSeven = (number) => {
    // Input: 14
    // Output: true
    if (number % 7 === 0) {
        return true;
    }
    else {
        return false;
    }
}

const convertNumberToString = (number) => {
    // Input: 100
    // Output: "100"
    stringNumber = number.toString();
    return stringNumber;
}