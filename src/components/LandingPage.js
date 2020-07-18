import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Div = styled.div`
    ${props => props.mainContainer && css `
        margin: 0 80px;
        overflow: auto;
    `}

    ${props => props.landing && css `
        background-image: url('../images/carousel-user.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        align-items: baseline;
        heigth: 70vh;
    `}
    
    ${props => props.captions && css `
        width: 30%;
        text-align: left;
        margin-top: 20vh;
        margin-left: 10vw;
    `}

    ${props => props.accounts && css `
        margin-top: 25px;
    `}

    ${props => props.centerFlex && css `
        display: flex;
        flex-direction: column;
        align-items: center;
    `}
`

export default class LandingPage extends Component {
    
    render() {
        return(
            <Div mainContainer>
                <Div landing>
                    <Div captions>
                        <h1>For a brighter tomorrow!</h1>
                        <p><span className="blue">Adopt a Senior or Youngster</span> is an online platform that connects people.</p>
                        <p>We aim to provide help for those who depende on other's to perform day-to-day tasks.</p>
                        <p>Caring about the future of youngsters living in precarious conditions, we facilitate theyre mentoring.</p>
                    </Div>
                </Div>
                <Div accounts>
                    <h2>Help those in need</h2>
                    <Container>
                        <Row>
                            <Col xs={3} md={2}>
                                {/* <Image src="holder.js/171x180" thumbnail /> */}
                            </Col>
                            <Col xs={6} md={4}>
                                <Div centerFlex>
                                    <div className="userTypeImg"><Image height={80} src="../icons/users-icon.png"  /></div>
                                    <h4>User</h4>
                                    <Link>
                                        <Button>
                                            Signup
                                        </Button>
                                    </Link>
                                    <p>If you need help to perform some daily or recurrent tasks.</p>
                                    <p>Or if you are in need of guidence towards your future.</p>
                                </Div>
                            </Col>
                            <Col xs={6} md={4}>
                                <Div centerFlex>
                                    <div className="userTypeImg"><Image height={80} src="../icons/volunteers-icon.png"  /></div>
                                    <h4>Volunteer</h4>
                                    <Link>
                                        <Button>
                                            Signup
                                        </Button>
                                    </Link>
                                    <p>If you'd like to help people in need.</p>
                                </Div>
                            </Col>
                            <Col xs={3} md={2}>
                                {/* <Image src="holder.js/171x180" thumbnail /> */}
                            </Col>
                        </Row>
                    </Container>
                    <h5>Join us today!</h5>
                    <p><strong>For a brighter tomorrow.</strong></p>
                    {/* <div>
                        <img src="/public/icons/users-icon.png" alt="user" srcset="/public/icons/users-icon.png 2x 100w"/>
                        <Link to={'/signup/user'}>
                            <Button>Signup</Button>
                        </Link>
                    </div> */}
                </Div>
            </Div>
        )
    }
}