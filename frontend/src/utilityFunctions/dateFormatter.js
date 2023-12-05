export const dateFormatter = (dateInput) => {
    const date = new Date(dateInput);

    const dateSuffix = dateSuffixes(date.getDate())

    return `${date.getDate()}${dateSuffix} ${dateMonth(date.getMonth())} ${date.getFullYear()}`
}

const dateSuffixes = (dateNumber) => {

    if (dateNumber >= 4 && dateNumber <= 20) {
        return "th";
    }
    switch (dateNumber % 10) {
        case 1:
            return "st"
        case 2:
            return "nd"
        case 3:
            return "rd"
    }
}

const dateMonth = (monthNumber) => {

    switch (monthNumber) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            break;
    }
}