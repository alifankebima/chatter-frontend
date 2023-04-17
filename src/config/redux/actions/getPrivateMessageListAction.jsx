import axios from 'axios';
import swal from 'sweetalert2';

const getPrivateMessageListAction = () => async (dispatch) => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const token = localStorage.getItem("token");
    const auth = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }

    // Axios API hit
    try {
        const response = await axios.get(`${API_URL}/api/v1/private-message/list`, auth);
        if (response.status = 200) {
            const result = response.data.data;
            dispatch({ type: "GET_PRIVATE_MESSAGE_LIST", payload: result})
        }
    } catch (error) {
        console.log(error.response)
        swal.fire({
            title: `Get private message list failed`,
            text: `${error.response.data.message}`,
            icon: `error`
        })
    }
}

export default getPrivateMessageListAction;