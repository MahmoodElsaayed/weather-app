import { convertDatetimeToHumanDate } from './util.js'

async function fetchWeather(location, unit = 'metric') {
    const key = 'FXNJH5S5MNRED8WVD9PU8CDNZ' // It's a free one dumbass!
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=${unit}&include=days&key=${key}&contentType=json`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            const error = new Error(`Error ${response.status}`)
            error.statusCode = response.status
            throw error
        }
        return {
            statusCode: response.status,
            data: response.json(),
        }
    } catch (error) {
        return error
    }
}

function filterWeatherResponse(response) {
    return {
        address: response.resolvedAddress,
        forecast: response.days.map((day) => ({
            conditions: day.conditions,
            date: convertDatetimeToHumanDate(day.datetime),
            humidity: day.humidity,
            wind: day.windspeed,
            precipitation: day.precip,
            temperature: day.temp,
        })),
    }
}

export { fetchWeather, filterWeatherResponse }
