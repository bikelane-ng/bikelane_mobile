import SocketIOClient from 'socket.io-client';
import config from '../config';

const BASE_URL = config.api.host,
    socket = SocketIOClient(`${BASE_URL}`);

export default {
    // home: {
    //     inputData: {},
    //     selectedAddress: {},
    // },
    user: {

    },
    login: {
        isAuthenticated: false,
        current: ""
    },
    register: {
        isAuthenticated: false,
        current: ""
    },
    driver: {
        update: false,
        credentials: {},
        driverDetails:{},
    },
    socket,
}