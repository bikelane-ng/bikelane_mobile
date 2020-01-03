// import update from "react-addons-update";
import * as constants from "../constants/ActionTypes";
import {
    CALL_API,
    RSAA
} from 'redux-api-middleware';
import { Dimensions } from "react-native"
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from "react-native-google-places";
import Axios from "axios";
import Geocoder from 'react-native-geocoding';
import calculateFare from '../helpers/FareCalculator';
import { FakeDrivers } from "../fakers/fake_drivers";
var polyline = require('@mapbox/polyline');
import haversine from "haversine";
import { API_KEY } from "../constants/DefaultProps";
import config from "../config";
Geocoder.init(API_KEY); // use a valid API key

const {
    GET_CURRENT_LOCATION,
    GET_CURRENT_ADDRESS,
    GET_INPUT,
    TOGGLE_SEARCH_RESULT,
    UNTOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_ADDRESS_PREDICTIONS_ERROR,
    GET_SELECTED_ADDRESS,
    GET_SELECTED_ADDRESS_ERROR,
    GET_DISTANCE_MATRIX,
    GET_DISTANCE_MATRIX_ERROR,
    UPDATE_INPUT_ADDRESS,
    UPDATE_INPUT_ADDRESS_ERROR,
    GET_FARE,
    GET_ROUTE_DIRECTIONS,
    GET_ROUTE_DIRECTIONS_ERROR,
    NEAREST_DRIVER,
    BOOK_CAR,
    GET_NEARBY_DRIVERS,
    REQUEST_RIDE,
    REQUEST_RIDE_SUCCESS,
    REQUEST_RIDE_FAILURE,
    CANCEL_RIDE,
    MAP_REF,
    CLEAR_INPUT,
    ESITMATE_RIDE_DETAILS,
    ESITMATE_RIDE_DETAILS_SUCCESS,
    ESITMATE_RIDE_DETAILS_FAILURE,
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA



//--------------------
//Actions
//--------------------
export function getCurrentLocation() {
    return (dispatch) => {
        Geolocation.getCurrentPosition(
            (position) => {
                // getSelectedAddress(position.coords)
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
}

export function getCurrentAddress() {
    return (dispatch) => {
        RNGooglePlaces.getCurrentPlace()
            .then((results) => {
                console.log(results)
                results.reduce(function (prev, current) {
                    if ((prev.likelihood > current.likelihood)) {
                        dispatch({
                            type: GET_CURRENT_ADDRESS,
                            payload: prev,
                        });
                    }
                })
            })
            .catch((error) => console.log(error.message));
    }
}

export function updateInputAddress(region) {
    return (dispatch) => {
        Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                var addressComponent = json.results[0];
                RNGooglePlaces.lookUpPlaceByID(addressComponent.place_id)
                    .then((results) => {
                        dispatch({
                            type: UPDATE_INPUT_ADDRESS,
                            payload: results
                        })
                    })
            })
            .catch(error => dispatch({
                type: UPDATE_INPUT_ADDRESS_ERROR,
                payload: error
            }));
    }
}

//GET USER INPUT

export function getInputData(payload) {
    return {
        type: GET_INPUT,
        payload
    }
}

export function clearInputData(payload) {
    return {
        type: CLEAR_INPUT,
        payload
    }
}

//toggle search result modal
export function toggleSearchResultModal(payload) {
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload
    }
}

export function unToggleSearchResultModal() {
    return {
        type: UNTOGGLE_SEARCH_RESULT
    }
}

//GET ADRESSES FROM GOOGLE PLACE

export function getAddressPredictions() {
    return (dispatch, store) => {
        let userInput = store().home.resultTypes === 'pickUp' ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                country: "NG"
            }
        )
            .then((results) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_ADDRESS_PREDICTIONS,
                        payload: results
                    })
                }, 2000)
            )
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_ADDRESS_PREDICTIONS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    };
}


//get selected address

export function getSelectedAddress(payload) {
    console.log(payload)
    const dummyNumbers = {
        baseFare: 0.4,
        timeRate: 0.14,
        distanceRate: 0.97,
        surge: 1
    }
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then((results) => {
                dispatch({
                    type: GET_SELECTED_ADDRESS,
                    payload: results
                })
            })
            // .then(() => {
            //     //Get the distance and time
            //     if (store().home.selectedAddress.pickUp && store().home.selectedAddress.dropOff) {
            //         let query = {
            //             origins: store().home.selectedAddress.pickUp.location.latitude + "," + store().home.selectedAddress.pickUp.location.longitude,
            //             destinations: store().home.selectedAddress.dropOff.location.latitude + "," + store().home.selectedAddress.dropOff.location.longitude,
            //             mode: "driving",
            //             key: API_KEY
            //         }
            //         Axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${query.origins}&destinations=${query.destinations}&mode=${query.mode}&key=${query.key}`)
            //             .then(response => {
            //                 dispatch({
            //                     type: GET_DISTANCE_MATRIX,
            //                     payload: response.data
            //                 });
            //             })
            //             .catch(err => {
            //                 dispatch({
            //                     type: GET_DISTANCE_MATRIX_ERROR,
            //                     payload: err
            //                 });
            //             })
            //     }
            //     setTimeout(function () {
            //         if (store().home.selectedAddress.pickUp && store().home.selectedAddress.dropOff) {
            //             const fare = calculateFare(
            //                 dummyNumbers.baseFare,
            //                 dummyNumbers.timeRate,
            //                 store().home.distanceMatrix.rows[0].elements[0].duration.value,
            //                 dummyNumbers.distanceRate,
            //                 store().home.distanceMatrix.rows[0].elements[0].distance.value,
            //                 dummyNumbers.surge,
            //             );
            //             dispatch({
            //                 type: GET_FARE,
            //                 payload: fare
            //             })
            //         }
            //     }, 2000)

            // })
            .catch((error) =>
                setTimeout(() => {
                    dispatch({
                        type: GET_SELECTED_ADDRESS_ERROR,
                        payload: error.message
                    })
                }, 2000)
            );
    }
}

