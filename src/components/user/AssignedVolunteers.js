import React, { Component } from 'react';
import axios from 'axios';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


const Div = styled.div `
    ${props => props.mainContainer && css`
        margin:auto 2em;
    `}

    ${props => props.banner && css `
        width: 100%;
        height: 4em;
        border: 1px solid #007bff;
        border-radius: 2em;

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1em;
    `}

    ${props => props.titleContainer && css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 0;
        margin:auto 2em;
    `}

    ${props => props.info && css`
        display: flex;
        justify-content: space-between;
    `}

    ${props => props.rightInfo && css`
        width: 80%;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `}
    ${props => props.leftInfo && css`
        width: 15%;
        height: auto;
        margin-left: 20px;
        text-align: center;
    `}
`

const Ul = styled.div `
    ${props => props.lista && css `
        width: 100%;
        height: auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        list-style: none;
        background-color: #f1f1f1;
    `}
`

export default class AssignedVolunteers extends Component {
    state = {
        loggedInAccount: [],
        assignedVolunteers: [],
        selectedVolunteer: [],
        skills: [],
        availability: []
    }



    componentDidMount() {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                const loggedInAccount = responseFromAPI.data;
                this.setState({
                    loggedInAccount: loggedInAccount,
                    assignedVolunteers: loggedInAccount.assignedVolunteers
                }, () => {
                    if (this.state.assignedVolunteers.length > 0) {
                        
                        this.setState({
                            selectedVolunteer: this.state.assignedVolunteers[0]/* ,
                            skills: this.state.assignedVolunteers[0].skills */
                        }, () => {
                            this.renderSkills();
                            this.renderAvailability();
                        })
                    }
                })
            })
    }

    selectedVol = (vol) => {
        this.setState({
            selectedVolunteer: vol
        }, () => {
            this.renderSkills();
            this.renderAvailability();
        })
    }

    renderSkills() {
        let skillsKeys = Object.keys(this.state.selectedVolunteer.skills);
        let filteredSkills;

        filteredSkills = skillsKeys.filter((key) => {
            return this.state.selectedVolunteer.skills[key];
        });

        for (let i = 0; i < filteredSkills.length; i++){
            if(filteredSkills[i] === "healthCare"){
                filteredSkills[i] = "Health Care"
            }
            if(filteredSkills[i] === "houseCare"){
                filteredSkills[i] = "House Care/Maintenance"
            }
            if(filteredSkills[i] === "displacements"){
                filteredSkills[i] = "Displacements"
            }
            if(filteredSkills[i] === "grocery"){
                filteredSkills[i] = "Grocery Shopping"
            }
            if(filteredSkills[i] === "mentor"){
                filteredSkills[i] = "Mentor"
            }
        }
        console.log('filteredSkills:', filteredSkills);
        this.setState({
            skills: filteredSkills
        })
    }

    renderAvailability() {
        let availablePeriodsKeys = Object.keys(this.state.selectedVolunteer.availablePeriods);
        let filteredAvailablePeriods;

        filteredAvailablePeriods = availablePeriodsKeys.filter((key) => {
            return this.state.selectedVolunteer.availablePeriods[key];
        });

        if(filteredAvailablePeriods.includes("fullDay")){
            filteredAvailablePeriods = ["fullDay"];
        }

        for (let j = 0; j < filteredAvailablePeriods.length; j++){
            if(filteredAvailablePeriods[j] === "morning"){
                filteredAvailablePeriods[j] = "Morning: 8am - 12pm"
            }
            if(filteredAvailablePeriods[j] === "afternoon"){
                filteredAvailablePeriods[j] = "Afternoon: 12pm - 4pm"
            }
            if(filteredAvailablePeriods[j] === "evening"){
                filteredAvailablePeriods[j] = "Evening: 4pm - 8pm"
            }
            if(filteredAvailablePeriods[j] === "night"){
                filteredAvailablePeriods[j] = "Night: 8pm - 12am"
            }
            if(filteredAvailablePeriods[j] === "overNight"){
                filteredAvailablePeriods[j] = "Over night: 12am - 8am"
            }
            if(filteredAvailablePeriods[j] === "fullDay"){
                filteredAvailablePeriods[j] = "Full-day: 24 hours"
            }
        }
        console.log('filteredAvailablePeriods:', filteredAvailablePeriods);
        this.setState({
            availablePeriods: filteredAvailablePeriods
        })
    }

    render(){
        console.log(this.state.selectedVolunteer);
        return(
            <Div mainContainer>

                <Div titleContainer>
                    <h2>Assigned Volunteers</h2>
                    <Div editBtn>
                        <Link to={{
                            pathname: ``,
                            state: {}
                        }}>
                        <Button variant="outline-secondary" size="sm"><FiEdit /> Edit Profile</Button>
                        </Link>
                    </Div>
                </Div>

                <Div info>
                    <Div leftInfo>
                    {this.props.loggedInAccount && this.state.assignedVolunteers.map(vol => {
                        return (
                            <Ul lista key={vol._id}>
                                <li className="volList">
                                    <a className="aLink" href="#information" onClick={this.selectedVol.bind(this, vol)}>
                                        <Div banner>
                                            <span>
                                                <strong>
                                                    {vol.firstName} {vol.lastName}
                                                </strong>
                                            </span>
                                            <RoundedPicture pic={vol.profilePicture} size='3em' />
                                        </Div>
                                    </a>
                                </li>
                            </Ul>
                        )
                    })}
                    </Div>

                    <Div rightInfo>
                        <Tabs defaultActiveKey="profile" id="information">
                            <Tab className="tab" eventKey="profile" title="Profile">
                                <h5>Volunteer Details</h5>
                                <p><strong>Name:</strong> {this.state.selectedVolunteer.firstName} {this.state.selectedVolunteer.lastName}</p>
                                <p><strong>Age:</strong> {this.state.selectedVolunteer.age}</p>
                                <p><strong>Occupation:</strong> {this.state.selectedVolunteer.occupation}</p>
                                <ul id="assVolSkills">
                                    <strong>Skills:</strong>
                                    {this.state.skills && this.state.skills.map(skill => (<li key={skill}>{skill}</li>))}
                                </ul>
                                <p><strong>About:</strong> {this.state.selectedVolunteer.aboutMe}</p>
                            </Tab>
                            <Tab className="tab" eventKey="schedule" title="Schedule">
                                <ol>
                                    <h5>Availability</h5>
                                    {this.state.availability && this.state.availability.map(per => (<li key={per}>{per}</li>))}
                                </ol>
                            </Tab>
                            <Tab className="tab" eventKey="reports" title="Reports">
                            </Tab>
                            <Tab className="tab" eventKey="review" title="Review">
                            </Tab>
                            <Tab className="tab" eventKey="location" title="Location">
                            </Tab>
                        </Tabs>
                    </Div>
                </Div>
        </Div>
        )
    }
}