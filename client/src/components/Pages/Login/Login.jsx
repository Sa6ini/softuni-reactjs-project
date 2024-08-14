import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [action, setAction] = useState("Login");
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = action === "Register" ? "http://localhost:3000/api/register" : "http://localhost:3000/api/login";
        const data = action === "Register"
            ? { fname, email, username: uname, password: pass }
            : { username: uname, password: pass };

        try {
            const response = await axios.post(url, data, { withCredentials: true });
            setMessage(response.data.message);
            if (action === "Login") {
                navigate('/profile');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Error occurred');
            }
        }
    };

    return (
        <div className='bodyLogin'>
            <div className="form-container">
                <h2>{action}</h2>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    {action === "Register" && (
                        <>
                            <input
                                id='fname'
                                type="text"
                                name="fname"
                                placeholder="Full name"
                                required
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                            />
                            <input
                                id='email'
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    )}
                    <input
                        id='uname'
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={uname}
                        onChange={(e) => setUname(e.target.value)}
                    />
                    <input
                        id='pass'
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {action === "Register" && (
                        <>
                            <input
                                id='con_pass'
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                required
                            />
                            <div className="terms-checkbox">
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id="termsCheckbox"
                                        required
                                    />
                                </div>
                                <label htmlFor="termsCheckbox">
                                    I agree to the{" "}
                                    <a href="#" target="_blank">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </>
                    )}
                    <button type="submit">{action}</button>
                </form>
                <p className="switch-form">
                    {action === "Login" ? (
                        <>Don't have an account?{" "}
                            <a href="#" onClick={() => setAction("Register")}>
                                Register
                            </a>
                        </>
                    ) : (
                        <>Already have an account?{" "}
                            <a href="#" onClick={() => setAction("Login")}>
                                Login
                            </a>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
