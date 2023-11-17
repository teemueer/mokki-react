import axios from "axios";

let baseUrl = "https://sensec.dy.fi";

export let headers = {};

const setToken = (token) => (headers.Authorization = `Bearer ${token}`);

const login = async (credentials) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, credentials);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const logout = () => {
    headers = {};
};

export default { login, logout, setToken };
