import {createContext} from 'react'
import { useReducer, useEffect } from 'react';
import { AuthReducer } from "./AuthReducer";


const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null, 
    isFetching: false,
    error:false,  
}

export const AuthContext = createContext(INITIAL_STATE); //creating global context ==>

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE); //Storing Initial State of global context into varible ==>
    //storing User into locla Storage So that we need to login every time ==>
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user]);
    
    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
          {children}
        </AuthContext.Provider>
    )
}

/*
{
        _id
:
"6157fb5a3c5948d83953e2cb",
userName
:
"tauseef",
email
:
"t@t.com",
password
:
"$2a$08$hEXVgs.VzykLvM8YPWgZdO/zKKgcxe0934h7TGIr8pIHZ1.zLAzae",
profilePicture
:
"tauseef.jpg",
coverPicture
:
"tauseefCover.jpg",
isAdmin
:
false,
createdAt
:
"2021-10-02T06:25:30.215+00:00",
updatedAt
:
"2021-10-16T13:22:48.309+00:00",
desc
:
"hello Friends This is my First Post",
city
:
"Bhiwandi",
from
:
"Alhabad",
relationship
:
2,
followings: ["61586acf9a2163ad1242d612"],
followers:[],
    }
*/