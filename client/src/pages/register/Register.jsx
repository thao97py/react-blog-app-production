import {axiosInstance} from "../../config";
import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userFirstPhoto ="maleAvatar.png";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);

        const res = await axiosInstance.post("/auth/register", {
            username,
            email,
            password,
            profilePic:userFirstPhoto,
        }).then(res => {
            res.data && window.location.replace("/login");
        }).catch(error => {
            setError(true);
            if (error.response) {
                // Request made and server responded
                setErrorMessage(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage(error.message);
            }
        });
    };

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter your username..."
                    required
                    onChange={e => setUsername(e.target.value)} //e is event
                />
                <label>Email</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter your email..."
                    required
                    onChange={e => setEmail(e.target.value)} //e is event
                />
                <label>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Enter your password..."
                    required
                    onChange={e => setPassword(e.target.value)} //e is event
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span className="registerError">{errorMessage}</span>}
        </div>
    )
}
