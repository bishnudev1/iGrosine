import axios from "axios";
import * as ActionType from "./order_types";
import { toast } from "react-toastify";

export const onlineOrder = (price) => async (dispatch) => {
    try {

        const { data: { key } }
            = await axios.get('http://localhost:5000/api/get-key', {
                withCredentials: true
            });

        const { data: { order } } = await axios.post(`http://localhost:5000/api/order-item`, {
            price
            
        }, {
            withCredentials: true
        });

        console.log(order);

        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: `http://localhost:5000/api/verify-payment`,
            prefill: {
                name: "Bishnudev Khutia",
                email: "khutia.bishnudev@example.com",
                contact: "9000090000"
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