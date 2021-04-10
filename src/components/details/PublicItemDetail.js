import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import ItemService from '../../services/ItemService';

export default class PublicItemDetail extends Component {

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
        const fields = this.state.otherFields;

        const otherFields = fields && item && fields.length > 0 && fields.map(field => {
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
                            <Card.Text className="mt-3">
                                <p><b>Status:</b> { item.isPrivate ? "Private" : "Public" }</p>
                                <p><b>Date:</b> { item.date }</p>
                                <p><b>Condition:</b> { item.condition }</p>
                                <p><b>Provenance:</b> { item.provenance }</p>
                                <p><b>Description:</b> { item.description }</p>
                            </Card.Text>

                            { otherFields }

                            <Card.Text className="mt-3">
                                <Link to={{pathname: `/catalogs/${catalogID}/public/items`}} >
                                    <Button variant="outline-secondary" size="sm">Go Back</Button>{' '}
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                }
            </Row>
        )
    }
}