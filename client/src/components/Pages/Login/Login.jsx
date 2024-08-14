import './Login.css';
import React, { useState } from 'react';

export default function Login() {
    const [action, setAction] = useState("Login");

    return (
        <>
            <div className='bodyLogin'>
                <div className="form-container">
                    <h2>{action}</h2>
                    <form action="#" method="post">
                        {action === "Register" && (
                            <>
                                <input type="text" name="fname" placeholder="First name" required="" />
                                <input type="text" name="lname" placeholder="Last name" required="" />
                            </>
                        )}
                        <input type="text" name="username" placeholder="Username" required="" />
                        <input type="password" name="password" placeholder="Password" required="" />
                        {action === "Register" && (
                            <>
                                <input type="password" name="confirm_password" placeholder="Confirm Password" required="" />
                                <div className="terms-checkbox">
                                    <div className="checkbox">
                                        <input type="checkbox" id="termsCheckbox" required="" />
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
        </>
    );
}
