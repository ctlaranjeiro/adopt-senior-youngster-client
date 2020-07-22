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
        border-radius:20px;
        background-color: #f1f1f1;
    `}
`

const Ul = styled.div `
    ${props => props.list && css `
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        list-style: none;
    `}
`

export default class AssignedVolunteers extends Component {
    state = {
        loggedInAccount: [],
        assignedVolunteers: [],
        selectedVolunteer: []
    }

    componentDidMount() {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/${params.id}`)
            .then(responseFromAPI => {
                const loggedInAccount = responseFromAPI.data;
                this.setState({
                    loggedInAccount: loggedInAccount,
                    assignedVolunteers: loggedInAccount.assignedVolunteers
                })
            })
    }

    

    render(){
        console.log('listOfVolunteers: ', this.state.loggedInAccount);
        return(
            <div mainContainer>

                {/* <Div titleContainer>
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
                 */}

                {/* <Div info> */}
                    {/* <Div leftInfo>
                    {this.props.loggedInAccount && this.state.loggedInAccount.assignedVolunteers.map(vol => {
                        this.setState.selectedVolunteer;
                        return (
                            <Ul list> */}
                            {/* onclick={ () => this.setState……………..} */}
                                {/* <li>
                                    <a className="aLink" href="#information" onClick={ () => this.setState.selectedVolunteer(vol.props)}>
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
                    </Div> */}
                    {/* <Div rightInfo>
                        <Tabs defaultActiveKey="profile" id="information">
                            <Tab eventKey="profile" title="Profile">
                                <p>Name: {this.state.selectedVolunteer} {this.state.selectedVolunteer.lastName}</p>
                            </Tab>
                            <Tab eventKey="reports" title="Reports">
                            </Tab>
                            <Tab eventKey="schedule" title="Schedule">
                            </Tab>
                            <Tab eventKey="review" title="Review">
                            </Tab>
                            <Tab eventKey="location" title="Location">
                            </Tab>
                        </Tabs>
                    </Div>
                </Div> */}
        </div>
        )
    }
}