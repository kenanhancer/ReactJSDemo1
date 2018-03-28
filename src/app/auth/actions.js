import store from 'redux/store';
import api from 'app/auth/api';
import locale from 'locale';
import { setToken, setSession } from 'service';
import * as types from 'app/auth/types';
import commonActions from 'redux/common/actions';
import * as commonTypes from 'redux/common/types';

export default class actions {
    //to do 
    //auth{ Authorization: `Bearer xyz` sessionKey:`xyz` }

    static authenticate(callback) {
        api.authenticate().then((response) => {
            const token = response.data.token;
            setToken(token);
            store.dispatch({ type: types.AUTHENTICATE_SUCCESS, token: token });
            if (callback)
                callback();
        }).catch((error) => {
            store.dispatch({ type: types.AUTHENTICATE_FAILURE, token: null });
            commonActions.message(commonTypes.MESSAGE_ERROR, error);
        });
    }

    static login(username = '', password = '', onSuccess) {
        const state = store.getState();
        if (!state.authenticate.token) {
            this.authenticate(() => { this.login(username, password) });
        }
        else {
            commonActions.loading(true);
            api.login(username, password).then((loginResp) => {
                setSession(loginResp.data.session);
                locale.setLanguage(loginResp.data.user.language);
                store.dispatch({ type: types.LOGIN_SUCCESS, user: loginResp.data });
                onSuccess();
            }).catch((loginError) => {
                store.dispatch({ type: types.LOGIN_FAILURE, user: null });
                commonActions.message(loginError);
            }).then(() => {
                commonActions.loading(false);
            });
        }
    }

    static logout() {
        const state = store.getState();
        api.logout(state.login.session);
        setSession("");
        setToken("");
        store.dispatch({ type: types.LOGOUT });
    }
}