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
        if (!inputField.validity.valid) {
            console.log("FORM AIN'T VALID CUH")
            // showError(event, 'This field musn\'nt be left empty') // the form has only 'required' constraint hence the hard-coded message. Customize as validation constraints grow.
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
