import axios from "axios";
require('dotenv').config();

export default axios.create({
    baseURL: process.env.PORT,
    headers: {
        "Content-type": "application/json"
    }
});