export default function ScreenController() {
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

    return { showPage }
}

window.screenController = ScreenController()
