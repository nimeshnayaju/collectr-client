import React, {Component} from 'react';
import {Row, Col, Button,Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { Redirect } from 'react-router';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserSignup extends Component {
    state = {
        email: "",
        password: "",
        submitted: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        try {
            let data = { email: this.state.email, password: this.state.password };
            const response = await AuthService.login(data);
            if (response) {
                this.setState({ submitted: true })
            }
            window.location.reload(); 
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to={{ pathname: "/"}} />
        }
        return (
            <Form autocomplete="off" onSubmit={ this.handleLogin }>

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

                <Button type="submit">Login</Button>

            </Form>
        );
    }
}
