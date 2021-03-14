import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import "../../App.css";

import { Button, Form, FormGroup, Input } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';

export default class LoginPage extends Component {
    render() {
        return (
            <Form className="login-form">
                <h1>
                    Welcome to <span className="font-weight-bold">Collectr</span>! Please log in with your Email and password.
                </h1>
                <FormGroup>
                    <Input type="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" placeholder="Password"/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block mb-3" /* onClick={ } */ >Log in</Button>
                <div className="text-center pt-3">
                    Or you may continue with your Facebook account
                </div>
                <FacebookLoginButton className="mt-3 mb-3"/>
                <div className="text-center">
                    <a href="/sign-up">Sign up</a>
                    <span className="p-2">|</span>
                    <a href="/forgot-password">Forgot Password</a>
                </div>
            </Form>
        );
    }
}