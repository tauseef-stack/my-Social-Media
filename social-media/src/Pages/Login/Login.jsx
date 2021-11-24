import './login.css';
import { useRef } from 'react';
import { loginCall } from "../../apiCalls";
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';


export const Login = () => {
    const email = useRef();
    const password = useRef(); //prevent multi rendering in case of forms ==>
    const { user, isFetching, dispatch } = useContext(AuthContext);
   
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email.current.value,password.current.value);
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    console.log("from login page",user);
   
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MySocialMedia</h3>
                    <span className="loginDesc">Connets with friends and the World around you on MySocialMedia</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" ref={email} required className="loginEmial"></input>
                        <input placeholder="Password" type="password" minLength="6" required ref={ password } className="loginPassword" />
                        <button className="LoginButton" type="submit" disabled={isFetching}>{isFetching ?    <CircularProgress color="inherit" size="20px"/> : "Log In"}</button>
                    <span className="forgotPassword">forgot Password?</span>
                    <button className="CreateNewAccount"   disabled={isFetching}>{isFetching ?    <CircularProgress color="inherit"  size="20px"/> : "Create New Account"}</button>
                    </form>   
                </div>
            </div>
        </div>
    )
}
