export const incomeDataPreprocessor = (obj) => {

    // Get amount and transaction date from object
    let {amount, transaction_date} = obj;

    // console.log(amount)
    // console.log(transactionDate)
    // console.log("---")

    
    // Convert amount from string to number
    amount = Number(amount);

    // Get the month from the transaction date
    transaction_date = transaction_date.slice(5, 7);

    // Switch statement to convert numerical values to months of year
    switch (transaction_date){
        case "01":
            transaction_date = "Jan"
            break;
        case "02":
            transaction_date = "Feb"
            break;
        case "03":
            transaction_date = "Mar"
            break;
        case "04":
            transaction_date = "Apr"
            break;
        case "05":
            transaction_date = "May"
            break;
        case "06":
            transaction_date = "Jun"
            break;
        case "07":
            transaction_date = "Jul"
            break;
        case "08":
            transaction_date = "Aug"
            break;
        case "09":
            transaction_date = "Sep"
            break;
        case "10":
            transaction_date = "Oct"
            break;
        case "11":
            transaction_date = "Nov"
            break;
        case "12":
            transaction_date = "Dec"
            break;
        default:
            break;
    }


    // return (({amount, transaction_date}) => ({amount, transaction_date.slice(6, 8)}))(obj);
    return {amount, month: transaction_date}
}