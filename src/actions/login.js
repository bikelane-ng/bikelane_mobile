import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';

export const doLogin = details => ({
    [RSAA]: {
        endpoint: `${config.api.host}/login`,
        method: 'POST',
        types: [
            constants.AUTH_USER,
            {
                type: constants.AUTH_USER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.AUTH_USER_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: 'Network request failed'
                    }
                }
            }
        ],
        options: { timeout: 10000 },
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const logOut = _ => {
    return (dispatch) => {
        dispatch({ type: constants.LOGOUT })
    }
}