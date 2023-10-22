import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/userConstants' 

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const res = await axios.post(
            'http://127.0.0.1:8000/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })

        localStorage.setItem('userInfo', JSON.stringify(res.data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.res && error.res.data.detail
                ? error.res.data.detail
                : error.message,
        })
    }
}