import React, { Component } from 'react';
import { Button, Table, Row, Col, Card } from 'react-bootstrap';
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
            this.setState({ name: item.name , manufacturer: item.manufacturer});
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
            <Col sm={12}>
                    <Card border="dark" sm={12}>
                        <Card.Header>{this.state.name && item.name }</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <p>Manufacturer: { this.state.manufacturer && item.manufacturer }</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                    <Link to={{pathname: "/catalogs", item: item}} >
                        <Button variant="outline-secondary" size="sm">Back</Button>{' '}
                    </Link>
                    
                    
                </Col>
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