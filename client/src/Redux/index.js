import { combineReducers } from "redux";
import { userReducer } from "./user/user_reducer";


export default combineReducers({
    user: userReducer,
});