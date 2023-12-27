import {sortQuarters} from './sortStrings.js'
import { quarterDateFormatter } from './dateFormatter.js';
import { dateFormatter } from './dateFormatter.js';

let dataMap = new Map()

export const Revenues = (data, type) => {

    dataMap = new Map();
    let reports;
    let dataArray;

    if (type === "annual") {
        reports = data.annualReports;

        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding.slice(0, 4))) {
                dataMap.set(obj.fiscalDateEnding.slice(0, 4), +obj.totalRevenue / 1000000)
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {year: item[0], Revenue: item[1]}
        })

        dataArray.sort((a, b) => a.year - b.year)

    } else {
        reports = data.quarterlyReports.map(obj => quarterDateFormatter(obj));

        
        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding)) {
                dataMap.set(obj.fiscalDateEnding, +obj.totalRevenue / 1000000)
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {quarter: item[0], Revenue: item[1]}
        })

        dataArray.sort((a, b) => sortQuarters(a.quarter, b.quarter))
    }

    return dataArray
}

export const Profits = (data, type) => {

    dataMap = new Map();
    let reports;
    let dataArray;

    if (type === "annual") {
        reports = data.annualReports;

        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding.slice(0, 4))) {
                dataMap.set(obj.fiscalDateEnding.slice(0, 4), +obj.netIncome / 1000000)
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {year: item[0], "Net Income": item[1]}
        })

        dataArray.sort((a, b) => a.year - b.year)

    } else {
        reports = data.quarterlyReports.map(obj => quarterDateFormatter(obj));

        
        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding)) {
                dataMap.set(obj.fiscalDateEnding, +obj.netIncome / 1000000)
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {quarter: item[0], "Net Income": item[1]}
        })

        dataArray.sort((a, b) => sortQuarters(a.quarter, b.quarter))
    }

    return dataArray
}

export const AssetsVsLiabilities = (data, type) => {

    dataMap = new Map();
    let reports;
    let dataArray;

    if (type === "annual") {
        reports = data.annualReports;

        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding.slice(0, 4))) {
                dataMap.set(obj.fiscalDateEnding.slice(0, 4), {totalAssets: obj.totalAssets / 1000000, totalLiabilities: obj.totalLiabilities / 1000000})
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {year: item[0], "Total Assets": item[1].totalAssets, "Total Liabilities": item[1].totalLiabilities}
        })

        dataArray.sort((a, b) => a.year - b.year)

    } else {
        reports = data.quarterlyReports.map(obj => quarterDateFormatter(obj));

        reports.forEach(obj => {
            if (!dataMap.has(obj.fiscalDateEnding)) {
                dataMap.set(obj.fiscalDateEnding, {totalAssets: obj.totalAssets / 1000000, totalLiabilities: obj.totalLiabilities / 1000000})
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {quarter: item[0], "Total Assets": item[1].totalAssets, "Total Liabilities": item[1].totalLiabilities}
        })

        dataArray.sort((a, b) => sortQuarters(a.quarter, b.quarter))
    }

    return dataArray
}

export const SharePrice = (data, period) => {
    dataMap = new Map();
    let chartData;
    let dataArray;
    let filteredArray;
    const currentDate = new Date();

    chartData = data["Time Series (Daily)"];

    for (let date in chartData) {
        dataMap.set(date, chartData[date])
    }

    dataArray = Array.from(dataMap, (item) => {
        return {date: dateFormatter(item[0], "ddmmyy"), "Share Price": +item[1]["4. close"]}
    })


    // if (period === "one-month") {
    //     filteredArray = dataArray.filter(obj => obj.date.slice(0, 7) === `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`)
    // } else if (period === "six-month") {
    //     filteredArray = dataArray.filter(obj => (obj.date.slice(5, 7) >= currentDate.getMonth() - 5 && obj.date.slice(0, 4) == currentDate.getFullYear()) && (obj.date.slice(5, 7) <= currentDate.getMonth() + 1 && obj.date.slice(0, 4) == currentDate.getFullYear()))
    // } else {
    //     filteredArray = dataArray.filter(obj => obj.date.slice(0, 4) == currentDate.getFullYear())
    // }

    if (period === "one-month") {
        filteredArray = dataArray.filter(obj => obj.date.slice(3, 8) === `${currentDate.getMonth() + 1}/${currentDate.getFullYear() % 100}`)
    } else if (period === "six-month") {
        filteredArray = dataArray.filter(obj => (obj.date.slice(3, 5) >= currentDate.getMonth() - 5 && obj.date.slice(6, 8) == currentDate.getFullYear() % 100) && (obj.date.slice(3, 5) <= currentDate.getMonth() + 1 && obj.date.slice(6, 8) == currentDate.getFullYear() % 100))
    } else {
        filteredArray = dataArray.filter(obj => obj.date.slice(6, 8) == currentDate.getFullYear() % 100)
    }

    filteredArray.sort((a, b) => a.date - b.date).reverse()

    return filteredArray
}