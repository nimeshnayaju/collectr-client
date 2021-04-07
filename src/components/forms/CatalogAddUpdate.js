import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';

import CatalogService from "../../services/CatalogService";

export default class CatalogAddUpdate extends Component {
    state = {
        id: null,
        name: "",
        description: "",
        isPrivate: true,
        itemFields: "",
        submitted: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeSelect = e => {
        const selectedIndex = e.target.options.selectedIndex;
        const isPrivate = e.target.options[selectedIndex].getAttribute('data-id') === "true" ? true : false;
        this.setState({ isPrivate: isPrivate });
    }

    submitForm = async(e) => {
        e.preventDefault();
        let itemFields = this.state.itemFields.split(",");
        let data = { name: this.state.name, description: this.state.description, isPrivate: this.state.isPrivate, itemFields: itemFields };
        let catalog;
        if (this.props.location.catalog) {
            catalog = await this.submitUpdate(data);
        } else {
            catalog = await this.submitAdd(data);
        }
        if (catalog) {
            await this.setState({ id: catalog._id, submitted: true });
        }
    }

    submitAdd = async(data) => {
        return await this.addCatalog(data);
    }

    submitUpdate = async(data) => {
        return await this.updateCatalog(this.state.id, data);
    }

    addCatalog = async(data) => {
        try {
            return await CatalogService.add(data);
        } catch (err) {
            console.log(err);
        }
    }

    updateCatalog = async(id, data) => {
        try {
            return await CatalogService.update(id, data);
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = async() => {
        // If Catalog exists, populate the state with the Catalog object received from props
        if (this.props.location.catalog) {
            const { _id, name, description, isPrivate, itemFields } = this.props.location.catalog;
            await this.setState({ id: _id, name, description, isPrivate, itemFields });
        }
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to={{ pathname: `/catalogs/${this.state.id}`}} />
        }

        return (
            <Form autocomplete="off" onSubmit={ this.submitForm }>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Name</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="name" onChange={ this.onChange } value={this.state.name} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Description</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="description" onChange={ this.onChange } value={this.state.description} />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                <FormLabel column sm="2">Private</FormLabel>
                    <Col sm="10">
                        <FormControl onChange={ this.onChangeSelect } value={ this.state.isPrivate } as="select">
                            <option data-id="true">true</option>
                            <option data-id="false">false</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Item fields</FormLabel>
                    <Col sm="10">
                        <FormControl placeholder="Use comma to separate the fields" type="text" name="itemFields" onChange={ this.onChange } value={ this.state.itemFields } />
                        <Form.Text muted>
                            All catalog items have the basic fields: name, description, isPrivate. The above entered fields will be inherited by all items inside of this catalog.
                        </Form.Text>
                    </Col>
                    
                </FormGroup>

                <Button type="submit">Submit</Button>

            </Form>
        )
    }
}