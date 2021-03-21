import http from "../http-common";

class UserService {
    signUp = async (data) => {
        try {
            const response = await http.post("/signup");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    logIn = async (data) => {
        try {
            const response = await http.post("/login");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new UserService();