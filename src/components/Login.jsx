import { useState } from "react";

const Login = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ username, password });
        setUsername("");
        setPassword("");
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        autoComplete="off"
                        type="password"
                    />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
