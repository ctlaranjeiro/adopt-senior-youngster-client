import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
`;


class ModalProfilePicture extends Component {
    state = {
        profilePicture: '',
        setProgress: 0,
        progress: 0
    }

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        const { params } = this.props.match;

        const uploadData = new FormData();
        uploadData.append("profilePicture", this.state.file);

        this.handleProgressBar();

        axios.post(`${process.env.REACT_APP_SERVER}/api/upload`, uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                this.setState({ profilePicture: response.data.profilePicture })
                // console.log('state profilePicture:', this.state.profilePicture);
                const { profilePicture } = this.state;

                if(this.props.accountType === 'User'){
                    axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/profilePicture`, { profilePicture }, { withCredentials: true })
                    .then(() => {
                        this.props.updateState();
                    })
                    .catch(err => {
                        console.log('Error while updating profile picture in DB', err);
                    });
                } else if(this.props.accountType === 'Volunteer'){
                    axios.put(`${process.env.REACT_APP_SERVER}/api/volunteer/${params.id}/edit/profilePicture`, { profilePicture }, { withCredentials: true })
                    .then(() => {
                        this.props.updateState();
                    })
                    .catch(err => {
                        console.log('Error while updating profile picture in DB', err);
                    });
                }
            })
            .catch(err => {
                console.log('Error while uploading image', err);
            })
    }

    handleProgressBar = () => {
        let count = 0;

        const interval = setInterval(() => { 
            if(count < 100){
                count +=10
                // console.log('count', count);
                this.setState({
                    progress: count
                })
            } else{
                clearInterval(interval);
            }
         }, 400);
    }

    handleCloseClick = () => {
        this.setState({
            progress: 0,
            setProgress: 0
        }, () => {
            this.props.onHide();
        })
    }

    render(){
        return (
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change Profile Picture
                    </Modal.Title>
                </Modal.Header>
                {this.state.progress < 100 && 
                <div>
                    <Modal.Body>
                        <Form onSubmit={this.handleFormSubmit} className="form-text-align">
                            <Form.Group>
                                <Form.File id="profilePicture" onChange={this.handleFileChange}/>
                            </Form.Group>
                            <div className="center-btn">
                                <Button variant="outline-primary" type="submit" block>
                                    Upload image
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Div>
                        <ProgressBar animated now={this.state.progress} label={`${this.state.progress}%`} />
                    </Div>
                        {/* <Button onClick={this.props.onHide}>Close</Button> */}
                    </Modal.Footer>
                    </div>
                }
                {this.state.progress === 100 && 
                    <div>
                    <Modal.Body>
                        <p>Image uploaded successfully!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseClick}>Close</Button>
                    </Modal.Footer>
                    </div>
                }
            </Modal>
          );
    }
  }

  export default ModalProfilePicture;