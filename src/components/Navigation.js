import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AuthService from './auth/auth-service';

export default class Navigation extends Component {

    service = new AuthService();

    logoutAccount = () => {
        this.service.logout()
            .then(() => {
                this.props.setCurrentAccount(null);
                localStorage.clear();
                this.props.history.push('/');
            })
    }

    assignedVolunteers = () => {
        this.service.assignedVolunteers()
            .then(() => {
                this.props.setCurrentAccount();
            })
    }


    render() {
        
        if (this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'User') {
            const userVolPath = `/user/${this.props.loggedInAccount._id}/assignedVolunteers`

            // console.log('Account:', this.props.loggedInAccount);
            return(
                <Navbar className="navBar" fluid='true' collapseOnSelect expand="lg" bg="light" variant="light" >
                <Navbar.Brand href="/">
                    <img className="logo" src="/../Logo.png" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav>
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}`}>Details</NavDropdown.Item>
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}/edit`}>Edit Details</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href={`/user/${this.props.loggedInAccount._id}/assignedVolunteers`} onClick={this.assignedVolunteers}>Assigned Volunteers</Nav.Link>
                    <Nav.Link href="/logout" onClick={this.logoutAccount}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            );
        }
        
        if (this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'Volunteer') {
            return(
                <Navbar className="navBar" collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img className="logo" src="../Logo.png" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="foi">
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}`}>Details</NavDropdown.Item>
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}/edit`}>Edit Details</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href={`/user/${this.props.loggedInAccount._id}/assignedUser`}>Assigned Users</Nav.Link>
                    <Nav.Link href="/logout" onClick={this.logoutAccount}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            )
        }
        
        if (this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'Institution') {
            return(
                <Navbar className="navBar" collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img className="logo" src="../Logo.png" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="foi">
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}`}>Details</NavDropdown.Item>
                        <NavDropdown.Item href={`/user/${this.props.loggedInAccount._id}/edit`}>Edit Details</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#">Users</Nav.Link>
                    <Nav.Link href="#">Volunteers</Nav.Link>
                    <Nav.Link href="/logout" onClick={this.logoutAccount}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            )
        }
        
        return(
            <Navbar className="navBar" collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <img className="logo" src="../Logo.png" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Brand className="oi justify-self-end">Hello!</Navbar.Brand>
                <Navbar.Toggle className="foi" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="colapse" id="responsive-navbar-nav">
                    <Nav className="foi">
                        <NavDropdown title="Login" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/login/user">User</NavDropdown.Item>
                            <NavDropdown.Item href="/login/volunteer">Volunteer</NavDropdown.Item>
                            <NavDropdown.Item href="/login/institution">Institution</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Signup" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/signup/user">User</NavDropdown.Item>
                            <NavDropdown.Item href="/signup/volunteer">Volunteer</NavDropdown.Item>
                            <NavDropdown.Item href="/signup/institution">Institution</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
        
    }
}