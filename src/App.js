import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

import Home from "./components/Home";
import ItemList from "./components/lists/ItemList";
import CatalogList from './components/lists/CatalogList';
import CatalogAddUpdate from './components/forms/CatalogAddUpdate';
import ItemAddUpdate from './components/forms/ItemAddUpdate';
import ItemDetail from './components/details/ItemDetail';
import UserLogin from './components/forms/UserLogin';
import UserSignup from "./components/forms/UserSignup";

import UserService from "./services/UserService";

class App extends Component {
    render() {
        const token = UserService.getToken();

        // User has not yet logged in and generated an access token
        if (!token) {
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
                                        <Link to="/users/login">Log in</Link>
                                    </li>
                                    <li>
                                        <Link to="/users/signup">Sign up</Link>
                                    </li>
                                </ul>
                            </Col>

                            {/* Content Area */}
                            <Col sm={9}>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/users/login" component={UserLogin}/>
                                    <Route exact path="/users/signup" component={UserSignup}/>
                                </Switch>
                            </Col>
                        </Row>
                    </Container>
                </Router>
            )
        }

        // User has logged in, present catalog and item links
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
                                    <Link to="/catalogs/add">Add catalog</Link>
                                </li>
                                <li>
                                    <Link to="/items/add">Add item</Link>
                                </li>
                            </ul>
                        </Col>

                        {/* Content Area */}
                        <Col sm={9}>
                            <Switch>
                                <Route exact path="/" component={ Home } />
                                <Route exact path="/catalogs" component={ CatalogList } />
                                <Route exact path={["/catalogs/update", "/catalogs/add"]} component={ CatalogAddUpdate } />
                                <Route exact path="/catalogs/:id" component={ ItemList } />
                                <Route exact path={["/items/update", "/items/add"]} component={ ItemAddUpdate } />
                                <Route exact path="/items/:id" component={ ItemDetail } />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default App;