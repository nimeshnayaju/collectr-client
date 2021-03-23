import React, {Component} from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';

import "../../App.css";
import UserService from "../../services/UserService";
import useToken from "../hooks/useToken";

export default class UserSignup extends Component {
    state = {
        email: "",
        password: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    logIn = async (data) => {
        try {
            const token = await UserService.logIn(data);
            useToken(token);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Form className="login-form" onSubmit={ this.logIn }>
                <h1>
                    Please log in with an email and password.
                </h1>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" name="email" onChange={ this.onChange } value={ this.state.email } />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="password" onChange={ this.onChange } value={ this.state.password } />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mb-3" type="submit" >Log in</Button>
            </Form>
        );
    }
}