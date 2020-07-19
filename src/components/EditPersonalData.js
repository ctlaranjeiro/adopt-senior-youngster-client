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

    ${props => props.password && css `
        margin-top: 40px;
    `};
`;

const Table = styled.table`
    text-align: left;
`;

const Th = styled.th`
    font-size: 1.1em;
    padding-bottom: 10px;
`;

const Td = styled.td`
    padding: 5px 0;

    ${props => props.td1 && css`
        width: 200px;
        border-right: 1px solid black;
    `}

    ${props => props.td2 && css`
        padding-left: 20px;
    `}
`;

const H5 = styled.h5`
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
`;

const H6 = styled.h6`
    font-size: 1em;
    font-weight: bold;
    text-align: left;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 10px 0;
`;

class EditPersonalData extends Component{    
    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        address: this.props.address,
        phoneNumber: this.props.phoneNumber,
        password: '*********'
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        const { params } = this.props.match;
        const { 
            firstName, 
            lastName, 
            email, 
            address, 
            phoneNumber 
        } = this.state;

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/personalDetails`, 
        {firstName, lastName, email, address, phoneNumber})
            .then(() => {
                this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
            })
    }

    render(){
        const account = this.props.loggedInAccount;
        
        let phoneNumber;
        if(account){
            if(account.accountType === 'User'){
                phoneNumber = account.phoneNumber;
            } else if(account.accountType === 'Volunteer'){
                phoneNumber = account.volPhoneNumber;
            }
        }

        return(
            <Div main>
                <H5>Personal Details</H5>
                <Hr />
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Update details
                    </Button>
                </Form>
                <Div password>
                <H6>Change Password</H6>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Update password
                        </Button>
                    </Form>
                </Div>
            </Div>
        )
    }
}

export default EditPersonalData;