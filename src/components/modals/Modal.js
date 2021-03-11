import React, {Component} from 'react';
import { Row, Button, Modal, ModalBody } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import CatalogAddEditForm from '../forms/CatalogAddUpdate';
import ItemAddEditForm from '../forms/ItemAddUpdate';

export default class ModalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {

        const label = this.props.label;
        const title = this.props.modalTitle;

        let button = '';

        if (label === 'Update') {
            button = <Button size="sm" variant="outline-warning" onClick={ this.toggle }>
                        { label }
                    </Button>

        } else if (label === 'Add') {
            button = <Link size="sm" onClick={ this.toggle }>
                        { title }
                    </Link>
        }

        return (
            <Row>
                { button }
                <Modal show={ this.state.modal } onHide={ this.toggle }>

                    <Modal.Header closeButton>
                        <Modal.Title>{ title }</Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                        { this.props.isCatalog ? (
                            <CatalogAddEditForm onClick={this.toggle} catalog= { this.props.catalog } updateState={this.props.updateState} />
                        ) : (
                            <ItemAddEditForm onClick={this.toggle} item={ this.props.item } catalogId={ this.props.catalogId } updateState={this.props.updateState}/>
                        )}
                    </ModalBody>

                </Modal>
            </Row>
        )
    }
}