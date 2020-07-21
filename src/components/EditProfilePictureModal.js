import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';


class ModalProfilePicture extends Component {
    state = {
        profilePicture: ''
    }

    handleFileChange = (event) => {
        this.setState({ file: event.target.files[0]});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        const { params } = this.props.match;

        const uploadData = new FormData();
        uploadData.append("profilePicture", this.state.file);

        axios.post(`${process.env.REACT_APP_SERVER}/api/upload`, uploadData)
            .then((response) => {
                console.log('image uploaded', response);
                
                this.setState({ profilePicture: response.data.profilePicture })
                // console.log('state profilePicture:', this.state.profilePicture);
                const { profilePicture } = this.state;

                axios.put(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit/profilePicture`, { profilePicture }, { withCredentials: true })
                    .then(() => {
                        this.props.updateState();
                        // this.props.history.push(`${process.env.REACT_APP_SERVER}/api/user/${params.id}/edit`);
                    })
                    .catch(err => {
                        console.log('Error while updating profile picture in DB', err);
                    });
            })
            .catch(err => {
                console.log('Error while uploading image', err);
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
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
          );
    }
  }

  export default ModalProfilePicture;