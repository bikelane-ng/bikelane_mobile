import * as constants from '../constants/ActionTypes';
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import config from '../config';

export const editUser = (id, data) => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/user/${id}`,
        method: "PUT",
        types: [
            constants.EDIT_USER,
            {
                type: constants.EDIT_USER,
                payload: (action, state, res) => res.json().then(result => ({
                    result
                }))
            },
            {
                type: constants.EDIT_USER,
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

export const fetchUser = userId => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/user/${userId}`,
        method: "GET",
        types: [
            constants.USER_DATA,
            {
                type: constants.USER_DATA,
                payload: (action, state, res) => res.json().then(data => ({
                    data
                }))
            },
            {
                type: constants.USER_DATA,
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
    }
})

export const addCard = data => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/user/card`,
        method: "POST",
        types: [
            constants.ADD_CARD,
            {
                type: constants.ADD_CARD,
                payload: (action, state, res) => res.json().then(data => ({
                    data
                }))
            },
            {
                type: constants.ADD_CARD,
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

// export const avatar = data => ({
//     [RSAA]: {
//         endpoint: `${config.api.host}/api/user/avatar`,
//         method: "PUT",
//         types: [
//             constants.REQUEST(constants.NEW_AVATAR),
//             {
//                 type: constants.REQUEST_SUCCESS(constants.NEW_AVATAR),
//                 payload: (action, state, res) => res.json().then(result => ({
//                     result
//                 }))
//             },
//             {
//                 type: constants.REQUEST_FAILURE(constants.NEW_AVATAR),
//                 meta: (action, state, res) => {
//                     return {
//                         status: res.status,
//                         message: res.message
//                     };
//                 }
//             }
//         ],
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json"
//         },
//         credentials: "same-origin",
//         body: JSON.stringify(data)
//     }
// })

export const logout = _ => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/logout`,
        method: 'GET',
        types: [
            constants.REQUEST(constants.LOGOUT),
            {
                type: constants.REQUEST_SUCCESS(constants.LOGOUT),
                payload: (action, state, response) => response.json().then(result => {
                    alert("Logged Out")
                })
            }
        ],
        options: { timeout: 60000 },
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
})