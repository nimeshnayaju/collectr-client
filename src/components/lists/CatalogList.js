import React, { Component } from 'react';
import { Table, Button, Form, Row, InputGroup, Col, FormControl } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';

export default class CatalogList extends Component {

    state = {
        catalogs: [],
        catalogsToShow: [],
        query: ''
    }

    componentDidMount = async() => {
        await this.getCatalogs();
    }

    getCatalogs = async () => {
        try {
            const response = await CatalogService.getAll();
            this.setState({ catalogs: response, catalogsToShow: response });
        } catch (err) {
            console.log(err);
        }
    }


    deleteCatalog = async (id) => {
        let confirmDelete = window.confirm('Do you want to permanently delete this record?');
        if (confirmDelete) {
            try {
                await CatalogService.delete(id);
                this.deleteCatalogFromState(id);
            } catch (err) {
                console.log(err);
            }
        }
    }

    deleteCatalogFromState = (id) => {
        const updatedList = this.state.catalogs.filter(data => data._id !== id);
        this.setState({ catalogs: updatedList, catalogsToShow: updatedList });
    }

    submitSearch = async (e) => {
        e.preventDefault();
        // const query = {name: "Vintage Guitar", description: "Hello"};
        // const results = await CatalogService.search("Vintage Guitar");
        const results = this.state.catalogs.filter((row) => row.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);
        this.setState({ catalogsToShow: results });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    

    render() {
        
        const catalogs = this.state.catalogsToShow && this.state.catalogsToShow.map(catalog => {
            return (
                <tr key={ catalog._id }>
                    <td>
                        <Link to={{pathname: `/catalogs/${catalog._id}`, items: catalog.items }}>
                            {catalog.name}
                        </Link> 
                    </td>
                    
                    <td>
                        <Row className="float-right">

                            <Link to={{pathname: "/catalogs/update", catalog: catalog}} >
                                <Button variant="outline-success" size="sm">Update</Button>
                            </Link>

                            <Button className="ml-2" size="sm" variant="outline-danger" onClick={() => this.deleteCatalog(catalog._id)}>Delete</Button>
                        </Row>
                    </td>
                </tr>
            )
        })

        const searchFilters = this.state.catalogs[0] && Object.keys(this.state.catalogs[0]);
        return (

            <Row>
                {/* Search filter */}         
                
                {/* Search */}
                <Col sm={12}>
                    <Form onSubmit={ this.submitSearch }>
                        <InputGroup className="mb-3">
                            <FormControl name="query" onChange={ this.onChange } placeholder="Search for catalogs"/>
                            <InputGroup.Append>
                                <Button type="submit" variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>

                {/* Catalog List */}
                <Col>
                    <Table>
                        <tbody>
                            { catalogs }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}