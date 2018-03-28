import React from 'react';
import { withRouter } from 'react-router-dom';
import actions from 'app/auth/actions';

import store from 'redux/store';
import BaseComponent from 'components/BaseComponent.jsx';
import LoginComponent from 'app/auth/LoginComponent.jsx';

class LoginContainer extends BaseComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { model: { username: '', password: '' } };
    }

    componentDidMount() {
        super.componentDidMount();
        const state = store.getState().login;
        if(state && state.session)
            actions.logout();

        this.connect([{ name: 'login', props: ['session'] }, 'loading', 'language']);
        actions.authenticate();
    }

    handleChange(e) {
        const field = e.target;
        const model = this.state.model;
        model[field.name] = field.value;
        this.setState({ model });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state.model;
        //to do validation
        actions.login(username, password, this.handleSuccess.bind(this));
    }

    handleSuccess(){
        this.props.history.push('/');
    }

    render() {
        console.log(store.getState());
        return (
                <LoginComponent model={this.state.model} loading={this.state.loading}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange} />);
    }
}

export default withRouter(LoginContainer);
