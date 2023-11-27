import { resetDataMap, formatColumnNames } from "./budgetDataPreprocessor.js"
import { dataFormatter } from "./incomeDataPreprocessor.js"

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

export const transactionDataPreprocessor = (data, month, year) => {

    dataMap = resetDataMap();

    const formattedData = data.map(obj => dataFormatter(obj))
    // Filter the data to only show transactions that are Income and format the data into a new array
    const filteredData = formattedData.filter(transaction => transaction.type === "Expense")

    // For each object in the filtered data, update the corresponding month's value in the hash map with the objects amount value
    filteredData.forEach(obj => dataMap.set(obj.category, dataMap.get(obj.category) + obj.amount))

    // Create an array of objects with each object having a month property and an amount property
    const dataArray = Array.from(dataMap, (item) => {
        return {category: item[0], amount: item[1]}
    })

    // Return the array
    return filteredData

}