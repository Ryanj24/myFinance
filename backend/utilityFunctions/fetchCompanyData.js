
// Function to return general information and financial data for a company
export const fetchCompanyData = async (ticker) => {

    try {

        // Get general overview data for the company
        const overviewData = await companyOverviewData(ticker);

        // Get key performance metrics for the company
        const ratios = await companyRatios(ticker);

        // Get the share price history for the company
        const sharePrice = await companySharePrice(ticker);

        // Get the companys balance sheets
        const balanceSheet = await companyBalanceSheet(ticker);

        // Get the companys income statements
        const incomeStatement = await companyIncomeStatement(ticker);


        // Return the data
        return {overviewData, ratios, sharePrice, balanceSheet, incomeStatement}

    } catch (error) {

        // If an error is present, return the reason for the error
        return {error: true, message: error}
    }
}

const companyOverviewData = async (ticker) => {

    try {

        // Make a GET request to retrieve general information about the company - Eg. Market Cap, Description, Industry etc.
        const request = await fetch(`https://financialmodellingprep.com/api/v3/profile/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        // JSON format the response
        const response = await request.json()

        // Return the data
        return response[0]
    } catch (error) {

        // Return any error
        return error
    }
}

const companyRatios = async (ticker) => {

    try {

        // Make a GET request to retrieve key performance ratios - Eg. P/E ratio, P/B ratio etc.
        const request = await fetch(`https://financialmodellingprep.com/api/v3/ratios-ttm/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        // Get the response in json format
        const response = await request.json()

        // Return the retrieved data
        return response[0]
    } catch (error) {

        // Return any error
        return error
    }
}

const companySharePrice = async (ticker) => {

    try {

        // Make a GET request to get the companys historical share price for the last 5 years
        const request = await fetch(`https://financialmodellingprep.com/api/v3/historical-price-full/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        // JSON format the response
        const response = await request.json()

        // Return the array of stock prices
        return response["historical"]
    } catch (error) {

        // Return any error
        return error
    }
}

const companyBalanceSheet = async (ticker) => {

    try {

        // Make a GET request to get the companys annual & quarterly balance sheets for the previous 5 years
        const request = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${process.env.DATA_API_KEY}`)

        // JSON format the response
        const response = await request.json()

        // Return the data
        return response
    } catch (error) {

        // Return any error
        return error
    }
}

const companyIncomeStatement = async (ticker) => {

    try {

        // Make a GET request to get the companys annual & quarterly income statements for the previous 5 years
        const request = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${process.env.DATA_API_KEY}`)

        // JSON format the response 
        const response = await request.json()

        // Return the data
        return response
    } catch (error) {

        // Return any data
        return error
    }
}

export const companyPriceLookup = async (ticker) => {
    try {

        // Make a GET request to get the companys current share price
        const request = await fetch(`https://financialmodellingprep.com/api/v3/stock/real-time-price/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        // JSON format the response
        const response = await request.json()

        // Return the share price
        return response["companiesPriceList"][0]
    } catch (error) {

        // Return any error
        return error
    }
}