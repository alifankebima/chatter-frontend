import axios from 'axios';
import swal from 'sweetalert2';

const deleteProfilePictureAction = () => async (dispatch) => {
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
        const response = await axios.delete(`${API_URL}/api/v1/user/profile-picture`, auth);
        if (response.status = 200) {
            const result = response.data.data;
            dispatch({ type: "DELETE_PFP"})

            swal.fire({
                title: `Delete success`,
                text: `${response.data.message}`,
                icon: `success`
            })
            localStorage.setItem("token", result.token);
        }
    } catch (error) {
        console.log(error.response)
        swal.fire({
            title: `Delete failed`,
            text: `${error.response.data.message}`,
            icon: `error`
        })
    }
}

export default deleteProfilePictureAction;