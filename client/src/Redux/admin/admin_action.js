import axios from "axios";
import * as ActionType from "./admin_types";
import { toast } from "react-toastify";


export const loginAdmin = (email,password) => async(dispatch) => {

try {
    console.log(email,password);
    const resp = await axios.post(`http://localhost:8000/api/admin-login`,{
        email,
        password
    },{
        withCredentials:true,
    }
);console.log('calling 2');

    console.log(resp.data);

    dispatch({
        type: ActionType.LOGIN_ADMIN,
        payload: resp.data.token
    })
    toast('Admin Login has successfully...')
    window.location.href = '/admin/home';
    } catch (error) {
    toast(error.message)
    }   
}


export const getAdminData = () => async(dispatch) => {

    try {
        // console.log(email,password);
        const resp = await axios.get(`http://localhost:8000/api/admin-me`,{
            withCredentials:true,
        }
    );console.log('calling 2');
    
        console.log(resp.data);
    
        dispatch({
            type: ActionType.GET_ADMIN,
            payload: resp.data.data
        })
        // toast('Admin Login has successfully...')
        } catch (error) {
        // toast(error.message)
        console.log(error.message);
        }   
    }
    

export const registerAdmin = (name,email,password) => async(dispatch) => {

    try {

        console.log(name,email,password);
        const resp = await axios.post(`http://localhost:8000/api/admin-signup`,{
            name,
        email,
        password
    },{
        withCredentials:true,
    }
);console.log('calling 2');

    console.log(resp.data.token);

    dispatch({
        type: ActionType.REGISTER_ADMIN,
        payload: resp.data.token
    })
        toast('Admin Register has successfully...')
        } catch (error) {
        toast(error.message)
        }   
    }

    export const getAllOrders = () => async(dispatch) => {

        try {
            // console.log(email,password);
            const resp = await axios.get(`http://localhost:5000/api/get-all-orders`,{
                withCredentials:true,
            }
        );console.log('calling 2');
        
            console.log("resp.data.data",resp.data.data);
        
            dispatch({
                type: ActionType.GET_ALL_ORDERS,
                payload: resp.data.data
            })
            // toast('Admin Login has successfully...')
            } catch (error) {
            toast(error.message)
            }   
        }


    export const changeOrderStatus = (buyerId,status,item) => async(dispatch) => {

        try {
            // console.log(email,password);
            const resp = await axios.post(`http://localhost:5000/api/admin-update-order`,{
                buyerId,status,item
            },{
                withCredentials:true,
            }
        );console.log('calling 2');

        console.log("item",item);
        
            console.log(resp.data.data);
        
            dispatch({
                type: ActionType.CHANGE_ORDER_STATUS,
                payload: resp.data.data
            })
            toast('Order updated has successfully...')
            } catch (error) {
            toast(error.message)
            }   
        }