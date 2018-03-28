import service from 'service';

export default class api {
    static authenticate() {
        return service.request({
            url: '/authenticate',
            method: 'get',
            params: {
                appID: 'haskee',
                secretKey: 'haskee_secret'
            }
        });
    }

    static login(username, password) {
        return service.request({
            url: '/login',
            method: 'get',
            params: {
                username: username,
                password: password
            }
        });
    }
    
    static logout(username, password) {
        return service.request({
            url: '/login/logout',
            method: 'get'
        });
    }

    static forgotPassword(username) {

    }

    static setPassword(username, password, activationCode) {

    }

    static registerUser(user) {

    }

}