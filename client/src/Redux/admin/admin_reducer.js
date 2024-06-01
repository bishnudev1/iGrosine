import * as ActionType from "./admin_types";


const initialState = {
    auth: false,
  admin:null,
  allOrders: []
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.REGISTER_ADMIN:
      return {
          ...state,
        //   admin: action.payload,
          isAuth: true,
          };
          case ActionType.LOGIN_ADMIN:
            return {
                ...state,
                // admin: action.payload,
                isAuth: true,
                };
                case ActionType.GET_ADMIN:
                    return {
                        ...state,
                        admin: action.payload,
                        isAuth: true,
                        };
                        case ActionType.GET_ALL_ORDERS:
                            return {
                                ...state,
                                allOrders :action.payload
                                };
                                case ActionType.CHANGE_ORDER_STATUS:
                                    return {
                                        ...state,
                                        
                                        };
    default:
      return state;
  }
};