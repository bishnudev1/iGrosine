import axios from "axios";
import { backendURL } from "../prodiver";
import * as ActionType from "./user_types";
import { toast } from "react-toastify";

export const getUserData = () => (dispatch) => {
    axios.get(`${backendURL}/log`,
    {
        withCredentials: true
    })
    .then(res => {
        const user = res.data.data;
        dispatch({
            type: ActionType.GET_USER,
            payload: user
        })
    })
    .catch(err => {
        console.log(err);
    })
}

export const loginUser = () => (dispatch) => {
    // axios.get(`${backendURL}/auth/google`,
    // {
    //     withCredentials: true
    // })
    // .then(res => {
    //     // const user = res.data.data;
    //     dispatch({
    //         type: ActionType.LOGIN_USER,
    //         payload: res.data
    //     })
    //     toast('Login has successfully...')
    // })
    // .catch(err => {
    //     toast(err.message);
    //     console.log(err);
    // })

try {
    window.location.href = `${backendURL}/auth/google`;
    dispatch({
    type: ActionType.LOGIN_USER,
    // payload: res.data
})
toast('Login has successfully...')
} catch (error) {
    toast(error.message)
}
}

export const logoutUser = () => (dispatch) => {
    // axios.get(`${backendURL}/auth/logout`)
    // .then(res => {
    //     // const user = res.data.data;
    //     dispatch({
    //         type: ActionType.LOGOUT_USER,
    //         payload: res.data
    //     })
    //     toast('Logout has successfully...')
    // })
    // .catch(err => {
    //     toast(err.message);
    //     console.log(err);
    // })
    try {
        window.location.href = `${backendURL}/auth/logout`;
        dispatch({
        type: ActionType.LOGOUT_USER,
        // payload: res.data
    })
    toast('Logout has successfully...')
    } catch (error) {
        toast(error.message)
    }
}

export const addToCart = ({id,name,price,image,seller}) => (dispatch) => {
    console.log(`Item name:${name}`);
    const data = {
        id:id,
        name: name,
        price: price,
        seller: seller,
        image: image,
      };
    dispatch({
        type: ActionType.ADD_TO_CART,
        payload: data
    })
    toast('Added into cart...',{
        autoClose:1500
    })
}

export const removeCartItem = (id) => (dispatch) => {
    console.log(`id in action ${id}`);
    dispatch({
        type: ActionType.REMOVE_CART,
        payload: id
    })
    toast('Removed from cart...',{
        autoClose:1500
    })
}