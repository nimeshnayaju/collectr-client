import React, { Component } from 'react';
import { Table, Button, Form, Row, InputGroup, Col, FormControl, Dropdown, DropdownButton, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';
import ItemService from '../../services/ItemService';

export default class CatalogList extends Component {

    state = {
        itemsToShow: [],
        query: '',
        searchFilter: '',
        catalog: null
    }

    componentDidMount = async() => {
        if (this.props.match.params.id) {
            const catalog = await this.getCatalog(this.props.match.params.id);
            if (catalog) {
                this.setState({ catalog: catalog, itemsToShow: catalog.items  });
            }
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

    deleteItem = async (id) => {
        let confirmDelete = window.confirm('Do you want to permanently delete this record?');
        if (confirmDelete) {
            try {
                await ItemService.delete(id);
                this.deleteItemFromState(id);
            } catch (err) {
                console.log(err);
            }
        }
    }

    deleteItemFromState = (id) => {
        const updatedList = this.state.catalog.items.filter(data => data._id !== id);
        let newCatalog = this.state.catalog;
        newCatalog.items = updatedList;
        this.setState({ catalog: newCatalog, itemsToShow: updatedList });
    }

    submitSearch = async (e) => {
        e.preventDefault();

        let searchFilters = [];
        if (this.state.searchFilter === '') {
            searchFilters = this.state.catalog && this.state.catalog.items && this.state.catalog.items[0] && Object.keys(this.state.catalog.items[0]).filter((key) => key !== "_id" && key !== "__v" && key !== "catalog" && key !== "user" && key !== "picture");
        } else {
            searchFilters.push(this.state.searchFilter);
        }

        let results = [];
        if (this.state.catalog && this.state.catalog.items) {
            for (var i = 0; i < this.state.catalog.items.length; i++) {
                let catalog = this.state.catalog.items[i];
                for (var j = 0; j < searchFilters.length; j++) {
                    let filter = searchFilters[j];
                    if (catalog[filter].toString().toLowerCase().indexOf(this.state.query.toLowerCase()) > -1) {
                        results.push(catalog);
                        break;
                    }
                }
            }
        }
    
        this.setState({ itemsToShow: results });
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
        const items = this.state.itemsToShow && this.state.itemsToShow.map(item => {
            return (
                <tr key={ item._id }>
                    <td>
                        <Link to={{pathname: `/items/${this.state.catalog._id}/${item._id}` }}>
                            {item.name}
                        </Link> 
                    </td>
                    <td>
                        <Row className="float-right">

                            <Link to={{pathname: `/items/update/${this.state.catalog._id}/${item._id}` }} >
                                <Button variant="outline-success" size="sm">Update</Button>
                            </Link>

                            <Button className="ml-2" size="sm" variant="outline-danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
                        </Row>
                    </td>
                </tr>
            )
        })

        const searchFilters = this.state.catalog && this.state.catalog.items && this.state.catalog.items[0] && Object.keys(this.state.catalog.items[0]).filter((key) => key !== "_id" && key !== "__v" && key !== "catalog" && key !== "user" && key !== "picture");
        const { catalog } = this.state;
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
                            <FormControl autocomplete="off" name="query" onChange={ this.onChange } placeholder="Search for items"/>

                            {/* Search button */}
                            <InputGroup.Append>
                                <Button type="submit" variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Col>

                {/* Catalog */}
                {catalog && <Col sm={12}>
                    <Card sm={12}>
                        <Card.Body>
                            <Card.Title>{catalog.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> { catalog.description }</Card.Subtitle>
                            <Card.Text>
                                <b>Status</b>: { catalog.isPrivate ? "Private" : "Public" }
                            </Card.Text>
                            
                            <Card.Text className="mt-3">
                                <Link className="mr-2" to={{pathname: `/items/add/${this.state.catalog._id}` }} >
                                    <Button variant="outline-primary" size="sm">Add New Item</Button>
                                </Link>
                                
                                <Link to={{pathname: "/catalogs/update", catalog: this.state.catalog}} >
                                    <Button variant="outline-success" size="sm">Update Catalog</Button>
                                </Link>
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                    <br />
                </Col>}

                
                {/* Item List */}
                <Col>
                    <Table>
                        <tbody>
                            { items }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )

    }
}