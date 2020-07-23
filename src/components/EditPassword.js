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
        password: '*********'
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;
        const { password } = this.state;

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/password`, 
        { password }, { withCredentials: true })
            .then(() => {
                console.log('Password updated successfully!')
                // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
            })
            .catch(err => {
                console.log('Error while updating password on DB', err);
            });
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
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="outline-primary" type="submit">
                        Update password
                    </Button>
                </Form>
            </Div>
        )
    }
}

export default EditPassword;