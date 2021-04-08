import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

import Home from "./components/Home";
import ItemList from "./components/lists/ItemList";
import CatalogList from './components/lists/CatalogList';
import PublicCatalogList from './components/lists/PublicCatalogList';
import PublicItemList from './components/lists/PublicItemList';
import CatalogAddUpdate from './components/forms/CatalogAddUpdate';
import ItemAddUpdate from './components/forms/ItemAddUpdate';
import ItemDetail from './components/details/ItemDetail';
import UserLogin from './components/forms/UserLogin';
import UserSignup from "./components/forms/UserSignup";
import AuthService from "./services/AuthService";

class App extends Component {


    logout() {
        AuthService.logout();
    }

    render() {
        
        const isLoggedIn = AuthService.isLoggedIn();

        // User has not yet logged in and generated an access token
        if (!isLoggedIn) {
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
                                        <hr />
                                    </li>
                                    <li>
                                        <Link to="/login">Log in</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup">Sign up</Link>
                                    </li>
                                </ul>
                            </Col>

                            {/* Content Area */}
                            <Col sm={9}>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route exact path="/login" component={UserLogin}/>
                                    <Route exact path="/signup" component={UserSignup}/>
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
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/catalogs">User's catalogs</Link>
                                </li>
                                <li>
                                    <Link to={{pathname: "/catalogs/public", public: true }}>All public catalogs</Link>
                                </li>
                                <li>
                                    <hr />
                                </li>
                                <li>
                                    <Link to="/catalogs/add">Add catalog</Link>
                                </li>
                                <li>
                                    <a href="/login" onClick={this.logout}>Log out</a>
                                </li>
                            </ul>
                        </Col>

                        {/* Content Area */}
                        <Col sm={9}>
                            <Switch>
                                <Route exact path="/" component={ Home } />
                                <Route exact path="/catalogs" component={ CatalogList } />
                                <Route exact path="/catalogs/public" component={ PublicCatalogList } />
                                <Route exact path={["/catalogs/update", "/catalogs/add"]} component={ CatalogAddUpdate } />
                                <Route exact path="/catalogs/:id" component={ ItemList } />
                                <Route exact path="/catalogs/:id/public/items" component={ PublicItemList } />
                                <Route exact path={["/items/add/:catalogId", "/items/update/:catalogId/:itemId"]} component={ ItemAddUpdate } />
                                <Route exact path="/items/:catalogId/:itemId" component={ ItemDetail } />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default App;