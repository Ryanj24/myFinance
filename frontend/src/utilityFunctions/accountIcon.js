export const accountIcon = (obj) => {

    switch(obj.account_provider) {
        case "Barclays":
            return {...obj, iconIndex: 0}
        case "HSBC":
            return {...obj, iconIndex: 1}
        case "Lloyds":
            return {...obj, iconIndex: 2}
        case "Monzo":
            return {...obj, iconIndex: 3}
        case "NatWest":
            return {...obj, iconIndex: 4}
        case "Royal Bank of Scotland":
            return {...obj, iconIndex: 5}
        case "Santander":
            return {...obj, iconIndex: 6}
        case "Starling Bank":
            return {...obj, iconIndex: 7}
        case "Virgin Money":
            return {...obj, iconIndex: 8}
        default:
            return {...obj, iconIndex: 9};        
    }
}