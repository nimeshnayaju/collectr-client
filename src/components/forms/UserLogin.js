import React, {Component} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import "../../App.css";

export default class UserSignup extends Component {
    render() {
        return (
            <Form className="login-form">
                <h1>
                    Please log in with your email and password.
                </h1>
                <FormGroup>
                    <Input type="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" placeholder="Password"/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mb-3" /* onClick={ } */ >Log in</Button>
            </Form>
        );
    }
}