import { combineReducers } from "redux";
import { userReducer } from "./user/user_reducer";
import { orderReducer } from "./order/order_reducer";
import { adminReducer } from "./admin/admin_reducer";


export default combineReducers({
    user: userReducer,
    order: orderReducer,
    admin: adminReducer
});