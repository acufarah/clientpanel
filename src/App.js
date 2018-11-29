import React, { Component } from 'react';
import AppNavbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/layout/Dashboard';
import './App.css';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import Login from './components/auth/Login';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <AppNavbar/>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={UserIsAuthenticated(Dashboard)} />
                <Route exact path='/client/add' component={UserIsAuthenticated(AddClient)} />
                <Route exact path='/client/:id' component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path='/client/edit/:id' component={UserIsAuthenticated(EditClient)} />
                <Route exact path='/login' component={UserIsNotAuthenticated(Login)} />

              </Switch>
            </div>
        </div>
      </Router>
    </Provider>  
    );
  }
}

export default App;