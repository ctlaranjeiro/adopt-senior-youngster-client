import React from 'react';
import styled, { css } from 'styled-components';


const Div = styled.div`
    ${props => props.main && css`
        background-color: #f1f1f1;
        width: 100%;
        padding: 20px 30px;
        margin-bottom: 20px 0;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    `}

    ${props => props.needsNotes && css`
        display: flex;
        justify-content: space-around;
        text-align: left;
    `}

    ${props => props.needs && css`
        width: 25%;
    `}

    ${props => props.notes && css`
        width: 70%;
        border-left: 1px solid black;
        padding-left: 40px;
    `}

    ${props => props.schedule && css`
        margin-top: 60px;
        text-align: left;
    `}
`;

const H5 = styled.h5`
    font-size: 1.1em;
    padding-bottom: 10px;
    font-weight: bold;
`

const Table = styled.table`
    text-align: left;
`;

const Th = styled.th`
    font-size: 1.1em;
    padding-bottom: 10px;
`;





function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AccountPreferencesInfo(props){
   
    const account = props.loggedInAccount;
    
    //NEEDS
    let needsKeys;
    let filteredNeeds;
    if(account) {
        needsKeys = Object.keys(account.specificNeeds);

        filteredNeeds = needsKeys.filter(function(key) {
            return account.specificNeeds[key];
        });

        for (let i = 0; i < filteredNeeds.length; i++){
            filteredNeeds[i] = capitalizeFirstLetter(filteredNeeds[i]);
        }
    }

    //SCHEDULE
    let scheduleKeys;
    let filteredSchedule;
    if(account) {
        scheduleKeys = Object.keys(account.schedulePreference);

        filteredSchedule = scheduleKeys.filter(function(key) {
            console.log(filteredSchedule);
            return account.schedulePreference[key];
        });


        for (let i = 0; i < filteredSchedule.length; i++){
            filteredSchedule[i] = capitalizeFirstLetter(filteredSchedule[i]);
        }
    }

    
    return(
        <Div main>
            <Div needsNotes>
                <Div needs>
                    <Table>
                        <thead>
                            <tr>
                            <Th>Needs</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {account && filteredNeeds.map((need,i) => {
                                return (
                                    <tr key={i}>
                                        <td>{need}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Div>
                {account && account.notes &&
                    <Div notes>
                        <H5>Notes:</H5>
                        <span>{account.notes}</span>
                    </Div>
                }
            </Div>
            <Div schedule>
                <Table>
                    <thead>
                        <tr>
                        <Th>Schedule Preference</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {account && filteredSchedule.map((schedule,i) => {
                            return (
                                <tr key={i}>
                                    <td>{schedule}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Div>
        </Div>
    )
}

export default AccountPreferencesInfo;