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