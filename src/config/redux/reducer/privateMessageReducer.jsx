const initialState = {
    privateMessageList: [
        {
            sender: "",
            sender_username: "",
            sender_fullname: "",
            sender_image: "",
            receiver: "",
            receiver_username: "",
            receiver_fullname: "",
            receiver_image: ""
        }
    ]
}

const privateMessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PRIVATE_MESSAGE_LIST":
            return {
                ...state,
                privateMessageList: action.payload
            }
        default:
            return state
    }
}

export default privateMessageReducer;