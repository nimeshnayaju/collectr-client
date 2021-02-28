import React, {Component} from 'react';
import CatalogService from "../services/catalog.service";
import {Link} from "react-router-dom";

export default class CatalogDetail extends Component {
    constructor(props) {
        super(props);
        this.getCatalog = this.getCatalog.bind(this);
        this.state  = {
            catalog: {
                name: null,
                description: null,
                items: []
            }
        }
    }

    componentDidMount() {
        this.getCatalog(this.props.match.params.id);
    }

    getCatalog = async (id) => {
        try {
            const response = await CatalogService.get(id);
            this.setState({ catalog: response });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { catalog } = this.state;
        return (
            <div>
                <h3>{catalog.name} </h3>
                <p>{catalog.description} </p>
                <ol>
                    {catalog.items && catalog.items.map((item) => (
                        <li>
                            <Link to={"/items/" + item._id}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }

}