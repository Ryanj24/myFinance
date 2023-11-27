import { resetDataMap, transactionFormatter } from "./dataPreprocessingFunctions.js";

// Define an initial map for the data
let dataMap = new Map([
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["May", 0],
    ["Jun", 0],
    ["Jul", 0],
    ["Aug", 0],
    ["Sep", 0],
    ["Oct", 0],
    ["Nov", 0],
    ["Dec", 0]
])

export const incomeDataPreprocessor = (data) => {

    // Reset the dataMap to prevent values being accumulated
    dataMap = resetDataMap("months");

    // Filter the data to only show transactions that are Income and format the data into a new array
    const filteredData = data.filter(transaction => transaction.type === "Income").map(obj => transactionFormatter(obj))

    // For each object in the filtered data, update the corresponding month's value in the hash map with the objects amount value
    filteredData.forEach(obj => dataMap.set(obj.month, dataMap.get(obj.month) + obj.amount))

    // Create an array of objects with each object having a month property and an amount property
    const dataArray = Array.from(dataMap, (item) => {
        return {month: item[0], amount: item[1]}
    })

    // Return the array
    return dataArray

}

