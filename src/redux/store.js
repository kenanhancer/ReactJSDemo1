import { createStore } from 'redux';
import combinedReducers from 'redux/combinedReducers';

const store = createStore(combinedReducers);

export default store;