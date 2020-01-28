export const TOKEN = "TOKEN";
export const INIT_SUCCESS = "INIT_SUCCESS";
export const INPUT_NUMBER = "INPUT_NUMBER";
export const VALIDATE_NUMBER = "VALIDATE_NUMBER";
export const GENERATE_OTP = "GENERATE_OTP";
export const GENERATE_OTP_SUCCESS = "GENERATE_OTP_SUCCESS";
export const GENERATE_OTP_FAILURE = "GENERATE_OTP_FAILURE";
export const VERIFY_OTP = "VERIFY_OTP";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILURE = "VERIFY_OTP_FAILURE";
export const AUTH_USER = "AUTH_USER";
export const AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS";
export const AUTH_USER_FAILURE = "AUTH_USER_FAILURE";
export const AUTH_DRIVER = "AUTH_DRIVER";
export const AUTH_DRIVER_SUCCESS = "AUTH_DRIVER_SUCCESS";
export const AUTH_DRIVER_FAILURE = "AUTH_DRIVER_FAILURE";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const DRIVER_DETAILS = "DRIVER_DETAILS";
export const ADD_PHOTO = "ADD_PHOTO";
export const BANK_DETAILS = "BANK_DETAILS";
export const DRIVER_INFO = "DRIVER_INFO";
export const DRIVER_DOCS = "DRIVER_DOCS";
export const LOGOUT = "LOGOUT";
export const CURRENT_USER = "CURRENT_USER";
export const LIST_USERS = "LIST_USERS";
export const NEW_USER = "NEW_USER";
export const REGISTER = "REGISTER";
export const DRIVER_PROFILE = "DRIVER_PROFILE";
export const ALL_DRIVERS = "ALL_DRIVERS";
export const ALL_DRIVERS_SUCCESS = "ALL_DRIVERS_SUCCESS";
export const ALL_DRIVERS_FAILURE = "ALL_DRIVERS_FAILURE";
export const REG_DRIVER = "REG_DRIVER";
export const REG_DRIVER_SUCCESS = "REG_DRIVER_SUCCESS";
export const REG_DRIVER_FAILURE = "REG_DRIVER_FAILURE";
export const DRIVER_DATA = "DRIVER_DATA";
export const RIDER_PROFILE = "RIDER_PROFILE";
export const RIDER_DATA = "RIDER_DATA";
export const EDIT_USER = "EDIT_USER";
export const USER_DATA = "USER_DATA";
export const ADD_CARD = "ADD_CARD";
export const NEW_AVATAR = "NEW_AVATAR";
export const EDIT_DRIVER = "EDIT_DRIVER";
export const GET_FARE = "GET_FARE";
export const REQUEST_RIDE = "REQUEST_RIDE";
export const REQUEST_RIDE_SUCCESS = "REQUEST_RIDE_SUCCESS";
export const REQUEST_RIDE_FAILURE = "REQUEST_RIDE_FAILURE";
export const CANCEL_RIDE = "CANCEL_RIDE";
export const GET_CURRENT_LOCATION = "GET_CURRENT_LOCATION";
export const GET_CURRENT_ADDRESS = "GET_CURRENT_ADDRESS";
export const GET_CURRENT_ADDRESS_SUCCESS = "GET_CURRENT_ADDRESS_SUCCESS";
export const GET_INPUT = "GET_INPUT";
export const CLEAR_INPUT = "CLEAR_INPUT";
export const MAP_REF = "MAP_REF";
export const GET_SELECTED_ADDRESS = "GET_SELECTED_ADDRESS";
export const GET_SELECTED_ADDRESS_ERROR = "GET_SELECTED_ADDRESS_ERROR";
export const GET_ADDRESS_PREDICTIONS_ERROR = "GET_ADDRESS_PREDICTIONS_ERROR";
export const TOGGLE_SEARCH_RESULT = "TOGGLE_SEARCH_RESULT";
export const UNTOGGLE_SEARCH_RESULT = "UNTOGGLE_SEARCH_RESULT";
export const GET_ADDRESS_PREDICTIONS = "GET_ADDRESS_PREDICTIONS";
export const GET_DISTANCE_MATRIX = "GET_DISTANCE_MATRIX";
export const GET_DISTANCE_MATRIX_ERROR = "GET_DISTANCE_MATRIX_ERROR";
export const GET_ROUTE_DIRECTIONS = "GET_ROUTE_DIRECTIONS";
export const GET_ROUTE_DIRECTIONS_ERROR = "GET_ROUTE_DIRECTIONS_ERROR";
export const GET_NEARBY_DRIVERS = "GET_NEARBY_DRIVERS";
export const GET_NEARBY_DRIVERS_ERROR = "GET_NEARBY_DRIVERS_ERROR";
export const UPDATE_INPUT_ADDRESS = "UPDATE_INPUT_ADDRESS";
export const UPDATE_INPUT_ADDRESS_ERROR = "UPDATE_INPUT_ADDRESS_ERROR";
export const NEAREST_DRIVER = "NEAREST_DRIVER";
export const INITIALIZE_APP = "INITIALIZE_APP";
export const INITIALIZATION_FAILURE = "INITIALIZATION_FAILURE";
export const INITIALIZE_PAYSTACK_TRANSACTION = "INITIALIZE_PAYSTACK_TRANSACTION";
export const ESITMATE_RIDE_DETAILS = "ESITMATE_RIDE_DETAILS";
export const ESITMATE_RIDE_DETAILS_SUCCESS = "ESITMATE_RIDE_DETAILS_SUCCESS";
export const ESITMATE_RIDE_DETAILS_FAILURE = "ESITMATE_RIDE_DETAILS_FAILURE";
export const UPDATE_RIDE_DETAILS = "UPDATE_RIDE_DETAILS";
export const UPDATE_RIDE_STATUS = "UPDATE_RIDE_STATUS";
export const UPDATE_RIDE_STATUS_SUCCESS = "UPDATE_RIDE_STATUS_SUCCESS";
export const UPDATE_RIDE_STATUS_FAILURE = "UPDATE_RIDE_STATUS_FAILURE";
export const UPDATE_DRIVER_STATUS = "UPDATE_DRIVER_STATUS";
export const UPDATE_DRIVER_STATUS_SUCCESS = "UPDATE_DRIVER_STATUS_SUCCESS";
export const UPDATE_DRIVER_STATUS_FAILURE = "UPDATE_DRIVER_STATUS_FAILURE";
export const COMPLETE_TRANSACTION = "COMPLETE_TRANSACTION";
export const COMPLETE_TRANSACTION_SUCCESS = "COMPLETE_TRANSACTION_SUCCESS";
export const COMPLETE_TRANSACTION_FAILURE = "COMPLETE_TRANSACTION_FAILURE";
export const ADD_REVIEW = "ADD_REVIEW";
export const REFRESH_CONTROL = "REFRESH_CONTROL";
export const USERTYPE = {
    DRIVER: 'DRIVER',
    RIDER: 'RIDER'
};
export const REQUEST = type => `${type}_REQUEST`;
export const REQUEST_FAILURE = type => `${type}_REQUEST_FAILURE`;
export const REQUEST_SUCCESS = type => `${type}_SUCCESS`