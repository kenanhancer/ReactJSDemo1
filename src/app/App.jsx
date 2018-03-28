import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import locale from 'locale';

import PageLayout from 'components/PageLayout.jsx';

import Home from 'app/home/Home.jsx';
import LoginContainer from 'app/auth/LoginContainer.jsx';

import InvoiceList from 'app/invoice/InvoiceList.jsx';
import InvoiceForm from 'app/invoice/InvoiceForm.jsx';
import PrivateRoute from 'components/PrivateRoute.jsx';
import commonActions from 'redux/common/actions';

import 'styles/App.css';



class App extends React.Component {
    componentWillMount() {
        document.title = 'Haskee';
        locale.setLanguage();
    }

    componentDidMount() {
        window.addEventListener("resize", this.onWindowResize.bind(this));
        this.onWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    onWindowResize() {
        commonActions.containerSizeUpdate();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={LoginContainer} />
                    <Route path='/registeruser' component={()=><p>register user </p>} />
                    <Route path='/forgotpassword' component={()=><p>forgot password </p>} />
                    <PageLayout>
                        <PrivateRoute exact path='/' component={Home} />
                        {/* Dashboard */}
                        {/* <PrivateRoute path='/dashboard' component={DashboardPage} />
                    <PrivateRoute path='/dashboard2' component={DashboardPage2} /> */}
                        {/*Party*/}
                        {/* <PrivateRoute path='/parties/:party_operation' component={PartyList} />
                    <PrivateRoute path='/party/:pk' component={PartyForm} /> */}
                        {/* Invoices */}
                        <PrivateRoute path='/invoices/:invoice_type' component={InvoiceList} />
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