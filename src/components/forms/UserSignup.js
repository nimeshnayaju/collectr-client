import React, {Component} from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

import "../../App.css";
import UserService from "../../services/UserService";

export default class UserSignup extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signUp = async () => {
        try {
            await UserService.signUp(this.state);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Form className="login-form" onSubmit={ this.signUp }>
                <h1>
                    Please sign up with a name, email, and password.
                </h1>
                <FormGroup>
                    <FormLabel>First name</FormLabel>
                    <FormControl type="text" name="first-name" onChange={ this.onChange } value={ this.state.firstName } />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Last name</FormLabel>
                    <FormControl type="text" name="last-name" onChange={ this.onChange } value={ this.state.lastName } />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" name="email" onChange={ this.onChange } value={ this.state.email } />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" onChange={ this.onChange } value={ this.state.password } />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mb-3" type="submit" >Sign up</Button>
            </Form>
        );
    }
}
