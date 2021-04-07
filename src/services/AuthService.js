import http from "../http-common";

class UserService {

    signup = async (data) => {
        try {
            const response = await http.post("/users/signup", data);
            return response.data;
        } catch (err) {
            console.log(err);
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
            console.log(err);
        }
    }

    logout = async (data) => {
        localStorage.removeItem('AUTH_TOKEN');
    }

    isLoggedIn = () => {
        const token = JSON.parse(localStorage.getItem('AUTH_TOKEN'));
        if (token) {
            return true;
        }
        return false;
    }
}

export default new UserService();
