import * as ActionType from "./order_types";


const initialState = {
  myOrders:[],
  orders: [
  ]
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.ONLINE_ORDER:
      return {
          ...state,
        orders: [...state.carts, action.payload]
          };
          case ActionType.GET_MY_ORDERS:
            return {
                ...state,
              myOrders: action.payload
                };
    default:
      return state;
  }
};