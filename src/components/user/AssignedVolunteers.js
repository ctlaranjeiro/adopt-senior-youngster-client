import React, { Component } from 'react';
import axios from 'axios';

export default class AssignedVolunteers extends Component {
    state = {
        listOfVolunteers: []
    }

    getAllVolunteers = () => {
        // Get list of volunteers from the API
        axios.get(`${process.env.REACT_APP_SERVER}/api/user/:id/assignedVolunteers`)
            .then(responseFromAPI => {
                this.setState({
                    listOfVolunteers: responseFromAPI.data
                })
            });
    }
    
    componentDidMount() {
      this.getAllVolunteers();
    }

    render(){
        return(
            <div>
                <h1>{this.props.loggedInAccount.firstName}'s Assigned Volunteers Page</h1>
                <div>
                    {this.state.listOfVolunteers.map(vol => {
                        return (
                            <div>
                                <h3>{vol.firstName} {vol.lastName}</h3>
                                <div>
                                    {vol}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}