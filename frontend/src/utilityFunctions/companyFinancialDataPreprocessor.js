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
                dataMap.set(obj.fiscalDateEnding.slice(0, 4), +obj.totalRevenue)
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
                dataMap.set(obj.fiscalDateEnding, +obj.totalRevenue)
            }
        })
    
        dataArray = Array.from(dataMap, (item) => {
            return {quarter: item[0], revenue: item[1]}
        })

        dataArray.sort((a, b) => sortQuarters(a.quarter, b.quarter))
    }

    return dataArray
}

export const Profits = () => {

    dataMap = new Map();


}

export const AssetsVsLiabilities = () => {

}