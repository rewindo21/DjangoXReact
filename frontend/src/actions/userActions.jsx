import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    // USER_LOGOUT,

    // USER_REGISTER_REQUEST,
    // USER_REGISTER_SUCCESS,
    // USER_REGISTER_FAIL,
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

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}
// 
// export const register = (name, email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: USER_REGISTER_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         }

//         const res = await axios.post(
//             'http://127.0.0.1:8000/api/users/register/',
//             { 'first_name': name, 'email': email, 'password': password },
//             config
//         )

//         dispatch({
//             type: USER_REGISTER_SUCCESS,
//             payload: res.data
//         })

//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: res.data
//         })

//         localStorage.setItem('userInfo', JSON.stringify(res.data))

//     } catch (error) {
//         dispatch({
//             type: USER_REGISTER_FAIL,
//             payload: error.res && error.res.data.detail
//                 ? error.res.data.detail
//                 : error.message,
//         })
//     }
// }