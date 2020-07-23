import React from 'react';
import styled, { css } from 'styled-components';


const Div = styled.div`
    ${props => props.main && css`
        background-color: #f1f1f1;
        width: 100%;
        height: 65vh;
        padding: 20px 30px;
        margin-bottom: 20px 0;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    `}

    ${props => props.skillsAvailability && css`
        display: flex;
        justify-content: space-around;
        text-align: left;
    `}

    ${props => props.needs && css`
        width: 50%;
        padding-right: 50px;
    `}
    ${props => props.schedule && css`
        width: 50%;
    `}

    ${props => props.notes && css`
        text-align: left;
        width: 100%;
    `}

    ${props => props.preferencesContainer && css`
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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

const Table = styled.table`
    text-align: left;
`;

const Th = styled.th`
    font-size: 1em;
    padding-bottom: 10px;
`;

const Hr = styled.hr`
    width: 100%;
    margin: 10px 0;
`;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AccountPreferencesInfo(props){
   
    const account = props.loggedInAccount;


    if(account && account.accountType === 'User'){
        //NEEDS
        let needsKeys = Object.keys(account.specificNeeds);
        let filteredNeeds;

        filteredNeeds = needsKeys.filter(function(key) {
            return account.specificNeeds[key];
        });

        for (let i = 0; i < filteredNeeds.length; i++){
            if(filteredNeeds[i] === "healthCare"){
                filteredNeeds[i] = "Health Care"
            }
            if(filteredNeeds[i] === "houseCare"){
                filteredNeeds[i] = "House Care/Maintenance"
            }
            if(filteredNeeds[i] === "displacements"){
                filteredNeeds[i] = "Displacements"
            }
            if(filteredNeeds[i] === "grocery"){
                filteredNeeds[i] = "Grocery Shopping"
            }
            if(filteredNeeds[i] === "pupil"){
                filteredNeeds[i] = "Pupil (for at-risk youth in need of a mentor)"
            }
        }
        

        //SCHEDULE
        let scheduleKeys = Object.keys(account.schedulePreference);
        let filteredSchedule;

        filteredSchedule = scheduleKeys.filter(function(key) {
            // console.log(filteredSchedule);
            return account.schedulePreference[key];
        });

        if(filteredSchedule.includes("fullDay")){
            filteredSchedule = ["fullDay"];
        }

        for (let i = 0; i < filteredSchedule.length; i++){
            if(filteredSchedule[i] === "morning"){
                filteredSchedule[i] = "morning: 8am - 12pm"
            }
            if(filteredSchedule[i] === "afternoon"){
                filteredSchedule[i] = "afternoon: 12pm - 4pm"
            }
            if(filteredSchedule[i] === "evening"){
                filteredSchedule[i] = "evening: 4pm - 8pm"
            }
            if(filteredSchedule[i] === "night"){
                filteredSchedule[i] = "night: 8pm - 12am"
            }
            if(filteredSchedule[i] === "overNight"){
                filteredSchedule[i] = "over Night: 12am - 8am"
            }
            if(filteredSchedule[i] === "fullDay"){
                filteredSchedule[i] = "Full Day: 24 hours"
            }

            filteredSchedule[i] = capitalizeFirstLetter(filteredSchedule[i]);
        }

        
        

        return(
            <Div main>
                <H5>Your Preferences</H5>
                <Hr />
                <Div preferencesContainer>
                    <Div skillsAvailability>
                        <Div needs>
                            <Table>
                                <thead>
                                    <tr>
                                    <Th>Needs</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {account && account.specificNeeds && filteredNeeds.map((need,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{need}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
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
                    <Div>
                    {account && account.notes &&
                            <Div notes>
                                <H6>Notes:</H6>
                                <span>{account.notes}</span>
                            </Div>
                        }
                        
                    </Div>
                </Div>
            </Div>
        )

    } else if(account && account.accountType === 'Volunteer'){
        //SKILLS
        let skillKeys = Object.keys(account.skills);;
        let filteredSkills;

        filteredSkills = skillKeys.filter(function(key) {
            return account.skills[key];
        });
    
        for (let i = 0; i < filteredSkills.length; i++){
            if(filteredSkills[i] === "healthCare"){
                filteredSkills[i] = "Health Care"
            }
            if(filteredSkills[i] === "houseCare"){
                filteredSkills[i] = "House Care/Maintenance"
            }
            if(filteredSkills[i] === "displacements"){
                filteredSkills[i] = "Displacements"
            }
            if(filteredSkills[i] === "grocery"){
                filteredSkills[i] = "Grocery Shopping"
            }
            if(filteredSkills[i] === "mentor"){
                filteredSkills[i] = "Mentor (for at-risk youth in need of a mentor)"
            }
        }
        
    

        //AVAILABILITY
        let availabilityKeys = Object.keys(account.availablePeriods);;
        let filteredAvailability;

        filteredAvailability = availabilityKeys.filter(function(key) {
            // console.log(filteredAvailability);
            return account.availablePeriods[key];
        });

        if(filteredAvailability.includes("fullDay")){
            filteredAvailability = ["fullDay"];
        }


        for (let i = 0; i < filteredAvailability.length; i++){
            if(filteredAvailability[i] === "morning"){
                filteredAvailability[i] = "morning: 8am - 12pm"
            }
            if(filteredAvailability[i] === "afternoon"){
                filteredAvailability[i] = "afternoon: 12pm - 4pm"
            }
            if(filteredAvailability[i] === "evening"){
                filteredAvailability[i] = "evening: 4pm - 8pm"
            }
            if(filteredAvailability[i] === "night"){
                filteredAvailability[i] = "night: 8pm - 12am"
            }
            if(filteredAvailability[i] === "overNight"){
                filteredAvailability[i] = "over Night: 12am - 8am"
            }
            if(filteredAvailability[i] === "fullDay"){
                filteredAvailability[i] = "Full Day: 24 hours"
            }
            filteredAvailability[i] = capitalizeFirstLetter(filteredAvailability[i]);
        }
        


        return(
            <Div main>
                <H5>Your Preferences</H5>
                <Hr />
                <Div preferencesContainer>
                    <Div skillsAvailability>
                        <Div needs>
                            <Table>
                                <thead>
                                    <tr>
                                    <Th>Skills</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {account && filteredSkills.map((skill,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{skill}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Div>
                        <Div schedule>
                            <Table>
                                <thead>
                                    <tr>
                                    <Th>Availability</Th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {account && filteredAvailability.map((availability,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{availability}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Div>
                    </Div>
                </Div>
            </Div>
        )


    }else {
        return (
            <Div main>
                <H5>Your Preferences</H5>
                <Hr />
                loading...
            </Div>
        )
    }

           
}

export default AccountPreferencesInfo;