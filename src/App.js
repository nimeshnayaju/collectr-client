import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

import Home from "./components/Home";
import ItemList from "./components/lists/ItemList";
import CatalogList from './components/lists/CatalogList';
import ModalForm from './components/modals/Modal';
import UserLogin from './components/forms/UserLogin';
import UserSignup from "./components/forms/UserSignup";

class App extends Component {
    render() {
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
                                    <hr/>
                                </li>
                                <li>
                                    <ModalForm label="Add" modalTitle="Add catalog" isCatalog={true}/>
                                </li>
                                <li>
                                    <ModalForm label="Add" modalTitle="Add item" isCatalog={false}/>
                                </li>
                                <li>
                                    <hr/>
                                </li>
                                <li>
                                    <Link to="/user/login">Log in</Link>
                                </li>
                                <li>
                                    <Link to="/user/signup">Sign up</Link>
                                </li>
                            </ul>
                        </Col>

                        {/* Content Area */}
                        <Col sm={9}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/catalogs" component={CatalogList}/>
                                <Route exact path="/items/:id" component={ItemList}/>
                                <Route exact path="/user/login" component={UserLogin}/>
                                <Route exact path="/user/signup" component={UserSignup}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default App;