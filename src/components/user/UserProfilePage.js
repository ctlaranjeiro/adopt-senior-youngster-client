import React, { Component } from 'react';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import PersonalData from '../PersonalData';
import EmergencyContact from '../user/EmergencyContact';
import AccountPreferencesInfo from '../AccountPreferencesInfo';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import axios from 'axios';



const Div = styled.div`
    ${props => props.mainContainer && css`
        margin: auto 80px;
        height: 89vh;
    `}

    ${props => props.welcomeProfileContainer && css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 0;
    `}

    ${props => props.welcomeMessage && css`
        display: flex;
        align-items: center;
    `}

    ${props => props.info && css`
        display: flex;
        justify-content: space-between;
        ${'' /* height: 65vh; */}
    `}

    ${props => props.rightInfo && css`
        width: 50%;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `}
    ${props => props.leftInfo && css`
        width: 50%;
        padding-left: 20px;
    `}
`;

const Span = styled.span`
    ${'' /* color: white; */}
    font-size: 1.5em;
    font-weigth: 900;
    margin-left: 20px;
`;

class UserProfilePage extends Component {
    state = {
        loggedInAccount: [],
        emergencyContact: [],
        schedulePreference: [],
        specificNeeds: []
    };

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                // console.log('responseFromAPI.data', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data;
                this.setState({ 
                    loggedInAccount: loggedInAccount,
                    emergencyContact: loggedInAccount.emergencyContact,
                    schedulePreference: loggedInAccount.schedulePreference,
                    specificNeeds: loggedInAccount.specificNeeds
                });
            })
    }

    render(){
        return(
            <Div mainContainer>
                {/* <h1>{this.props.loggedInAccount.firstName}'s User Profile Page</h1> */}
                <Div welcomeProfileContainer>
                    <Div welcomeMessage>
                        <RoundedPicture
                            pic={this.state.loggedInAccount.profilePicture}
                            size='8em' 
                        />
                        <Span>Welcome, {this.state.loggedInAccount.firstName}</Span>
                    </Div>
                    <Div editBtn>
                        <Link to={{
                            pathname: `/user/${this.state.loggedInAccount._id}/edit`,
                            state: {
                                firstName: this.state.loggedInAccount.firstName,
                                lastName: this.state.loggedInAccount.lastName,
                                email: this.state.loggedInAccount.email,
                                address: this.state.loggedInAccount.address,
                                phoneNumber: this.state.loggedInAccount.phoneNumber,
                                emergFirstName: this.state.emergencyContact.firstName,
                                emergLastName: this.state.emergencyContact.lastName,
                                emergEmail: this.state.emergencyContact.email,
                                emergAddress: this.state.emergencyContact.address,
                                emergPhoneNumber: this.state.emergencyContact.phoneNumber,
                                morning: this.state.schedulePreference.morning,
                                afternoon: this.state.schedulePreference.afternoon,
                                evening: this.state.schedulePreference.evening,
                                night: this.state.schedulePreference.night,
                                overNight: this.state.schedulePreference.overNight,
                                fullDay: this.state.schedulePreference.fullDay,
                                healthCare: this.state.specificNeeds.healthCare,
                                houseCare: this.state.specificNeeds.houseCare,
                                displacements: this.state.specificNeeds.displacements,
                                grocery: this.state.specificNeeds.grocery,
                                pupil: this.state.specificNeeds.pupil,
                                notes: this.state.loggedInAccount.notes,
                                profilePicture: this.state.loggedInAccount.profilePicture,
                            },
                        }}>
                        <Button variant="outline-secondary" size="sm"><FiEdit /> Edit Profile</Button>
                        </Link>
                    </Div>
                </Div>
                <Div info>
                    <Div rightInfo>
                        <PersonalData loggedInAccount={this.state.loggedInAccount} />
                        <EmergencyContact loggedInAccount={this.state.emergencyContact} />
                    </Div>
                    <Div leftInfo>
                        <AccountPreferencesInfo loggedInAccount={this.state.loggedInAccount} />
                    </Div>
                </Div>
                
            </Div>
        )
    }
}

export default UserProfilePage;