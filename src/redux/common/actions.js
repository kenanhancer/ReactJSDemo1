import store from 'redux/store';
import * as types from 'redux/common/types';

export default class commonActions {
    static loading(status) {
        store.dispatch({ type: types.LOADING, status: status });
    }

    static message(messageType, text) {
        store.dispatch({ type: messageType, text: text });
    }

    static containerSizeUpdate() {
        let height = window.innerHeight-100;
        if (height < 550)
                height = 550;
        const rect = { height: height, width: window.innerWidth };
         store.dispatch({ type: types.CONTAINER_SIZE, rect: rect });
    }
}