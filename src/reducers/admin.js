import * as constants from '../constants/ActionTypes';

const initialState = {
    driverDetails: {},
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case constants.REG_DRIVER:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.REG_DRIVER_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                driver: action.payload.response.data
            };
        case constants.REG_DRIVER_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.response.data,
                isProcessing: false
            })
        case constants.ALL_DRIVERS:
            return Object.assign({}, state, {
                drivers: action.payload.response.data,
            })
        case constants.DRIVER_DETAILS:
            return Object.assign({}, state, {
                driverDetails: action.payload.response.data,
            })
        default:
            return state;
    }
}