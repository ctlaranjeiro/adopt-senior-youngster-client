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

    ${props => props.profilePicture && css `
        margin-top: 40px;
    `};

    ${props => props.aboutMe && css`
        text-align: left;
        margin-top: 30px;
        padding: 0 10px;
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
        accountType: this.props.accountType,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        address: this.props.address,
        phoneNumber: this.props.phoneNumber,
        occupation: this.props.occupation,
        aboutMe: this.props.aboutMe,
        success: false
    }

    handleChange = (event) => {  
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;

        if(this.state.accountType === 'User'){
            const { 
                firstName, 
                lastName, 
                email, 
                address, 
                phoneNumber 
            } = this.state;
    
            // console.log('firstName', firstName);
    
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/personalDetails`, {
                firstName,
                lastName, 
                email, 
                address, 
                phoneNumber
            }, { withCredentials: true})
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        success: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 1000)
                    });
    
    
                    //this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating personalDetails on DB', err);
                });
        } else if(this.state.accountType === 'Volunteer'){
            const { 
                firstName, 
                lastName, 
                email, 
                address, 
                phoneNumber,
                occupation,
                aboutMe
            } = this.state;
    
            // console.log('firstName', firstName);
    
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/personalDetails`, {
                firstName,
                lastName, 
                email, 
                address,
                volPhoneNumber: phoneNumber,
                occupation,
                aboutMe
            }, { withCredentials: true})
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        success: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                        }, 1000)
                    });
                })
                .catch(err => {
                    console.log('Error while updating personalDetails on DB', err);
                });
        }
    }

    render(){
        if(this.state.accountType === 'User'){
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
                        {!this.state.success &&
                            <Button variant="outline-primary" type="submit">
                                Update details
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
        } else if(this.state.accountType === 'Volunteer'){
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
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicOccupation">
                                <Form.Label>Occupation</Form.Label>
                                <Form.Control type="text" name="occupation" value={this.state.occupation} onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Div aboutMe>
                            <H6>About Me</H6>
                            <Form.Group controlId="formControlTextarea">
                                <Form.Control as="textarea" rows="5" maxLength="250" name="aboutMe" value={this.state.aboutMe} onChange={this.handleChange} />
                            </Form.Group>
                        </Div>
                        {!this.state.success &&
                            <Button variant="outline-primary" type="submit">
                                Update details
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
        }else {
            return(
                <div>
                    loading...
                </div>
            )
        }
        
    }
}

export default EditPersonalData;