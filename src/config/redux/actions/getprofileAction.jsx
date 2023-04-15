import axios from 'axios';
import swal from 'sweetalert2';

const getProfileAction = () => async (dispatch) => {
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
        const response = await axios.get(`${API_URL}/api/v1/user/profile`, auth);
        if (response.status = 200) {
            const result = response.data.data;
            dispatch({ type: "PROFILE", payload: result})
        }
    } catch (error) {
        console.log(error.response)
        swal.fire({
            title: `Get profile failed`,
            text: `${error.response.message}`,
            icon: `error`
        })
    }
}

export default getProfileAction;