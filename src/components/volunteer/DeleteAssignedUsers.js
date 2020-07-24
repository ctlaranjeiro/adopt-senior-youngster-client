import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton, Form, Button } from 'react-bootstrap';
import RoundedPicture from '../RoundedPicture';
import styled, { css } from 'styled-components';
import axios from 'axios';


const Div = styled.div`
     ${props => props.main && css`
        width: 100%;
        padding: 20px 30px;
        border-radius: 20px;
        width: 100%;
    `};

    ${props => props.userInfo && css`
        width: 70%;
        display: flex;
        align-items: center;
        text-align: left;
    `};

    ${props => props.topMargin && css`
        margin-top: 30px;
    `};

    ${props => props.buttonMaxNumber && css`
        width: 100%;
        margin: 40px auto;
    `};

    ${props => props.flexColumn && css`
        display: flex;
        flex-direction: column;
    `};
`;

const Span = styled.span`
    ${props => props.userName && css`
        margin-left: 15px;
    `};
`;

const H6 = styled.h6`
    font-size: 1em;
    font-weight: bold;
    margin-top: 30px;
`;







class DeleteAssignedUsers extends Component{
    state = {
        value: [],
        setValue: [],
        success: false
    }

    handleChange = (val) => {
        this.setState({
            setValue: val,
            value: val
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { params } = this.props.match;

        axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/deleteAssignedUsers`, 
        { assignedUser: this.state.setValue}, { withCredentials: true })
            .then(() => {
                this.props.updateState();

                this.setState({
                    success: true,
                    value: [],
                    setValue: []
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 1000)
                });

                // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
            })
            .catch(err => {
                console.log('Error while updating assignedUsers in DB', err);
            });
    }


    render(){
        return (
            <Div main>
                <H6>Your users</H6>
                <Form.Text className="text-muted">
                    Select users you no longer wish to help
                </Form.Text>
                {this.props.assignedUsers.length === 0 && 
                    <Div buttonMaxNumber>
                        <Button variant="outline-dark" size="sm" disabled>
                            <Div flexColumn>
                                <span>No users assigned yet.</span>
                                <span>Please wait until a user asks for your help.</span>
                            </Div>
                        </Button>
                    </Div>
                }
                {this.props.assignedUsers.length > 0 && 
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group controlId="checkScheduleForm">
                            {this.props.assignedUsers && this.props.assignedUsers.map(user => {
                                return(
                                    <Div centerCheck key={user._id}>
                                        <Form.Check type="checkbox">
                                            <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleChange} className="toggle-btn-group test-form">
                                                <ToggleButton value={user._id} variant="outline-danger" className="toggle-btn">
                                                    <Div userInfo>
                                                        <RoundedPicture
                                                            pic={user.profilePicture}
                                                            size='3.2em' />
                                                        <Span userName>{user.firstName} {user.lastName}</Span>
                                                    </Div>
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </Form.Check>
                                    </Div>
                                )
                            })}
                            <Div topMargin>
                                {!this.state.success &&
                                    <Button variant="danger" type="submit">
                                        Delete selected users
                                    </Button>
                                }
                                {this.state.success &&
                                    <Button variant="outline-danger" disabled>
                                        Deleted!
                                    </Button>
                                }
                            </Div>
                        </Form.Group>
                    </Form>
                }
            </Div>
        )
    }
}

export default DeleteAssignedUsers;