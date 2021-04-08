import React, {Component} from 'react';
import {Row, Col, Button,Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { Redirect } from 'react-router';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserForgotPassword extends Component {
    state = {
        email: "",
        submitted: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            let data = { email: this.state.email };
            const response = await AuthService.forgotPassword(data);
            if (response) {
                this.setState({ submitted: true });
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

            <Form autocomplete="off" onSubmit={ this.handleForgotPassword }>
                <h2>Forgot your password? Enter your email below and you should receive a link to reset your password.</h2>
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Email</FormLabel>
                    <Col sm="10">
                        <FormControl type="email" name="email" onChange={ this.onChange } value={this.state.email} />
                    </Col>
                </FormGroup>

                <Button type="submit">Send link</Button>

            </Form>
        );
    }
}
