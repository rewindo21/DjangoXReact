import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM, 
} from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: res.data._id,
            name: res.data.name,
            image: res.data.image,
            price: res.data.price,
            countInStock: res.data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}