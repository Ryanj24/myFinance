export const transactionIcon = (obj) => {

    switch(obj.category) {
        case "Housing":
            return {...obj, iconIndex: 0}
        case "Transportation":
            return {...obj, iconIndex: 1}
        case "Food":
            return {...obj, iconIndex: 2}
        case "Utilities":
            return {...obj, iconIndex: 3}
        case "Medical & Healthcare":
            return {...obj, iconIndex: 4}
        case "Personal":
            return {...obj, iconIndex: 5}
        case "Entertainment":
            return {...obj, iconIndex: 6}
        case "Other":
            return {...obj, iconIndex: 7}
        default:
            break;        
    }
}