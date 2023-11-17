import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Rooms from "./components/Rooms";
import Room from "./components/Room";
import Device from "./components/Device";

import loginService from "./services/login";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUser(user);
            loginService.setToken(user.access_token);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const user = await loginService.login(credentials);
            console.log(user);
            window.localStorage.setItem("loggedInUser", JSON.stringify(user));
            setUser(user);
            loginService.setToken(user.access_token);
        } catch (exception) {
            console.error(exception);
        }
    };

    const PrivateRoute = () => {
        return user ? <Outlet user={user} /> : <Navigate to="/login" />;
    };

    const PublicRoute = () => {
        return !user ? <Outlet /> : <Navigate to="/" />;
    };

    return (
        <>
            <Navigation user={user} />
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="" element={<Rooms />} />
                    <Route path="rooms/:id" element={<Room />} />
                    <Route path="devices/:id" element={<Device />} />
                </Route>
                <Route path="/" element={<PublicRoute />}>
                    <Route path="login" element={<Login login={login} />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
