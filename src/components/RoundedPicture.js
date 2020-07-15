import React from 'react';
import styled, { css } from 'styled-components';

function RoundedPicture(props){

    let avatarImg;

    if(!props.loggedInAccount.profilePicture){
        if(props.loggedInAccount.gender === 'Female'){
            avatarImg = '../images/avatarWoman.jpg';
        } else{
            avatarImg = '../images/avatarMan.jpg';
        }        
    } else {
        avatarImg = props.loggedInAccount.profilePicture;
    } 

    let imgSize = props.size;

    const Div = styled.div`
        width: ${props => props.size};
        height: ${props => props.size};
        background-image: url(${props => props.backgroundImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        border-radius: 50%;       
    `;


    return(
        <div>
            <Div backgroundImage={avatarImg} size={imgSize}></Div>
        </div>
    )
}

export default RoundedPicture;