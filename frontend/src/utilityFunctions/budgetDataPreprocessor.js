let dataMap = new Map([
    ["Housing", 0],
    ["Transportation", 0],
    ["Food", 0],
    ["Utilities", 0],
    ["Medical & Healthcare", 0],
    ["Personal", 0],
    ["Entertainment", 0],
    ["Other", 0],
])

export const budgetDataPreprocessor = (data, month, year) => {

    resetDataMap();

    const filteredData = data.filter(obj => obj.month === month && obj.year == year)[0]

    for (const [key, value] of Object.entries(filteredData)) {
        if (dataMap.has(formatColumnNames(key))) {
            dataMap.set(formatColumnNames(key), parseInt(value))
        }
    }

    const dataArray = Array.from(dataMap, (item) => {
        return {name: item[0], value: item[1]}
    })

    return dataArray
}

const resetDataMap = () => {
    dataMap = new Map([
        ["Housing", 0],
        ["Transportation", 0],
        ["Food", 0],
        ["Utilities", 0],
        ["Medical & Healthcare", 0],
        ["Personal", 0],
        ["Entertainment", 0],
        ["Other", 0],
    ])
}

const formatColumnNames = (name) => {

    let formattedName = "";

    switch (name) {
        case "housing":
            formattedName = "Housing"
            break;
        case "transportation":
            formattedName = "Transportation"
            break;
        case "food":
            formattedName = "Food"
            break;
        case "utilities":
            formattedName = "Utilities"
            break;
        case "medical_healthcare":
            formattedName = "Medical & Healthcare"
            break;
        case "personal":
            formattedName = "Personal"
            break;
        case "entertainment":
            formattedName = "Entertainment"
            break;
        case "other":
            formattedName = "Other"
            break;
        default:
            break;
    }
    return formattedName
}