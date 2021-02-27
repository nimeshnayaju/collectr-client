import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CatalogList from "./components/catalog-list.component";
import Index from "./components/index.component";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-sm-3">
                            <ul className="sidebar-nav">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <Link to="/catalogs">All catalogs</Link>
                                </li>
                                <li>
                                    <a href="/items">All Items</a>
                                </li>
                                <li>
                                    <hr />
                                </li>
                                <li>
                                    <a href="/catalogs">Add a new catalog</a>
                                </li>
                                <li>
                                    <a href="/items">Add a new item</a>
                                </li>
                            </ul>
                        </div>


                        <div className="col-sm-9 mt-3">
                            <Switch>
                                <Route exact path="/" component={ Index } />
                                <Route exact path="/catalogs" component={ CatalogList } />
                            </Switch>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}

export default App;