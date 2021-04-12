import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button, Form, Image, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';

import ItemService from "../../services/ItemService";

export default class ItemAddUpdate extends Component {
    
    state = {
        catalogId: null,
        item: {},
        itemFields: [],
        submitted: false,
        tempImg: ''
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
    
    getFile = async (file) => {
        try{
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
    
                // read the file when the file is onLoad
                fileReader.onload = () => {
                    resolve(fileReader.result.split(',')[1]); // extract only the content url
                    // console.log(fileReader.result)
                }
            })
        } catch(err){
            console.log(err);
        }
    }

    onChangeEncode = async(e) => {
        const file = e.target.files[0];
        const base64String = await this.getFile(file); // from file to string
        const buffer = Buffer.from(base64String, "base64"); // from string to base64
        // this.setState({ [e.target.name]: buffer }) // update the buffer to databasae

        let item = this.state.item;
        item[e.target.name] = buffer;
        this.setState({ item: item });
    }

    decodeBase64Image = e => {
        try{
            if (e.type === "Buffer") {
                return Buffer.from(e.data).toString('base64');
            } else {
                const base64 = e.toString('base64');
                return base64;
            }

        }catch(err){
            console.log(err)
        }
    }


    render() {
        
        const { item } = this.state;

        if (this.state.submitted) {
            return <Redirect to={{ pathname: `/items/${this.state.catalogId}/${item._id}`}} />
        }
        

        return (
            <Col>
            { item && 
                <Form autocomplete="off" onSubmit={ this.submitForm }>
                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Image</FormLabel>
                        <Col md={4}>
                            { item.picture ? 
                                // <Image fluid rounded className="item-image" src={`data:image/*;base64,${Buffer.from(item.picture.data).toString('base64')}`}/>
                                // : <p>No picture selected</p>
                                <Image fluid rounded src={`data:image/*;base64,${this.decodeBase64Image(this.state.item.picture)}`} />
                            : <p>No image selected</p> }
                        </Col>
                        <Col md={6}>
                            <Form.File className="float-right" type="file" accept="image/*" name="picture" onChange ={ (e) =>{ this.onChangeEncode(e) }}/>
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Name</FormLabel>
                        <Col sm="10">
                            <FormControl required type="text" name="name" onChange={ this.onChange } value={item.name } />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Date</FormLabel>
                        <Col sm="10">
                            <FormControl type="text" name="date" onChange={ this.onChange } value={item.date} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Condition</FormLabel>
                        <Col sm="10">
                            <FormControl type="text" name="condition" onChange={ this.onChange } value={item.condition} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Provenance</FormLabel>
                        <Col sm="10">
                            <FormControl type="text" name="provenance" onChange={ this.onChange } value={item.provenance} />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <FormLabel column sm="2">Description</FormLabel>
                        <Col sm="10">
                            <FormControl type="text" name="description" onChange={ this.onChange } value={item.description } />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row}>
                    <FormLabel column sm="2">Private</FormLabel>
                        <Col sm="10">
                            <FormControl onChange={ this.onChangeSelect } value={ item.isPrivate } as="select">
                                <option data-id="true">true</option>
                                <option data-id="false">false</option>
                            </FormControl>
                        </Col>
                    </FormGroup>

                    { this.state.itemFields && this.state.itemFields.length > 0 && this.state.itemFields.map((field) => {
                        return <FormGroup as={Row}>
                            <FormLabel column sm="2">{ field }</FormLabel>
                            <Col sm="10">
                                <FormControl type="text" name={field} onChange={ this.onChange } value={item[field]} />
                            </Col>
                        </FormGroup>
                    }) }
                    <Button type="submit">Submit</Button>
                </Form>
            }
            </Col>
        )
    }
}