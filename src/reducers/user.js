import * as constants from '../constants/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case constants.INIT_SUCCESS:
            return Object.assign({}, state, {
                current: action.payload,
                loggedIn: true,
            })
        case constants.AUTH_USER:
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined,
                loggedIn: undefined,
            })
        case constants.AUTH_USER_SUCCESS:
            const { response } = action.payload;
            if (response && response.data.token) {
                AsyncStorage.setItem(constants.TOKEN, response.data.token);
                AsyncStorage.setItem(constants.CURRENT_USER, JSON.stringify(response.data.user));
                return {
                    ...state,
                    isProcessing: false,
                    loggedIn: true,
                    role: response.data.user.role.name,
                    current: response.data.user
                };
            }
        case constants.AUTH_USER_FAILURE:
            return Object.assign({}, state, {
                error: action.payload.response && action.payload.response.error,
                isProcessing: false,
                loggedIn: undefined,
            })
        case constants.REQUEST(constants.EDIT_USER):
            return Object.assign({}, state, {
                isProcessing: true,
                modified: false,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.EDIT_USER):
            return {
                ...state,
                isProcessing: false,
                modified: true
            }
        case constants.REQUEST_FAILURE(constants.EDIT_USER):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                modified: false,
                isProcessing: false
            })
        case constants.REQUEST(constants.USER_DATA):
            return Object.assign({}, state, {
                isProcessing: true,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.USER_DATA):
            return {
                ...state,
                credentials: action.payload.data,
                isProcessing: false
            }
        case constants.REQUEST_FAILURE(constants.USER_DATA):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                isProcessing: false
            })
        case constants.REQUEST(constants.ADD_CARD):
            return Object.assign({}, state, {
                card: false,
                error: undefined
            })
        case constants.REQUEST_SUCCESS(constants.ADD_CARD):
            return {
                ...state,
                card: true
            }
        case constants.REQUEST_FAILURE(constants.ADD_CARD):
            return Object.assign({}, state, {
                error: 'An error occured while processing your request',
                card: false
            })
        default:
            return state;
    }
}
