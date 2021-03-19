import React, { Component } from 'react';
import { Button, Table, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import ItemService from '../../services/ItemService';

export default class ItemDetail extends Component {

    state = {
        name:'',
        manufacturer:''
    }

    componentDidMount = async() => {
        if (this.props.match.params.id) {
            const item = await this.getItem(this.props.match.params.id);
            this.setState({ name: item.name , manufacturer:item.manufacturer});
        }
    }

    getItem = async(id) => {
        try {
            const item = await ItemService.get(id);
            return item;
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const item = this.state;
        const info = (
            <Row>
                <h5>{ item.name.toUpperCase() }</h5>
                <hr />
                <Table>
                    <p>Manufacturer: { item.manufacturer }</p>
                    <p>Description: { 'description' }</p>
                </Table>
                
                <Link to={{pathname: "/catalogs", item: item}} >
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