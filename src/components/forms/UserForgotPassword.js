import React, {Component} from 'react';
import {Row, Col, Modal, Button,Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
//import { Redirect } from 'react-router';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserForgotPassword extends Component {
    state = {
        email: "",
        submitted: false,
        message: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            let data = { email: this.state.email };
            const response = await AuthService.forgotPassword(data);
            console.log(response);
            this.setState({ email: "", submitted: true, message: response.message });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const forgotPasswordModal = this.state.submitted ?
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{ this.state.message }</p>
            </Modal.Body>
            
        </Modal.Dialog> : null;

        return (

            <Form autocomplete="off" onSubmit={ this.handleForgotPassword }>

                { forgotPasswordModal }

                <h5>Forgot your password? Enter your email below and you should receive a link to reset your password.</h5>
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Email</FormLabel>
                    <Col sm="10">
                        <FormControl required type="email" name="email" onChange={ this.onChange } value={this.state.email} />
                    </Col>
                </FormGroup>

                <Button type="submit">Send link</Button>

            </Form>
        );
    }
}
