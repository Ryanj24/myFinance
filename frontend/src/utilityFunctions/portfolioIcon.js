export const portfolioIcon = (portfolio) => {
    
    switch(portfolio.provider) {
        case "AJ Bell":
            return {...portfolio, iconIndex: 0}
        case "Barclays":
            return {...portfolio, iconIndex: 1}
        case "Fidelity":
            return {...portfolio, iconIndex: 2}
        case "Freetrade":
            return {...portfolio, iconIndex: 3}
        case "Hargreaves Lansdown":
            return {...portfolio, iconIndex: 4}
        case "HSBC":
            return {...portfolio, iconIndex: 5}
        case "Lloyds":
            return {...portfolio, iconIndex: 6}
        case "JP Morgan":
            return {...portfolio, iconIndex: 7}
        case "Morgan Stanley":
            return {...portfolio, iconIndex: 8}
        case "NatWest":
            return {...portfolio, iconIndex: 9}
        case "Royal Bank of Scotland":
            return {...portfolio, iconIndex: 10}
        case "Santander":
            return {...portfolio, iconIndex: 11}
        case "Trading212":
            return {...portfolio, iconIndex: 12}
        case "Vanguard":
            return {...portfolio, iconIndex: 13}
        default:
            return {...portfolio, iconIndex: 14};        
    }
}