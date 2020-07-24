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
        display: flex;
        flex-direction: column;
        align-items: center;
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

    ${props => props.buttonMaxNumber && css`
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
    `};

    ${props => props.allVolContainer && css`
        height: 350px;
        padding: 0 10px;
        overflow: scroll;
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



class AssignNewVol extends Component{
    state = {
        assignedVol: [],
        value: [],
        setValue: [],
        maxHelp: this.props.maxHelp,
        allVolunteersDB: [],
        success: false,
    }

    componentDidUpdate(prevProps) {
        // compare this.props and prevProps
        if (this.props !== prevProps) {
            this.setState({
                maxHelp: this.props.maxHelp,
                assignedVol: this.props.assignedVol,
                allVolunteersDB: this.props.allVolunteersDB
            });
        }
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

        axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/assignVolunteers`, 
        { volunteer: this.state.setValue}, { withCredentials: true })
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
                console.log('Error while updating assignedVolunteers in DB (add new)', err);
            });
    }




    render(){
        return (
            <Div main>
                <H6>Add volunteers</H6>
                <Form.Text className="text-muted">
                    If you need more help, select from the list below
                </Form.Text>
                {this.state.allVolunteersDB && this.state.maxHelp && 
                    <Div buttonMaxNumber>
                        <Button variant="outline-dark" size="sm" disabled>
                            <span>You've reached the maximum number of volunteers assigned to you.</span>
                        </Button>
                    </Div>
                }
                
                {this.state.allVolunteersDB && !this.state.maxHelp && 
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group controlId="checkScheduleForm">
                            <Div allVolContainer>
                                {this.state.allVolunteersDB && this.state.allVolunteersDB.map(volunteer => {
                                    return(
                                        <Div key={volunteer._id}>
                                            <Form.Check type="checkbox">
                                                <ToggleButtonGroup type="checkbox" value={this.state.value} onChange={this.handleChange} className="toggle-btn-group test-form">
                                                    <ToggleButton value={volunteer._id} variant="outline-success" className="toggle-btn">
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
                            </Div>
                            <Div topMargin>
                                {!this.state.success &&
                                    <Button variant="success" type="submit">
                                        Assign new volunteers
                                    </Button>
                                }
                                {this.state.success &&
                                <Button variant="success" disabled>
                                    Added!
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

export default AssignNewVol;