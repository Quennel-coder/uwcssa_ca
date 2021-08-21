import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Facebook from './containers/Facebook';
import Google from './containers/Google';
import Services from "./containers/Services";
import Members from "./containers/Members"
import News from "./containers/News";
import Forum from "./containers/Forum";
import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path="/news" exact component={News} />
                    <Route path="/forum" exact component={Forum} />
                    <Route path="/services" exact component={Services} />
                    <Route path="/members" exact component={Members} />
                    <Route  path='/login' component={Login} />
                    <Route  path='/signup' component={Signup} />
                    <Route  path='/facebook' component={Facebook} />
                    <Route  path='/google' component={Google} />
                    <Route  path='/reset-password' component={ResetPassword} />
                    <Route  path='/reset/:uid/:token/' component={ResetPasswordConfirm} />
                    <Route  path='/accounts/confirm-email/:key' component={Activate} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;