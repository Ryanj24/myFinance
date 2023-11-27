// Function to reset the hash map back to an original state
export const resetDataMap = (type) => {

    let dataMap;
    if (type === "months") {
        dataMap = new Map([
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
        ]);
    } else if (type === "budgetCategories") {
        dataMap = new Map([
            ["Housing", 0],
            ["Transportation", 0],
            ["Food", 0],
            ["Utilities", 0],
            ["Medical & Healthcare", 0],
            ["Personal", 0],
            ["Entertainment", 0],
            ["Other", 0],
        ])
    }

    return dataMap
}

// Function to correctly format the column name
export const formatColumnNames = (name) => {

    let formattedName = "";

    switch (name) {
        case "housing":
            formattedName = "Housing"
            break;
        case "transportation":
            formattedName = "Transportation"
            break;
        case "food":
            formattedName = "Food"
            break;
        case "utilities":
            formattedName = "Utilities"
            break;
        case "medical_healthcare":
            formattedName = "Medical & Healthcare"
            break;
        case "personal":
            formattedName = "Personal"
            break;
        case "entertainment":
            formattedName = "Entertainment"
            break;
        case "other":
            formattedName = "Other"
            break;
        default:
            break;
    }
    return formattedName
}

// Function to format transaction objects
export const transactionFormatter = (obj) => {
    
    // Get amount and transaction date from object
    let {amount, transaction_date, category, type} = obj;

    
    // Convert amount from string to number
    amount = Number(amount);

    // Get the month from the transaction date
    let transaction_month = transaction_date.slice(5, 7);
    let transaction_year = parseInt(transaction_date.slice(0, 4));

    // Switch statement to convert numerical values to months of year
    switch (transaction_month){
        case "01":
            transaction_month = "Jan"
            break;
        case "02":
            transaction_month = "Feb"
            break;
        case "03":
            transaction_month = "Mar"
            break;
        case "04":
            transaction_month = "Apr"
            break;
        case "05":
            transaction_month = "May"
            break;
        case "06":
            transaction_month = "Jun"
            break;
        case "07":
            transaction_month = "Jul"
            break;
        case "08":
            transaction_month = "Aug"
            break;
        case "09":
            transaction_month = "Sep"
            break;
        case "10":
            transaction_month = "Oct"
            break;
        case "11":
            transaction_month = "Nov"
            break;
        case "12":
            transaction_month = "Dec"
            break;
        default:
            break;
    }

    return {amount, month: transaction_month, year: transaction_year, category, type}
}