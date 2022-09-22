import * as constants from '../constants/ActionTypes';

export default function appReducer(state = {}, action) {
  switch (action.type) {
    case constants.INITIALIZE_APP:
      return Object.assign({}, state, {
        hasToken: true,
        init_failed: undefined,
        error: undefined,
      });
    case constants.INITIALIZATION_FAILURE:
      return Object.assign({}, state, {
        init_failed: true,
        error: action.payload && action.payload.message,
      });
    case constants.INPUT_NUMBER:
      return {
        ...state,
        mobile: action.payload,
      };
    case constants.VALIDATE_NUMBER:
      return {
        ...state,
        validate: true,
        mobile: action.payload,
      };
    case constants.GENERATE_OTP:
      return Object.assign({}, state, {
        isProcessing: true,
      });
    case constants.GENERATE_OTP_SUCCESS:
      return Object.assign({}, state, {
        otp: action.payload.response.data,
        isProcessing: false,
      });
    case constants.GENERATE_OTP_FAILURE:
      return Object.assign({}, state, {
        isProcessing: false,
      });
    case constants.VERIFY_OTP:
      return Object.assign({}, state, {
        status: false,
        error: undefined,
        isProcessing: true,
      });
    case constants.VERIFY_OTP_SUCCESS:
      return Object.assign({}, state, {
        status: action.payload.response.data,
        error: undefined,
        isProcessing: false,
      });
    case constants.VERIFY_OTP_FAILURE:
      return Object.assign({}, state, {
        isProcessing: false,
        status: false,
        error: action.payload.response && action.payload.response.error,
      });
    default:
      return state;
  }
}
