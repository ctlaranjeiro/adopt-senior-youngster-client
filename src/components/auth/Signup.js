import React, { Component } from 'react';
import AuthService from './auth-service';
import { Form, Button, Col } from 'react-bootstrap';

class Signup extends Component {
    state = {
        accountType: this.props.accountType,
        //common
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        address: '',
        profilePicture: '',
        morning: false,
        afternoon: false,
        evening: false,
        night: false,
        overNight: false,
        fullDay: false,
        healthCare: false,
        houseCare: false,
        displacements: false,
        grocery: false,
        //user
        phoneNumber: '',
        pupil: false,
        emergFirstName: '',
        emergLastName: '',
        emergPhoneNumber: '',
        emergEmail: '',
        emergAddress: '',
        //volunteer
        volPhoneNumber: '',
        occupation: '',
        mentor: false,
        aboutMe: ''

    }

    service = new AuthService();

    handleChange = (event) => {  
        const {name, value} = event.target;

        if(event.target.type === 'checkbox'){
            this.setState({[name]: event.target.checked});
        } else{
            this.setState({[name]: value});
        }
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        if(this.state.accountType === 'user'){
            const {
                email,
                password,
                firstName,
                lastName,
                gender,
                birthDate,
                address,
                phoneNumber,
                profilePicture,
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay,
                healthCare,
                houseCare,
                displacements,
                grocery,
                pupil,
                emergFirstName,
                emergLastName,
                emergPhoneNumber,
                emergEmail,
                emergAddress
            } = this.state;

            this.service.signupUser(
                email,
                password,
                firstName,
                lastName,
                gender,
                birthDate,
                address,
                phoneNumber,
                profilePicture,
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay,
                healthCare,
                houseCare,
                displacements,
                grocery,
                pupil,
                emergFirstName,
                emergLastName,
                emergPhoneNumber,
                emergEmail,
                emergAddress
            )
            .then(response => {
                //Set the whole application with the user that just loggedin
                this.props.setCurrentAccount(response);
                //the line of code above lifts the state up to app.js

                this.setState({ 
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    birthDate: '',
                    address: '',
                    phoneNumber: '',
                    profilePicture: '',
                    morning: '',
                    afternoon: '',
                    evening: '',
                    night: '',
                    overNight: '',
                    fullDay: '',
                    healthCare: '',
                    houseCare: '',
                    displacements: '',
                    grocery: '',
                    pupil: '',
                    emergFirstName: '',
                    emergLastName: '',
                    emergPhoneNumber: '',
                    emergEmail: '',
                    emergAddress: ''
                })
                //redirect the user
                this.props.history.push(`/user/${response._id}`);
            })
        }

        if(this.state.accountType === 'volunteer'){
            const {
                email,
                password,
                firstName,
                lastName,
                gender,
                birthDate,
                address,
                volPhoneNumber,
                occupation,
                profilePicture,
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay,
                healthCare,
                houseCare,
                displacements,
                grocery,
                mentor,
                aboutMe
            } = this.state;

            this.service.signupVolunteer(
                email,
                password,
                firstName,
                lastName,
                gender,
                birthDate,
                address,
                volPhoneNumber,
                occupation,
                profilePicture,
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay,
                healthCare,
                houseCare,
                displacements,
                grocery,
                mentor,
                aboutMe
            )
            .then(response => {
                //Set the whole application with the user that just loggedin
                this.props.setCurrentAccount(response);
                //the line of code above lifts the state up to app.js

                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    birthDate: '',
                    address: '',
                    volPhoneNumber: '',
                    occupation: '',
                    profilePicture: '',
                    morning: '',
                    afternoon: '',
                    evening: '',
                    night: '',
                    overNight: '',
                    fullDay: '',
                    healthCare: '',
                    houseCare: '',
                    displacements: '',
                    grocery: '',
                    mentor: '',
                    aboutMe: ''
                })
                //redirect the user
                this.props.history.push(`/volunteer/${response._id}`);
            })
        }
    }

    render() {
        if(this.state.accountType === 'user'){
            return(
                <div>
                    <div className="form">
                        <Form onSubmit={this.handleFormSubmit} className="form-text-align">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
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
                                <Form.Group as={Col} controlId="formBasicAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" name="gender" value={this.state.value} onChange={this.handleChange} custom>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDate">
                                    <Form.Label>Birthdate</Form.Label>
                                    <Form.Control type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.File id="profilePicture" label="Profile Picture" />
                            </Form.Group>
                            <div className="checkboxes">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridSchedule">
                                        <Form.Label>Schedule preferences:</Form.Label>
                                        <Form.Check type='checkbox' id='morning' name='morning' label='Morning: 8am - 12pm' checked={this.state.morning} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='afternoon' name='afternoon' label='Afternoon: 12pm - 4pm' checked={this.state.afternoon} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='evening' name='evening' label='Evening: 4pm - 8pm' checked={this.state.evening} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='night' name='night' label='Night: 8pm - 12a' checked={this.state.night} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='overNight' name='overNight' label='Over Night: 12am - 8am' checked={this.state.overNight} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='fullDay' name='fullDay' label='24 hours' checked={this.state.fullDay} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridNeeds">
                                        <Form.Label>Needs:</Form.Label>
                                        <Form.Check type='checkbox' id='healthCare' name='healthCare' label='Health Care' checked={this.state.healthCare} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='houseCare' name='houseCare' label='House Care/Maintenance' checked={this.state.houseCare} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='displacements' name='displacements' label='Displacement' checked={this.state.displacements} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='grocery' name='grocery' label='Grocery Shopping' checked={this.state.grocery} onChange={this.handleChange} />
                                        <Form.Check type='checkbox' id='pupil' name='pupil' label='Pupil' checked={this.state.pupil} onChange={this.handleChange} />                            </Form.Group>
                                </Form.Row>
                            </div>
                            
                            <div className="center-btn">
                                <Button variant="primary" type="submit" block>
                                    Signup
                                </Button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
            )
        }
    }
}

export default Signup;