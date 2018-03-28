import * as types from 'app/auth/types';

const loginInitState = {  session: null, user: null, menuItems: null };

export function login(state = loginInitState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            const user = action.user;
            debugger
            return {...state, ...user };
        case types.LOGIN_FAILURE:
            return {...state, loginInitState };
        case types.LOGOUT:
            return {...state, loginInitState };
        default:
            return state;
    }
}

const tokenInitState = { token: null };

export function authenticate(state = tokenInitState, action) {
    switch (action.type) {
        case types.AUTHENTICATE_SUCCESS:
            return {...state, token:action.token };
        case types.AUTHENTICATE_FAILURE:
            return {...state, tokenInitState};
        default:
            return state;
    }
}