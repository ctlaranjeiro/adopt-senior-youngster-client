import React, { Component } from 'react';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import PersonalData from '../PersonalData';
import EmergencyContact from '../user/EmergencyContact';

const Div = styled.div`
    ${props => props.mainContainer && css`
        margin: 0 80px;
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
`;

const Span = styled.span`
    ${'' /* color: white; */}
    font-size: 1.5em;
    font-weigth: 900;
    margin-left: 20px;
`;

class UserProfilePage extends Component {
    render(){
        return(
            <Div mainContainer>
                {/* <h1>{this.props.loggedInAccount.firstName}'s User Profile Page</h1> */}
                <Div welcomeProfileContainer>
                    <Div welcomeMessage>
                        <RoundedPicture loggedInAccount={this.props.loggedInAccount} size='8em' />
                        <Span>Welcome, {this.props.loggedInAccount.firstName}</Span>
                    </Div>
                    <Div editBtn>
                        <button>Edit Profile</button>
                    </Div>
                </Div>
                <PersonalData loggedInAccount={this.props.loggedInAccount} />
                <EmergencyContact loggedInAccount={this.props.loggedInAccount} />
                
            </Div>
        )
    }
}

export default UserProfilePage;