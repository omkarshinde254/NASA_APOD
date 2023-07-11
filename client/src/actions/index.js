export const incrementCtr = () => {
    return {
        type: 'Increment'
    }
}

export const decrementCtr = () => {
    return {
        type: 'Decrement'
    }
}

export const updateCtr = (value) => {
    return {
        type: 'Update',
        payload: value
    }
}