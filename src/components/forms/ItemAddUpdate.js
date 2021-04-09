import React, {Component, useState} from 'react';
import { Redirect } from 'react-router';
import { Button, Form, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';

import ItemService from "../../services/ItemService";

export default class ItemAddUpdate extends Component {
    
    state = {
        catalogId: null,
        item: {},
        itemFields: [],
        submitted: false,
        originImg: null
    }

    onChange = e => {
        let item = this.state.item;
        item[e.target.name] = e.target.value;
        this.setState({ item: item });
    }

    onChangeSelect = e => {
        const selectedIndex = e.target.options.selectedIndex;
        const isPrivate = e.target.options[selectedIndex].getAttribute('data-id') === "true" ? true : false;
        let item = this.state.item;
        item["isPrivate"] = isPrivate;
        this.setState({ item: item });
    }


    submitForm = async(e) => {
        e.preventDefault();
        let item = this.state.item;
        if (this.props.match.params.itemId) {
            item = await this.submitUpdate(item);
        } else {
            item["catalog"] = this.state.catalogId;
            item = await this.submitAdd(item);
        }
        if (item) {
            await this.setState({ item: item, submitted: true });
        }
    }

    submitAdd = async(item) => {
        return await this.addItem(item);
    }

    submitUpdate = async(item) => {
        return await this.updateItem(item._id, item);
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

    getItem = async (id) => {
        try {
            const item = await ItemService.get(id);
            return item;
        } catch (err) {
            console.log(err);
        }
    }

    getItemFields = async (id) => {
        try {
            const fields = await ItemService.getItemFields(id);
            return fields;
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = async() => {
        if (this.props.match.params.catalogId) {
            const itemFields = await this.getItemFields(this.props.match.params.catalogId);
            const item = {isPrivate: true};
            await this.setState({ catalogId: this.props.match.params.catalogId, itemFields, item });
        }
        if (this.props.match.params.itemId) {
            const item = await this.getItem(this.props.match.params.itemId);
            await this.setState({ item });
        }
    }

    render() {
        const convert64 = async (file) =>{
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
    
                // read the file when the file is onLoad
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
    
                fileReader.onerror = ((error)=>{
                    reject(error);
                });
            });
        }
    
        const uploadImg = async (e) => {
            const file = e.target.files[0];
            const base64File = await convert64(file);
            await this.setState({originImg: base64File})
        }

        if (this.state.submitted) {
            return <Redirect to={{ pathname: `/items/${this.state.catalogId}/${this.state.item._id}`}} />
        }
        
        return (
            
            <Form autocomplete="off" onSubmit={ this.submitForm }>
                
                <FormGroup as={Row}>
                    <FormLabel column sm="2">Image</FormLabel>
                    <Col sm="10">
                        <FormControl required type="file" name="image" onChange ={ (e) =>{ uploadImg(e) }} value = {this.state.item.picture}/>
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Name</FormLabel>
                    <Col sm="10">
                        <FormControl required type="text" name="name" onChange={ this.onChange } value={this.state.item.name } />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                    <FormLabel column sm="2">Description</FormLabel>
                    <Col sm="10">
                        <FormControl type="text" name="description" onChange={ this.onChange } value={this.state.item.description } />
                    </Col>
                </FormGroup>

                <FormGroup as={Row}>
                <FormLabel column sm="2">Private</FormLabel>
                    <Col sm="10">
                        <FormControl onChange={ this.onChangeSelect } value={ this.state.item.isPrivate } as="select">
                            <option data-id="true">true</option>
                            <option data-id="false">false</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                { this.state.itemFields.length > 0 && this.state.itemFields.map((field) => {
                    return <FormGroup as={Row}>
                        <FormLabel column sm="2">{ field }</FormLabel>
                        <Col sm="10">
                            <FormControl type="text" name={field} onChange={ this.onChange } value={this.state.item[field]} />
                        </Col>
                    </FormGroup>
                }) }
                <Button type="submit">Submit</Button>

            </Form>
        )
    }
}