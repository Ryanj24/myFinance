export const dateFormatter = (dateInput, dateFormat) => {
    const date = new Date(dateInput);

    if (dateFormat === "full date") {
        const dateSuffix = dateSuffixes(date.getDate())

        return `${date.getDate()}${dateSuffix} ${dateMonth(date.getMonth())} ${date.getFullYear()}`
    } else if (dateFormat === "ddmmyy") {

        const day = padZeros(date.getDate())
        const month = padZeros(date.getMonth() + 1)
        return `${day}/${month}/${date.getFullYear().toString().substring(2)}`
    }
}

export const quarterDateFormatter = (obj) => {
    if (obj.fiscalDateEnding.slice(5, 7) === "03") {
        return {...obj, fiscalDateEnding: "Q1" + obj.fiscalDateEnding.slice(0, 4)}
    } else if (obj.fiscalDateEnding.slice(5, 7) === "06") {
        return {...obj, fiscalDateEnding: "Q2" + obj.fiscalDateEnding.slice(0, 4)}
    } else if (obj.fiscalDateEnding.slice(5, 7) === "09") {
        return {...obj, fiscalDateEnding: "Q3" + obj.fiscalDateEnding.slice(0, 4)}
    } else if (obj.fiscalDateEnding.slice(5, 7) === "12") {
        return {...obj, fiscalDateEnding: "Q4" + obj.fiscalDateEnding.slice(0, 4)}
    }
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

const padZeros = (num) => {
    if (num < 10) {
        return "0" + num.toString()
    }
    return num
}