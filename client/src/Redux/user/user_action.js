import axios from "axios";
import { backendURL } from "../prodiver";
import * as ActionType from "./user_types";
import { toast } from "react-toastify";

export const getUserData = () => (dispatch) => {
    dispatch({type: ActionType.LOADING_START})
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
        dispatch({type: ActionType.LOADING_END})
        // window.location.href = "http://localhost:3000/login";
    })
    .catch(err => {
        dispatch({type: ActionType.LOADING_END})
        console.log(err);
    })
}

export const deleteProfile = () => (dispatch) => {
    dispatch({type: ActionType.LOADING_START})
    axios.delete(`${backendURL}/api/delete-my-profile`,
    {
        withCredentials: true
    })
    .then(res => {
        const user = res.data.data;
        dispatch({
            type: ActionType.DELETE_USER,
            // payload: user
        })
        dispatch({type: ActionType.LOADING_END})
        // window.location.href = "http://localhost:3000/login";
    })
    .catch(err => {
        dispatch({type: ActionType.LOADING_END})
        console.log(err);
    })
}

export const loginUser = () => (dispatch) => {

try {
    dispatch({type: ActionType.LOADING_START})
    window.location.href = `${backendURL}/auth/google`;
    dispatch({
    type: ActionType.LOGIN_USER,
    // payload: res.data
})
dispatch({type: ActionType.LOADING_END})
toast('Login has successfully...')
} catch (error) {
    dispatch({type: ActionType.LOADING_END})
    toast(error.message)
}
}

export const logoutUser = () => (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        window.location.href = `${backendURL}/auth/logout`;
        dispatch({
        type: ActionType.LOGOUT_USER,
        // payload: res.data
    })
    toast('Logout has successfully...')
    dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)

    }
}

export const addToCart = ({id,name,price,image,seller,realPrice,off, reviews,desc }) => async(dispatch) => {

      try {
        dispatch({type: ActionType.LOADING_START})
        console.log(`Item name:${name}`);
        const item = {
            id:id,
            name: name,
            price: price,
            seller: seller,
            image: image,
            realPrice:realPrice,off:off, reviews:reviews,desc:desc 
          };
        const resp = await axios.post(`http://localhost:5000/api/add-to-cart`,{
            item
        },{
            withCredentials:true,
        }
    );console.log('calling 2');

        console.log(resp.data.data);

        dispatch({
            type: ActionType.ADD_TO_CART,
            payload: resp.data.data
        })
        dispatch({type: ActionType.LOADING_END})
        toast('Added into cart...',{
            autoClose:1500
        })

    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }

}

export const removeCartItem = (id) => async(dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        console.log(`id in action ${id}`);
        const resp = await axios.post(`http://localhost:5000/api/remove-cart`,{
            id
        },{
            withCredentials:true,
        }
    );console.log('calling 2');
    
        console.log(resp.data.data);
        dispatch({
            type: ActionType.REMOVE_CART,
            payload: id
        })
        dispatch({type: ActionType.LOADING_END})
        toast('Removed from cart...',{
            autoClose:1500
        })
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message);
    }
}

export const getMyCartsAction = () => async (dispatch) => {
    console.log('calling');
    try {
        dispatch({type: ActionType.LOADING_START})
        let resp = await axios.get(`http://localhost:5000/api/get-my-carts`,{
            withCredentials:true
        });

        console.log("Action orders",resp.data.data);

        console.log(resp.status);

        if(resp.status === 304){
            toast("You're not signed in. Please login.")
        }

        dispatch({
            type: ActionType.GET_MY_CARTS,
            payload: resp.data.data
        })
        dispatch({type: ActionType.LOADING_END})

    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast("You're not signed in. Please login.")
    }
}