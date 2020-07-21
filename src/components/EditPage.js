import React, { Component } from 'react';
import ButtonAssigned from './ButtonAssigned';
import axios from 'axios';
import styled, { css } from 'styled-components';
import RoundedPicture from '../components/RoundedPicture';
import { FiEdit, FiCamera } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import EditPersonalData from '../components/EditPersonalData';
import EditEmergencyContact from './EditEmergencyContact';
import EditAccountPreferencesInfo from './EditAccountPreferencesInfo';
import EditPassword from './EditPassword';
import ModalProfilePicture from './EditProfilePictureModal';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';



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

    ${props => props.btnPicture && css`
        position: absolute;
        border-radius: 50%;
        
        &:hover ${ButtonStyled} {
            background-color: rgba(0,0,0,0.5);
            color: white;
            outline: 0;
        }
    `}

    ${props => props.info && css`
        display: flex;
        justify-content: space-between;
        ${'' /* height: auto; */}
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

    ${props => props.topMargin && css`
        margin-top: 20px;
    `}
`;

const ButtonStyled = styled.button`
    ${props => props.picture && css`
        background-color: transparent;
        color: transparent;
        border: none;
        border-radius: 50%;
        width: 8em;
        height: 8em;
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        outline: 0;
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
        profilePicture: this.props.location.state.profilePicture,
        modalShow: false,
        setModalShow: false
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

    handleShowModal = (event) => {
        this.setState({ 
            modalShow: true, 
            setModalShow: true 
        })
    }

    handleHideModal = (event) => {
        //update profile picture with axios
        this.setState({ 
            modalShow: false, 
            setModalShow: false 
        })
    }

    updateStateEdit = () => {
        const { params } = this.props.match;

        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                // console.log('responseFromAPI.data', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data;
                this.setState({ 
                    firstName: loggedInAccount.firstName,
                    lastName: loggedInAccount.lastName,
                    email: loggedInAccount.email,
                    address: loggedInAccount.address,
                    phoneNumber: loggedInAccount.phoneNumber,
                    emergFirstName: loggedInAccount.emergencyContact.firstName,
                    emergLastName: loggedInAccount.emergencyContact.lastName,
                    emergEmail: loggedInAccount.emergencyContact.email,
                    emergAddress: loggedInAccount.emergencyContact.address,
                    emergPhoneNumber:loggedInAccount.emergencyContact.phoneNumber,
                    morning: loggedInAccount.schedulePreference.morning,
                    afternoon: loggedInAccount.schedulePreference.afternoon,
                    evening: loggedInAccount.schedulePreference.evening,
                    night: loggedInAccount.schedulePreference.night,
                    overNight: loggedInAccount.schedulePreference.overNight,
                    fullDay: loggedInAccount.schedulePreference.fullDay,
                    healthCare: loggedInAccount.specificNeeds.healthCare,
                    houseCare: loggedInAccount.specificNeeds.houseCare,
                    displacements: loggedInAccount.specificNeeds.displacements,
                    grocery: loggedInAccount.specificNeeds.grocery,
                    pupil: loggedInAccount.specificNeeds.pupil,
                    notes: loggedInAccount.notes,
                    profilePicture: loggedInAccount.profilePicture,
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
                                pic={this.state.profilePicture}
                                size='8em' 
                            />
                        <Div btnPicture>
                            <Div modal>
                                <ButtonStyled picture onClick={this.handleShowModal}>
                                    <FiCamera />
                                    Change picture
                                </ButtonStyled>

                                <ModalProfilePicture show={this.state.modalShow} onHide={this.handleHideModal} updateState={this.updateStateEdit} {...this.props} />
                            </Div>
                        </Div>
                        <Span><FiEdit /> Edit your account</Span>
                    </Div>
                    <Div backBtn>
                        <Link to={`/user/${this.state.loggedInAccount._id}`}>
                            <Button variant="secondary" size="sm"><IoIosArrowBack /> Back to Profile</Button>
                        </Link>
                    </Div>
                </Div>
                <Div info>
                    <Div rightInfo>
                        <EditPersonalData 
                            {...this.props}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            email={this.state.email}
                            address={this.state.address}
                            phoneNumber={this.state.phoneNumber}
                            updateState={this.updateStateEdit}
                            // updateState={this.props.location.state.updateState}
                        />
                        <Div topMargin>
                            <EditEmergencyContact 
                                {...this.props}
                                emergFirstName={this.state.emergFirstName}
                                emergLastName={this.state.emergLastName}
                                emergEmail={this.state.emergEmail}
                                emergAddress={this.state.emergAddress}
                                emergPhoneNumber={this.state.emergPhoneNumber}
                                updateState={this.updateStateEdit}
                            />
                        </Div>
                    </Div>
                    <Div leftInfo>
                        <EditAccountPreferencesInfo 
                            {...this.props}
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
                            updateState={this.updateStateEdit}
                        />
                        <Div topMargin>
                            <EditPassword {...this.props}/>
                        </Div>
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