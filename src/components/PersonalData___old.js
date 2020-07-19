import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';


const Div = styled.div`
    background-color: #f1f1f1;
    width: 100%;
    padding: 20px 30px;
    border-radius: 20px;
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
`

class PersonalData extends Component{    
    state = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phoneNumber: ''
    }
    
    editModeSetState = () => {
        this.setState({
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            email: this.props.location.state.email,
            address: this.props.location.state.address,
            phoneNumber: this.props.location.state.phoneNumber
        })
    };

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

        if(window.location.href.indexOf("edit") > -1) {
            this.editModeSetState();

            return(
                <Div>
                    <H5>Personal Details</H5>
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Div>
            )
        }

        return(
                <Div>
                <Table>
                    <thead>
                        <tr>
                        <Th colspan="2">Personal Information</Th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Td td1>
                                Name
                            </Td>
                            <Td td2>
                                {account.firstName} {account.lastName}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Age
                            </Td>
                            <Td td2>
                                {account.age}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Email
                            </Td>
                            <Td td2>
                                {account.email}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Phone number
                            </Td>
                            <Td td2>
                                {phoneNumber}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Address
                            </Td>
                            <Td td2>
                                {account.address}
                            </Td>
                        </tr>
                    </tbody>
                </Table>
            </Div>
        )
    }
}

export default PersonalData;