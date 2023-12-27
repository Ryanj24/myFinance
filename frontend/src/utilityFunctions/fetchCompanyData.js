export const fetchCompanyData = async (ticker) => {

    try {
        const overviewData = await companyOverviewData(ticker);
        const sharePrice = await companySharePrice(ticker);
        const balanceSheet = await companyBalanceSheet(ticker);
        const incomeStatement = await companyIncomeStatement(ticker);

        return {overviewData, sharePrice, balanceSheet, incomeStatement}

    } catch (error) {
        return {error: true, message: error}
    }
}

const companyOverviewData = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${import.meta.env.VITE_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

const companySharePrice = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${import.meta.env.VITE_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

const companyBalanceSheet = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${import.meta.env.VITE_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

const companyIncomeStatement = async (ticker) => {

    try {

        const request = await fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${import.meta.env.VITE_API_KEY}`)

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}