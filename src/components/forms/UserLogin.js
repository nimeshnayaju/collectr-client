import React, {Component} from 'react';
import {Row, Col, Modal, Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import "../../App.css";
import AuthService from "../../services/AuthService";
import { Redirect } from 'react-router';

export default class UserSignup extends Component {
    state = {
        email: "",
        password: "",
        formSubmitted: false,
        loginSuccess: false,
        message: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = async (e) => {
        e.preventDefault();
        try {
            let data = { email: this.state.email, password: this.state.password };
            const response = await AuthService.login(data);
            if (response.auth) {
                this.setState({ loginSuccess: true });
                window.location.reload();
            } else {
                this.setState({ formSubmitted: true, email: "", password: "", message: (response.message || response.email || response.password) });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.loginSuccess) {
            return <Redirect to={{ pathname: "/"}} />
        }

        const loginModal = this.state.formSubmitted ?
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>User Login</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* <p>We've sent you a verification email. After verifying your account, you can log into Collectrs using the <Link to="/login">login</Link> link.</p> */}
                        <p>{ this.state.message }</p>
                    </Modal.Body>
                    
                </Modal.Dialog> : null;
        return (
            <Form autocomplete="off" onSubmit={ this.handleLogin }>

                { loginModal }

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

                <Button type="submit">Login</Button>

            </Form>
        );
    }
}