import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Button, Form, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';

import ItemService from "../../services/ItemService";
import CatalogService from "../../services/CatalogService";

export default class ItemAddUpdate extends Component {
    state = {
        id: null,
        name: "",
        manufacturer: "",
        catalogName: null,
        catalogId: null,
        catalogs: [],
        submitted: false
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeCatalog = async(e) => {
        const selectedIndex = e.target.options.selectedIndex;
        this.setState({
            catalogId: e.target.options[selectedIndex].getAttribute('data-id'),
            catalogName: e.target.value
        });
    }

    submitForm = async(e) => {
        e.preventDefault();
        let item;
        if (this.props.location.item) {
            item = await this.submitUpdate()
        } else {
            item = await this.submitAdd();
        }
        await this.setState({ id: item._id, submitted: true });
    }

    submitAdd = async(e) => {
        let data = { name: this.state.name, manufacturer: this.state.manufacturer, catalog: this.state.catalogId };
        return await this.addItem(data);
    }

    submitUpdate = async(e) => {
        let data = { name: this.state.name, manufacturer: this.state.manufacturer, catalog: this.state.catalogId };
        return await this.updateItem(this.state.id, data);
    }

    addItem = async(data) => {
        try {
            return await ItemService.add(data);
        } catch (err) {
            console.log(err);
        }
    }

    updateItem = async(id, data) => {
        try {
            return await ItemService.update(id, data);
        } catch (err) {
            console.log(err);
        }
    }

    getCatalogs = async () => {
        try {
            const response = await CatalogService.getAll();
            this.setState({ catalogs: response });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = async() => {
        await this.getCatalogs();
        // If Item exists, populate the state with the Item object received from props
        if (this.props.location.item) {
            const { _id, name, manufacturer } = this.props.location.item;
            // const { catalogId } = this.props;
            // const catalogName = this.state.catalogs.find(data => data._id === catalogId)?.name;

            await this.setState({ id: _id, name, manufacturer });
        }
    }

    render() {
        if (this.state.submitted) {
            return <Redirect to={{ pathname: `/items/${this.state.id}`}} />
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
                    <FormLabel column sm="2">Manufacturer</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="manufacturer" onChange={ this.onChange } value={this.state.manufacturer} />
                    </Col>
                </FormGroup>

                { !this.props.location.item ? 
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Catalog</FormLabel>
                    <Col sm="10">
                        <FormControl onChange={ this.onChangeCatalog } value={ this.state.catalogName } as="select">
                            <option selected>Select a catalog</option>
                            { this.state.catalogs && this.state.catalogs.map((catalog) => {
                            return <option data-id={ catalog._id }>{ catalog.name }</option> 
                            }) }
                        </FormControl>
                    </Col>
                </FormGroup> : null }
                
                <Button type="submit">Submit</Button>

            </Form>
        )
    }
}