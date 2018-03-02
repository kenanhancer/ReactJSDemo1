import axios from 'axios';
import moment from 'moment';
import 'moment/locale/tr';

export default class Application
{
    static init(callback) {
        axios.defaults.baseURL = 'http://192.168.1.101:3000';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        moment.locale('tr');
        document.title = 'Haskee';
    }

    static setAccessToken(token) {
        //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        axios.defaults.headers.common['accessToken'] = token;
    }
    static setSession(session) {
        axios.defaults.headers.common['sessionKey'] = session;
    }

    static getAuthClientSettings() {
        return { clientId: '01-haskee-muh', secretKey: 'cokgizli' };
    }  
}