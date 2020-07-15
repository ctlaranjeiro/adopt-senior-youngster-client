import React, { Component } from 'react';
import axios from 'axios';

export default class AssignedVolunteers extends Component {
    // state = {
    //     listOfVolunteers: this.props.loggedInAccount.assignedVolunteers
    // }

    

    // getAllVolunteers = () => {
    //     Get list of volunteers from the API
    //     axios.get(`${process.env.REACT_APP_SERVER}/api/user/:id`)
    //         .then(responseFromAPI => {
    //             this.setState({
    //                 listOfVolunteers: this.props.loggedInAccount.assignedVolunteers
    //             })
    //         });
    // }
    
    // componentDidMount() {
    //   this.getAllVolunteers();
    // }

    render(){
        console.log('listOfVolunteers: ', this.props.loggedInAccount);
        return(
            <div fluid="md" className="">
                <h1>{this.props.loggedInAccount && this.props.loggedInAccount.firstName}'s Assigned Volunteers Page</h1>
                <p>
                    Page under construction!
                </p>
                <div>
                <h3>Assigned Volunteers</h3>
                    <ul>
                        {this.props.loggedInAccount && this.props.loggedInAccount.assignedVolunteers.map(vol => {
                            return (
                                <li>
                                    <div>
                                        <span>
                                            <strong>
                                                {/* {vol.firstName} {vol.lastName} */}
                                                vol.firstName vol.lastName
                                            </strong>
                                        </span>
                                        <span>
                                            {/* {vol.profilePicture} */}
                                            vol.profilePicture
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
/* 
<Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>
 */