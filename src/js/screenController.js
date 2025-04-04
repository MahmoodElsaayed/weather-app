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
            inputField.nextElementSibling.textContent =
                "Can't submit empty fields"
            return null
        }
        return { searchQuery: inputField.value, event }
    }

    async function handleFormSubmission(event) {
        const formData = processForm(event)
        if (!formData) {
            return
        }
        const weatherApiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formData.searchQuery}/next7days?unitGroup=metric&include=days&key=FXNJH5S5MNRED8WVD9PU8CDNZ&contentType=json`
        showPage('loadingPage')
        const weatherResponse = await api.fetchResponse(weatherApiUrl)
        // TODO: displayResponse(weatherResponse)
    }

    locationForms.forEach((form) => {
        form.addEventListener('submit', handleFormSubmission)
    })

    return { showPage } // for testing only, remove later.
}
