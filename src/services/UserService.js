import http from "../http-common";

class UserService {

    setToken = async (token) => {
        localStorage.setItem('token', JSON.stringify(token));
    }

    getToken = async () => {
        return JSON.parse(localStorage.getItem('token'))?.token;
    }

    signUp = async (data) => {
        try {
            const response = await http.post("/signup", data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    logIn = async (data) => {
        try {
            const response = await http.post("/login", data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new UserService();
