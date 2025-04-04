export default function ScreenController() {
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

    function handleFormSubmission(event) {
        event.preventDefault()
        const inputField = event.target.firstChild
        if (inputField.value.length === 0) {
            inputField.nextElementSibling.textContent =
                "Can't submit empty fields"
            return
        }
        showPage('loadingPage')
        return { searchQuery: inputField.value, event }
    }

    locationForms.forEach((form) => {
        form.addEventListener('submit', handleFormSubmission)
    })

    return { showPage } // for testing only, remove later.
}

window.screenController = ScreenController()
