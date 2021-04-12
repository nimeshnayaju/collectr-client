import http from "../http-common";

class UserService {

    signup = async (data) => {
        try {
            const response = await http.post("/users/signup", data);
            return response.data;
        } catch (err) {
            console.log(err.response);
            return err.response.data;
        }
    }

    login = async (data) => {
        try {
            const response = await http.post("/users/login", data);
            if (response.data.auth && response.data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('AUTH_TOKEN', JSON.stringify(response.data.token));
            }
            return response.data;
        } catch (err) {
            console.log(err.response);
            return err.response.data;
        }
    }

    logout = async () => {
        localStorage.removeItem('AUTH_TOKEN');
    }

    isLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'));
        return !!token; // return true if token found, false otherwise

    }

    forgotPassword = async (data) => {
        try {
            const response = await http.post("users/password/forgot", data);
            return response.data;
        } catch (err) {
            console.log(err);
            return err.response.data;
        }
    }

    resetPassword = async (data) => {
        try {
            const response = await http.post("users/password/reset", data);
            return response.data;
        } catch (err) {
            console.log(err.response);
            return err.response.data;
        }
    }
}

export default new UserService();
