import React, { Component } from 'react';
import AuthService from './auth-service';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';

const H3 = styled.h3`
    color: #63aeff;
`;


class Login extends Component {
    state = {
        accountType: this.props.accountType,
        email: '',
        password: '',
        loggingIn: false,
        error: null
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
                    this.setState({ 
                        loggingIn: true,
                        error: null
                    });
                    setTimeout(() => {
                        //Set the whole application with the user that just loggedin
                        this.props.setCurrentAccount(response);
                        //the line of code above lifts the state up to app.js

                        this.setState({ email: '', password: ''})
                        localStorage.setItem("loggedin", true);

                        //redirect the user
                        this.props.history.push(`/user/${response._id}`);
                    }, 1500)
                })
                .catch(err => {
                    if(err.response.data.message) {
                        if(err.response.data.message === 'Incorrect email.') { 
                            this.setState({
                                error: 'email'
                            });
                        }

                        if(err.response.data.message === 'Incorrect password.') { 
                            this.setState({
                                error: 'password'
                            });
                        }

                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        }

        if(this.state.accountType === 'volunteer'){
            this.service.loginVolunteer(email, password)
                .then(response => {
                    this.setState({ 
                        loggingIn: true,
                        error: false
                    });
                    setTimeout(() => {
                        //Set the whole application with the user that just loggedin
                        this.props.setCurrentAccount(response);
                        //the line of code above lifts the state up to app.js

                        this.setState({ email: '', password: ''})

                        localStorage.setItem("loggedin", true);

                        //redirect the user
                        this.props.history.push(`/volunteer/${response._id}`);
                    }, 1500)
                })
                .catch(err => {
                    if(err.response.data.message) { 
                        if(err.response.data.message === 'Incorrect email.') { 
                            this.setState({
                                error: 'email'
                            });
                        }

                        if(err.response.data.message === 'Incorrect password.') { 
                            this.setState({
                                error: 'password'
                            });
                        }

                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
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
                    {this.state.accountType === 'user' && this.state.error === 'email' &&
                        <Form.Group>
                            <Form.Text className="text-muted">
                                If you have a Volunteer account, please <a href='/login/volunteer'>login here.</a>
                            </Form.Text>
                        </Form.Group>
                    }
                    {this.state.accountType === 'volunteer' && this.state.error === 'email' &&
                        <Form.Group>
                            <Form.Text className="text-muted">
                                If you have a User account, please <a href='/login/user'>login here.</a>
                            </Form.Text>
                        </Form.Group>
                    }
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
                <ToastContainer />
            </div>
        )
    }
}

export default Login;