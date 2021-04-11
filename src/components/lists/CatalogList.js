import React, { Component } from 'react';
import { Table, Button, Form, Row, InputGroup, Col, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';

export default class CatalogList extends Component {

    state = {
        catalogs: [],
        catalogsToShow: [],
        query: '',
        searchFilter: ''
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

        let searchFilters = [];
        if (this.state.searchFilter === '') {
            searchFilters = this.state.catalogs && this.state.catalogs[0] && Object.keys(this.state.catalogs[0]).filter((key) => key !== "_id" && key !== "__v" && key !== "items" && key !== "user" && key !== "itemFields");
        } else {
            searchFilters.push(this.state.searchFilter);
        }

        let results = [];
        if (this.state.catalogs) {
            for (var i = 0; i < this.state.catalogs.length; i++) {
                let catalog = this.state.catalogs[i];
                for (var j = 0; j < searchFilters.length; j++) {
                    let filter = searchFilters[j];
                    if (catalog[filter].toString().toLowerCase().indexOf(this.state.query.toLowerCase()) > -1) {
                        results.push(catalog);
                        break;
                    }
                }
            }
        }
        this.setState({ catalogsToShow: results });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSelectDropdown = e => {
        if (e.target.innerHTML.trim().toLowerCase() === 'clear filter') {
            this.setState({ searchFilter: '' });
        } else {
            this.setState({ searchFilter: e.target.innerHTML });
        }
    }
    

    render() {
        
        const catalogs = this.state.catalogsToShow && this.state.catalogsToShow.map(catalog => {
            return (
                <tr key={ catalog._id }>
                    <td>
                        <Link to={{pathname: `/catalogs/${catalog._id}`}}>
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

        const searchFilters = this.state.catalogs && this.state.catalogs[0] && Object.keys(this.state.catalogs[0]).filter((key) => key !== "_id" && key !== "__v" && key !== "items" && key !== "user" && key !== "itemFields");
        
        return (

            <Row>                  
                {/* Search */}
                <Col sm={12}>
                    <Form onSubmit={ this.submitSearch }>
                        <InputGroup className="mb-3 search-inputgroup">

                            {/* Search filter dropdown */}
                            <DropdownButton as={InputGroup.Prepend} variant="outline-info" title= { this.state.searchFilter !== '' ? this.state.searchFilter : "Search filter" } >
                                { searchFilters && searchFilters.map((filter) => {
                                    return <Dropdown.Item onClick={ this.onSelectDropdown }>{ filter }</Dropdown.Item>
                                }) }
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={ this.onSelectDropdown }> Clear Filter </Dropdown.Item>
                            </DropdownButton>

                            {/* Input area */}
                            <FormControl autocomplete="off" name="query" onChange={ this.onChange } placeholder="Search for catalogs"/>

                            {/* Search button */}
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