const kilometersTraveled = 120
const hoursOnTheRoad = 3

const averageSpeed = kilometersTraveled / hoursOnTheRoad;

console.log(`Our average speed was ${averageSpeed}km/h.`) // This is CALLED STRING INTERPOLATION, it has to be used with backticks (`) and ${variable}

console.log(`Our average speed was ` + averageSpeed + `km/h.`) // This is CALLED CONCATENATION, it has to be used with + and ""

// Right now the console.log is accurate:
// If we traveled 120 km in 3 hours, our average speed was 40km/h.
// Rewrite the console.log so that if you change the values of kilometersTraveled
// and hoursOnTheRoad, you'll still get the correct average speed.