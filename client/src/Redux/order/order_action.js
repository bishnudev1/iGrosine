import axios from "axios";
import * as ActionType from "./order_types";
import { toast } from "react-toastify";
const { v4: uuidv4 } = require('uuid');


export const getItems = () => async (dispatch) => {

    console.log("calling getItems");
    try {
        dispatch({type: ActionType.LOADING_START})
        let resp = await axios.get(`http://localhost:5000/api/get-items`);

        console.log("Action orders",resp.data.items);

        dispatch({
            type: ActionType.GET_ITEMS,
            payload: resp.data.items
        })
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}


export const deleteItem = (_id) => async (dispatch) => {

    console.log("calling getItems");
    try {
        dispatch({type: ActionType.LOADING_START})
        let resp = await axios.post(`http://localhost:5000/api/delete-item`,{
            _id
        },{
            withCredentials:true,
        });

        console.log("Action orders",resp.data.items);

        dispatch({
            type: ActionType.DELETE_ITEM,
            // payload: resp.data.items
        })

        getItems()

        dispatch({type: ActionType.LOADING_END})
        toast("Item has been deleted...")
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}

export const addItemAdmin = (id,category, image, name, seller, price, realPrice, off, desc) => async (dispatch) => {

    console.log("calling getItems");
    try {
        dispatch({type: ActionType.LOADING_START})
        let resp = await axios.post(`http://localhost:5000/api/add-item`,{
            id,category, image, name, seller, price, realPrice, off, desc
        },{
            withCredentials:true
        });

        console.log("Action orders",resp.data.items);

        dispatch({
            type: ActionType.ADD_ITEM,
            // payload: resp.data.items
        })
        toast("Item has been added...")
        getItems();
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}


export const getMyOrdersAction = () => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        let resp = await axios.get(`http://localhost:5000/api/get-my-orders`,{
            withCredentials:true
        });

        console.log("Action orders",resp.data.data);

        dispatch({
            type: ActionType.GET_MY_ORDERS,
            payload: resp.data.data
        })
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
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
        dispatch({type: ActionType.LOADING_START})
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
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}

export const onlineOrder = (price,buyerId, buyerName,itemName,itemImage, buyerEmail,itemId,number,city,state) => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        const { data: { key } }
            = await axios.get('http://localhost:5000/api/get-key', {
                withCredentials: true
            });

        const { data: { order } } = await axios.post(`http://localhost:5000/api/order-item`, {
            price, buyerId,itemName,itemImage, buyerName, buyerEmail,itemId,number,city,state
            
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
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}

export const onlineOrderCOD = (price,buyerId, buyerName,itemName,itemImage, buyerEmail,itemId,number,city,state) => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        const { data: { order } } = await axios.post(`http://localhost:5000/api/order-item-cod`, {
            price, buyerId,itemName,itemImage, buyerName, buyerEmail,itemId,number,city,state
            
        }, {
            withCredentials: true
        });

        console.log(order);

        dispatch({
            type: ActionType.ONLINE_ORDER_COD,
            payload: order
        })
        dispatch({type: ActionType.LOADING_END})
        toast("Order has placed successfully...")
        window.location.href = `order-success?reference=${uuidv4()}`

    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}

export const onlineOrderMultiple = (buyerId,buyerName, buyerEmail, number, city, state, items,total) => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        const { data: { key } } = await axios.get('http://localhost:5000/api/get-key', {
            withCredentials: true
        });

        const orders = [];

        console.log(total);

        // Iterate over each item in the items array
        for (const item of items) {
            const { id, name, price, image } = item;

            // Make a request to create an order for each item
            const response = await axios.post(`http://localhost:5000/api/order-item-cart`, {
                price,
                buyerId: uuidv4(),
                itemName: name,
                itemImage: image,
                buyerName,
                buyerEmail,
                itemId: id,
                number,
                city,
                state
            }, {
                withCredentials: true
            });

            if (response.data && response.data.order) {
                const order = response.data.order;
                orders.push(order);
                console.log("Order placed for:", order);
            } else {
                console.error("Order creation failed:", response.data);
            }
        }

        const calculateTotal = () => {
            return items.reduce((total, item) => total + parseFloat(item.price), 0);
          };

        console.log(calculateTotal());

        console.log(`orders[0].id ${orders[0].id}`);

        // Open Razorpay payment dialog after all orders are processed
        if (orders.length > 0) {
            const options = {
                key: key,
                amount: total, // Total amount of all orders
                currency: "INR",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orders[0].id, // Use the order_id of the first order for Razorpay options
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

            // Dispatch an action to handle the orders
            dispatch({
                type: ActionType.ONLINE_ORDER_MULTIPLE,
                payload: orders
            });
            dispatch({type: ActionType.LOADING_END})
        } else {
            console.log("No orders to process");
        }
    } catch (error) {
        console.error(error.message);
        // Handle errors appropriately
        dispatch({type: ActionType.LOADING_END})
        toast(error.message);
    }
};

export const onlineOrderMultipleCOD = (buyerId,buyerName, buyerEmail, number, city, state, items,total) => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        const orders = [];

        console.log(total);

        // Iterate over each item in the items array
        for (const item of items) {
            const { id, name, price, image } = item;

            // Make a request to create an order for each item
            const response = await axios.post(`http://localhost:5000/api/order-item-cart-cod`, {
                price,
                buyerId:uuidv4(),
                itemName: name,
                itemImage: image,
                buyerName,
                buyerEmail,
                itemId: id,
                number,
                city,
                state
            }, {
                withCredentials: true
            });

            console.log(response.data.order);

            if (response.data) {
                const order = response.data;
                orders.push(order);
                console.log("Order placed for:", order);
            } else {
                console.error("Order creation failed:", response.data);
            }
        }

        const calculateTotal = () => {
            return items.reduce((total, item) => total + parseFloat(item.price), 0);
          };

        console.log(calculateTotal());

        console.log(`orders[0].id ${orders[0].id}`);

        // Open Razorpay payment dialog after all orders are processed
        if (orders.length > 0) {

            // Dispatch an action to handle the orders
            dispatch({
                type: ActionType.ONLINE_ORDER_MULTIPLE,
                payload: orders
            });
        } else {
            console.log("No orders to process");
        }
        dispatch({type: ActionType.LOADING_END})
        toast("Order has placed successfully...")
        window.location.href = `order-success?reference=${uuidv4()}`
    } catch (error) {
        console.error(error.message);
        // Handle errors appropriately
        dispatch({type: ActionType.LOADING_END})
        toast(error.message);
    }
};

export const getCityStateFromCoordinates =  () => async(dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        const resp1 = await axios.get(`https://api.ipify.org`);
        console.log(resp1);
        const resp = await axios.get(`http://ip-api.com/json/${resp1.data}`);
        console.log(resp.data);

     dispatch({
        type: ActionType.GET_LOCATION,
        payload: resp.data
    });
    dispatch({type: ActionType.LOADING_END})
    } catch (error) {
      console.error("Error retrieving city and state:", error);
      dispatch({type: ActionType.LOADING_END})
      return null;
    }
  };

  export const reviewItem = (orderId, desc, buyerName, reviewDate) => async (dispatch) => {
    try {
        dispatch({type: ActionType.LOADING_START})
        console.log('calling',orderId);
        const resp = await axios.post(`http://localhost:5000/api/post-review`,{
            orderId, desc, buyerName, reviewDate
        },{
            withCredentials:true,
        }
    );console.log('calling 2');

        console.log(resp.data);

        dispatch({
            type: ActionType.REVIEW_ITEM,
            payload: 'message'
        })
        toast("Thanks for your review.")
        dispatch({type: ActionType.LOADING_END})
    } catch (error) {
        dispatch({type: ActionType.LOADING_END})
        toast(error.message)
    }
}