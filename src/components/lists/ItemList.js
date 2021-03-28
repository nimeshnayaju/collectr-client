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
            this.setState({ catalog: catalog, itemsToShow: catalog.items  });
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
        // default search filter = "name"
        let filter = "name";
        filter = this.state.searchFilter !== '' ? this.state.searchFilter.toLowerCase() : filter;
        console.log(filter);
        const results = this.state.items && this.state.items.filter((item) => item[filter].toLowerCase().indexOf(this.state.query.toLowerCase()) > -1);

        this.setState({ itemsToShow: results });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectDropdown = e => {
        if (e.target.innerText.toLowerCase() === 'clear filter') {
            this.setState({ searchFilter: '' });
        } else {
            this.setState({ searchFilter: e.target.innerText });
        }
    }

    render() {
        const items = this.state.itemsToShow && this.state.itemsToShow.map(item => {
            return (
                <tr key={ item._id }>
                    <td>
                        <Link to={{pathname: `/items/${item._id}`, item: item }}>
                            {item.name}
                        </Link>
                    </td>
                    <td>
                        <Row className="float-right">

                            <Link to={{pathname: "/items/update", item: item}} >
                                <Button variant="outline-success" size="sm">Update</Button>
                            </Link>

                            <Button className="ml-2" size="sm" variant="outline-danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
                        </Row>
                    </td>
                </tr>
            )
        })

        const searchFilters = this.state.catalog && this.state.catalog.items && this.state.catalog.items[0] && Object.keys(this.state.catalog.items[0]).filter((key) => key !== "_id" && key !== "__v" && key !== "items");

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
                <Col sm={12}>
                    <Card border="dark" sm={12}>
                        <Card.Header>{this.state.catalog && this.state.catalog.name.toUpperCase() }</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {this.state.catalog && this.state.catalog.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>


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