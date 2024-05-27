import { combineReducers } from "redux";
import { userReducer } from "./user/user_reducer";
import { orderReducer } from "./order/order_reducer";


export default combineReducers({
    user: userReducer,
    order: orderReducer
});