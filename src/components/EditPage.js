import React, { Component } from 'react';
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
import DeleteAssignedVol from './user/DeleteAssignedVol';
import AssignNewVol from './user/AssignNewVol';
import FooterComponent from './FooterComponent';



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

    ${props => props.assignedVolunteers && css`
        width: 100%;
        background-color: #f1f1f1;
        padding: 20px 30px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        ${'' /* align-items: space-between; */}
    `}

    ${props => props.btnDelete && css`
        width: 300px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 40px;
    `}

    ${props => props.titleAssVol && css`
        width: 100%;
    `}

    ${props => props.deleteAndAssign && css`
        display: flex;
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
        setModalShow: false,
        maxHelp: false,
        allVolunteersDB: [],
        availableVol: [],
    };

    componentDidMount(){
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                const loggedInAccount = responseFromAPI.data;
                this.setState({loggedInAccount: loggedInAccount, emergencyContact: loggedInAccount.emergencyContact, assignedVolunteers: loggedInAccount.assignedVolunteers}, () => {
                    this.checkAssignedVolNumber();
                });
                // console.log('this.state', this.state);

                axios.get(`${process.env.REACT_APP_SERVER}/api/allVolunteers`)
                    .then(allVolunteers => {
                        this.setState({
                            allVolunteersDB: allVolunteers.data
                        }, () => {
                            this.newVolMatchList();
                        });
                    });
            })
            // console.log('firstName state:',this.state.firstName);
    }

    newVolMatchList = () => {
        //------- Exclude already assignedVolunteers from list displayes on add new volunteer
        const filtered = [];
        const ids = this.state.assignedVolunteers.map(vol => {return vol._id});

        this.state.allVolunteersDB.forEach(item => {
            if(!ids.includes(item._id)){
                filtered.push(item);
            }
        })
        console.log('Initialfilter', filtered)


        //------- Set Match between user's schedulePreferences && needs AND volunteer's availablePeriods && skills

        const finalMatch = [];
        const finalIds = [];

        if(this.state.morning){
            filtered.forEach(item => {
                if(item.availablePeriods.morning){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }
        // console.log('FinalMatch 1:', finalMatch);
        // console.log('IDS 1:', finalIds);

        if(this.state.afternoon){
            filtered.forEach(item => {
                if(item.availablePeriods.afternoon){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }

        // console.log('FinalMatch 1:', finalMatch);
        // console.log('IDS 1:', finalIds);

        if(this.state.evening){
            filtered.forEach(item => {
                if(item.availablePeriods.evening){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }
        if(this.state.night){
            filtered.forEach(item => {
                if(item.availablePeriods.night){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }
        if(this.state.overNight){
            filtered.forEach(item => {
                if(item.availablePeriods.overNight){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }
        if(this.state.fullDay){
            filtered.forEach(item => {
                if(item.availablePeriods.fullDay){
                    if(this.state.healthCare && item.skills.healthCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.houseCare && item.skills.houseCare){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.displacements && item.skills.displacements){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.grocery && item.skills.grocery){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                    if(this.state.pupil && item.skills.mentor){
                        if(!finalIds.includes(item._id)){
                            finalMatch.push(item);
                            finalIds.push(item._id);
                        }
                    }
                }
            });
        }

        console.log('FinalMatch 1:', finalMatch);
        console.log('IDS 1:', finalIds);
            


        this.setState({
            availableVol: finalMatch
        })
    }


    checkAssignedVolNumber = () => {
        if(this.state.assignedVolunteers.length >= 4){
            this.setState({
                maxHelp: true
            })
            console.log('maxHelp set to true');
        } else if (this.state.assignedVolunteers.length < 4){
            this.setState({
                maxHelp: false
            })
            console.log('maxHelp set to false');
        }
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

        axios.delete(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/deleteAccount`, { withCredentials: true})
            .then(result => {
                console.log('User account deleted!');
                this.props.setCurrentAccount(null);
                this.props.history.push(`/`);
            })
            .catch(err => {
                console.log('Error while deleting user account', err);
            });
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
                    assignedVolunteers: loggedInAccount.assignedVolunteers,
                }, () => {
                    this.checkAssignedVolNumber();
                    this.newVolMatchList();
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
                            <EditPassword {...this.props} />
                        </Div>
                    </Div>
                </Div>
                <Div topMargin>
                    <Div assignedVolunteers>
                        <Div titleAssVol>
                            <H5>Assigned volunteers</H5>
                            <Hr />
                        </Div>
                        <Div deleteAndAssign>
                            {/* Assigned Volunteers COMPONENT - to delete! */}
                            <DeleteAssignedVol assignedVol={this.state.assignedVolunteers} updateState={this.updateStateEdit} {...this.props} />
                        
                        
                        
                            {/* Choose Volunteer COMPONENT
                                ----- If user already has 4 volunteer assigned, set a message saying - 
                                    "Max volunteers selected (can't assign any more)"

                                ----- When user is selecting, set a max of 4 volunteers in the checkboxes. 
                                    If user already has volunteers assigned - check number and set the 
                                    max number to equal max of 4 volunteers assigned (ex: if user already 
                                    has 3 volunteers, only let him check one more from the choosing)                        
                            */}
                            <AssignNewVol assignedVol={this.state.assignedVolunteers} maxHelp={this.state.maxHelp} allVolunteersDB={this.state.availableVol} updateState={this.updateStateEdit} {...this.props} />
                        </Div>
                    </Div>
                </Div>
                <Div topMargin>
                    <span>No longer wish to have an account?</span>
                    <Div btnDelete>
                        <Button variant="outline-danger" size="sm" onClick={this.handleDeleteAccount}>Delete Account</Button>
                    </Div>
                </Div>

            </Div>
        )
    }
}

export default EditPage;