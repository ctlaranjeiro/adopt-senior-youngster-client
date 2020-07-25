import React, { Component } from 'react';
import axios from 'axios';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GoogleMap from '../GoogleMap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        author: '',
        review: [
            {
                text: '',
                rate: ''
            }
        ],
        subject: '',
        reports: [],
        loggedInAccount: [],
        assignedVolunteers: [],
        selectedVolunteer: [],
        skills: [],
        availablePeriods: [],
        selVolReports: []
    }

    handleFormSubmit = (event) => {
        const author = this.state.author;
        const subject = this.state.subject;
        const text = this.state.review[0].text;
        const rate = this.state.review[0].rate;
        axios.post(`${process.env.REACT_APP_SERVER}/api/user/:id/submitReview`, {author, subject, text, rate}, {withCredentials: true})
            .then(() => {
                this.refreshReviews();
                this.setState({
                    author: '',
                    subject: '',
                    review: [
                        {
                            text: '',
                            rate: ''
                        }
                    ]
                });
                toast('Review created!');
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name] : value});
    }

    componentFunctions() {
        const filteredSkills = this.renderSkills();
        const filteredAvailablePeriods = this.renderAvailability();
        const rep = this.selectReports();
        this.setState({
            skills: filteredSkills,
            availablePeriods: filteredAvailablePeriods,
            selVolReports: rep
        })
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                // console.log('API Res:', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data.account;
                this.setState({
                    loggedInAccount: loggedInAccount,
                    assignedVolunteers: loggedInAccount.assignedVolunteers,
                    reports: responseFromAPI.data.reports
                }, () => {
                    if (this.state.assignedVolunteers.length > 0) {
                        
                        this.setState({
                            selectedVolunteer: this.state.assignedVolunteers[0]
                        }, () => {
                            this.componentFunctions()
                            // this.renderSkills();
                            // this.renderAvailability();
                        }/* , () => {
                            this.renderAvailability();
                        }, () => {
                            this.selectReports();
                        } */)
                    }
                })
            })
    }

    selectedVol = (vol) => {
        this.setState({
            selectedVolunteer: vol
        }, () => {
            this.componentFunctions();
        }/* , () => {
            this.renderAvailability();
        }, () => {
            this.selectReports();
        } */)
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
        // console.log('filteredSkills:', filteredSkills);
        /* this.setState({
            skills: filteredSkills
        }) */
        return filteredSkills;
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
        // console.log('filteredAvailablePeriods:', filteredAvailablePeriods);
        /* this.setState({
            availablePeriods: filteredAvailablePeriods
        }) */
        return filteredAvailablePeriods
    }

    selectReports() {
        if(!this.state.reports) {
            // console.log('THERE ARE NO REPORTS TO SHOW!')
            return;
        }
        // filtering the user associated reports according to the volunteer
        let rep = [];
        let allReps = this.state.reports;
        // console.log('allReps:', allReps);
        allReps.forEach(report => {
            if(report.author._id === this.state.selectedVolunteer._id) {
                rep.push(report);
            }
        });
        // console.log('rep:', rep);
        // setting the state with the selected reports
        /* this.setState({
            selVolReports:rep
        }); */

        return rep
    }

    showReports(auth, sub) {
        sub = this.state.loggedInAccount._id;
        auth = this.state.selectedVolunteer._id;

        let authName = `${this.state.selectedVolunteer.firstName} ${this.state.selectedVolunteer.lastName}`;
        

        return (
            this.state.selVolReports.map(rep => {
                
                return (
                    <li key={rep._id}>
                        <p><strong>{authName}</strong></p>
                        {rep.text.map((res, i) => {
                            return (
                                <div key={i}>
                                    <p><strong>Report:</strong> {res.report}</p>
                                    <p><strong>Posted on:</strong>{res.createdAt}</p>
                                </div>
                            )
                        })}
                    </li>
                );
            })
        );
    }

    render(){
        // console.log('ALL REPORTS:', this.state.reports);
        // console.log('Assigned Volunteers:', this.state.assignedVolunteers);
        // console.log('Selected Volunter:',this.state.selectedVolunteer);
        return(
            <Div mainContainer>

                <Div titleContainer>
                    <h2>Assigned Volunteers</h2>
                    <Div editBtn>
                        <Link to={{
                            pathname: `/user/${this.state.loggedInAccount._id}/edit`,
                            state: {
                                // firstName: this.state.loggedInAccount.firstName,
                                // lastName: this.state.loggedInAccount.lastName,
                                // email: this.state.loggedInAccount.email,
                                // address: this.state.loggedInAccount.address,
                                // phoneNumber: this.state.loggedInAccount.phoneNumber,
                                // emergFirstName: this.state.emergencyContact.firstName,
                                // emergLastName: this.state.emergencyContact.lastName,
                                // emergEmail: this.state.emergencyContact.email,
                                // emergAddress: this.state.emergencyContact.address,
                                // emergPhoneNumber: this.state.emergencyContact.phoneNumber,
                                // morning: this.state.schedulePreference.morning,
                                // afternoon: this.state.schedulePreference.afternoon,
                                // evening: this.state.schedulePreference.evening,
                                // night: this.state.schedulePreference.night,
                                // overNight: this.state.schedulePreference.overNight,
                                // fullDay: this.state.schedulePreference.fullDay,
                                // healthCare: this.state.specificNeeds.healthCare,
                                // houseCare: this.state.specificNeeds.houseCare,
                                // displacements: this.state.specificNeeds.displacements,
                                // grocery: this.state.specificNeeds.grocery,
                                // pupil: this.state.specificNeeds.pupil,
                                // notes: this.state.loggedInAccount.notes,
                                // profilePicture: this.state.loggedInAccount.profilePicture
                            }
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
                            <Tab className="tab" eventKey="profile" title="Profile" id="informationProfile">
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
                            <Tab className="tab" eventKey="schedule" title="Schedule" id="informationSchedule">
                                <ol>
                                    <h5>Availability</h5>
                                    {this.state.availablePeriods && this.state.availablePeriods.map(per => (<li key={per}>{per}</li>))}
                                </ol>
                            </Tab>
                            <Tab className="tab" eventKey="reports" title="Reports" id="informationReports">
                                <h5>Your Reports</h5>
                                <ol>
                                    {this.showReports()}
                                </ol>
                            </Tab>
                            <Tab className="tab" eventKey="review" title="Review">
                                <div>
                                    <h5>Rate the volunteer {this.state.selectedVolunteer.firstName} {this.state.selectedVolunteer.lastName}</h5>
                                    <form onSubmit={this.handleFormSubmit}>
                                        <label htmlFor="author">Author: {this.state.loggedInAccount.firstName} {this.state.loggedInAccount.lastName}</label>
                                        <input type="text" name="author" id="author" value={this.state.loggedInAccount._id} onChange={this.handleChange} hidden/> <br/>
                                        <label htmlFor="subject">Subject: {this.state.selectedVolunteer.firstName} {this.state.selectedVolunteer.lastName}</label>
                                        <input type="text" name="subject" id="subject" value={this.state.selectedVolunteer._id} onChange={this.handleChange} hidden/> <br/>
                                        <label>From 1 to 5 (1 beeing bad and 5 beeing awsome) how do you rate the volunteer?</label> <br/>
                                        <label htmlFor="one">1</label>
                                        <input className="radio" type="radio" id="one" name="rate" value="1" onChange={this.handleChange}/>
                                        <label htmlFor="two">2</label>
                                        <input className="radio" type="radio" id="two" name="rate" value="2" onChange={this.handleChange}/>
                                        <label htmlFor="three">3</label>
                                        <input className="radio" type="radio" id="three" name="rate" value="3" onChange={this.handleChange}/>
                                        <label htmlFor="fuor">4</label>
                                        <input className="radio" type="radio" id="fuor" name="rate" value="4" onChange={this.handleChange}/>
                                        <label htmlFor="five">5</label>
                                        <input className="radio" type="radio" id="five" name="rate" value="5" onChange={this.handleChange}/>
                                        <br />

                                        <label htmlFor="text">Your inpressions here:</label> <br />
                                        <textarea name="text" id="text" cols="150" rows="10" onChange={this.handleChange}></textarea>

                                        <br />

                                        <input type="submit" value="Submit" />
                                    </form>
                                    <ToastContainer />
                                </div>
                            </Tab>
                            <Tab className="tab" eventKey="location" title="Location">
                                <GoogleMap userLocation={this.state.loggedInAccount.address} volLocation={this.state.selectedVolunteer.address} volName={this.state.selectedVolunteer.firstName}/>
                            </Tab>
                        </Tabs>
                    </Div>
                </Div>
        </Div>
        )
    }
}