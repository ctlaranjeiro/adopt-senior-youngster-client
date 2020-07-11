import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Login from './components/projects/auth/Login';
// import Signup from './components/projects/auth/Signup';
// import AuthService from './components/projects/auth/auth-service';
// import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
//   state = {
//     loggedInUser: null
//   }

//   service = new AuthService();

//   setCurrentUser = (userObj) => {
//     this.setState({
//       loggedInUser: userObj
//     });
//   }

//   // 1. save the user into the browser localstorage
//   // or
//   // 2. check if the user is still loggedin by calling the backend
// fetchUser = () => {
//     if(this.state.loggedInUser === null) {
//       this.service.loggedin() 
//         .then(response => {
//           if (response._id) {
//             this.setState({
//               loggedInUser: response
//             })
//           }
//         })
//     }
//   }

  render() {
    // this.fetchUser();
    return (
      <div className="App">
      <Navigation />
        {/* <Navbar setCurrentUser={this.setCurrentUser} loggedInUser={this.state.loggedInUser} /> */}
        {/* <Switch>
          <Route path='/login' render={(props) => <Login setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route path='/signup' render={(props) => <Signup setCurrentUser={this.setCurrentUser} {...props} /> } />
          <Route exact path='/projects' component={ProjectList} />
          <Route exact path='/projects/:id' render={(props) => <ProjectDetails {...props} loggedInUser={this.state.loggedInUser} /> } />
          <Route exact path='/projects/:id/edit' render={(props) => {
            if(this.state.loggedInUser) {
              return  <EditProject {...props} /> 
            } else {
              return <Redirect to='/login' />
            }
          }}/>
        </Switch> */}
      </div>
    );
  }
}

export default App;
