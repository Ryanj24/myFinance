export const joinArraysOfObjects = (arr1, arr2) => {
    const newArr = arr1.map(obj1 => {
        const obj2 = arr2.find(obj2 => obj2.category === obj1.category)
        return {...obj1, ...obj2}
    })

    return newArr
}