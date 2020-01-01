import * as constants from '../constants/ActionTypes';

const initialState = {
   
}

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case constants.REG_DRIVER:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined,
                success: undefined,
            })
        case constants.REG_DRIVER_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                success: true,
                driver: action.payload.response && action.payload.response.data
            };
        case constants.REG_DRIVER_FAILURE:
            return Object.assign({}, state, {
                error: `${action.payload.name} - ${action.meta && action.meta.status}`,
                isProcessing: false,
                success: undefined,
            })
        case constants.ALL_DRIVERS:
            return Object.assign({}, state, {
                drivers: undefined,
            })
        case constants.ALL_DRIVERS_SUCCESS:
            return Object.assign({}, state, {
                drivers: action.payload.response && action.payload.response.data,
            })
        case constants.ALL_DRIVERS_FAILURE:
            return Object.assign({}, state, {
                drivers: undefined,
            })
        // case constants.DRIVER_DETAILS:
        //     return Object.assign({}, state, {
        //         driverDetails: action.payload.response.data,
        //     })
        default:
            return state;
    }
}