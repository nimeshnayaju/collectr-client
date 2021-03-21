import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

import Home from "./components/Home";
import ItemList from "./components/lists/ItemList";
import CatalogList from './components/lists/CatalogList';
import CatalogAddUpdate from './components/forms/CatalogAddUpdate';
import ItemAddUpdate from './components/forms/ItemAddUpdate';
import ItemDetail from './components/details/ItemDetail';
import CatalogDetail from './components/details/CatalogDetail';

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
                                    <Link to="/">Home</Link>
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
                                <Route exact path="/Catalog/:id" component={ CatalogDetail } />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        );
    }
}

export default App;