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

            // console.log('Account:', this.props.loggedInAccount);
            return(
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">LOGO</Navbar.Brand>
                <Navbar.Brand className="lg-6 justify-content-end">Hello {this.props.loggedInAccount.firstName}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="lg-6">
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/login/user">Details</NavDropdown.Item>
                        <NavDropdown.Item href="/login/volunteer">Edit Details</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/user/:id/assignedVolunteers" onClick={this.assignedVolunteers}>Assigned Volunteers</Nav.Link>
                    <Nav.Link href="/logout" onClick={this.logoutAccount}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            );
        }
        
        if (this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'Volunteer') {
            return(
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">LOGO</Navbar.Brand>
                <Navbar.Brand className="justify-content-end">Hello {this.props.loggedInAccount.firstName}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="lg-6">
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/login/user">Details</NavDropdown.Item>
                        <NavDropdown.Item href="/login/volunteer">Edit Details</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#">Assigned Users</Nav.Link>
                    <Nav.Link href="/logout" onClick={this.logoutAccount}>LOGOUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            )
        }
        
        if (this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'Institution') {
            return(
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">LOGO</Navbar.Brand>
                <Navbar.Brand className="justify-content-end">Hello {this.props.loggedInAccount.firstName}!</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="lg-6">
                    
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/login/user">Details</NavDropdown.Item>
                        <NavDropdown.Item href="/login/volunteer">Edit Details</NavDropdown.Item>
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
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Brand href="/">LOGO</Navbar.Brand>
            <Navbar.Brand>Hello!</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                <Nav className="lg-6">
                <NavDropdown title="Login" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/login/user">User</NavDropdown.Item>
                    <NavDropdown.Item href="/login/volunteer">Volunteer</NavDropdown.Item>
                    <NavDropdown.Item href="/login/institution">Institution</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Signup" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">User</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Volunteer</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Institution</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );
        
    }
}