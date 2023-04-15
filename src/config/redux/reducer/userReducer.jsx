const initialState = {
    userProfile: {
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
    switch (action.type) {
        case "USER_LOGIN":
        case "PROFILE":
        case "UPDATE_USER":
            return {
                ...state,
                userProfile: action.payload
            }
        default:
            return state
    }
}

export default userReducer;