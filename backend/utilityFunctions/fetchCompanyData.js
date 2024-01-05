

export const fetchCompanyData = async (ticker) => {

    try {
        // const logo = await companyLogo(ticker)
        const overviewData = await companyOverviewData(ticker);
        const ratios = await companyRatios(ticker);
        const sharePrice = await companySharePrice(ticker);
        const balanceSheet = await companyBalanceSheet(ticker);
        const incomeStatement = await companyIncomeStatement(ticker);

        return {overviewData, ratios, sharePrice, balanceSheet, incomeStatement}
        // return {logo, overviewData, sharePrice, balanceSheet, incomeStatement}

    } catch (error) {
        return {error: true, message: error}
    }
}

const companyOverviewData = async (ticker) => {

    try {

        const request = await fetch(`https://financialmodellingprep.com/api/v3/profile/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        const response = await request.json()

        return response[0]
    } catch (error) {
        return error
    }
}

const companyRatios = async (ticker) => {

    try {

        const request = await fetch(`https://financialmodellingprep.com/api/v3/ratios-ttm/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        const response = await request.json()

        return response[0]
    } catch (error) {
        return error
    }
}

const companySharePrice = async (ticker) => {

    try {

        // const request = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${process.env.DATA_API_KEY}`)
        const request = await fetch(`https://financialmodellingprep.com/api/v3/historical-price-full/${ticker}?apikey=${process.env.DATA_API_KEY}`)

        const response = await request.json()

        return response["historical"]
    } catch (error) {
        return error
    }
}

const companyBalanceSheet = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${process.env.DATA_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

const companyIncomeStatement = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${process.env.DATA_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

export const companyLogo = async (ticker) => {

    try {

        const request = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${process.env.LOGO_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }

}