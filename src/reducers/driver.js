import * as constants from '../constants/ActionTypes';

export default function driverReducer(state = {}, action) {
    switch (action.type) {
        case constants.DRIVER_PROFILE:
            return Object.assign({}, state, {
                update: false,
                isProcessing: true,
                error: undefined
            })
        case constants.DRIVER_PROFILE:
            return {
                ...state,
                isProcessing: false,
                update: true,
            }
        case constants.DRIVER_PROFILE:
            return Object.assign({}, state, {
                error: `An error occured: ${action.payload.status}`,
                isProcessing: false
            })
        case constants.DRIVER_DATA:
            return Object.assign({}, state, {
                isLoaded: true,
                error: undefined
            })
        case constants.DRIVER_DATA:
            return {
                ...state,
                isLoaded: true,
                credentials: action.payload.data
            }
        case constants.DRIVER_DATA:
            return Object.assign({}, state, {
                error: `An error occured: ${action.payload.status}`,
                isLoaded: false
            })
        case constants.NEW_AVATAR:
            return Object.assign({}, state, {})
        case constants.NEW_AVATAR:
            return {
                avatar: true
            }
        case constants.NEW_AVATAR:
            return Object.assign({}, state, {
                error: 'An error occured while processing your request'
            })
        default:
            return state;
    }
}