import React, {Component} from 'react';
import { Row, Modal, Col, Button,Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import queryString from 'query-string';

import "../../App.css";
import AuthService from "../../services/AuthService";

export default class UserResetPassword extends Component {
    state = {
        password: "",
        user: "",
        token: "",
        submitted: false,
        message: ""
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount = async() => {
        let params = queryString.parse(this.props.location.search);
        if (params.userId && params.token) {
            const token = params.token;
            const userId = params.userId;

            this.setState({token, userId});
        } 
    }

    handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            let data = { token: this.state.token, userId: this.state.userId, password: this.state.password };
            const response = await AuthService.resetPassword(data);
            this.setState({ submitted: true, password: "", message: response.message || response.password });
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        const forgotPasswordMoal = this.state.submitted ?
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Password Reset</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{ this.state.message }</p>
            </Modal.Body>
            
        </Modal.Dialog> : null;

        return (

            <Form autocomplete="off" onSubmit={ this.handleForgotPassword }>

                { forgotPasswordMoal }

                <h5>Please enter a new password below.</h5>
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Password</FormLabel>
                    <Col sm="10">
                        <FormControl required type="password" name="password" onChange={ this.onChange } value={this.state.password} />
                    </Col>
                </FormGroup>

                <Button type="submit">Reset password</Button>

            </Form>
        );
    }
}
