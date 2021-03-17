import React, { Component } from 'react';
import { Table, Button, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";

import CatalogService from '../../services/CatalogService';

export default class CatalogList extends Component {

    state = {
        catalogs: []
    }

    componentDidMount = async() => {
        await this.getCatalogs();
    }

    getCatalogs = async () => {
        try {
            const response = await CatalogService.getAll();
            this.setState({ catalogs: response });
        } catch (err) {
            console.log(err);
        }
    }


    deleteCatalog = async (id) => {
        let confirmDelete = window.confirm('Do you want to permanently delete this record?');
        if (confirmDelete) {
            try {
                await CatalogService.delete(id);
                this.deleteCatalogFromState(id);
            } catch (err) {
                console.log(err);
            }
        }
    }

    deleteCatalogFromState = (id) => {
        const updatedList = this.state.catalogs.filter(data => data._id !== id);
        this.setState({ catalogs: updatedList });
    }

    updateState = (catalog) => {
        const catalogIndex = this.state.catalogs.findIndex(data => data._id === catalog._id)
        const updatedList = [
          ...this.state.catalogs.slice(0, catalogIndex), catalog, ...this.state.catalogs.slice(catalogIndex + 1)
        ]
        this.setState({ catalogs: updatedList })
    }
    

    render() {
        const catalogs = this.state.catalogs && this.state.catalogs.map(catalog => {
            return (
                <tr key={ catalog._id }>
                    <td>
                        <Link to={{pathname: `/catalogs/${catalog._id}`, items: catalog.items }}>
                            {catalog.name}
                        </Link> 
                    </td>
                    
                    <td>
                        <Row className="float-right">

                            <Link to={{pathname: "/catalogs/update", catalog: catalog}} >
                                <Button variant="outline-success" size="sm">Update</Button>
                            </Link>

                            <Button className="ml-2" size="sm" variant="outline-danger" onClick={() => this.deleteCatalog(catalog._id)}>Delete</Button>
                        </Row>
                    </td>
                </tr>
            )
        })

        return (
            <Row>
                <h5>All Catalogs</h5>
                <Table>
                    <tbody>
                        { catalogs }
                    </tbody>
                </Table>
            </Row>
        )

    }
}