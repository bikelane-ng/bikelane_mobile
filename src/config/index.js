// import env from 'react-native-config';

const config = {
    api: {
        // host: env.BASE_URL,
        host: 'http://localhost:9000',
        timeout: 20000
    },
    paystack: "pk_test_c7fae17b0fc0dc90a958362549dd64ea8fb43a53",
};

const BASE_URL = config.api.host;

export {
    BASE_URL
}

export default config;