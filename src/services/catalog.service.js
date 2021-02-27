import axios from 'axios';

class CatalogService {
     getAll = async () => {
        try {
            const response = await axios.get('http://localhost:8000/catalogs');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new CatalogService();
