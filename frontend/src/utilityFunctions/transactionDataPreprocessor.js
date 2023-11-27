import { resetDataMap } from "./dataPreprocessingFunctions.js"
import { transactionFormatter } from "./dataPreprocessingFunctions.js";

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

    dataMap = resetDataMap("budgetCategories");

    // Filter the data to get expense transactions for the specified month and year
    const filteredData = data.map(obj => transactionFormatter(obj)).filter(obj => obj.type === "Expense" && obj.year === year && obj.month === month.slice(0, 3))

    // For each object in the filtered data, update the corresponding categories value in the hash map with the objects amount value
    filteredData.forEach(obj => dataMap.set(obj.category, dataMap.get(obj.category) + obj.amount))

    // Create an array of objects with each object having a category property and an amount property
    const dataArray = Array.from(dataMap, (item) => {
        return {category: item[0], amountSpent: item[1]}
    })

    // Return the array
    return dataArray

}