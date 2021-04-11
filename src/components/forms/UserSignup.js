import React, {Component} from 'react';

import {Modal, Button, Row, Col, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserSignup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        submitted: "",
        message: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        try {
            let data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
            const response = await AuthService.signup(data);
            this.setState({ submitted: true, firstName: "", lastName: "", email: "", password: "", message: (response.message || response.firstName || response.lastname || response.email || response.password) });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const signupModal = this.state.submitted ?
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>User Sign Up</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <p>We've sent you a verification email. After verifying your account, you can log into Collectrs using the <Link to="/login">login</Link> link.</p> */}
                        <p>{ this.state.message }</p>
                    </Modal.Body>
                    
                </Modal.Dialog> : null;

        return (

            <Form autocomplete="off" onSubmit={ this.handleSignUp }>
                
                { signupModal }

                <FormGroup as={Row}>
                    <FormLabel column sm="2">First Name</FormLabel>
                    <Col sm="10">
                        <FormControl required type="text" name="firstName" onChange={ this.onChange } value={this.state.firstName} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Last Name</FormLabel>
                    <Col sm="10">
                        <FormControl required type="text" name="lastName" onChange={ this.onChange } value={this.state.lastName} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Email</FormLabel>
                    <Col sm="10">
                        <FormControl required type="email" name="email" onChange={ this.onChange } value={this.state.email} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Password</FormLabel>
                    <Col sm="10">
                        <FormControl required type="password" name="password" onChange={ this.onChange } value={this.state.password} />
                    </Col>
                </FormGroup>

                <Button type="submit">Signup</Button>

            </Form>
        );
    }
}
