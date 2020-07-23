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
        width: 50%;
    `};

    ${props => props.volInfo && css`
        width: 70%;
        display: flex;
        align-items: center;
        text-align: left;
    `};

    ${props => props.avgRate && css`
        width: 30%;
        padding-right: 10px;
        display: flex;
        justify-content: flex-end;
        font-size: 0.8em;
    `};

    ${props => props.topMargin && css`
        margin-top: 30px;
    `};
`;

const Span = styled.span`
    ${props => props.volName && css`
        margin-left: 15px;
    `};
`;

const H6 = styled.h6`
    font-size: 1em;
    font-weight: bold;
    margin-top: 30px;
`;







class DeleteAssignedVol extends Component{
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

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/deleteAssignedVolunteers`, 
        { assignedVolunteer: this.state.setValue}, { withCredentials: true })
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
                console.log('Error while updating assignedVolunteers in DB', err);
            });
    }


    render(){
        return (
            <Div main>
                <H6>Your volunteers</H6>
                <Form.Text className="text-muted">
                    Select volunteers you no longer wish to help you
                </Form.Text>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group controlId="checkScheduleForm">
                        {this.props.assignedVol && this.props.assignedVol.map(volunteer => {
                            return(
                                <Div centerCheck key={volunteer._id}>
                                    <Form.Check type="checkbox">
                                        <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleChange} className="toggle-btn-group test-form">
                                            <ToggleButton value={volunteer._id} variant="outline-danger" className="toggle-btn">
                                                <Div volInfo>
                                                    <RoundedPicture
                                                        pic={volunteer.profilePicture}
                                                        size='3.2em' />
                                                    <Span volName>{volunteer.firstName} {volunteer.lastName}</Span>
                                                </Div>
                                                <Div avgRate>
                                                    {volunteer.evaluation.averageRate &&
                                                        <span>Rate: {volunteer.evaluation.averageRate}</span>
                                                    }
                                                    {!volunteer.evaluation.averageRate &&
                                                        <span>Rate: 0</span>
                                                    }
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
                                    Delete selected volunteers
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
            </Div>
        )
    }
}

export default DeleteAssignedVol;