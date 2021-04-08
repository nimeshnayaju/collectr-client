import authHeader from "../helpers/auth-header";
import http from "../http-common";

class ItemService {

    getAll = async () => {
        try {
            const response = await http.get("/items", { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
    
    get = async (id) => {
        try {
            const response = await http.get(`/items/${id}`, {headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    getItemFields = async (id) => {
        try {
            const response = await http.get(`/items/fields/${id}`, {headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    update = async (id, data) => {
        try {
            const response = await http.put(`/items/${id}`, data, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    add = async (data) => {
        try {
            const response = await http.post("/items", data, { headers: authHeader() });
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err.response);
            console.log(err);
        }
    }

    delete = async (id) => {
        try {
            const response = await http.delete(`/items/${id}`, { headers: authHeader() });
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new ItemService();
