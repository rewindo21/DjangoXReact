import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const res = await axios.get('http://127.0.0.1:8000/api/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.res && error.res.data.message //res multi
                ? error.res.data.message // res
                : error.message,
        })
    }
}