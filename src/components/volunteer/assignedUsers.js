import React, { Component } from 'react';
import axios from 'axios';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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

export default class AssignedUsers extends Component {
    state = {
        reviews: [],
        loggedInAccount: [],
        assignedUsers: [],
        selectedUser: [],
        needs: [],
        preferedPeriods: [],
        selUserReviews: [],
        averageRate: '',
        author: '',
        subject: '',
        report:''
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;
        const subject = this.state.selectedUser._id;
        const report = this.state.report;
        console.log(this.state);
        axios.post(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/submitReport`, {subject, report}, {withCredentials: true})
            .then(() => {
                // this.props.refreshReports();
                this.setState({
                    subject: '',
                    report: ''
                });
                // toast('Review created!');
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name] : value});
    }

    componentFunctions() {
        const filteredNeeds = this.renderNeeds();
        const filteredPreferedPeriods = this.renderAvailability();
        const rev = this.selectReviews();
        this.setState({
            Needs: filteredNeeds,
            preferedPeriods: filteredPreferedPeriods,
            selUserReviews: rev
        })
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}`)
            .then(responseFromAPI => {
                // console.log('API Res:', responseFromAPI.data);
                const loggedInAccount = responseFromAPI.data.account;
                this.setState({
                    loggedInAccount: loggedInAccount,
                    assignedUsers: loggedInAccount.assignedUsers,
                    reviews: responseFromAPI.data.reviews,
                    averageRate: loggedInAccount.evaluation.averageRate
                }, () => {
                    if (this.state.assignedUsers.length > 0) {
                        
                        this.setState({
                            selectedUser: this.state.assignedUsers[0]
                        }, () => {
                            this.componentFunctions()
                        })
                    }
                })
            })
    }

    selectedUser = (user) => {
        this.setState({
            selectedUser: user
        }, () => {
            this.componentFunctions();
        })
    }

    renderNeeds() {
        let needsKeys = Object.keys(this.state.selectedUser.specificNeeds);
        let filteredNeeds;

        filteredNeeds = needsKeys.filter((key) => {
            return this.state.selectedUser.specificNeeds[key];
        });

        for (let i = 0; i < filteredNeeds.length; i++){
            if(filteredNeeds[i] === "healthCare"){
                filteredNeeds[i] = "Health Care"
            }
            if(filteredNeeds[i] === "houseCare"){
                filteredNeeds[i] = "House Care/Maintenance"
            }
            if(filteredNeeds[i] === "displacements"){
                filteredNeeds[i] = "Displacements"
            }
            if(filteredNeeds[i] === "grocery"){
                filteredNeeds[i] = "Grocery Shopping"
            }
            if(filteredNeeds[i] === "mentor"){
                filteredNeeds[i] = "Mentor"
            }
        }
        // console.log('filteredNeeds:', filteredNeeds);

        return filteredNeeds;
    }

    renderAvailability() {
        let preferedPeriodsKeys = Object.keys(this.state.selectedUser.schedulePreference);
        let filteredPreferedPeriods;

        filteredPreferedPeriods = preferedPeriodsKeys.filter((key) => {
            return this.state.selectedUser.schedulePreference[key];
        });

        if(filteredPreferedPeriods.includes("fullDay")){
            filteredPreferedPeriods = ["fullDay"];
        }

        for (let j = 0; j < filteredPreferedPeriods.length; j++){
            if(filteredPreferedPeriods[j] === "morning"){
                filteredPreferedPeriods[j] = "Morning: 8am - 12pm"
            }
            if(filteredPreferedPeriods[j] === "afternoon"){
                filteredPreferedPeriods[j] = "Afternoon: 12pm - 4pm"
            }
            if(filteredPreferedPeriods[j] === "evening"){
                filteredPreferedPeriods[j] = "Evening: 4pm - 8pm"
            }
            if(filteredPreferedPeriods[j] === "night"){
                filteredPreferedPeriods[j] = "Night: 8pm - 12am"
            }
            if(filteredPreferedPeriods[j] === "overNight"){
                filteredPreferedPeriods[j] = "Over night: 12am - 8am"
            }
            if(filteredPreferedPeriods[j] === "fullDay"){
                filteredPreferedPeriods[j] = "Full-day: 24 hours"
            }
        }
        // console.log('filteredPreferedPeriods:', filteredPreferedPeriods);
        return filteredPreferedPeriods
    }

