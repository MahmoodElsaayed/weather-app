export function convertDatetimeToHumanDate(ymdDate) {
    const [yyyy, mm, dd] = ymdDate.split('-').map(Number)
    const date = new Date(yyyy, mm - 1, dd)

    return [
        date.toLocaleDateString('en-GB', {
            weekday: 'long',
        }),
        date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
    ]
}
