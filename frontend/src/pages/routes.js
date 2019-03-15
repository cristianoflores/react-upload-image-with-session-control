import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from "../services/auth";

import Login from './Login';
import Posts from './Posts';
import Register from './Register';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/auth/register' component={Register} />
            <PrivateRoute path='/posts/upload' component={Posts} />
        </Switch>
    </BrowserRouter>
)

export default Routes;