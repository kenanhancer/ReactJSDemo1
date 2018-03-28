import { combineReducers } from 'redux';
import { authenticate, login } from 'app/auth/reducers';
import { loading, message, container } from 'redux/common/reducers';
import { language } from 'locale/reducers';

const combinedReducers = combineReducers({ authenticate, login, loading, message, language, container });

export default combinedReducers;