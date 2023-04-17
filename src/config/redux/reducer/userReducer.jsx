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
    },
    detailUser: {
        id: "",
        fullname: "",
        username: "",
        email: "",
        image: "",
        phone_number: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
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
        case "GET_DETAIL_USER":
            return {
                ...state,
                detailUser: action.payload
            }
        default:
            return state
    }
}

export default userReducer;