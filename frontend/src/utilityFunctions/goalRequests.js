export const createGoal = async (data, userToken) => {
    try {

        const request = await fetch(`http://localhost:3000/api/goals`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                goalName: data.goal_name,
                goalDesc: data.goal_desc, 
                endGoal: data.goal_end_amount, 
                endDate: data.goal_end_date
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

export const editGoalDetails = async (data, goalID, userToken) => {
    try {

        const request = await fetch(`http://localhost:3000/api/goals/edit/${goalID}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                goalName: data.goal_name,
                goalDesc: data.goal_desc, 
                endGoal: data.goal_end_amount, 
                endDate: data.goal_end_date
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

export const updateProgress = async (data, goalID, userToken) => {
    try {

        const request = await fetch(`http://localhost:3000/api/goals/update/${goalID}`, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({
                currentProgress: data.updatedProgress
            })
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}

export const removeGoal = async (goalID, userToken) => {
    try {

        const request = await fetch(`http://localhost:3000/api/goals/${goalID}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        })

        const response = await request.json()

        return response
    } catch (error) {
        return error
    }
}