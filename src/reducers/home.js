import * as constants from '../constants/ActionTypes';

const initialState = {
    searching: false,
    location: {
        coords: {}
    },
    inputData: {},
    selectedAddress: {},
    mapRef: undefined,
}
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case constants.GET_CURRENT_LOCATION:
            return Object.assign({}, state, {
                location: action.payload,
            })

        case constants.UPDATE_INPUT_ADDRESS:
            return Object.assign({}, state, {
                currentAddress: action.payload
            })

        case constants.UPDATE_INPUT_ADDRESS_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })

        case constants.GET_INPUT:
            return Object.assign({}, state, {
                searching: true,
                resultTypes: action.payload.key,
                inputData: {
                    pickUp: action.payload.key == 'pickUp' ? action.payload.value || undefined : state.inputData.pickUp,
                    dropOff: action.payload.key == 'dropOff' ? action.payload.value || undefined : state.inputData.dropOff
                }
            })

        case constants.CLEAR_INPUT:
            return Object.assign({}, state, {
                searching: false,
                inputData: {
                    pickUp: action.payload == 'pickUp' ? undefined : state.inputData.pickUp,
                    dropOff: action.payload == 'dropOff' ? undefined : state.inputData.dropOff
                },
                // selectedAddress: {
                //     [action.payload]: {},
                // }
            })

        case constants.TOGGLE_SEARCH_RESULT:
            return Object.assign({}, state, {
                // resultTypes: action.payload,
                toggle: true,
                predictions: {}
            })
        case constants.UNTOGGLE_SEARCH_RESULT:
            return Object.assign({}, state, {
                toggle: false,
                searching: false,
                predictions: undefined,
                error: undefined
            })
        case constants.GET_ADDRESS_PREDICTIONS:
            return Object.assign({}, state, {
                searching: false,
                predictions: action.payload,
                error: undefined
            })
        case constants.GET_ADDRESS_PREDICTIONS_ERROR:
            return Object.assign({}, state, {
                searching: false,
                error: action.payload,
                predictions: undefined
            })
        case constants.GET_CURRENT_ADDRESS:
            return Object.assign({}, state, {
                resultTypes: 'pickUp',
                inputData: {
                    pickUp: action.payload.name,
                },
                selectedAddress: {
                    pickUp: action.payload,
                }
            })
        case constants.GET_SELECTED_ADDRESS:
            return Object.assign({}, state, {
                // toggle: false,
                predictions: {},
                inputData: {
                    pickUp: state.resultTypes == 'pickUp' ? action.payload.name : state.inputData.pickUp,
                    dropOff: state.resultTypes == 'dropOff' ? action.payload.name : state.inputData.dropOff
                },
                selectedAddress: {
                    pickUp: state.resultTypes == 'pickUp' ? action.payload : state.selectedAddress.pickUp,
                    dropOff: state.resultTypes == 'dropOff' ? action.payload : state.selectedAddress.dropOff
                }
            })
        case constants.GET_SELECTED_ADDRESS_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        case constants.GET_DISTANCE_MATRIX:
            return Object.assign({}, state, {
                distanceMatrix: action.payload
            })
        case constants.GET_DISTANCE_MATRIX_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        case constants.GET_ROUTE_DIRECTIONS:
            return Object.assign({}, state, {
                routeDirections: action.payload
            })
        case constants.GET_ROUTE_DIRECTIONS_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        case constants.GET_NEARBY_DRIVERS:
            return Object.assign({}, state, {
                nearbyDrivers: action.payload
            })
        case constants.GET_NEARBY_DRIVERS:
            return Object.assign({}, state, {
                error: action.payload
            })
        case constants.NEAREST_DRIVER:
            return Object.assign({}, state, {
                nearestDriver: action.payload,
                overlay: false,
            })
        case constants.GET_FARE:
            return Object.assign({}, state, {
                fare: action.payload
            })
        // case constants.REQUEST_RIDE:
        //     return Object.assign({}, state, {
        //         requestRide: true,
        //         overlay: true,
        //     })
        case constants.CANCEL_RIDE:
            return Object.assign({}, state, {
                requestRide: false,
                overlay: false,
                toggle: true,
                nearestDriver: undefined,
            })
        case constants.MAP_REF:
            if (!state.mapRef) {
                return {
                    ...state,
                    mapRef: action.payload,
                }
            }
        case constants.ESITMATE_RIDE_DETAILS:
            return {
                ...state,
                estimate: true,
                processing: true,
                toggle: false,
                error: undefined,
                estimatedRideDetails: undefined,
            }
        case constants.ESITMATE_RIDE_DETAILS_SUCCESS:
            return {
                ...state,
                processing: undefined,
                estimatedRideDetails: action.payload.response,
            }
        case constants.ESITMATE_RIDE_DETAILS_FAILURE:
            return {
                ...state,
                processing: undefined,
                error: `${action.payload.name} - ${action.payload.message}`,
            }

            case constants.REQUEST_RIDE:
            return {
                ...state,
                estimate: false,
                requestRide: true,
                requestedRide: undefined,
                error: undefined,
            }
        case constants.REQUEST_RIDE_SUCCESS:
            return {
                ...state,
                // processing: undefined,
                requestedRide: action.payload.response,
            }
        case constants.REQUEST_RIDE_FAILURE:
            return {
                ...state,
                // processing: undefined,'
                requestRide: undefined,
                estimate: true,
                error: `${action.payload.name} - ${action.payload.message}`,
            }
        default:
            return state;
    }
}

// import ACTION_HANDLERS from './handlers';


// export function homeReducer(state = {}, action) {
//     const handler = ACTION_HANDLERS[action.type];

//     return handler ? handler(state, action) : state;
// }