import React, { Component } from 'react';
import { Table, Button, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';
import ItemService from '../../services/ItemService';

export default class CatalogList extends Component {

    state = {
        items: []
    }

    componentDidMount = async() => {
        if (this.props.match.params.id) {
            const items = await this.getItems(this.props.match.params.id);
            this.setState({ items: items });
        }
    }

    getItems = async(id) => {
        try {
            const catalog = await CatalogService.get(id);
            return catalog.items;
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
        const updatedList = this.state.items.filter(data => data._id !== id);
        this.setState({ items: updatedList });
    }

    render() {
        const items = this.state.items && this.state.items.map(item => {
            return (
                <tr key={ item._id }>
                    <td>{ item.name }</td>
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

        return (
            <Row>
                <h5>All Items</h5>
                <Table>
                    <tbody>
                        { items }
                    </tbody>
                </Table>
            </Row>
        )

    }
}