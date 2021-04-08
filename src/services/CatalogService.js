import http from "../http-common";
import authHeader from "../helpers/auth-header";

class CatalogService {

    getAll = async () => {
        try {
            const response = await http.get("/catalogs", { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    getAllPublic = async () => {
        try {
            const response = await http.get("/catalogs/public", { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    getCatalogWithPublicItems = async (id) => {
        try {
            const response = await http.get(`/catalogs/public/${id}`, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }


    get = async (id) => {
        try {
            const response = await http.get(`/catalogs/${id}`, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    update = async (id, data) => {
        try {
            const response = await http.put(`/catalogs/${id}`, data, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    add = async (data) => {
        try {
            const response = await http.post("/catalogs", data, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    delete = async (id) => {
        try {
            const response = await http.delete(`/catalogs/${id}`, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new CatalogService();
