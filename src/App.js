import React, { Component } from 'react';
import AppNavbar from './components/layout/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/layout/Dashboard';
import './App.css';
import AddClient from './components/clients/AddClient';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className="App">
          <AppNavbar/>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/client/add' component={AddClient} />
              </Switch>
            </div>
        </div>
      </Router>
    </Provider>  
    );
  }
}

export default App;
