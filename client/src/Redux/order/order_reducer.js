import * as ActionType from "./order_types";


const initialState = {
  myOrders:[],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.ONLINE_ORDER:
      return {
          ...state,
        data: ""
          };
          case ActionType.GET_MY_ORDERS:
            return {
                ...state,
              myOrders: action.payload
                };
                case ActionType.CANCEL_ORDER:
                  return {
                      ...state,
                    data: ""
                      };
    default:
      return state;
  }
};