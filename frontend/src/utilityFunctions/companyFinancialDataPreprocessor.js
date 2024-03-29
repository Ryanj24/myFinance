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


    for (let i = 0; i < data.length; i++) {
        dataMap.set(data[i].date, data[i].close)
    }

    dataArray = Array.from(dataMap, (item) => {
        return {date: item[0], "Share Price": +item[1]}
    })


    if (period === "one-month") {
        filteredArray = dataArray.filter(obj => {
            const objDate = new Date(obj.date)

            if ((currentDate.getTime() - objDate.getTime()) / (1000 * 60 * 60 * 24) <= 30) return true

        })

        
    } else if (period === "six-month") {
        filteredArray = dataArray.filter(obj => {
            const objDate = new Date(obj.date)

            if ((currentDate.getTime() - objDate.getTime()) / (1000 * 60 * 60 * 24) <= 180) return true

        })
    } else {
        filteredArray = dataArray.filter(obj => {
            const objDate = new Date(obj.date)

            if ((currentDate.getTime() - objDate.getTime()) / (1000 * 60 * 60 * 24) <= 365) return true

        })
    }

    filteredArray.sort((a, b) => a.date - b.date).reverse()
    filteredArray = filteredArray.map(obj => ({...obj, date: dateFormatter(obj.date, "ddmmyy")}))

    return filteredArray
}