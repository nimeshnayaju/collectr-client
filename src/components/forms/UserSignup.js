import React, {Component} from 'react';
import { Link } from "react-router-dom";

import {Modal, Button, Row, Col, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserSignup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        submitted: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        try {
            let data = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password };
            await AuthService.signup(data);
            this.setState({ submitted: true, firstName: "", lastName: "", email: "", password: "" })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const signupModal = this.state.submitted ?
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>You have signed up successfully!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Click here to go to the <Link to="/login">login</Link> page.</p>
                    </Modal.Body>
                    
                </Modal.Dialog> : null;

        return (

            <Form autocomplete="off" onSubmit={ this.handleSignUp }>
                
                { signupModal }

                <FormGroup as={Row}>
                    <FormLabel column sm="2">First Name</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="firstName" onChange={ this.onChange } value={this.state.firstName} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Last Name</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="lastName" onChange={ this.onChange } value={this.state.lastName} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Email</FormLabel>
                    <Col sm="10">
                        <FormControl type="email" name="email" onChange={ this.onChange } value={this.state.email} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Password</FormLabel>
                    <Col sm="10">
                        <FormControl type="password" name="password" onChange={ this.onChange } value={this.state.password} />
                    </Col>
                </FormGroup>

                <Button type="submit">Signup</Button>

            </Form>
        );
    }
}
