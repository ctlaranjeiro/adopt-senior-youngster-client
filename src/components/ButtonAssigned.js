import React from 'react';
import styled from 'styled-components';
import RoundedPicture from './RoundedPicture';

const Div = styled.div`
    ${'' /* background-color: #f1f1f1; */}
    width: ${props => props.btnWidth};
    border: 1px solid #007bff;
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
            <RoundedPicture
                pic={props.picture}
                size='3.2em' />
            <Span>{props.firstName} {props.lastName}</Span>
        </Div>
    )
}

export default ButtonAssigned;