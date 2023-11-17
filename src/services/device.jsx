import axios from "axios";
import { headers } from "./login";

let baseUrl = "https://sensec.dy.fi/devices";

const getById = (deviceId) => {
    try {
        const req = axios.get(`${baseUrl}/${deviceId}`, { headers });
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

const getData = (deviceId) => {
    try {
        const req = axios.get(`${baseUrl}/${deviceId}/data`, {
            headers,
            params: { start_date: "-1h" },
        });
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

const patchName = (deviceId, name) => {
    try {
        const req = axios.patch(
            `${baseUrl}/${deviceId}`,
            { name },
            { headers }
        );
        return req.then((res) => res.data);
    } catch (error) {
        console.log(error);
    }
};

export default { getById, getData, patchName };
