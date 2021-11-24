export const AuthReducer = (state, action) => {
    //console.log(action.payload,action.type)
    switch (action.type) {
        case "LOGIN_START":
        return {
            user: null,
            isFetching:true,
            error:false,
            }
        case "LOGIN_SUCCESS":
           // console.log(action.payload)
            return {
                user: action.payload,
                isFetching: false,
                error:false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "FOLLOW": //remember its return statement==>
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(item => item !== action.payload),
                },
            };
        default:
            return state;
    }
    
}
