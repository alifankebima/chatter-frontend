import axios from 'axios';
import swal from 'sweetalert2';

const getDetailUser = (id_user) => async (dispatch) => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;

    try {
        const response = await axios.get(`${API_URL}/api/v1/user/${id_user}`);
        if (response.status = 200) {
            const result = response.data.data[0];
            dispatch({ type: "GET_DETAIL_USER", payload: result})
        }
    } catch (error) {
        console.log(error.response)
        swal.fire({
            title: `Get detail user failed`,
            text: `${error.response.data.message}`,
            icon: `error`
        })
    }
}

export default getDetailUser;