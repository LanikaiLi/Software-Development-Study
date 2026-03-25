// 1 (easy):
// Return the given number squared.

const square = (number) => {
    return number * number
}


// 2 (medium):
// Returns the number of digits in a positive integer.
// for example: digitCount(2026) should return 4.
// You can assume that the input will always be a positive integer.

function digitCount (input) {
    return input.toString().length
}


// 3 (hard):
// Returns true or false. A password is valid if it has at least one number, is more than seven characters long, and has a mix of upper case and lower case letters.
// for example:
// "bEnji355" is valid.
// "benji35" is not valid.

function isValidPassword (input) {
    if (input.match(/[0-9]/) && input.match(/[A-Z]/) && input.match(/[a-z]/) && input.length >= 8) {
        return true
    }
    else {
        return false
    }
}


// 4:
const birdList = ["duck", "duck", "robin", "turkey", "pigeon", "duck", "goose", "pigeon", "pigeon", "robin"]
// Takes in a list of birds and a bird's name, and returns a count of that bird. If two birds are tied for most common, return either one.
// for example: birdCounter(birdList, "duck") should return 3.

function birdCounter (birds, birdName) {
    let count = 0
    for (let i = 0; i < birds.length; i++) {
        if (birds[i] === birdName) {
            count++
        }
    }
    return count
}


// 5:
// Your users have all formatted their inputs a little differently:
// secondBirdCounter(moreBirds, "duck") should return 2.
const moreBirds = ["Turkey", "duck", " eastern long-tailed hornbill", "Duck  ", "turkey", "turkey "]

function secondBirdCounter (birds, birdName) {}


// 6:
// Takes in a list of strings and returns true or false: true if any string appears more than once on the list.
// for example: hasDuplicates(["red", "blue", "yellow", "red"]) should return true.

function hasDuplicates (strings) {}


// 7:
// Takes in a list of tools and returns an object where each tool is counted.
// for example: toolCounts(["hammer", "wrench", "hammer"]) should return {hammer: 2, wrench: 1}.


    function toolCounts (tools) {
        let countingObject = {}
        for (let i = 0; i < tools.length; i++) {
            const tool = tools[i];
            if (countingObject[tool]) {
                countingObject[tool] += 1
            } else {
                countingObject[tool] = 1
            }
        }
        return countingObject
    }



// 8:
// Takes in a list of birds and returns the name of the one that appears most frequently, followed by a comma, a space, and the number of times it occurred.
// for example: mostCommonBird(allBirds) should return "duck, 5".
const allBirds = ["duck", "duck", "turkey", "pigeon", "duck", "goose", "pigeon", "pigeon", "robin", "Turkey", "duck", "crow", "Duck  ", "turkey ", "eagle", "Hawk", "owl", "crow"]

function mostCommonBird (birds) {}


// 9:
// Takes in a list of barcode strings and returns how many are valid.
// a barcode is valid if it has exactly 8 characters and every character is a number.
// for example: countValidBarcodes(["12345678", "12A45678", "00000000"]) should return 2.
// Remember you can convert a string to a number using the Number() method.
// For example: Number("5") returns 5, but Number("A") or Number("?") returns NaN.

function countValidBarcodes (barcodes) {}


// 10:
// Takes in a string and converts it to title case.
// for example: titleCase("sAtuRn") should return "Saturn".

function titleCase (name) {}


// 11:
// Returns the given number raised to the power of x.
// for example: raiseToThePowerOf(3, 4) should return 81, because 3 * 3 * 3 * 3 = 81.

function raiseToThePowerOf (number, x) {}


// 12:
// Takes in a list of package objects and returns the name of the heaviest package. If two packages are tied, return either one.
// for example: heaviestPackage([{name: "incandescent lamp", weight: 4.1}, {name: "marble statue", weight: 9.3}]) should return "marble statue".

function heaviestPackage (packages) {}


// 13:
// Imagine a chess board whose squares are marked as coordinates with the 8x8 grid of the board being numbered from 0-7. The top left corner space is 0, 0, and the bottom right corner space is 7, 7. Given the coordinates of a knight on an otherwise empty chessboard, return an array of the spaces that knight can move to. For example, chessKnightMoves(0, 1) should return [[1, 3], [2, 0], [2, 2]].
// https://en.wikipedia.org/wiki/Knight_(chess)#Movement

const chessKnightMoves = (x, y) => {}


// encapsulation
class Car {
    constructor(make, model, year) {
      // Encapsulated data
      this.make = make;
      this.model = model;
      this.year = year;
      this.isEngineRunning = false;
      this.currentSpeed = 0;
    }
  
    // Encapsulated methods
    startEngine() {
      this.isEngineRunning = true;
      console.log('Engine started.');
    }
  
    accelerate(speed) {
      if (this.isEngineRunning) {
        this.currentSpeed += speed;
        console.log(`Accelerated to ${this.currentSpeed} km/h.`);
      } else {
        console.log('Engine is not running. Please start the engine first.');
      }
    }
  }
  
  let crv = new Car ("Honda", "CRV", "2008")
  console.log(crv)