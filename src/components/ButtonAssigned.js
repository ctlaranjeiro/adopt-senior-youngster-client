import React from 'react';
import styled from 'styled-components';
import RoundedPicture from './RoundedPicture';

const Div = styled.div`
    background-color: #f1f1f1;
    width: ${props => props.btnWidth};
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 10px;
`

const Span = styled.span`
    margin-left: 15px;
`

function ButtonAssigned (props){
    return(
        <Div btnWidth={props.btnWidth}>
            <RoundedPicture loggedInAccount={props.loggedInAccount} size='3.2em' />
            <Span>{props.loggedInAccount && props.loggedInAccount.firstName} {props.loggedInAccount && props.loggedInAccount.lastName}</Span>
        </Div>
    )
}

export default ButtonAssigned;