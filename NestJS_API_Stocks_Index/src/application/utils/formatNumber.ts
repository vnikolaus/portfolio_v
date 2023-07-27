export function formatNumber(number: number, maxLength: number, add = '0') {
    try {
        const length = maxLength - String(number).length + 1
        return Array(length).join(add ?? '0') + number
    } catch (err) {
        console.log(err)
    }
}
