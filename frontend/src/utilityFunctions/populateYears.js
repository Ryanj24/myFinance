export const populateYears = () => {
    let arr = []
    let currYear = new Date().getFullYear();

    for (let i = 2010; i <= currYear; i++) {
        arr.push(i);
    }

    return arr
}