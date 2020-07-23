import React, { Component } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import RoundedPicture from '../RoundedPicture';
import { FiEdit, FiCamera } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import EditPersonalData from '../EditPersonalData';
import EditAccountPreferencesInfo from '../EditAccountPreferencesInfo';
import EditPassword from '../EditPassword';
import ModalProfilePicture from '../EditProfilePictureModal';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DeleteAssignedUsers from './DeleteAssignedUsers';



const Div = styled.div`
    ${props => props.mainContainer && css`
        margin: auto 80px;
        height: auto;
    `}

    ${props => props.welcomeProfileContainer && css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 0;
        height: auto;
    `}

    ${props => props.welcomeMessage && css`
        display: flex;
        align-items: center;
        height: auto;
    `}

    ${props => props.btnPicture && css`
        position: absolute;
        border-radius: 50%;
        height: auto;
        
        &:hover ${ButtonStyled} {
            background-color: rgba(0,0,0,0.5);
            color: white;
            outline: 0;
        }
    `}

    ${props => props.info && css`
        display: flex;
        justify-content: space-between;
        height: auto;
        ${'' /* background-color: blue; */}
    `}

    ${props => props.rightInfo && css`
        width: 50%;
        height: auto;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `}

    ${props => props.leftInfo && css`
        width: 50%;
        height: auto;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `}

    ${props => props.topMargin && css`
        margin-top: 20px;
    `}

    ${props => props.assignedUsers && css`
        width: 100%;
        heigth: auto;
        background-color: #f1f1f1;
        padding: 20px 30px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        ${'' /* align-items: space-between; */}
    `}

    ${props => props.btnDelete && css`
        width: 300px;
        heigth: auto;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 40px;
    `}

    ${props => props.titleAssUsers && css`
        width: 100%;
        heigth: auto;
    `}

    ${props => props.deleteAndAssign && css`
        display: flex;
        heigth: auto;
    `}

    ${props => props.byeMsg && css`
        background-color: #DD3444;
        color: white;
        width: 250px;
        padding: 10px;
        margin: 20px auto 0;
        border-radius: 50px;
        font-size: 0.9em;
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

const H5 = styled.h5`
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 10px 0;
`;


class EditPage extends Component{
    state = {
        loggedInAccount: [],
        assignedUsers: [],
        accountType: this.props.location.state.accountType,
        firstName: this.props.location.state.firstName,
        lastName: this.props.location.state.lastName,
        email: this.props.location.state.email,
        address: this.props.location.state.address,
        volPhoneNumber: this.props.location.state.volPhoneNumber,
        occupation: this.props.location.state.occupation,
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
        mentor: this.props.location.state.mentor,
        aboutMe: this.props.location.state.aboutMe,
        profilePicture: this.props.location.state.profilePicture,
        modalShow: false,
        setModalShow: false,
        success: false
    };


    // componentDidMount(){
    //     const { params } = this.props.match;
      
    //         this.props.getCurrentUserProfile(params.id).then(result => {
    //             this.setState({ 
    //                 loggedInAccount: result,
    //                 emergencyContact: result.emergencyContact,
    //                 schedulePreference: result.schedulePreference,
    //                 specificNeeds: result.specificNeeds
    //             });
    //         })
    // }

   componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}`)
            .then(responseFromAPI => {
                const loggedInAccount = responseFromAPI.data.account;
                this.setState({
                    loggedInAccount: loggedInAccount,
                    assignedUsers: loggedInAccount.assignedUsers
                });
            })
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

    handleDeleteAccount = (event) => {
        event.preventDefault();
        const { params } = this.props.match;

        axios.delete(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/deleteAccount`, { withCredentials: true})
            .then(result => {
                console.log('Volunteer account deleted!');
                this.setState({
                    success: true
                }, () => {
                    setTimeout(() => {
                        this.props.setCurrentAccount(null);
                        this.props.history.push(`/`);
                    }, 2000)
                });
            })
            .catch(err => {
                console.log('Error while deleting volunteer account', err);
            });
    }

    updateStateEdit = () => {
        const { params } = this.props.match;

        axios.get(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}`)
            .then(responseFromAPI => {
                // console.log('responseFromAPI.data', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data.account;
                this.setState({ 
                    firstName: loggedInAccount.firstName,
                    lastName: loggedInAccount.lastName,
                    email: loggedInAccount.email,
                    address: loggedInAccount.address,
                    phoneNumber: loggedInAccount.volPhoneNumber,
                    occupation: loggedInAccount.occupation,
                    morning: loggedInAccount.availablePeriods.morning,
                    afternoon: loggedInAccount.availablePeriods.afternoon,
                    evening: loggedInAccount.availablePeriods.evening,
                    night: loggedInAccount.availablePeriods.night,
                    overNight: loggedInAccount.availablePeriods.overNight,
                    fullDay: loggedInAccount.availablePeriods.fullDay,
                    healthCare: loggedInAccount.skills.healthCare,
                    houseCare: loggedInAccount.skills.houseCare,
                    displacements: loggedInAccount.skills.displacements,
                    grocery: loggedInAccount.skills.grocery,
                    mentor: loggedInAccount.skills.mentor,
                    aboutMe: loggedInAccount.aboutMe,
                    profilePicture: loggedInAccount.profilePicture,
                    assignedUsers: loggedInAccount.assignedUsers,
                });
            })
    }

    render(){
        return(
            <Div mainContainer>
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

                                <ModalProfilePicture 
                                    show={this.state.modalShow} 
                                    onHide={this.handleHideModal} 
                                    updateState={this.updateStateEdit} 
                                    accountType={this.state.accountType}
                                    {...this.props} 
                                />
                            </Div>
                        </Div>
                        <Span><FiEdit /> Edit your account</Span>
                    </Div>
                    <Div backBtn>
                        <Link to={`/volunteer/${this.state.loggedInAccount._id}`}>
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
                            phoneNumber={this.state.volPhoneNumber}
                            occupation={this.state.occupation}
                            aboutMe={this.state.aboutMe}
                            updateState={this.updateStateEdit}
                            accountType={this.state.accountType}
                        />
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
                            mentor={this.state.mentor}
                            updateState={this.updateStateEdit}
                            accountType={this.state.accountType}
                        />
                        <Hr />
                        <EditPassword {...this.props} accountType={this.state.accountType} />
                    </Div>
                </Div>
                <Div topMargin>
                    <Div assignedUsers>
                        <Div titleAssUsers>
                            <H5>Assigned users</H5>
                            <Hr />
                        </Div>
                        <Div deleteAndAssign>
                            {/* Assigned Users COMPONENT - to delete! */}
                            <DeleteAssignedUsers assignedUsers={this.state.assignedUsers} updateState={this.updateStateEdit} {...this.props} />
                        </Div>
                    </Div>
                </Div>
                <Div topMargin>
                    <span>No longer wish to have an account?</span>
                    {!this.state.success &&
                        <Div btnDelete>
                            <Button variant="outline-danger" size="sm" onClick={this.handleDeleteAccount}>Delete Account</Button>
                        </Div>
                    }
                    {this.state.success &&
                        <Div byeMsg>
                            Hope to see you again soon!
                        </Div>
                    }
                </Div>

            </Div>
        )
    }
}

export default EditPage;