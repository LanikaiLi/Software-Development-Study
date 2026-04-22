// Write a function called parseUrl that takes data from a mock URL string and returns it as an object. For example:
// parseUrl("http://localhost:3000/actor?actorName=Amanda%20Seyfried&movieName=The%20Housemaid")
// my logic: I first find the subset of the string after ? mark, because that contains the info I need, for example: actorName=Amanda%20Seyfried&movieName=The%20Housemaid, then in this string, I split it by & mark, because each item in the split result is a key-value pair I want to put in my object, for example: actorName=Amanda%20Seyfried. Then, I split it to get key and value separately, then I convert the %20 to a space in the value string, because the original string is encoded. Finally, I put the key-value pairs into an object. I should loop through each key value pair and save all them in this object. to loop thorugh each key value pair, I should start from the substring I got after the ? mark, and split it by & mark, then I can get the list of each key value pairs.

const parseUrl = (url) => {
    let urlInfo = url.split("?")[1]
    let keyValuePairs = urlInfo.split("&")
    let result = {}
    keyValuePairs.forEach(pair => {
        let [key, value] = pair.split("=")
        result[key] = decodeURIComponent(value) 
    })
    return result
}

console.log(parseUrl("http://localhost:3000/location?cityName=New%20York%20City&countryName=USA"))

// // should return:
// {
//   actorName: "Amanda Seyfried",
//   movieName: "The Housemaid"
// }
// // or
// parseUrl("http://localhost:3000/location?cityName=New%20York%20City&countryName=USA")
// // should return:
// {
//   cityName: "New York City",
//   countryName: "USA"
// }
// You can assume that the URL will always have this format, and will always include exactly 2 of these key/value pairs.