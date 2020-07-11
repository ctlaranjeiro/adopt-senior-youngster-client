import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
    state = {
        accountType: this.props.accountType,
        email: '',
        password: ''
    }

    service = new AuthService();

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        if(this.state.accountType === 'user'){
            this.service.loginUser(email, password)
            .then(response => {
                //Set the whole application with the user that just loggedin
                this.props.setCurrentAccount(response);
                //the line of code above lifts the state up to app.js

                this.setState({ email: '', password: ''})
                //redirect the user
                this.props.history.push(`/user/${response._id}`);
            })
        }

        if(this.state.accountType === 'volunteer'){
            this.service.loginVolunteer(email, password)
            .then(response => {
                //Set the whole application with the user that just loggedin
                this.props.setCurrentAccount(response);
                //the line of code above lifts the state up to app.js

                this.setState({ email: '', password: ''})
                //redirect the user
                this.props.history.push(`/volunteer/${response._id}`);
            })
        }
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>

                {/* <form onSubmit={this.handleFormSubmit}>
                    <label>Email:</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <label>Password:</label>
                    <input name="password" value={this.state.password} onChange={this.handleChange} />
                    
                    <input type="submit" value="Login" />
                </form>
                <p>Don't have account? 
                    <Link to={"/signup"}> Signup</Link>
                </p> */}
            </div>
        )
    }
}

export default Login;