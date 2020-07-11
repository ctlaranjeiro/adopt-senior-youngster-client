import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AuthService from './auth/auth-service';

export default class Navigation extends Component {
    service = new AuthService;

    logoutAccount = () => {
        this.service.logout()
            .then(() => {
                this.props.setCurrentAccount(null);
            })
    }

    render() {
        // if(this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'user') {
        //     return(
        //         <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        //         <Navbar.Brand href="/">LOGO</Navbar.Brand>
        //         <Navbar.Brand>Hello {user.props.firstName}!</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
        //             <Nav className="lg-6">
        //             
        //             <NavDropdown title="Profile" id="collasible-nav-dropdown">
        //                 <NavDropdown.Item href="/login/user">User Details</NavDropdown.Item>
        //                 <NavDropdown.Item href="/login/volunteer">Edit Details</NavDropdown.Item>
        //             </NavDropdown>
        //             <Nav.Link href="#features">Assigned Volunteers</Nav.Link>
        //             <Nav.Link href="#features">LOGOUT</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //         </Navbar>
        //     );
        // } else if(this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'volunteer') {
        //     return()
        // } else if(this.props.loggedInAccount && this.props.loggedInAccount.accountType === 'institution') {
        //     return()
        // } else {
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
        // }
    }
}