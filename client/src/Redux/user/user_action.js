import axios from "axios";
import { backendURL } from "../prodiver";
import * as ActionType from "./user_types";

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

export const addToCart = ({name,price,image,seller}) => (dispatch) => {
    console.log(`Item name:${name}`);
    const data = {
        name: name,
        price: price,
        seller: seller,
        image: image
      };
    dispatch({
        type: ActionType.ADD_TO_CART,
        payload: data
    })
}