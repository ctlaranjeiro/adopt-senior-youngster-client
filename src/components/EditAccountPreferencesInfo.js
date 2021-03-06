import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Div = styled.div`
    ${props => props.main && css`
        background-color: #f1f1f1;
        width: 100%;
        padding: 20px 30px;
        border-radius: 20px;
    `};

    ${props => props.helpAndSchedule && css`
        display: flex;
        text-align: left;
    `}

    ${props => props.needs && css`
        width: 50%;
    `}
    ${props => props.schedule && css`
        width: 50%;
    `}

    ${props => props.notes && css`
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



class EditAccountPreferencesInfo extends Component{    
    state = {
        accountType: this.props.accountType,
        morning: this.props.morning,
        afternoon: this.props.afternoon,
        evening: this.props.evening,
        night: this.props.night,
        overNight: this.props.overNight,
        fullDay: this.props.fullDay,
        healthCare: this.props.healthCare,
        houseCare: this.props.houseCare,
        displacements: this.props.displacements,
        grocery: this.props.grocery,
        pupil: this.props.pupil,
        mentor: this.props.mentor,
        notes: this.props.notes,
        successNeeds: false,
        successSchedule: false,
    }

    handleChange = (event) => {  
        const {name, value} = event.target;

        if(event.target.type === 'checkbox'){
            this.setState({
                [name]: event.target.checked
            }, () => {
                this.handleCheckIfTrue();
            });          
        } else{
            this.setState({[name]: value});
        }
        
    }

    handleCheckIfTrue = (event) => {
        if(this.state.morning && this.state.afternoon && this.state.evening && this.state.night && this.state.overNight){
            this.setState({fullDay: true});
        } else{
            this.setState({fullDay: false});
        }
    };

    handleChangeFullDay = (event) => {
        this.setState({
            morning: event.target.checked,
            afternoon: event.target.checked,
            evening: event.target.checked,
            night: event.target.checked,
            overNight: event.target.checked,
            fullDay: event.target.checked
        });
    }

