import * as types from 'redux/common/types';

export function loading(state = { loading: false }, action) {
    switch (action.type) {
        case types.LOADING:
            return { ...state, loading: action.status };
        default:
            return state;
    }
}

export function message(state = { message: null }, action) {
    switch (action.type) {
        case types.MESSAGE_SUCCESS:
            return { ...state, message: { type: 'success', text: action.text } };
        case types.MESSAGE_WARNING:
            return { ...state, message: { type: 'warning', text: action.text } };
        case types.MESSAGE_INFO:
            return { ...state, message: { type: 'info', text: action.text } };
        case types.MESSAGE_ERROR:
            return { ...state, message: { type: 'error', text: action.text } };
        case types.MESSAGE_CLOSE:
            return { ...state, message: null };
        default:
            return state;
    }
}

export function container(state = { rect: { height: window.innerHeight, width: window.innerWidth } }, action) {
    switch (action.type) {
        case types.CONTAINER_SIZE:
            return { ...state, rect: action.rect };
        default:
            return state;
    }
}
