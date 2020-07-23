import React, { Component } from 'react';
import AuthService from './auth-service';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
    state = {
        accountType: this.props.accountType,
        email: '',
        password: '',
        loggingIn: false
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
            this.setState({ loggingIn: true });

            setTimeout(() => {
                this.service.loginUser(email, password)
                    .then(response => {
                        //Set the whole application with the user that just loggedin
                        this.props.setCurrentAccount(response);
                        //the line of code above lifts the state up to app.js

                        this.setState({ email: '', password: ''})
                        localStorage.setItem("loggedin", true);

                        //redirect the user
                        this.props.history.push(`/user/${response._id}`);
                    })
            }, 1500)
        }

        if(this.state.accountType === 'volunteer'){
            this.service.loginVolunteer(email, password)
            .then(response => {
                //Set the whole application with the user that just loggedin
                this.props.setCurrentAccount(response);
                //the line of code above lifts the state up to app.js

                this.setState({ email: '', password: ''})

                localStorage.setItem("loggedin", true);

                //redirect the user
                this.props.history.push(`/volunteer/${response._id}`);
            })
        }
    }

    render() {
        return(
            <div>
                <Form onSubmit={this.handleFormSubmit} className="loginForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" pattern=".{6,}" required title="6 characters minimum" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    {!this.state.loggingIn &&
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    }
                    {this.state.loggingIn &&
                        <Button variant="primary" disabled>
                            Welcome back!
                        </Button>
                    }
                </Form>
            </div>
        )
    }
}

export default Login;