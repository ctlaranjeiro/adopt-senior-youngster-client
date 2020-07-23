import React from 'react';
import styled, { css } from 'styled-components';


const Div = styled.div`
    ${props => props.main && css`
        background-color: #f1f1f1;
        width: 100%;
        padding: 20px 30px;
        border-radius: 20px;
    `}

    ${props => props.aboutMe && css`
        text-align: left;
        width: 100%;
        margin-top: 40px;
    `}
`;

const Table = styled.table`
    text-align: left;
`;

const Th = styled.th`
    font-size: 1.1em;
    padding-bottom: 10px;
`;

const Td = styled.td`
    padding: 5px 0;

    ${props => props.td1 && css`
        width: 200px;
        border-right: 1px solid black;
    `}

    ${props => props.td2 && css`
        padding-left: 20px;
    `}
`;

const H5 = styled.h5`
    font-size: 1.1em;
    font-weight: bold;
    text-align: left;
`

const H6 = styled.h6`
    font-size: 1em;
    font-weight: bold;
    text-align: left;
`

const Hr = styled.hr`
    width: 100%;
    margin: 20px 0;
`;

function PersonalData(props){
   
    const account = props.loggedInAccount;

    let phoneNumber;

    if(account){
        if(account.accountType === 'User'){
            phoneNumber = account.phoneNumber;
        } else if(account.accountType === 'Volunteer'){
            phoneNumber = account.volPhoneNumber;
        }
    }
    

    if(account.accountType === 'User'){
        return(
            <Div main>
                <Table>
                    <thead>
                        <tr>
                        <Th colspan="2">Personal Information</Th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Td td1>
                                Name
                            </Td>
                            <Td td2>
                                {account.firstName} {account.lastName}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Age
                            </Td>
                            <Td td2>
                                {account.age}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Email
                            </Td>
                            <Td td2>
                                {account.email}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Phone number
                            </Td>
                            <Td td2>
                                {phoneNumber}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Address
                            </Td>
                            <Td td2>
                                {account.address}
                            </Td>
                        </tr>
                    </tbody>
                </Table>
            </Div>
        )
    }else if(account.accountType === 'Volunteer'){
        return(
            <Div main>
                <H5>Personal Information</H5>
                <Hr />
                <Table>
                    <tbody>
                        <tr>
                            <Td td1>
                                Name
                            </Td>
                            <Td td2>
                                {account.firstName} {account.lastName}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Age
                            </Td>
                            <Td td2>
                                {account.age}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Email
                            </Td>
                            <Td td2>
                                {account.email}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Phone number
                            </Td>
                            <Td td2>
                                {phoneNumber}
                            </Td>
                        </tr>
                        <tr>
                            <Td td1>
                                Address
                            </Td>
                            <Td td2>
                                {account.address}
                            </Td>
                        </tr>
                    </tbody>
                </Table>
                {account && account.aboutMe &&
                    <Div aboutMe>
                        <H6>About Me:</H6>
                        <span>{account.aboutMe}</span>
                    </Div>
                }
            </Div>
        )
    }else{
        return (
            <Div main>
                <Table>
                    <thead>
                        <tr>
                        <Th colspan="2">Personal Information</Th>
                        </tr>
                    </thead>
                </Table>
                loading...
            </Div>
        )
    }
}

export default PersonalData;