import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';

class App extends Component {
  state = {
    loggedInAccount: null
  }

  service = new AuthService();

  setCurrentAcoount = (accountObj) => {
    this.setState({
      loggedInAccount: accountObj
    });
  }

fetchAccount = () => {
    if(this.state.loggedInAccount === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setState({
              loggedInAccount: response
            })
          }
        })
    }
  }

  render() {
    this.fetchAccount();
    return (
      <div className="App">
        <Navigation setCurrentAccount={this.setCurrentAccount} loggedInAccount={this.state.loggedInAccount} />
        <Switch>
          <Route exact path='/login/user' render={(props) => <Login setCurrentUser={this.setCurrentUser} accountType='user' {...props} /> } />
          <Route exact path='/login/volunteer' render={(props) => <Login setCurrentUser={this.setCurrentUser} accountType='volunteer' {...props} /> } />
          <Route path='/signup/:accountType' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          {/* <Route exact path='/projects' component={ProjectList} />
          <Route exact path='/projects/:id' render={(props) => <ProjectDetails {...props} loggedInAccount={this.state.loggedInAccount} /> } />
          <Route exact path='/projects/:id/edit' render={(props) => {
            if(this.state.loggedInAccount) {
              return  <EditProject {...props} /> 
            } else {
              return <Redirect to='/login' />
            }
          }}/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
