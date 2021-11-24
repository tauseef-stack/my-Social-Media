import  axios  from 'axios';

export const loginCall = async (userCredentials,dispatch) => {
       dispatch({ type: "LOGIN_START" })
    try {
       // console.log(userCredentials)
        const res = await axios.post("http://localhost:4444/api/auth/login", userCredentials)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); 
    }
    catch (err) {
        dispatch({type:"LOGIN_FAILED",payload:err})
    }
}
