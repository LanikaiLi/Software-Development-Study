async function getUniversityData (country) {
    const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`)
    const universities = await response.json()
    console.log(universities)
    testFunctions(universities)
}

const listUniversityNamesByProvince = (list, provinceName) => {
    // Returns a list of the names of all the listen universities in the given province.
    // my logic: loop through the list and check if the province of the university is the same as the provinceName, if it is, add the name of the university to the list
    let universityNames = []
    list.forEach(university => {
        if (university["state-province"] === provinceName) {
            universityNames.push(university.name)
            // console.log(university.name)
        }
    })
    return universityNames
}

const summarizeUniversityByName = (list, universityName) => {
    // Takes in the name of a university and returns a string in the following format:
    // "McGill University is a school located in Quebec, Canada. Find out more about McGill University at http://www.mcgill.ca/."
    // Or, if there's no match, returns:
    // "Not found."
    let match = null
    for (let i = 0; i < list.length; i++) {
        const university = list[i]
        if (university.name === universityName) {
            match = university
            break
        }
    }
    if (!match) {
        return "Not found."
    }
    return `${match.name} is a school located in ${match["state-province"]}, ${match.country}. Find out more about ${match.name} at ${match.web_pages[0]}.`
}

const getProvinceWithMostUniversities = list => {
    // Returns the name of the province with the highest number of listed universities.
    // Returns the name of the province with the highest number of listed universities.
    counter = {}
    highestCount = 0
    provinceWithHighestCount = null

    list.forEach(university => {
        if (counter[university["state-province"]]) {
            counter[university["state-province"]] += 1
        } else {
            counter[university["state-province"]] = 1
        }
        if (counter[university["state-province"]] > highestCount) {
            highestCount = counter[university["state-province"]]
            provinceWithHighestCount = university["state-province"]
        }
    })

    return provinceWithHighestCount
}

getUniversityData("Canada")

const testFunctions = (universities) => {
    console.log(
        listUniversityNamesByProvince(universities, "Manitoba")
    )

    console.log(
        summarizeUniversityByName(universities, "McGill University")
    )

    console.log(
        getProvinceWithMostUniversities(universities)
    )
}