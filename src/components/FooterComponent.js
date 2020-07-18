import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';
import styled, { css } from 'styled-components';

const P = styled.p`
    margin: 0;
    font-size: 0.7em;
    text-align: left;
`;

export default class FooterComponent extends Component {
    render() {
        return(
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand className="justify-content-start lg-6" href="#">
                        <P>Ironhack Project #3</P>
                        <P>&copy; 2020 | Catarina &amp; Bruno</P>
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

