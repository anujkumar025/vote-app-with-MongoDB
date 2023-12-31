import React, {useState} from 'react';
import './Register.css';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import BackendAddress from './../helper/Helper.js';


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [rePass, setRePass] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (p) => {
        setPassword(p.target.value);
    }

    const handleRePassChange = (p) => {
        setRePass(p.target.value);
    }

    const handleNameChange =(p) =>{
        setFname(p.target.value);
    }

    const handleRegister = () =>{
        // console.log("email : ", email, "password : ", password, "name : ", name, "rePass : ", rePass);
        if(fname && email && password && (password === rePass)){
            const user = {fname, email, password};
            axios.post(BackendAddress + "register", user)
            .then(res => {
                if(res.data.message === "User registered successfully."){
                    alert(res.data.message);
                }
                else{
                    alert("Please LogIn");
                    navigate('/login');
                }
            }).catch(err => {
                console.log(err);
            })
        }
        else{
            alert("Invalid input");
        }
    }

    const handleLoginButton = () => {
        navigate('/login');
    }

    return(
        <div className='Register-box'>
            <div className='Register-container'>
                <h2>Login</h2>
                <div className='formGroup'>
                    <label>Name</label>
                    <input
                        type="text"
                        value={fname}
                        onChange={handleNameChange}
                        className='Register-input'
                    />
                </div>
                <div className='formGroup'>
                    <label>Email : </label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="Register-input"
                    />
                </div>
                <div className='formGroup'>
                    <label>Create Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='Register-input'
                    />
                </div>
                <div className='formGroup'>
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        value={rePass}
                        onChange={handleRePassChange}
                        className='Register-input'
                    />
                </div>
                <div className='Register-buttonGroup'>
                    <button onClick={handleRegister} className='Register-registerButton'>
                        Register
                    </button>
                    <button onClick={handleLoginButton} className='Register-loginButton'>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;