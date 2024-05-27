import axios from "axios";
import * as ActionType from "./order_types";
import { toast } from "react-toastify";
import { backendURL } from "../prodiver";


export const getMyOrdersAction = () => async (dispatch) => {
    try {
        let resp = await axios.get(`http://localhost:5000/api/get-my-orders`,{
            withCredentials:true
        });

        console.log(resp.data.data);

        dispatch({
            type: ActionType.GET_MY_ORDERS,
            payload: resp.data.data
        })

    } catch (error) {
        toast(error.message)
    }
}

export const onlineOrder = (price, buyerName,itemName, buyerEmail,itemId,number,city,state) => async (dispatch) => {
    try {

        const { data: { key } }
            = await axios.get('http://localhost:5000/api/get-key', {
                withCredentials: true
            });

        const { data: { order } } = await axios.post(`http://localhost:5000/api/order-item`, {
            price, itemName, buyerName, buyerEmail,itemId,number,city,state
            
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

    } catch (error) {
        toast(error.message)
    }
}