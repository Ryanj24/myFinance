export const roundNumbers = (num, roundVal) => {
    if (Number.isInteger(num)) {
        return num
    } else {
        return num.toFixed(roundVal)
    }
}