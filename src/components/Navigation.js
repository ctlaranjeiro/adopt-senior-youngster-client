import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import AuthService from './auth/auth-service';

export default class Navigation extends Component {
    // service = new AuthService;

    // logoutUser = () => {
    //     this.service.logout()
    //         .then(() => {
    //             this.props.setCurrentUser(null);
    //         })
    // }

    render() {
        // if (this.props.loggedInUser) {
            return(
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav className="lg-6">
                    <Navbar.Brand>Hello!</Navbar.Brand>
                    <NavDropdown title="Login" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">User</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Volunteer</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Institution</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Signup" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">User</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Volunteer</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Institution</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            )
        // } else {
        //     return (
        //         <nav>
        //             <ul>
        //                 <li>
        //                     <Link to='/login'>Login</Link>
        //                 </li>
        //                 <li>
        //                     <Link to='/signup'>Sign Up</Link>
        //                 </li>
        //             </ul>
        //         </nav>
        //     )
        // }
    }
}