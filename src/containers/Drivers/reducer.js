import * as actionTypes from "./actionTypes"

const initialState = {
    loading: false,
    drivers: [],
    error: null,
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // GET CASES
        case actionTypes.GET_DRIVERS_PENDING:
            return { ...initialState, loading: true }
        case actionTypes.GET_DRIVERS_SUCCESS:
            return {
                ...initialState,
                drivers: action.payload.data,
            }
        case actionTypes.GET_DRIVERS_FAILURE:
            return { ...initialState, error: action.payload }

        default:
            return state
    }
}
