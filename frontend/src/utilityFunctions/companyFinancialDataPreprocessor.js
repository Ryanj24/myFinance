import {sortQuarters} from './sortStrings.js'
import { quarterDateFormatter } from './dateFormatter.js';

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
            return {year: item[0], revenue: item[1]}
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
            return {quarter: item[0], revenue: item[1]}
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
            return {year: item[0], netIncome: item[1]}
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
            return {quarter: item[0], netIncome: item[1]}
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
            return {year: item[0], totalAssets: item[1].totalAssets, totalLiabilities: item[1].totalLiabilities}
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
            return {quarter: item[0], totalAssets: item[1].totalAssets, totalLiabilities: item[1].totalLiabilities}
        })

        dataArray.sort((a, b) => sortQuarters(a.quarter, b.quarter))
    }

    return dataArray
}