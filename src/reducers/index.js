import {
    combineReducers
} from 'redux';
import user from './user';
import login from './login';
import register from './register';
import app from './app';
import driver from './driver';
import home from './home';
import admin from './admin';
import socket from './socket';

const rootReducer = combineReducers({
    app,
    user,
    login,
    register,
    driver,
    home,
    admin,
    socket,
});

export default rootReducer;