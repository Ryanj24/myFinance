import {resetDataMap, formatColumnNames} from './dataPreprocessingFunctions.js'

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

    dataMap = resetDataMap("budgetCategories");

    const filteredData = data.filter(obj => obj.month === month && obj.year == year)[0]

    if (filteredData === undefined) {
        return [
            { category: 'Housing', total: 0},
            { category: 'Transportation', total: 0},
            { category: 'Food', total: 0},
            { category: 'Utilities', total: 0},
            { category: 'Medical & Healthcare', total: 0},
            { category: 'Personal', total: 0},
            { category: 'Entertainment', total: 0},
            { category: 'Other', total: 0},
        ]
    }

    for (const [key, value] of Object.entries(filteredData)) {
        if (dataMap.has(formatColumnNames(key))) {
            dataMap.set(formatColumnNames(key), parseInt(value))
        }
    }

    const dataArray = Array.from(dataMap, (item) => {
        return {category: item[0], total: item[1]}
    })

    return dataArray
}