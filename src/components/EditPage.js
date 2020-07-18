import React, { Component } from 'react';
import ButtonAssigned from './ButtonAssigned';

class EditPage extends Component{
    render(){
        return(
            <div>
                {/* <ButtonAssigned loggedInAccount={this.props.loggedInAccount} btnWidth="13em"/> */}
                {this.props.loggedInAccount && this.props.loggedInAccount.assignedVolunteers && this.props.loggedInAccount.assignedVolunteers.map(volunteer => {
                    return(
                        <ButtonAssigned
                            loggedInAccount={this.props.loggedInAccount} 
                            picture={this.props.loggedInAccount && volunteer.profilePicture}
                            firstName={volunteer.firstName}
                            lastName={volunteer.lastName}
                            btnWidth="13em"
                        />
                    )
                })}
                Name: {this.props.loggedInAccount && this.props.loggedInAccount.firstName}
            </div>
        )
    }
}

export default EditPage;