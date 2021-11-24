import './register.css';
import { useRef } from 'react';
import { useHistory } from "react-router";
import  axios  from 'axios';
import { Link } from 'react-router-dom';
export const Register = () => {
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const history = useHistory();
    const conformedPassword = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.current.value !== conformedPassword.current.value) {
            conformedPassword.setCustomValidity("Passwords didn't match!");
        } else {
          const user={
                userName: userName.current.value,
                email:email.current.value,
                password: password.current.value,        
            }
            try {
                await axios.post("http://localhost:4444/api/auth/register", user)
                history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }

    }
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MySocialMedia</h3>
                    <span className="loginDesc">Connets with friends and the World around you on MySocialMedia</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="User Name" className="loginEmial" ref={userName} required></input>
                        <input placeholder="Email" className="loginEmial" type="email" ref={email} required></input>
                        <input placeholder="Password" className="loginEmial" type="password" minLength="6" ref={password} required></input>
                        <input placeholder="Conform Password" className="loginPassword" type="password" ref={conformedPassword} required/>
                            <button className="LoginButton" type="submit">Sign Up</button>
                            <Link to="/login" className="CreateNewAccount">  <button className="CreateNewAccount">Log into Account</button></Link>
                   
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}