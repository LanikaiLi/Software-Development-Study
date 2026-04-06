async function getVancouverWeather () {
    const response = await fetch(`https://wttr.in/Paris?format=j1`)
    const weatherInfo = await response.json()
    console.log(weatherInfo)

    const cityBox = document.querySelector("#location-city")
    const countryBox = document.querySelector("#location-country")

    cityBox.innerText = "Paris"
    countryBox.innerText = "France"

    const weatherDescriptionBox = document.querySelector("#weather-description")
    weatherDescriptionBox.innerText = weatherInfo.current_condition[0].weatherDesc[0].value

    const temperatureBox = document.querySelector("#temperature-celsius")
   // temperatureBox.innerText = weatherInfo.current_condition[0].temp_C + `°C`
    temperatureBox.innerText =  `${weatherInfo.current_condition[0].temp_C}°C / ${weatherInfo.current_condition[0].temp_F}°F`
}

getVancouverWeather()