export function getRouteDirections() {
    return (dispatch, store) => {
        if (store().home.inputData.pickUp && store().home.inputData.dropOff) {
            let query = {
                origins: store().home.inputData.pickUp.location.latitude + "," + store().home.inputData.pickUp.location.longitude,
                destinations: store().home.inputData.dropOff.location.latitude + "," + store().home.inputData.dropOff.location.longitude,
                mode: "driving",
                key: "AIzaSyA-HjztLKyWGOUaIG9Bx_n6Ie_A5p1qMkQ"
            }
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${query.origins}&destination=${query.destinations}&key=${query.key}&mode=${query.mode}`;
            Axios.get(url)
                .then(response => {
                    dispatch({
                        type: GET_ROUTE_DIRECTIONS,
                        payload: polyline.decode(response.data.routes[0].overview_polyline.points)
                    });
                })
                .catch(err => {
                    dispatch({
                        type: GET_ROUTE_DIRECTIONS_ERROR,
                        payload: err
                    });
                })
        }
    }
}

export function getNearbyDrivers() {
    return (dispatch, store) => {
        var minDistance = 0;
        var nearbyDrivers = [];
        var userLocation = {
            latitude: store().home.selectedAddress.pickUp.location.latitude,
            longitude: store().home.selectedAddress.dropOff.location.longitude
        }
        FakeDrivers(userLocation.latitude, userLocation.longitude).forEach(drivers => {
            let distance = haversine(userLocation, drivers.position);
            drivers = Object.assign(drivers, { distance: distance });
            if (distance <= 50) {
                nearbyDrivers.push(drivers);
            }
        })
        var nearestDriver = nearbyDrivers.reduce((prev, curr) => curr.distance < prev.distance ? curr : prev);
        return dispatch({
            type: GET_NEARBY_DRIVERS,
            payload: nearbyDrivers
        })
    }
}

export function nearestDriver(driver) {
    return (dispatch) => {
        dispatch({
            type: NEAREST_DRIVER,
            payload: driver
        })
    }
}

export function requestRide___() {
    return (dispatch, store) => {
        dispatch({
            type: REQUEST_RIDE,
        })
        setTimeout(() => {
            var minDistance = 0;
            var nearbyDrivers = [];
            var userLocation = {
                latitude: store().home.selectedAddress.pickUp.location.latitude,
                longitude: store().home.selectedAddress.dropOff.location.longitude
            }
            FakeDrivers(userLocation.latitude, userLocation.longitude).forEach(drivers => {
                let distance = haversine(userLocation, drivers.position);
                drivers = Object.assign(drivers, { distance: distance });
                if (distance <= 50) {
                    nearbyDrivers.push(drivers);
                }
            })
            var nearestDriver = nearbyDrivers.reduce((prev, curr) => curr.distance < prev.distance ? curr : prev);
            return dispatch({
                type: NEAREST_DRIVER,
                payload: nearestDriver
            })
        }, 2000);
    }
}

export function cancelRide() {
    return (dispatch) => {
        dispatch({
            type: CANCEL_RIDE,
        })
    }
}

export function mapRef(ref) {
    return (dispatch) => {
        dispatch({
            type: MAP_REF,
            payload: ref,
        })
    }
}

export function confirmSelection() {
    return (dispatch) => {
        dispatch({
            type: CONFIRM_SELECTION,
        })
    }
}

export const estimateRideDetails = details => ({
    [RSAA]: {
        endpoint: `${config.api.host}/api/ride/estimatedRideDetails`,
        method: 'POST',
        types: [
            constants.ESITMATE_RIDE_DETAILS,
            {
                type: constants.ESITMATE_RIDE_DETAILS_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.ESITMATE_RIDE_DETAILS_FAILURE,
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

export const requestRide = details => (console.log(details), {
    [RSAA]: {
        endpoint: `${config.api.host}/api/ride`,
        method: 'POST',
        types: [
            constants.REQUEST_RIDE,
            {
                type: constants.REQUEST_RIDE_SUCCESS,
                payload: (action, state, response) => response.json().then(response => ({
                    response
                }))
            },
            {
                type: constants.REQUEST_RIDE_FAILURE,
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