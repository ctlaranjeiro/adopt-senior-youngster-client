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
// import { ToastContainer, toast } from 'react-toastify';


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
        reviewAuthor: '',
        reviewText:'',
        reviewSubject: '',
        reviewRate: '',
        reports: [],
        loggedInAccount: [],
        assignedVolunteers: [],
        selectedVolunteer: [],
        skills: [],
        availablePeriods: [],
        selVolReports: []
    }

    // handleReviewSubmit = (event) => {
    //     const author = this.state.reviewAuthor;
    //     const subject = this.state.reviewSubject;
    //     const text = this.state.reviewText;
    //     const rate = this.state.reviewRate;
    //     axios.post(`${process.env.REACT_APP_SERVER}/api/user/:id/submitReview`, {author, subject, text, rate}, {withCredentials: true})
    //         .then(() => {
    //             this.refreshReviews();
    //             this.setState({
    //                 author: '',
    //                 subject: '',
    //                 text:'',
    //                 rate:''
    //             });
    //             toast('Review created!');
    //         })
    // }

    // handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({[name] : value});
    // }

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
        console.log('filteredSkills:', filteredSkills);
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
        console.log('filteredAvailablePeriods:', filteredAvailablePeriods);
        /* this.setState({
            availablePeriods: filteredAvailablePeriods
        }) */
        return filteredAvailablePeriods
    }

    selectReports() {
        if(!this.state.reports) {
            console.log('THERE ARE NO REPORTS TO SHOW!')
            return;
        }
        // filtering the user associated reports according to the volunteer
        let rep = [];
        let allReps = this.state.reports;
        console.log('allReps:', allReps);
        allReps.forEach(report => {
            if(report.author._id === this.state.selectedVolunteer._id) {
                rep.push(report);
            }
        });
        console.log('rep:', rep);
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
        console.log('ALL REPORTS:', this.state.reports);
        console.log('Assigned Volunteers:', this.state.assignedVolunteers);
        console.log('Selected Volunter:',this.state.selectedVolunteer);
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
                                    <a className="aLink" href="#" onClick={this.selectedVol.bind(this, vol)}>
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
                            {/* <form onSubmit={this.handleReviewSubmit}>
                                <label>Rate the volunteer {this.state.selectedVolunteer.firstName} {this.state.selectedVolunteer.lastName}</label>
                                <input type="radio" id="male" name="gender" value="male">
                                <label for="male">Male</label><br>
                                <input type="radio" id="female" name="gender" value="female">
                                <label for="female">Female</label><br>
                                <input type="radio" id="other" name="gender" value="other">
                                <label for="other">Other</label>
                            </form> */}
                            </Tab>
                            <Tab className="tab" eventKey="location" title="Location">
                                <GoogleMap userLocation={this.state.loggedInAccount.address} volLocation={this.state.selectedVolunteer.address} />
                            </Tab>
                        </Tabs>
                    </Div>
                </Div>
        </Div>
        )
    }
}