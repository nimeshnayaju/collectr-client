import React, { Component } from 'react';
import { Table, Button, Row } from 'react-bootstrap';

import ItemService from '../../services/ItemService';
import CatalogService from '../../services/CatalogService';

import ModalForm from '../modals/Modal';

export default class CatalogList extends Component {

    state = {
        catalogId: null,
        catalog: null,
        items: []
    }

    componentDidMount = async() => {
        await this.setState({ catalogId: this.props.match.params.id });
        await this.getItems();
    }

    getItems = async () => {
        try {
            const response = await this.getCatalog(this.state.catalogId);
            this.setState({ items: response.items });
        } catch (err) {
            console.log(err);
        }
    }

    getCatalog = async(id) => {
        try {
            const response = await CatalogService.get(id);
            await this.setState({ catalog: response });
            return response;
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

    updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data._id === item._id)
        const updatedList = [
          ...this.state.items.slice(0, itemIndex), item, ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: updatedList })
    }

    render() {

        const items = this.state.items && this.state.items.map(item => {
            return (
                <tr key={ item._id }>
                    <td>{ item.name }</td>
                    <td>
                        <Row className="float-right">
                            <ModalForm label="Update" updateState={this.updateState} modalTitle="Update Item"  isCatalog={ false } item = { item } catalogId={ this.state.catalogId } />
                            <Button className="ml-4" size="sm" variant="outline-danger" onClick={() => this.deleteItem(item._id)}>Delete</Button>
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