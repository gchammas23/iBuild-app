import React, { useState } from 'react';
import "../css/Login.css";
import { useSpring, animated } from 'react-spring';
import { useAlert } from 'react-alert';
import { authenticateUser, registerUser, authenticate } from "../actions/customerActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login(props) {

    const [registrationFormStatus, setRegistrationFormStatus] = useState(false);

    const loginProps = useSpring({
        left: registrationFormStatus ? -500 : 0,
    });

    const registerProps = useSpring({
        left: registrationFormStatus ? 0 : 500,
    });

    const loginButtonProps = useSpring({ borderBottom: registrationFormStatus ? 'solid 0px transparent' : 'solid 2px white' });
    const registerButtonProps = useSpring({ borderBottom: registrationFormStatus ? 'solid 2px white' : 'solid 0px transparent' });

    function loginClicked() { setRegistrationFormStatus(false) };
    function registerClicked() { setRegistrationFormStatus(true) };

    return (
        <div className="container">
            <div className="login-wrapper">
                <div className='nav-buttons'>
                    <animated.button id="loginButton" onClick={loginClicked} style={loginButtonProps}>Login</animated.button>
                    <animated.button id="registerButton" onClick={registerClicked} style={registerButtonProps}>Register</animated.button>
                </div>
                <div className='form-group'>
                    <animated.form action='' id='loginform' style={loginProps}><LoginForm {...props} /></animated.form>
                    <animated.form action='' id='registerform' style={registerProps}><RegisterForm {...props} /></animated.form>
                </div>
            </div>
        </div>
    )
}

function LoginForm(props) {
    const loginAlert = useAlert();

    function loginAuthentication(event) {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        }

        authenticateUser(data).then(response => {
            if (response.result === null) {
                loginAlert.error("Wrong username or password");
            } else {
                if (response.result) {
                    localStorage.setItem("user", data.username);
                    props.history.push("/HomePage");
                }
                else {
                    loginAlert.error(response.message);
                }

            }
        });
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);

    function togglePassword(event) {
        event.preventDefault();

        setShowPass(!showPass);
    }

    return (
        <React.Fragment>
            <label className='username'>Username</label>
            <input type='text' className='username' onChange={(e) => setUsername(e.target.value)} />
            <label className='password'>Password</label>
            <input type={showPass ? "text" : "password"}
                className='password'
                onChange={(e) => setPassword(e.target.value)} />
            <span onClick={(e) => togglePassword(e)}>
                <span>
                    {showPass ?
                        <FontAwesomeIcon icon={faEye} className="customIcon" /> :
                        <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
                    }
                </span>
            </span>
            <button className='submit' onClick={(e) => loginAuthentication(e)}>submit</button>
        </React.Fragment>
    )
}

function RegisterForm() {
    const registerAlert = useAlert();

    function signUp(event) {
        event.preventDefault();

        const data = {
            name: name,
            email: email,
            username: username,
            password: password
        }

        authenticate(data).then(res => {
            if (res === "") {
                registerUser(data).then((response) => {
                    if (response.result) {
                        registerAlert.success("Account created successfully!");
                        //this.props.history.push("/HomePage");
                    }
                    else {
                        registerAlert.error(response.message);
                    }

                }).catch((error) => {
                    registerAlert.show(error);
                });
            } else {
                registerAlert.error("User already exists!");
            }
        });
    }

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);

    function togglePassword(event) {
        event.preventDefault();

        setShowPass(!showPass);
    }

    return (
        <React.Fragment>
            <label id='name'>Name</label>
            <input type='text' className='name' onChange={(e) => setName(e.target.value)} />
            <label className='email'>Email</label>
            <input type='text' className='email' onChange={(e) => setEmail(e.target.value)} />
            <label className='username'>Username</label>
            <input type='text' className='username' onChange={(e) => setUsername(e.target.value)} />
            <label className='password'>Password</label>
            <input type={showPass ? "text" : "password"}
                className='password'
                onChange={(e) => setPassword(e.target.value)} />
            <span onClick={(e) => togglePassword(e)}>
                <span>
                    {showPass ?
                        <FontAwesomeIcon icon={faEye} style={{
                            position: "absolute",
                            left: "auto",
                            right: "10px",
                            textindent: "32px",
                            top: "250px"
                        }} /> :
                        <FontAwesomeIcon icon={faEyeSlash} style={{
                            position: "absolute",
                            left: "auto",
                            right: "10px",
                            textindent: "32px",
                            top: "250px"
                        }} />
                    }
                </span>
            </span>
            <button className='submit' onClick={(e) => signUp(e)}>submit</button>
        </React.Fragment>
    )
}

export default Login
