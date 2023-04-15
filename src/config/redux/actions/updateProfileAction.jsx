import axios from 'axios';
import swal from 'sweetalert2';

const updateProfileAction = (data, saveImage) => async (dispatch) => {
    const API_URL = `${process.env.REACT_APP_API_URL}`;
    const token = localStorage.getItem("token");
    const auth = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    }

    let profileData = new FormData();
    if(data.fullname) profileData.append("fullname", data.fullname);
    if(data.username) profileData.append("username", data.username);
    if(saveImage) profileData.append("image", saveImage);
    if(data.phone_number) profileData.append("phone_number", data.phone_number);

    axios.put(`${API_URL}/api/v1/user`, profileData, auth)
        .then((response) => {
            const result = response.data.data;
            dispatch({ type: "UPDATE_USER", payload: result});
            swal.fire({
                title: `Update success`,
                text: `${response.data.message}`,
                icon: `success`
            })
        }).catch((error) => {
            console.log(error);
            swal.fire({
                title: `Update failed`,
                text: `${error.response ? error.response.data.message : "Failed updating user profile"}`,
                icon: `error`
            })
        })
}

export default updateProfileAction