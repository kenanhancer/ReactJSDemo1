import axios from 'axios';

var service = axios.create({
    baseURL: 'http://localhost:52184/api/',
    timeout: 10000,
    headers: { 'X-Application-Name': 'haskee' },

});

service.interceptors.request.use(function (config) {
    console.log('request');
    console.log(config);

    return config;
}, function (error) {
    console.log()
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {
    console.log('response');
    console.log(response);
    return response;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

export default service;

export function setToken(token = '') {
    service.defaults.headers.common['Authorization'] = token;
}
export function setSession(session = '') {
    service.defaults.headers.common['Session'] = session;
}

