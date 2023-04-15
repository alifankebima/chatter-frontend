import axios from 'axios';
import swal from 'sweetalert2';

const loginAction = (data) => async (dispatch) => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const postData = {
        email: data.email,
        password: data.password
    }

    // Axios API hit
    try {
        const response = await axios.post(`${API_URL}/api/v1/user/login`, postData);
        if (response.status = 200) {
            const result = response.data.data;
            dispatch({ type: "USER_LOGIN", payload: result})

            swal.fire({
                title: `Login success`,
                text: `${response.data.message}`,
                icon: `success`
            })
            localStorage.setItem("token", result.token);
        }
    } catch (error) {
        console.log(error.response)
        swal.fire({
            title: `Login failed`,
            text: `${error.response ? error.response.data.message : "Failed logging in"}`,
            icon: `error`
        })
    }
}

export default loginAction;