import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PublishSubscribe from 'publish-subscribe-js';

import Auth from 'modules/Auth';
import Application from 'modules/Application';

import PageLayout from 'components/PageLayout.jsx';

import Home from 'pages/Home.jsx';
import LoginForm from 'pages/LoginForm.jsx';

// import InvoiceList from 'pages/InvoiceList.jsx';
import InvoiceForm from 'pages/InvoiceForm.jsx';
import 'App.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) =>
        Auth.isLoggedIn() === true ?
            <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
);

class App extends React.Component {
    componentWillMount() {
        Application.init();
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.onWindowResize);
        this.onWindowResize();
    }

    componentWillUnmount() {
        Auth.logout();
        window.removeEventListener("resize", this.onWindowResize);
        PublishSubscribe.unsubscribeAll();
    }

    onWindowResize() {
        let height = window.innerHeight;
        if (Auth.isLoggedIn()) { // Footer and Header height removed
            height = height - 100;
            if (height < 550)
                height = 550;
        }

        PublishSubscribe.publish('resize', { height: height, width: window.innerWidth });
    }


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={LoginForm} />
                    <PageLayout>
                        <PrivateRoute exact path='/' component={InvoiceForm} />
                        {/* Dashboard */}
                        {/* <PrivateRoute path='/dashboard' component={DashboardPage} />
                    <PrivateRoute path='/dashboard2' component={DashboardPage2} /> */}
                        {/*Party*/}
                        {/* <PrivateRoute path='/parties/:party_operation' component={PartyList} />
                    <PrivateRoute path='/party/:pk' component={PartyForm} /> */}
                        {/* Invoices */}
                        {/* <PrivateRoute path='/invoices/:invoice_type' component={InvoiceList} /> */}
                        <PrivateRoute path='/invoice/:invoice_type/:pk' component={InvoiceForm} />
                        {/* Hesaplar */}
                        {/* <PrivateRoute path='/accounts/:account_type' component={AccountList} />
                    <PrivateRoute path='/account/:account_type/:pk' component={AccountForm} /> */}
                        {/* Ayarlar */}
                        {/* <PrivateRoute path='/trcodes' component={TrcodeList} />
                    <PrivateRoute path='/paycodes' component={PaycodeList} />
                    <PrivateRoute path='/trcode/:pk' component={TrcodeForm} />
                    <PrivateRoute path='/paycode/:pk' component={PaycodeForm} /> */}
                    </PageLayout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;