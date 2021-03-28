import http from "../http-common";

class ItemService {

    getAll = async () => {
        try {
            const response = await http.get("/items");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    get = async (id) => {
        try {
            const response = await http.get(`/items/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    update = async (id, data) => {
        try {
            const response = await http.put(`/items/${id}`, data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    add = async (data) => {
        try {
            const response = await http.post("/items", data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    delete = async (id) => {
        try {
            const response = await http.delete(`/items/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new ItemService();
