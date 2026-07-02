const biographies = [
    {"name":{"first":"Napoleon","last":"Bonaparte"},"knownFor":["general","emperor"],"nationality":"French","yearBorn":1769,"yearDied":1821},
    {"name":{"first":"William","last":"Shakespeare"},"knownFor":["playwright"],"nationality":"English","yearBorn":1564,"yearDied":1616},
    {"name":{"first":"Sacagawea","last":""},"knownFor":["guide","interpreter"],"nationality":"Lemhi Shoshone","yearBorn":1788,"yearDied":1812},
    {"name":{"first":"Alan","last":"Turing"},"knownFor":["mathematician","computer scientist"],"nationality":"British","yearBorn":1912,"yearDied":1954},
    {"name":{"first":"Confucius","last":""},"knownFor":["philosopher","teacher"],"nationality":"Chinese","yearBorn":-551,"yearDied":-479}
]

// Write a function that logs the following sentence template for each of the historical figures on this list:
// Napoleon Bonaparte was a French general and emperor who lived from 1769 to 1821.

const logBiographies = (list) => {
    const vowels = ["a", "e", "i", "o", "u"]
    list.forEach(p => {
        console.log(`${p.name.first}${p.name.last ? ` ` + p.name.last : ``} was ${vowels.includes(p.nationality[0].toLowerCase()) ? `an` : `a`} ${p.nationality} ${p.knownFor.join(` and `)} who lived from ${Math.abs(p.yearBorn)}${p.yearBorn < 0 ? `BC` : ``} to ${Math.abs(p.yearDied)}${p.yearBorn < 0 ? `BC` : ``}.`)
    })
}