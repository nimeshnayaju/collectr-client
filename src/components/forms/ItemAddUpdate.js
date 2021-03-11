import React, {Component} from 'react';
import { Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

import ItemService from "../../services/ItemService";
import CatalogService from "../../services/CatalogService";

export default class ItemAddUpdate extends Component {
    state = {
        id: null,
        name: "",
        manufacturer: "",
        catalogName: null,
        catalogId: null,
        catalogs: []
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

    submitAdd = async(e) => {
        e.preventDefault();
        let data = { name: this.state.name, manufacturer: this.state.manufacturer, catalog: this.state.catalogId };
        await this.addItem(data);
        this.props.onClick();
    }

    submitUpdate = async(e) => {
        e.preventDefault();
        let data = { name: this.state.name, manufacturer: this.state.manufacturer, catalog: this.state.catalogId };
        const updatedItem = await this.updateItem(this.state.id, data);
        this.props.updateState(updatedItem);
        this.props.onClick();
    }

    addItem = async(data) => {
        try {
            await ItemService.add(data);
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
        if (this.props.item) {
            const { name, manufacturer } = this.props.item;
            const { catalogId } = this.props;
            
            const catalogName = this.state.catalogs.find(data => data._id === catalogId).name;

            await this.setState({ id: this.props.item._id, name, manufacturer, catalogId, catalogName });
        }
    }

    render() {

        return (
            <Form onSubmit={ this.props.item ? this.submitUpdate : this.submitAdd }>

                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text" name="name" onChange={ this.onChange } value={this.state.name} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl type="text" name="manufacturer" onChange={ this.onChange } value={this.state.manufacturer} />
                </FormGroup>

                { !this.props.item ? 
                <FormGroup>
                    <FormLabel>Catalog</FormLabel>
                    <FormControl onChange={ this.onChangeCatalog } value={ this.state.catalogName } as="select">
                        <option selected>Select a catalog</option>
                        { this.state.catalogs.map((catalog) => {
                        return <option data-id={ catalog._id }>{ catalog.name }</option> 
                        }) }
                    </FormControl>
                </FormGroup> : null }
                
                <Button type="submit">Submit</Button>

            </Form>
        )
    }   
}