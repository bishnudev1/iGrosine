import * as ActionType from "./order_types";


const initialState = {

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
    
    default:
      return state;
  }
};