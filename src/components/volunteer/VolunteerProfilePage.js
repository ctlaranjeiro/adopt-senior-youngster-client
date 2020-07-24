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
        ${'' /* height: 100%; */}
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

    ${props => props.leftInfo && css`
        width: 50%;
        padding-right: 20px;
        background-color: #f1f1f1;
        border-radius: 20px;
    `}
    ${props => props.rightInfo && css`
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

class VolunteerProfilePage extends Component {
    state = {
        loggedInAccount: [],
        availablePeriods: [],
        skills: []
    };

  
    componentDidMount(){
        const { params } = this.props.match;
      
            this.props.getCurrentVolunteerProfile(params.id).then(result => {
                console.log('result', result);
                this.setState({ 
                    loggedInAccount: result.account,
                    availablePeriods: result.account.availablePeriods,
                    skills: result.account.skills
                });
               });
    }

    componentDidUpdate(prevProps) {
        // compare this.props and prevProps
        if (this.props !== prevProps) {
            this.updateStateVolunteerProfile();
        }
    }

    updateStateVolunteerProfile = () => {
        const { params } = this.props.match;
        

        axios.get(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}`)
            .then(responseFromAPI => {
                // console.log('responseFromAPI.data', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data.account;
                this.setState({ 
                    loggedInAccount: loggedInAccount,
                    availablePeriods: loggedInAccount.availablePeriods,
                    skills: loggedInAccount.skills
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
                        <Span>Hello, {this.state.loggedInAccount.firstName}</Span>
                    </Div>
                    <Div editBtn>
                        <Link to={{
                            pathname: `/volunteer/${this.state.loggedInAccount._id}/edit`,
                            state: {
                                accountType: this.state.loggedInAccount.accountType,
                                firstName: this.state.loggedInAccount.firstName,
                                lastName: this.state.loggedInAccount.lastName,
                                email: this.state.loggedInAccount.email,
                                address: this.state.loggedInAccount.address,
                                volPhoneNumber: this.state.loggedInAccount.volPhoneNumber,
                                occupation: this.state.loggedInAccount.occupation,
                                morning: this.state.availablePeriods.morning,
                                afternoon: this.state.availablePeriods.afternoon,
                                evening: this.state.availablePeriods.evening,
                                night: this.state.availablePeriods.night,
                                overNight: this.state.availablePeriods.overNight,
                                fullDay: this.state.availablePeriods.fullDay,
                                healthCare: this.state.skills.healthCare,
                                houseCare: this.state.skills.houseCare,
                                displacements: this.state.skills.displacements,
                                grocery: this.state.skills.grocery,
                                mentor: this.state.skills.mentor,
                                aboutMe: this.state.loggedInAccount.aboutMe,
                                profilePicture: this.state.loggedInAccount.profilePicture,
                            }
                        }}>
                        <Button variant="outline-secondary" size="sm"><FiEdit /> Edit Profile</Button>
                        </Link>
                    </Div>
                </Div>
                <Div info>
                    <Div leftInfo>
                        <PersonalData loggedInAccount={this.state.loggedInAccount} />
                    </Div>
                    <Div rightInfo>
                        <AccountPreferencesInfo loggedInAccount={this.state.loggedInAccount} />
                    </Div>
                </Div>
                
            </Div>
        )
    }
}

export default VolunteerProfilePage;