import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
        width: ${props => props.size};
        height: ${props => props.size};
        background-image: url(${props => props.backgroundImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        border-radius: 50%;       
    `;

function RoundedPicture(props){

    // let avatarImg;

    // if(props.loggedInAccount){
    //     if(!props.pic){
    //         if(props.loggedInAccount.gender === 'Female'){
    //             avatarImg = '../images/avatarWoman.jpg';
    //         } else{
    //             avatarImg = '../images/avatarMan.jpg';
    //         }        
    //     } else {
    //         avatarImg = props.pic;
    //     } 
    // }

    let imgSize = props.size;

    return(
        <div>
            <Div backgroundImage={props.pic} size={imgSize}></Div>
        </div>
    )
}

export default RoundedPicture;