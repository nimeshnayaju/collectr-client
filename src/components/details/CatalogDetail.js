import React, { Component } from 'react';
import { Button, Table, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';

export default class CatalogDetail extends Component {

    state = {
        name:'',
        description:''
    }

    componentDidMount = async() => {
        if (this.props.match.params.id) {
            const catalog = await this.getCatalog(this.props.match.params.id);
            this.setState({ name: catalog.name , description: catalog.description});
        }
    }

    getCatalog = async(id) => {
        try {
            const catalog = await CatalogService.get(id);
            return catalog;
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const catalog = this.state;
        const info = (
            <Row>
                <h5>{ catalog.name.toUpperCase() }</h5>
                <hr />
                <Table>
                    <p>Description: { catalog.description }</p>
                </Table>
                
                <Link to={{pathname: "/catalogs", catalog: catalog}} >
                    <Button variant="outline-secondary" size="sm">Back</Button>{' '}
                </Link>
                    
            </Row>
        )
        
        return (
            <Row>
                <Table>
                    <tbody>
                        { info }
                    </tbody>
                </Table>
            </Row>
        )
    }
}