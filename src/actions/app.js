import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

export const initializeApp = () => {
    return async (dispatch) => {
        return AsyncStorage.getItem(constants.TOKEN)
            .then((token) => {
                if (!token) return dispatch({
                    type: constants.INITIALIZATION_FAILURE
                })
                return dispatch({
                    type: constants.INITIALIZE_APP
                })
            })
    }
}

export function inputNumber(number) {
    return (dispatch) => {
        dispatch({
            type: constants.INPUT_NUMBER,
            payload: number
        })
    }
}

export function validateMobile() {
    return (dispatch, store) => {
        let number = store().app.mobile;
        if (!number.startsWith(234) && !number.startsWith('+234')) {
            number = '234' + number;
        }
        dispatch({
            type: constants.VALIDATE_NUMBER,
            payload: number
        })
    }
}

export const generateOTP = number => ({
    [RSAA]: {
        endpoint: `${config.api.host}/phone/sendOtp`,
        method: 'POST',
        types: [
            constants.GENERATE_OTP,
            {
                type: constants.GENERATE_OTP_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.GENERATE_OTP_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
                    }
                }
            }
        ],
        body: JSON.stringify(number),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const verifyOTP = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/phone/verifyOtp`,
        method: 'POST',
        types: [
            constants.VERIFY_OTP,
            {
                type: constants.VERIFY_OTP_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.VERIFY_OTP_FAILURE,
                meta: (action, state, res) => {
                    return {
                        error: res
                    }
                }
            }
        ],
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
})