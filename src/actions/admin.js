import * as constants from '../constants/ActionTypes';
import {
    RSAA
} from 'redux-api-middleware';
import config from '../config';
const BASE_URL = `${config.api.host}/api/driver`;

export const driverReg = details => (console.log(details), {
    [RSAA]: {
        endpoint: `${BASE_URL}`,
        method: 'POST',
        types: [
            constants.REG_DRIVER,
            {
                type: constants.REG_DRIVER_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.REG_DRIVER_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: 'Network request failed'
                    }
                }
            }
        ],
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const allDrivers = _ => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver/`,
        method: 'GET',
        types: [
            constants.ALL_DRIVERS,
            {
                type: constants.ALL_DRIVERS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.ALL_DRIVERS,
                meta: (action, state, res) => {
                    if (res) {
                        return {
                            status: res.status,
                            statusText: res.statusText
                        };
                    } else {
                        return {
                            status: 'Network request failed'
                        }
                    }
                }
            }
        ],
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});

export const driverDetails = details => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver`,
        method: 'POST',
        types: [
            constants.DRIVER_DETAILS,
            {
                type: constants.DRIVER_DETAILS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.DRIVER_DETAILS,
                meta: (action, state, res) => {
                    if (res) {
                        return {
                            status: res.status,
                            statusText: res.statusText
                        };
                    } else {
                        return {
                            status: 'Network request failed'
                        }
                    }
                }
            }
        ],
        body: JSON.stringify(details),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});