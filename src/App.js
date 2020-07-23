import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import UserProfilePage from './components/user/UserProfilePage';
import VolunteerProfilePage from './components/volunteer/VolunteerProfilePage';
import AssignedVolunteers from './components/user/AssignedVolunteers';
import EditPage from './components/EditPage';
import LandingPage from './components/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './components/FooterComponent';


class App extends Component {
  state = {
    loggedInAccount: null
  }

  service = new AuthService();

  setCurrentAccount = (accountObj) => {
    this.setState({
      loggedInAccount: accountObj
    });
  }

  componentDidMount() {
    this.fetchUser();
  }
  
  fetchUser = () => {
    if(this.state.loggedInAccount === null) {
      this.service.loggedin() 
        .then(response => {
          if (response._id) {
            this.setCurrentAccount(response);
            localStorage.setItem("loggedin", true);
          } else {
            localStorage.clear();
          }
        })
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation loggedInAccount = {this.state.loggedInAccount} setCurrentAccount={this.setCurrentAccount} />

        <Switch>
          <Route exact path='/' render={() => <LandingPage />} />
          <Route exact path='/login/user' render={(props) => <Login setCurrentAccount={this.setCurrentAccount} accountType='user' {...props} /> } />
          <Route exact path='/login/volunteer' render={(props) => <Login setCurrentAccount={this.setCurrentAccount} accountType='volunteer' {...props} /> } />
          <Route exact path='/signup/user' render={(props) => <Signup setCurrentAccount={this.setCurrentAccount} accountType='user' {...props} /> } />
          <Route exact path='/signup/volunteer' render={(props) => <Signup setCurrentAccount={this.setCurrentAccount} accountType='volunteer' {...props} /> } />
          <Route exact path='/user/:id' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <UserProfilePage {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route exact path='/volunteer/:id' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <VolunteerProfilePage loggedInAccount={this.state.loggedInAccount} {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route path='/user/:id/assignedVolunteers' render={(props) => {
            if(localStorage.getItem("loggedin")){
              return <AssignedVolunteers loggedInAccount={this.state.loggedInAccount} {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route exact path='/user/:id/edit' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <EditPage loggedInAccount={this.state.loggedInAccount} setCurrentAccount={this.setCurrentAccount} {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route path='/volunteer/:id/edit' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <EditPage {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route exact path='/logout' render={(props) => { return <Redirect to="/" /> }} />
        </Switch>

        <FooterComponent />
      </div>
    );
  }
}

export default App;
