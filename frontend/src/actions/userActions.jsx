import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
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
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.res && error.res.data.detail
                ? error.res.data.detail
                : error.message,
        })
    }
}