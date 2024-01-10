export const budgetFormRequests = async (data, type, userToken) => {

    try {
        const request = await fetch("http://localhost:3000/api/budgets/", {
            method: `${type}`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                month: data.month_selection,
                year: data.year_selection,
                totalBudget: (+data.housing_budget) + (+data.transportation_budget) + (+data.food_budget) + (+data.utilities_budget) + (+data.medicalhealthcare_budget) + (+data.personal_budget) + (+data.entertainment_budget) + (+data.other_budget),
                housing: data.housing_budget,
                transportation: data.transportation_budget,
                food: data.food_budget,
                utils: data.utilities_budget,
                health: data.medicalhealthcare_budget,
                personal: data.personal_budget,
                entertainment: data.entertainment_budget,
                other: data.other_budget,
            })
        })

        const response = await request.json()

        return response

    } catch (error) {
        return error
    }
}