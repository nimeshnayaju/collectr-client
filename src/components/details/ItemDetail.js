import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CatalogService from '../../services/CatalogService';

import ItemService from '../../services/ItemService';

export default class ItemDetail extends Component {

    state = {
        item: null,
        otherFields: [],
        catalogID: null
    }

    componentDidMount = async() => {
        if (this.props.match.params.itemId && this.props.match.params.catalogId) {
            const item = await this.getItem(this.props.match.params.itemId);
            const catalogid = this.props.match.params.catalogId;
            const fields = await ItemService.getItemFields(this.props.match.params.catalogId);
            this.setState({ item: item, otherFields: fields, catalogID: catalogid});
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
        const item = this.state.item;
        const catalogID = this.state.catalogID;
        const otherFields = this.state.otherFields.length > 0 && this.state.otherFields.map(field => {
            return (
                <Card.Text className="mt-3">
                    <b>{ field }</b>: { item[field]  }
                </Card.Text>
            )
        })

        return (
            <Row>
                { item && 
                <Col sm={12}>
                    <Card sm={12}>
                        <Card.Body>
                            <Card.Title>{ item.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"> { item.description }</Card.Subtitle>
                            {/* <Card.Text>
                                <b>Status</b>: { this.state.item.isPrivate ? "Private" : "Public" }
                            </Card.Text> */}

                            <Card.Text className="mt-3">
                                <p>Date: { item.date }</p>
                                <p>Condition: { item.condition }</p>
                                <p>Provenance: { item.provenance }</p>
                                <p>Description: { item.description }</p>
                                <p>catalog: { catalogID }</p>
                            </Card.Text>
                            { otherFields }
                            
                        </Card.Body>
                    </Card>

                    <br />
                    <Link to={{pathname: `/catalogs/${catalogID}`}} >
                        <Button variant="outline-secondary" size="sm">Back</Button>{' '}
                    </Link>
                </Col>
                }
            </Row>
        )
    }
}