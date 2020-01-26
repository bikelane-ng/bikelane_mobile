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
            constants.AUTH_DRIVER,
            {
                type: constants.AUTH_DRIVER_SUCCESS,
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        token: data.token,
                        user: data.user
                    }
                })
            },
            {
                type: constants.AUTH_DRIVER_FAILURE,
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

export function driverDetails(details) {
    return (dispatch) => {
        dispatch({
            type: constants.DRIVER_DETAILS,
            payload: details
        })
    }
}

export function bankDetails(details) {
    return (dispatch) => {
        dispatch({
            type: constants.BANK_DETAILS,
            payload: details
        })
    }
}

export function driverInfo(details) {
    return (dispatch) => {
        dispatch({
            type: constants.DRIVER_INFO,
            payload: details
        })
    }
}

export function addPhoto(photo) {
    return (dispatch) => {
        dispatch({
            type: constants.ADD_PHOTO,
            payload: photo
        })
    }
}

export function addBankDetails(details) {
    return (dispatch) => {
        dispatch({
            type: constants.BANK_DETAILS,
            payload: details
        })
    }
}

export function personalDocs(docs) {
    return (dispatch) => {
        dispatch({
            type: constants.DRIVER_DOCS,
            payload: docs
        })
    }
}

export const driverProfile = details => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver`,
        method: 'POST',
        types: [
            constants.DRIVER_PROFILE,
            {
                type: constants.DRIVER_PROFILE,
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        data
                    }
                })
            },
            {
                type: constants.DRIVER_PROFILE,
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

export const editDriver = (id, data) => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver/${id}`,
        method: "PUT",
        types: [
            constants.EDIT_DRIVER,
            {
                type: constants.EDIT_DRIVER,
                payload: (action, state, res) => res.json().then(result => ({
                    result
                }))
            },
            {
                type: constants.EDIT_DRIVER,
                meta: (action, state, res) => {
                    return res;
                }
            }
        ],
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }
})

export const avatar = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver/avatar`,
        method: "PUT",
        types: [
            constants.NEW_AVATAR,
            {
                type: constants.NEW_AVATAR,
                payload: (action, state, res) => res.json().then(result => ({
                    result
                }))
            },
            {
                type: constants.NEW_AVATAR,
                meta: (action, state, res) => {
                    return {
                        status: res.status,
                        message: res.message
                    };
                }
            }
        ],
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(data)
    }
})

export const fetchDriver = id => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver/${id}`,
        method: 'GET',
        types: [
            constants.DRIVER_DATA,
            {
                type: constants.DRIVER_DATA,
                payload: (action, state, response) => response.json().then(data => {
                    return {
                        data
                    }
                })
            },
            {
                type: constants.DRIVER_DATA,
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

export const updateDriverStatus = (status, driverId) => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/driver/status/${driverId}`,
        method: 'PUT',
        types: [
            constants.UPDATE_DRIVER_STATUS,
            {
                type: constants.UPDATE_DRIVER_STATUS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => {
                    return {
                        response,
                    }
                })
            },
            {
                type: constants.UPDATE_DRIVER_STATUS_FAILURE,
                meta: (action, state, res) => {
                    return {
                        status: res,
                    }
                }
            }
        ],
        options: { timeout: 10000 },
        body: JSON.stringify(status),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
});