    selectReviews() {
        if(!this.state.reviews) {
            // console.log('THERE ARE NO REVIEWS TO SHOW!')
            return 'No Reviews';
        }

        let rev = [];
        let allReviews = this.state.reviews;
        // console.log('allReviews:', allReviews);
        allReviews.forEach(review => {
            if(review.author._id === this.state.selectedUser._id) {
                rev.push(review);
            }
        });
        // console.log('rev:', rev);

        return rev
    }

    showReviews() {
        let selURev = this.state.selUserReviews;

        for(let n = 0; n < selURev.length; n ++) {
            let revSub = selURev[n].subject;
            let date = selURev[n].review[0].createdAt;
            let text = selURev[n].review[0].text;
            let rate = selURev[n].review[0].rate;

            if(revSub === this.state.loggedInAccount._id) {
                return (
                    <li key={n}>
                        <p><strong>Rate:</strong> {rate}</p>
                        <p><strong>Review:</strong> {text}</p>
                        <p><small><strong>Created on:</strong> {date}</small></p>
                    </li>
                )
            }
        }
    }

    render(){
        // console.log('ALL REVIEWS:', this.state.reviews);
        // console.log('Assigned Users:', this.state.assignedUsers);
        // console.log('Selected User:',this.state.selectedUser);
        return(
            <Div mainContainer>

                <Div titleContainer>
                    <h2>Assigned Users</h2>
                    {/* <Div editBtn>
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
                    </Div> */}
                </Div>

                <Div info>
                    <Div leftInfo>
                    {this.props.loggedInAccount && this.state.assignedUsers.map(user => {
                        return (
                            <Ul lista key={user._id}>
                                <li className="volList">
                                    <a className="aLink" href="#information" onClick={this.selectedUser.bind(this, user)}>
                                        <Div banner>
                                            <span>
                                                <strong>
                                                    {user.firstName} {user.lastName}
                                                </strong>
                                            </span>
                                            <RoundedPicture pic={user.profilePicture} size='3em' />
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
                                <h5>User Details</h5>
                                <p><strong>Name:</strong> {this.state.selectedUser.firstName} {this.state.selectedUser.lastName}</p>
                                <p><strong>Age:</strong> {this.state.selectedUser.age}</p>
                                <p><strong>Occupation:</strong> {this.state.selectedUser.occupation}</p>
                                <ul id="assVolNeeds">
                                    <strong>Needs:</strong>
                                    {this.state.needs && this.state.needs.map(skill => (<li key={skill}>{skill}</li>))}
                                </ul>
                                <p><strong>User Notes:</strong> {this.state.selectedUser.notes}</p>
                            </Tab>
                            <Tab className="tab" eventKey="schedule-preferences" title="Schedule Preferences" id="informationSchedule">
                                <ol>
                                    <h5>Schedule Preferences</h5>
                                    {this.state.preferedPeriods && this.state.preferedPeriods.map(per => (<li key={per}>{per}</li>))}
                                </ol>
                            </Tab>
                            <Tab className="tab" eventKey="reviews" title="Reviews" id="informationReviews">
                                <p><strong>Your average rate:</strong> {this.state.averageRate}</p>
                                <h5>Your Reviews</h5>
                                <ol>
                                    {this.showReviews()}
                                </ol>
                            </Tab>
                            <Tab className="tab" eventKey="report" title="Report">
                                <div>
                                    <h5>Your report on the visit to the user {this.state.selectedUser.firstName} {this.state.selectedUser.lastName}</h5>
                                    <form onSubmit={this.handleFormSubmit}>
                                        <label for="author">Author: {this.state.loggedInAccount.firstName} {this.state.loggedInAccount.lastName}</label>
                                        <input type="text" name="author" id="author" value={this.state.loggedInAccount._id} hidden /> <br/>
                                        <label for="subject">Subject: {this.state.selectedUser.firstName} {this.state.selectedUser.lastName}</label>
                                        <input type="text" name="subject" id="subject" value={this.state.selectedUser._id} hidden /> <br/>

                                        <label for="report">Your impressions here:</label> <br />
                                        <textarea name="report" id="report" cols="150" rows="10" value={this.state.report} onChange={this.handleChange}></textarea>

                                        <br />

                                        <input type="submit" value="Submit" />
                                    </form>
                                    <ToastContainer />
                                </div>
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