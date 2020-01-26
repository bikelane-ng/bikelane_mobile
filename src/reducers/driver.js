import * as constants from '../constants/ActionTypes';

const initialState = {
    driverDetails: {},
}

export default function driverReducer(state = initialState, action) {
    switch (action.type) {
        case constants.AUTH_DRIVER:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.AUTH_DRIVER_SUCCESS:
            if (action.payload.token) {
                AsyncStorage.setItem(constants.TOKEN, action.payload.token);
                return {
                    ...state,
                    isProcessing: false,
                    isAuthenticated: true,
                    current: action.payload.user
                };
            }
        case constants.AUTH_DRIVER_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.status == 400 ? 'Invalid login credentials!' : `Login failed due to ${action.payload.status}`,
                isProcessing: false
            })
        case constants.DRIVER_DETAILS:
            return Object.assign({}, state, {
                driverDetails: Object.assign(state.driverDetails || {}, action.payload)
            })
        case constants.ADD_PHOTO:
            return Object.assign({}, state, {
                avatar: action.payload.photo,
                driverDetails: Object.assign(state.driverDetails, action.payload)
            })
        // case constants.DRIVER_INFO:
        //     return Object.assign({}, state, {
        //         driverDetails: Object.assign(state.driverDetails, { driverInfo: action.payload })
        //     })
        // case constants.BANK_DETAILS:
        //     return Object.assign({}, state, {
        //         driverDetails: Object.assign(state.driverDetails, { driverInfo: { bankDetails: action.payload } })
        //     })
        case constants.DRIVER_DOCS:
            return Object.assign({}, state, {
                driverDetails: Object.assign(state.driverDetails, action.payload)
            })
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
        case constants.UPDATE_DRIVER_STATUS:
            return {
                ...state,
                status: undefined,
            }

        case constants.UPDATE_DRIVER_STATUS_SUCCESS:
            return {
                ...state,
                status: action.payload.response,
            }

        case constants.UPDATE_DRIVER_STATUS_FAILURE:
            return {
                ...state,
                status: undefined,
                updateDriverError: `${action.payload.name} - ${action.payload.message}`,
            }
        default:
            return state;
    }
}