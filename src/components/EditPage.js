import React, { Component } from 'react';
import ButtonAssigned from './ButtonAssigned';
import axios from 'axios';
import styled, { css } from 'styled-components';
import RoundedPicture from '../components/RoundedPicture';
import { FiEdit } from "react-icons/fi";
import EditPersonalData from '../components/EditPersonalData';
import EmergencyContact from '../components/user/EmergencyContact';
import AccountPreferencesInfo from '../components/AccountPreferencesInfo';
import EditEmergencyContact from './EditEmergencyContact';
import EditAccountPreferencesInfo from './EditAccountPreferencesInfo';


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
        height: 125vh;
        ${'' /* background-color: blue; */}
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

class EditPage extends Component{
    state = {
        loggedInAccount: [],
        emergencyContact: [],
        assignedVolunteers: [],
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName,
        email: this.props.location.state.email,
        address: this.props.location.state.address,
        phoneNumber: this.props.location.state.phoneNumber,
        emergFirstName: this.props.location.state.emergFirstName,
        emergLastName: this.props.location.state.emergLastName,
        emergEmail: this.props.location.state.emergEmail,
        emergAddress: this.props.location.state.emergAddress,
        emergPhoneNumber: this.props.location.state.emergPhoneNumber,
        morning: this.props.location.state.morning, 
        afternoon: this.props.location.state.afternoon, 
        evening: this.props.location.state.evening, 
        night: this.props.location.state.night, 
        overNight: this.props.location.state.overNight, 
        fullDay: this.props.location.state.fullDay, 
        healthCare: this.props.location.state.healthCare, 
        houseCare: this.props.location.state.houseCare, 
        displacements: this.props.location.state.displacements, 
        grocery: this.props.location.state.grocery, 
        pupil: this.props.location.state.pupil,
        notes: this.props.location.state.notes,
    };

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                const loggedInAccount = responseFromAPI.data;
                this.setState({loggedInAccount: loggedInAccount, emergencyContact: loggedInAccount.emergencyContact, assignedVolunteers: loggedInAccount.assignedVolunteers});
                // console.log('this.state', this.state);
            })
            console.log('firstName state:',this.state.firstName);
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
                        <Span><FiEdit /> Edit Profile</Span>
                    </Div>
                </Div>
                <Div info>
                    <Div rightInfo>
                        <EditPersonalData 
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            email={this.state.email}
                            address={this.state.address}
                            phoneNumber={this.state.phoneNumber}
                        />
                        <EditEmergencyContact 
                            emergFirstName={this.state.emergFirstName}
                            emergLastName={this.state.emergLastName}
                            emergEmail={this.state.emergEmail}
                            emergAddress={this.state.emergAddress}
                            emergPhoneNumber={this.state.emergPhoneNumber}
                        />
                    </Div>
                    <Div leftInfo>
                        <EditAccountPreferencesInfo 
                            morning={this.state.morning}
                            afternoon={this.state.afternoon}
                            evening={this.state.evening}
                            night={this.state.night}
                            overNight={this.state.overNight}
                            fullDay={this.state.fullDay}
                            healthCare={this.state.healthCare}
                            houseCare={this.state.houseCare}
                            displacements={this.state.displacements}
                            grocery={this.state.grocery}
                            pupil={this.state.pupil}
                            notes={this.state.notes}
                        />
                    </Div>
                </Div>

                {/* {this.state.assignedVolunteers.map((volunteer) => {
                    return(
                        <ButtonAssigned key={volunteer._id}
                            picture={volunteer.profilePicture}
                            firstName={volunteer.firstName}
                            lastName={volunteer.lastName}
                            btnWidth="15em"
                        />
                    )
                })} */}
            </Div>
        )
    }
}

export default EditPage;