    handleFormSubmitSchedule = (event) => {
        event.preventDefault();
        const { params } = this.props.match;

        if(this.state.accountType === 'User'){
            const { 
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay
            } = this.state;
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/schedulePreferences`, 
            {
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay
            }, { withCredentials: true })
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        successSchedule: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                successSchedule: false
                            })
                        }, 1000)
                    });
    
                    // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating schedulePreferences on DB', err);
                    if(err.response.data.message) {
                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        }else if(this.state.accountType === 'Volunteer'){
            const { 
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay
            } = this.state;
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/availablePeriods`, 
            {
                morning,
                afternoon,
                evening,
                night,
                overNight,
                fullDay
            }, { withCredentials: true })
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        successSchedule: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                successSchedule: false
                            })
                        }, 1000)
                    });
                })
                .catch(err => {
                    console.log('Error while updating schedulePreferences on DB', err);
                    if(err.response.data.message) {
                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
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

    handleFormSubmitNeeds = (event) => {
        event.preventDefault();
        const { params } = this.props.match;

        if(this.state.accountType === 'User'){
            const { 
                healthCare,
                houseCare,
                displacements,
                grocery,
                pupil
            } = this.state;
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/specificNeeds`, 
            {
                healthCare,
                houseCare,
                displacements,
                grocery,
                pupil
            }, { withCredentials: true })
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        successNeeds: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                successNeeds: false
                            })
                        }, 1000)
                    });
    
                    // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating schedulePreferences on DB', err);
                    if(err.response.data.message) {
                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });
        }else if(this.state.accountType === 'Volunteer'){
            const { 
                healthCare,
                houseCare,
                displacements,
                grocery,
                mentor
            } = this.state;
    
            axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/skills`, 
            {
                healthCare,
                houseCare,
                displacements,
                grocery,
                mentor
            }, { withCredentials: true })
                .then(() => {
                    this.props.updateState();
    
                    this.setState({
                        successNeeds: true
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                successNeeds: false
                            })
                        }, 1000)
                    });
    
                    // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                })
                .catch(err => {
                    console.log('Error while updating schedulePreferences on DB', err);
                    if(err.response.data.message) {
                        toast.error(err.response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
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

    handleFormSubmitNotes = (event) => {
        event.preventDefault();
        const { params } = this.props.match;
        const { notes } = this.state;

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/userNotes`, { userNotes: notes } , { withCredentials: true })
            .then(() => {
                this.props.updateState();

                this.setState({
                    successNotes: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            successNotes: false
                        })
                    }, 1000)
                });

                // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
            })
            .catch(err => {
                console.log('Error while updating userNotes on DB', err);
            });
    }

    render(){
        if(this.state.accountType === 'User'){
            return(
                <Div main>
                    <H5>Your Preferences</H5>
                    <Hr />
                    <Div helpAndSchedule>
                        <Div needs>
                            <Form onSubmit={this.handleFormSubmitNeeds}>
                                <Form.Group as={Col} controlId="checkNeedsForm">
                                    <H6>Needs</H6>
                                    <Form.Check 
                                        type="switch"
                                        id="healthCare"
                                        name="healthCare"
                                        label="Health Care"
                                        checked={this.state.healthCare} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="houseCare"
                                        name="houseCare"
                                        label="House Care/Maintenance"
                                        checked={this.state.houseCare} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="displacements"
                                        name="displacements"
                                        label="Displacements"
                                        checked={this.state.displacements} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="grocery"
                                        name="grocery"
                                        label="Grocery Shopping"
                                        checked={this.state.grocery} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="pupil"
                                        name="pupil"
                                        label="Pupil (for at-risk youth in need of a mentor)"
                                        checked={this.state.pupil} 
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <div className="center-btn">
                                    {!this.state.successNeeds &&
                                        <Button variant="outline-primary" type="submit">
                                            Update needs
                                        </Button>
                                    }
                                    {this.state.successNeeds &&
                                        <Button variant="success" disabled>
                                            Success!
                                        </Button>
                                    }
                                </div>
                            </Form>
                        </Div>
                        <ToastContainer />
                        <Div schedule>
                            <Form onSubmit={this.handleFormSubmitSchedule}>
                                <Form.Group as={Col} controlId="checkScheduleForm">
                                    <H6>Schedule Preferences</H6>
                                    <Form.Check 
                                        type="switch"
                                        id="morning"
                                        name="morning"
                                        label="Morning: 8am - 12pm"
                                        checked={this.state.morning} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="afternoon"
                                        name="afternoon"
                                        label="Afternoon: 12pm - 4pm"
                                        checked={this.state.afternoon} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="evening"
                                        name="evening"
                                        label="Evening: 4pm - 8pm"
                                        checked={this.state.evening} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="night"
                                        name="night"
                                        label="Night: 8pm - 12am"
                                        checked={this.state.night} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="overNight"
                                        name="overNight"
                                        label="Over Night: 12am - 8am"
                                        checked={this.state.overNight} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="fullDay"
                                        name="fullDay"
                                        label="Full Day: 24 hours"
                                        checked={this.state.fullDay} 
                                        onChange={this.handleChangeFullDay}
                                    />
                                </Form.Group>
                                <div className="center-btn">
                                    {!this.state.successSchedule &&
                                        <Button variant="outline-primary" type="submit">
                                            Update schedule
                                        </Button>
                                    }
                                    {this.state.successSchedule &&
                                        <Button variant="success" disabled>
                                            Success!
                                        </Button>
                                    }
                                </div>
                            </Form>
                        </Div>
                        <ToastContainer />
                    </Div>
                    <Form onSubmit={this.handleFormSubmitNotes}>
                        <Div notes>
                            <H6>Notes</H6>
                            <Form.Group controlId="formControlTextarea">
                                {this.state.notes && 
                                    <Form.Control as="textarea" rows="5" maxLength="250" name="notes" value={this.state.notes} onChange={this.handleChange} />
                                }
                                {!this.state.notes && 
                                    <Form.Control as="textarea" rows="5" maxLength="250" name="notes" placeholder="If you would like to specify your needs, please write down some notes..." value={this.state.notes} onChange={this.handleChange} />
                                }
                            </Form.Group>
                        </Div>
                        {!this.state.successNotes &&
                            <Button variant="outline-primary" type="submit">
                                Update notes
                            </Button>
                        }
                        {this.state.successNotes &&
                            <Button variant="success" disabled>
                                Success!
                            </Button>
                        }
                    </Form>
                </Div>
            )    
        }else if(this.state.accountType === 'Volunteer'){
            return(
                <Div main>
                    <H5>Your Preferences</H5>
                    <Hr />
                    <Div helpAndSchedule>
                        <Div needs>
                            <Form onSubmit={this.handleFormSubmitNeeds}>
                                <Form.Group as={Col} controlId="checkNeedsForm">
                                    <H6>Skills</H6>
                                    <Form.Check 
                                        type="switch"
                                        id="healthCare"
                                        name="healthCare"
                                        label="Health Care"
                                        checked={this.state.healthCare} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="houseCare"
                                        name="houseCare"
                                        label="House Care/Maintenance"
                                        checked={this.state.houseCare} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="displacements"
                                        name="displacements"
                                        label="Displacements"
                                        checked={this.state.displacements} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="grocery"
                                        name="grocery"
                                        label="Grocery Shopping"
                                        checked={this.state.grocery} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="mentor"
                                        name="mentor"
                                        label="Mentor (for at-risk youth in need of a mentor)"
                                        checked={this.state.mentor} 
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <div className="center-btn">
                                    {!this.state.successNeeds &&
                                        <Button variant="outline-primary" type="submit">
                                            Update skills
                                        </Button>
                                    }
                                    {this.state.successNeeds &&
                                        <Button variant="success" disabled>
                                            Success!
                                        </Button>
                                    }
                                </div>
                            </Form>
                        </Div>
                        <ToastContainer />
                        <Div schedule>
                            <Form onSubmit={this.handleFormSubmitSchedule}>
                                <Form.Group as={Col} controlId="checkScheduleForm">
                                    <H6>Availability</H6>
                                    <Form.Check 
                                        type="switch"
                                        id="morning"
                                        name="morning"
                                        label="Morning: 8am - 12pm"
                                        checked={this.state.morning} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="afternoon"
                                        name="afternoon"
                                        label="Afternoon: 12pm - 4pm"
                                        checked={this.state.afternoon} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="evening"
                                        name="evening"
                                        label="Evening: 4pm - 8pm"
                                        checked={this.state.evening} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="night"
                                        name="night"
                                        label="Night: 8pm - 12am"
                                        checked={this.state.night} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="overNight"
                                        name="overNight"
                                        label="Over Night: 12am - 8am"
                                        checked={this.state.overNight} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Check 
                                        type="switch"
                                        id="fullDay"
                                        name="fullDay"
                                        label="Full Day: 24 hours"
                                        checked={this.state.fullDay} 
                                        onChange={this.handleChangeFullDay}
                                    />
                                </Form.Group>
                                <div className="center-btn">
                                    {!this.state.successSchedule &&
                                        <Button variant="outline-primary" type="submit">
                                            Update availability
                                        </Button>
                                    }
                                    {this.state.successSchedule &&
                                        <Button variant="success" disabled>
                                            Success!
                                        </Button>
                                    }
                                </div>
                            </Form>
                        </Div>
                    </Div>
                    <ToastContainer />
                </Div>
            )    
        } else {
            return(
                <div>
                    loading...
                </div>
            )
        } 
    }
}

export default EditAccountPreferencesInfo;