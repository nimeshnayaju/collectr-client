import React, {Component} from 'react';
import CatalogService from "../services/catalog.service";

export default class CatalogList extends Component {
    constructor(props) {
        super(props);
        this.getCatalogs = this.getCatalogs.bind(this);
        // this.setActiveCatalog = this.setActiveCatalog.bind(this);
        // this.refreshList = this.refreshList.bind(this);

        this.state = {
            catalogs : [],
            // currentCatalog: null,
            // currentIndex: -1,
        };
    }

    componentDidMount() {
        this.getCatalogs();
    }

    getCatalogs = async () => {
        try {
            console.log("getCatalogs()");
            const response = await CatalogService.getAll();
            this.setState({ catalogs: response });
        } catch (err) {
            console.log(err);
        }
    }

    // refreshList() {
    //     this.getCatalogs();
    //     this.setState({
    //         currentCatalog: null,
    //         currentIndex: -1
    //     });
    // }
    //
    // setActiveCatalog(catalog, index) {
    //     this.setState({
    //         currentCatalog: catalog,
    //         currentIndex: index
    //     });
    // }

    // render() {
    //     const { catalogs, currentCatalog, currentIndex } = this.state;
    //     return (
    //         <div className="list row">
    //             <div className="col-md-2">
    //                 <h4>Catalogs List</h4>
    //
    //                 <ul className="list-group">
    //                     {catalogs && catalogs.map((catalog, index) => (
    //                         <li
    //                             className={
    //                                 "list-group-item " +
    //                                 (index === currentIndex ? "active" : "")
    //                             }
    //                             onClick={() => this.setActiveCatalog(catalog, index)}
    //                             key={index}
    //                         >
    //                             {catalog.name}
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //
    //             <div className="col-md-10">
    //                 {currentCatalog ? (
    //                     <div>
    //                         <h4>Catalog</h4>
    //                         <div>
    //                             <label>
    //                                 <strong>Title:</strong>
    //                             </label>{" "}
    //                             {currentCatalog.name}
    //                         </div>
    //                         <div>
    //                             <label>
    //                                 <strong>Description:</strong>
    //                             </label>{" "}
    //                             {currentCatalog.description}
    //                         </div>
    //
    //                         <Link
    //                             to={"/catalogs/" + currentCatalog.id}
    //                             className="badge badge-warning"
    //                         >
    //                             Edit
    //                         </Link>
    //                     </div>
    //                 ) : (
    //                     <div>
    //                         <br />
    //                         <p>Please click on a Catalog...</p>
    //                     </div>
    //                 )}
    //             </div>
    //         </div>
    //     );
    // }

    render() {
        const { catalogs } = this.state;
        return (
            <div className="m-3">
                <h3>Catalogs</h3>
                <ul>
                    {catalogs && catalogs.map((catalog) => (
                        <li>
                            {catalog.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

}