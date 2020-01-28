import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunkMiddleware from "redux-thunk";
import {
    apiMiddleware
} from 'redux-api-middleware';
import appReducer from '../reducers/index';
import AsyncStorage from '@react-native-community/async-storage';
import sessionValidator from '../middlewares/sessionValidator';
import initialState from '../reducers/initialState';
import * as constants from '../constants/ActionTypes';

function rootReducer(state, action) {
    if (action.type == constants.LOGOUT) {
        state = {};
        AsyncStorage.clear();
    }
    if (action.type == constants.REFRESH_CONTROL || action.type == constants.ADD_REVIEW) {
        state = {
            // user: {
            //     loggedIn: state.user.loggedIn,
            //     // role: state.user.role,
            //     current: state.user.current,
            // },
            ...state,
            home: {
                location: state.home.location,
                // inputData: state.home.inputData,
                currentAddress: true,
                refreshed: state.home.refreshed,
            },
            // socket: state.socket,
        };
        // console.log(state);
    }
    return appReducer(state, action)
}

const enhancers = compose(applyMiddleware(thunkMiddleware, sessionValidator, apiMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);

const store = createStore(rootReducer, initialState, enhancers);

export default store;