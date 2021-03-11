import React, {Component} from 'react';
import { Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

import CatalogService from "../../services/CatalogService";

// export default class CatalogAddUpdate extends Component {
//     constructor(props) {
//         super(props);
//         this.addCatalog = this.addCatalog.bind(this);
//         this.onChangeName = this.onChangeName.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
        
//         this.state = {
//             name: null,
//             description: "",
//             submitted: false,
//             id: null,
//             isAddMode: true
//         };
//     }

//     componentDidMount = async() => {
//         if (this.props.match.params.id) {
//             this.getCatalog(this.props.match.params.id);
//         }
//     }

//     getCatalog = async(id) => {
//         try {
//             const response = await CatalogService.get(id);
//             this.setState({ name: response.name, description: response.description, id: id, isAddMode: !id });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     addCatalog = async(data) => {
//         try {
//             await CatalogService.add(data);
//             this.setState({ submitted: true });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     updateCatalog = async(id, data) => {
//         try {
//             await CatalogService.update(id, data);
//             this.setState({ submitted: true });
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     onChangeName(e) {
//         this.setState({
//             name: e.target.value
//         });
//     }

//     onChangeDescription(e) {
//         this.setState({
//             description: e.target.value
//         });
//     }

//     addUpdateCatalog = async() => {
//         let data = { name: this.state.name, description: this.state.description };
//         return this.state.isAddMode ? this.addCatalog(data) : this.updateCatalog(this.state.id, data);
//     }

//     render() {
//         const { name, description } = this.state;
//         return (
//             <div className="submit-form">
//                 {this.state.submitted ? (
//                     <div>
//                         <h4>You submitted successfully!</h4>
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="form-group row">
//                             <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control col-sm-10"
//                                 id="name"
//                                 required
//                                 value={name}
//                                 onChange={this.onChangeName}
//                                 name="name"
//                             />
//                         </div>

//                         <div className="form-group row">
//                             <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
//                             <input
//                                 type="text"
//                                 className="form-control col-sm-10"
//                                 id="description"
//                                 required
//                                 value={description}
//                                 onChange={this.onChangeDescription}
//                                 name="description"
//                             />
//                         </div>
//                         <button onClick={this.addUpdateCatalog} className="btn btn-outline-secondary btn-sm">
//                             Submit
//                         </button>
//                     </div>
//                 )}
//             </div>
//         );
//     }
// }

export default class CatalogAddUpdate extends Component {
    state = {
        id: null,
        name: "",
        description: "",
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitAdd = async(e) => {
        e.preventDefault();
        let data = { name: this.state.name, description: this.state.description };
        console.log(data);
        await this.addCatalog(data);
        this.props.onClick();
    }

    submitUpdate = async(e) => {
        e.preventDefault();
        let data = { name: this.state.name, description: this.state.description };
        const updatedCatalog = await this.updateCatalog(this.state.id, data);
        this.props.updateState(updatedCatalog);
        this.props.onClick();
    }

    addCatalog = async(data) => {
        try {
            await CatalogService.add(data);
        } catch (err) {
            console.log(err);
        }
    }

    updateCatalog = async(id, data) => {
        try {
            return await CatalogService.update(id, data);
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = async() => {
        // If Catalog exists, populate the state with the Catalog object received from props
        if (this.props.catalog) {
            const { name, description } = this.props.catalog;
            this.setState({ id: this.props.catalog._id, name, description });
        }
    }

    render() {
        return (
            <Form onSubmit={ this.props.catalog ? this.submitUpdate : this.submitAdd }>

                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl type="text" name="name" onChange={ this.onChange } value={this.state.name} />
                </FormGroup>

                <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormControl type="text" name="description" onChange={ this.onChange } value={this.state.description} />
                </FormGroup>

                <Button type="submit">Submit</Button>

            </Form>
        )
    }
}