// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import qhistory from 'qhistory';
import autoBind from 'react-autobind';
import auth from './lib/authentication';
import { privateRoutes, publicRoutes } from './routes';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import LoadingIndicator from './components/LoadingIndicator';

// Add query params to RR: https://www.npmjs.com/package/qhistory
const history = qhistory(createBrowserHistory(), stringify, parse);

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isAuthenticated: null,
    };
  }

  componentDidMount() {
    auth.isAuthenticated()
      .then(() => {
        this.setState({ isLoading: false, isAuthenticated: true });
      })
      .catch(() => {
        this.setState({ isLoading: false, isAuthenticated: false });
      });
  }

  render() {
    const { isLoading, isAuthenticated } = this.state;
    if (isLoading) {
      return <LoadingIndicator />;
    }
    return isAuthenticated
    ? (<Route {...this.props} />)
    : (<Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />)
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    // Try authenticating with the token in local storage automatically.
    // This will init the api to use the JWT on all subsequent requests,
    // if it fails, the user is redirected to '/login'
    auth.authenticate()
      .then(authStatus => {
        this.setState({ isLoading: false })
      })
      .catch(err => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Router history={history}>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route
                path={route.path}
                component={route.component}
                key={route.key || index}
                exact
              />
            ))}
            {privateRoutes.map((route, index) => (
              <PrivateRoute
                path={route.path}
                component={route.component}
                key={route.key || index}
                exact
              />
            ))}
            <Route render={props => <Redirect to="/login" />} />
          </Switch>
        </Router>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
