import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import ItemService from '../../services/ItemService';

export default class ItemDetail extends Component {

    state = {
        item: null,
        otherFields: []
    }

    componentDidMount = async() => {
        if (this.props.match.params.itemId && this.props.match.params.catalogId) {
            const item = await this.getItem(this.props.match.params.itemId);
            const fields = await ItemService.getItemFields(this.props.match.params.catalogId);
            this.setState({ item: item, otherFields: fields });
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
                            </Card.Text>
                            { otherFields }
                            
                        </Card.Body>
                    </Card>

                    <br />
                    <Link to={{pathname: "/catalogs/:id/public/items", item:item}} >
                        <Button variant="outline-secondary" size="sm">Back</Button>{' '}
                    </Link>
                </Col>
                }
            </Row>
        )
    }
}