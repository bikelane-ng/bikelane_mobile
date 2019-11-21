import * as constants from '../constants/ActionTypes';
import {
    RSAA
} from 'redux-api-middleware';
import config from '../config';

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