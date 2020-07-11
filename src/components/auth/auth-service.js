import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://adopt-senior-youngster-server.herokuapp.com/api',
            withCredentials: true
        });
        this.service = service;
    }

    signupUser = (
        email,
        password,
        firstName,
        lastName,
        gender,
        birthDate,
        address,
        phoneNumber,
        profilePicture,
        morning,
        afternoon,
        evening,
        night,
        overNight,
        fullDay,
        healthCare,
        houseCare,
        displacements,
        grocery,
        pupil,
        emergFirstName,
        emergLastName,
        emergPhoneNumber,
        emergEmail,
        emergAddress
    ) => {
        return this.service.post('/signup/user', {
            email,
            password,
            firstName,
            lastName,
            gender,
            birthDate,
            address,
            phoneNumber,
            profilePicture,
            morning,
            afternoon,
            evening,
            night,
            overNight,
            fullDay,
            healthCare,
            houseCare,
            displacements,
            grocery,
            pupil,
            emergFirstName,
            emergLastName,
            emergPhoneNumber,
            emergEmail,
            emergAddress
        })
            .then((response) => {
                return response.data;
            });
    }

    signupVolunteer = (
        email,
        password,
        firstName,
        lastName,
        gender,
        birthDate,
        address,
        volPhoneNumber,
        occupation,
        profilePicture,
        morning,
        afternoon,
        evening,
        night,
        overNight,
        fullDay,
        healthCare,
        houseCare,
        displacements,
        grocery,
        mentor,
        aboutMe
    ) => {
        return this.service.post('/signup/volunteer', {
            email,
            password,
            firstName,
            lastName,
            gender,
            birthDate,
            address,
            volPhoneNumber,
            occupation,
            profilePicture,
            morning,
            afternoon,
            evening,
            night,
            overNight,
            fullDay,
            healthCare,
            houseCare,
            displacements,
            grocery,
            mentor,
            aboutMe
        })
            .then((response) => {
                return response.data;
            });
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then((response) => {
                return response.data;
            });
    }

    logout = () => {
        return this.service.post('/logout')
            .then((response) => {
                return response.data;
            });
    }

    loginUser = (email, password) => {
        return this.service.post('/login/user', { email, password })
            .then((response) => {
                return response.data;
            });
    }

    loginVolunteer = (email, password) => {
        return this.service.post('/login/volunteer', { email, password })
            .then((response) => {
                return response.data;
            });
    }
}

export default AuthService;