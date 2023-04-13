const initialState = {
    userProfile : {
        id: "",
        fullname: "",
        username: "",
        email: "",
        image: "",
        phone_number: "",
        email_verified: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        token: "",
        refreshToken: ""
    }
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "USER_LOGIN":
        case "PROFILE":
        case "REGISTER_SELLER" :
        case "LOGIN_SELLER" :
        case "REFRESH_TOKEN" :
        case "UPDATE_SELLER" :
        case "DELETE_TOKEN" :
            return{
                ...state,
                userProfile : action.payload
            }
        default:
            return state
    }
}

export default userReducer;