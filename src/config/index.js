// import env from 'react-native-config';

const config = {
    api: {
        // host: env.BASE_URL,
        host: 'https://bikelane.herokuapp.com',
        timeout: 20000
    },
    paystack: "pk_test_0ea0b432bc09a6a366bb905cba0a396670b62413",
};

const BASE_URL = config.api.host;

export {
    BASE_URL
}

export default config;