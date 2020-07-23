import React, { Component } from 'react';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import PersonalData from '../PersonalData';
import AccountPreferencesInfo from '../AccountPreferencesInfo';

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

    ${props => props.info && css`
        display: flex;
        justify-content: space-between;
        height: 65vh;
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

class VolunteerProfilePage extends Component {
    render(){
        return(
            <Div mainContainer>
                {/* <h1>{this.props.loggedInAccount.firstName}'s User Profile Page</h1> */}
                <Div welcomeProfileContainer>
                    <Div welcomeMessage>
                        <RoundedPicture loggedInAccount={this.props.loggedInAccount} size='8em' />
                        <Span>Welcome, {this.props.loggedInAccount && this.props.loggedInAccount.firstName}</Span>
                    </Div>
                    <Div editBtn>
                        <button>Edit Profile</button>
                    </Div>
                </Div>
                <Div info>
                    <Div rightInfo>
                        <PersonalData loggedInAccount={this.props.loggedInAccount} />
                    </Div>
                    <Div leftInfo>
                        <AccountPreferencesInfo loggedInAccount={this.props.loggedInAccount} />
                    </Div>
                </Div>
                
            </Div>
        )
    }
}

export default VolunteerProfilePage;