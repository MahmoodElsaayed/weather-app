import { convertDatetimeToHumanDate } from './util.js'

async function fetchWeather(location, unit = 'metric') {
    const key = 'FXNJH5S5MNRED8WVD9PU8CDNZ' // It's a free one dumbass!
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&include=days&key=${key}&contentType=json`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

function filterWeatherJson(responseJson) {
    return {
        address: responseJson.address,
        forecast: responseJson.days.map((day) => ({
            conditions: day.conditions,
            date: convertDatetimeToHumanDate(day.datetime),
            humidity: day.humidity,
            wind: day.windspeed,
            precipitation: day.precip,
            temperature: day.temp,
        })),
    }
}

export { fetchWeather, filterWeatherJson }
