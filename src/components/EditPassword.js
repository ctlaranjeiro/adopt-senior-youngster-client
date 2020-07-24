import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';


const Div = styled.div`
    ${props => props.main && css `
        background-color: #f1f1f1;
        width: 100%;
        padding: 20px 30px;
        border-radius: 20px;
    `};
`;

const H5 = styled.h5`
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 10px 0;
`;

class EditPassword extends Component{    
    state = {
        accountType: this.props.accountType,
        password: '',
        success: false
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;
        const { password } = this.state;

        if(this.state.accountType === 'User'){
            axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/password`, 
            { password }, { withCredentials: true })
                .then(() => {
                    console.log('Password updated successfully!')

                    this.setState({
                        success: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 1000)
                    });
                    // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating password on DB', err);
                });
        }else if(this.state.accountType === 'Volunteer'){
            axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/password`, 
            { password }, { withCredentials: true })
                .then(() => {
                    console.log('Password updated successfully!')

                    this.setState({
                        success: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 1000)
                    });
                    // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating password on DB', err);
                });
        }
    }

    render(){
        return(
            <Div main>
                <H5>Security</H5>
                <Hr />
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicPassword">
                            <Form.Label>Change password</Form.Label>
                            <Form.Control type="password" name="password" pattern=".{6,}" required title="6 characters minimum" value={this.state.password} placeholder='••••••' onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                Password length must be at least 6 characters
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    {!this.state.success &&
                        <Button variant="outline-primary" type="submit">
                            Update password
                        </Button>
                    }
                    {this.state.success &&
                        <Button variant="success" disabled>
                            Success!
                        </Button>
                    }
                </Form>
            </Div>
        )
    }
}

export default EditPassword;