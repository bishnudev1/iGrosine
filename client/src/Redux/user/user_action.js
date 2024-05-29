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

export const addToCart = ({id,name,price,image,seller}) => async(dispatch) => {

      try {
        console.log(`Item name:${name}`);
        const item = {
            id:id,
            name: name,
            price: price,
            seller: seller,
            image: image,
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
        toast('Added into cart...',{
            autoClose:1500
        })

    } catch (error) {
        toast(error.message)
    }

}

export const removeCartItem = (id) => async(dispatch) => {
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
    toast('Removed from cart...',{
        autoClose:1500
    })
}

export const getMyCartsAction = () => async (dispatch) => {
    console.log('calling');
    try {
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

    } catch (error) {
        toast("You're not signed in. Please login.")
    }
}