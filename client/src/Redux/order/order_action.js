import axios from "axios";
import * as ActionType from "./order_types";
import { toast } from "react-toastify";
import { backendURL } from "../prodiver";


export const getMyOrdersAction = () => async (dispatch) => {
    try {
        let resp = await axios.get(`http://localhost:5000/api/get-my-orders`,{
            withCredentials:true
        });

        console.log("Action orders",resp.data.data);

        dispatch({
            type: ActionType.GET_MY_ORDERS,
            payload: resp.data.data
        })

    } catch (error) {
        toast(error.message)
    }
}

export const emptyOrder = () => async (dispatch) => {
    try {
        console.log('calling');
        let resp = await axios.post(`http://localhost:5000/api/make-empty`,{
            withCredentials:true,
        },
    {
        responseType:'json'
    }
    );

        console.log(resp.data);

        // dispatch({
        //     type: ActionType.GET_MY_ORDERS,
        //     payload: resp.data.data
        // })

    } catch (error) {
        toast(error.message)
    }
}

export const cancelledOrder = (orderId) => async (dispatch) => {
    try {
        console.log('calling',orderId);
        const resp = await axios.post(`http://localhost:5000/api/cancel-order`,{
            orderId
        },{
            withCredentials:true,
        }
    );console.log('calling 2');

        console.log(resp.data.message);

        dispatch({
            type: ActionType.CANCEL_ORDER,
            payload: 'message'
        })
        toast("Order has been cancelled.")

    } catch (error) {
        toast(error.message)
    }
}

export const onlineOrder = (price, buyerName,itemName,itemImage, buyerEmail,itemId,number,city,state) => async (dispatch) => {
    try {

        const { data: { key } }
            = await axios.get('http://localhost:5000/api/get-key', {
                withCredentials: true
            });

        const { data: { order } } = await axios.post(`http://localhost:5000/api/order-item`, {
            price, itemName,itemImage, buyerName, buyerEmail,itemId,number,city,state
            
        }, {
            withCredentials: true
        });

        console.log(order);

        const options = {
            key: key,
            amount: price,
            currency: "INR",
            name: itemName,
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: `http://localhost:5000/api/verify-payment`,
            prefill: {
                name: buyerName,
                email: buyerEmail,
                contact: number
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

        dispatch({
            type: ActionType.ONLINE_ORDER,
            payload: order
        })

    } catch (error) {
        toast(error.message)
    }
}