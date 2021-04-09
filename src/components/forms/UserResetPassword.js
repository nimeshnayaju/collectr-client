import React, {Component} from 'react';
import { Row, Col, Button,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
//import { Redirect } from 'react-router';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserResetPassword extends Component {
    state = {
        password: "",
        submitted: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            let data = { email: this.state.password };
            const response = await AuthService.resetPassword(data);
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
            return (
                <h2>Submission successful, you may now log in with your new password.</h2>
            );
        }
        return (

            <Form autocomplete="off" onSubmit={ this.handleForgotPassword }>
                <h2>Please enter a new password below.</h2>
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Password</FormLabel>
                    <Col sm="10">
                        <FormControl type="password" name="password" onChange={ this.onChange } value={this.state.password} />
                    </Col>
                </FormGroup>

                <Button type="submit">Send link</Button>

            </Form>
        );
    }
}
