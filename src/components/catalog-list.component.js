import React, {Component} from 'react';
import CatalogService from "../services/catalog.service";
import {Link} from "react-router-dom";

export default class CatalogList extends Component {
    constructor(props) {
        super(props);
        this.getCatalogs = this.getCatalogs.bind(this);
        this.deleteCatalogs = this.deleteCatalog.bind(this);

        this.state = {
            catalogs : [],
        };
    }

    componentDidMount() {
        this.getCatalogs();
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
        try {
            await CatalogService.delete(id);
            this.getCatalogs();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { catalogs } = this.state;
        return (
            <div className="m-3">
                <h3>Catalogs</h3>
                <ol>
                    {catalogs && catalogs.map((catalog) => (
                        <li>
                            <Link className="mr-1" to={"/catalogs/" + catalog._id}>
                                {catalog.name}
                            </Link>
                            (<Link className="ml-1 mr-1" to={"/catalogs/update/" + catalog._id}>
                                Update
                            </Link>|
                            <Link onClick={() => this.deleteCatalog(catalog._id)} className="ml-1 mr-1">
                                Delete
                            </Link>)
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

}