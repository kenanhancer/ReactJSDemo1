import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from 'redux/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let state = store.getState();
    return <Route {...rest} render={(props) =>
        state.login.session ?
            <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
}

export default PrivateRoute;
