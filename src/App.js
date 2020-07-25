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
import AssignedUsers from './components/volunteer/assignedUsers';
import UserEditPage from './components/user/UserEditPage';
import VolEditPage from './components/volunteer/VolEditPage';
import LandingPage from './components/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterComponent from './components/FooterComponent';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


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

  getCurrentUserProfile = (id) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/user/${id}`)
        .then(responseFromAPI => {
            // console.log('responseFromAPI.data', responseFromAPI.data);
            return responseFromAPI.data;
        })
  }

  getCurrentVolunteerProfile = (id) => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/volunteer/${id}`)
        .then(responseFromAPI => {
            // console.log('responseFromAPI.data', responseFromAPI.data);
            return responseFromAPI.data;
        })
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
              return <UserProfilePage {...props} loggedInAccount={this.state.loggedInAccount} getCurrentUserProfile={this.getCurrentUserProfile} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route exact path='/volunteer/:id' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <VolunteerProfilePage loggedInAccount={this.state.loggedInAccount} {...props} getCurrentVolunteerProfile={this.getCurrentVolunteerProfile} /> 
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
              return <UserEditPage getCurrentUserProfile={this.getCurrentUserProfile} setCurrentAccount={this.setCurrentAccount} {...props} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route path='/volunteer/:id/edit' render={(props) => {
            if (localStorage.getItem("loggedin")) {
              return <VolEditPage {...props} setCurrentAccount={this.setCurrentAccount} /> 
            } else{
              return <Redirect to="/" />
            }
          }} />
          <Route path='/volunteer/:id/assignedUsers' render={(props) => {
            if(localStorage.getItem("loggedin")){
              return <AssignedUsers loggedInAccount={this.state.loggedInAccount} {...props} /> 
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
