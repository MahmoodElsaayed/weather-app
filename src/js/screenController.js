export default function ScreenController(api) {
    const locationForms = document.querySelectorAll('.search-form')

    function showPage(targetID) {
        const pageContainers = document.querySelectorAll('.container')
        const selectedPage = document.getElementById(targetID)
        pageContainers.forEach((page) => {
            page.classList.add('hidden')
            page.setAttribute('aria-hidden', 'true')
        })
        selectedPage.classList.remove('hidden')
        selectedPage.setAttribute('aria-hidden', 'false')
    }

    function processForm(event) {
        event.preventDefault()
        const inputField = event.target.firstChild
        if (inputField.value.length === 0) {
            displayFormError(inputField, "Can't submit an empty field")
            return
        }
        document.activeElement.blur() // fixes an aria issue related to focusing on hidden element
        return { searchQuery: inputField.value, event }
    }

    function displayFormError(inputField, message) {
        inputField.nextElementSibling.textContent = message
    }

    async function handleFormSubmission(event) {
        const formData = processForm(event)
        if (!formData) {
            return
        }
        const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formData.searchQuery}/next7days?unitGroup=metric&iconSet=icons1&include=days&key=FXNJH5S5MNRED8WVD9PU8CDNZ&contentType=json`
        const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${formData.searchQuery}&client_id=4QVqRtwrb2e1T_Nnqm6cFy9if0lQ64SCb6DZd0BYo6U`
        showPage('loadingPage')
        const weatherResponse = await api.fetchResponse(weatherApiUrl)
        const locationImageResponse = await api.fetchResponse(unsplashApiUrl)
        displayResponse(formData.event, weatherResponse, locationImageResponse)
    }

    function displayResponse(event, weatherResponse, locationImageResponse) {
        if (weatherResponse.statusCode === 200) {
            const filteredWeatherData =
                api.filterWeatherResponse(weatherResponse)
            const filteredImageData = api.filterImageResponse(
                locationImageResponse
            )
            populateWeatherDisplay(filteredWeatherData, filteredImageData)
            showPage('weatherDisplayPage')
        } else if (weatherResponse.statusCode === 400) {
            displayFormError(
                event.target.querySelector('input'),
                'Invalid search term'
            )
            showPage(event.target.closest('.container').id)
        } else {
            document.querySelector('.error-container .error-code').textContent =
                weatherResponse.statusCode
                    ? `Status Code: ${weatherResponse.statusCode}`
                    : ''
            showPage('errorPage')
        }
    }

    function populateWeatherDisplay(filteredWeatherData, filteredImageData) {
        document.querySelector('.percipitation .value').textContent =
            `${filteredWeatherData.forecast[0].precipitation}%`
        document.querySelector('.humidity .value').textContent =
            `${filteredWeatherData.forecast[0].humidity}%`
        document.querySelector('.wind .value').textContent =
            `${filteredWeatherData.forecast[0].wind}km/h`

        document
            .querySelectorAll('.forecast-card')
            .forEach(async (card, index) => {
                card.querySelector('img').src = (
                    await import(
                        `../assets/images/${filteredWeatherData.forecast[index].icon}.svg`
                    )
                ).default

                card.querySelector('.temperature').textContent =
                    `${filteredWeatherData.forecast[index].temperature}°C`
            })

        document.querySelector('.date-info .week-day').textContent =
            `${filteredWeatherData.forecast[0].date[0]}`

        document.querySelector('.date-info .calendar-date').textContent =
            `${filteredWeatherData.forecast[0].date[1]}`

        document.querySelector('.location-info p').textContent =
            `${filteredWeatherData.address}`

        import(
            `../assets/images/${filteredWeatherData.forecast[0].icon}.svg`
        ).then((value) => {
            document.querySelector('.weather-summary img').src = value.default
        })

        document.querySelector('.weather-summary .temperature').textContent =
            `${filteredWeatherData.forecast[0].temperature}°C`

        document.querySelector('.weather-summary .condition').textContent =
            `${filteredWeatherData.forecast[0].conditions}`

        if (filteredImageData) {
            document.querySelector('.current-weather').style.backgroundImage =
                `url(${filteredImageData.src})`
        }
    }

    locationForms.forEach((form) => {
        form.addEventListener('submit', handleFormSubmission)
    })

    return { showPage } // for testing only, remove later.
}
