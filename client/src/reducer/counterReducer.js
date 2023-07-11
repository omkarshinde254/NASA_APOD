const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'Increment': {
            if (state >= 0)
                return 0
            else
                return state + 1;

        }
        case 'Decrement':
            return state - 1;
        case 'Update':
            return action.payload;
        default:
            return state;
    }
};

export default counterReducer;