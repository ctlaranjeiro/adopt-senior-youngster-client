import React, { Component } from 'react';

class UserProfilePage extends Component {
    render(){
        return(
            <div>
                <h1>{this.props.loggedInAccount.firstName}'s Volunteer Profile Page</h1>
            </div>
        )
    }
}

export default UserProfilePage;