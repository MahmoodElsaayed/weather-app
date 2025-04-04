import { convertDatetimeToHumanDate } from './util.js'

export default function API() {
    async function fetchResponse(url) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                const error = new Error(`Error ${response.status}`)
                error.statusCode = response.status
                throw error
            }
            return {
                statusCode: response.status,
                data: await response.json(),
            }
        } catch (error) {
            return error
        }
    }

    function filterWeatherResponse(response) {
        return {
            address: response.data.resolvedAddress,
            forecast: response.data.days.map((day) => ({
                conditions: day.conditions,
                date: convertDatetimeToHumanDate(day.datetime),
                humidity: day.humidity,
                wind: day.windspeed,
                precipitation: day.precip,
                temperature: Math.floor(day.temp),
                icon: day.icon,
            })),
        }
    }

    function filterImageResponse(response) {
        return { src: response?.data?.results?.[0]?.urls?.small || '' }
    }

    return { fetchResponse, filterWeatherResponse, filterImageResponse }
}
