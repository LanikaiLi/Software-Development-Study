const averageSpeed = (kilometers, hours) => {
    // return the kilometers per hour as a number
    return kilometers / hours;
}

const minutesToSeconds = (minutes) => {
    // convert minutes to seconds
    // for example, 2 minutes = 120 seconds
    // return the number of seconds
    return minutes * 60;
}

const numberIsOdd = (number) => {
    // returns a boolean
    return number % 2 !== 0;
}

const squareNumber = (number) => {
    // return the square of the number
    return number *  number;
}

const firstThreeLetters = (word) => {
    // return the first three letters of the given word.
    return word.slice(0,3);
}

const celsiusToFahrenheit = (celsius) => {
    // convert Celsius to Fahrenheit
    // formula: F = (C × 9/5) + 32
    return (celsius * 9/5) + 32;
}

const makeFullName = (firstName, lastName) => {
    // return a full name consisting of the two given strings with a space in between
    return firstName + " " + lastName
}