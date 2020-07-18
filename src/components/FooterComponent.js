import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
// import styled, { css } from 'styled-components';

export default class FooterComponent extends Component {
    render() {
        return(
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand className="justify-content-start lg-6" href="#">
                        <p>Ironhack Project #3</p>
                        <p>&copy; 2020 | Catarina &amp; Bruno</p>
                    </Navbar.Brand>
                    <Navbar.Brand className="justify-content-end lg-6" href="https://www.facebook.com/">
                        <img
                            alt="facebook.com"
                            src="../icons/facebook-icon.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}

