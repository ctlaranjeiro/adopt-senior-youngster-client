import React from 'react';
import styled, { css } from 'styled-components';


const Div = styled.div`
    background-color: #f1f1f1;
    width: 40%;
    padding: 20px 30px;
    margin-bottom: 20px 0;
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

function PersonalData(props){
    const account = props.loggedInAccount;

    let phoneNumber;
    if(account.accountType === 'User'){
        phoneNumber = account.phoneNumber;
    } else if(account.accountType === 'Volunteer'){
        phoneNumber = account.volPhoneNumber;
    }


    return(
        <Div>
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
}

export default PersonalData;