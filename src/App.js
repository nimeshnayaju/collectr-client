import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

import Home from "./components/Home";
import ItemList from "./components/lists/ItemList";
import CatalogList from './components/lists/CatalogList';
import ModalForm from './components/modals/Modal';

import { Button, Form, FormGroup, Input } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "login"
        }
    }

    changeView = async () => {
        this.setState({
            view: "main"
        });
    }

    render() {
        if (this.state.view === "main") {
            return (
                <Router>
                    <Container className="mt-5">
                        <Row>
                            {/* Side Navigation Bar */}
                            <Col sm={3}>
                                <ul className="sidebar-nav">
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>
                                        <Link to="/catalogs">All catalogs</Link>
                                    </li>
                                    <li>
                                        <hr />
                                    </li>
                                    <li>
                                        <ModalForm label="Add" modalTitle="Add catalog" isCatalog={ true }/>
                                    </li>
                                    <li>
                                        <ModalForm label="Add" modalTitle="Add item" isCatalog={ false }/>
                                    </li>
                                </ul>
                            </Col>

                            {/* Content Area */}
                            <Col sm={9}>
                                <Switch>
                                    <Route exact path="/" component={ Home } />
                                    <Route exact path="/catalogs" component={ CatalogList } />
                                    <Route exact path="/items/:id" component={ ItemList } />
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </Router>
            );
        } else {
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
                    <Button className="btn-lg btn-dark btn-block mb-3" onClick={ this.changeView }>Log in</Button>
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
}

export default App;