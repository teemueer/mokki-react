import axios from "axios";
import { headers } from "./login";

let baseUrl = "https://sensec.dy.fi/rooms";

const get = async () => {
    try {
        const res = await axios.get(baseUrl, { headers });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const getById = (roomId) => {
    try {
        const req = axios.get(`${baseUrl}/${roomId}`, { headers });
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

const getDevices = (roomId) => {
    try {
        const req = axios.get(`${baseUrl}/${roomId}/devices`, { headers });
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

const patchName = (roomId, name) => {
    try {
        const req = axios.patch(`${baseUrl}/${roomId}`, { name }, { headers });
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

export default { get, getById, getDevices, patchName };
