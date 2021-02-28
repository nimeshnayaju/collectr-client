import React, {Component} from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CatalogList from "./components/catalog-list.component";
import Home from "./components/home.component";
import CatalogDetail from "./components/catalog-detail.component";
import CatalogAddUpdate from "./components/catalog-add-update.component";


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
                                    <Link to="/items">All Items</Link>
                                </li>
                                <li>
                                    <hr />
                                </li>
                                <li>
                                    <Link to="/catalogs/add">Add a new catalog</Link>
                                </li>
                                <li>
                                    <Link to="/items">Add a new item</Link>
                                </li>
                            </ul>
                        </div>


                        <div className="col-sm-9 mt-3">
                            <Switch>
                                <Route exact path="/" component={ Home } />
                                <Route exact path="/catalogs" component={ CatalogList } />
                                <Route exact path={["/catalogs/update/:id", "/catalogs/add"]} component={ CatalogAddUpdate } />
                                <Route path="/catalogs/:id" component={ CatalogDetail } />
                            </Switch>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}

export default App;