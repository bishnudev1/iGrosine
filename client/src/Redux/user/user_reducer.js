import * as ActionType from "./user_types";


const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  carts: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_USER:
        return {
            ...state,
            user: action.payload,
            isAuth: true,
            };

            case ActionType.ADD_TO_CART:
    // Check if action.payload is a valid item object
    if (action.payload && typeof action.payload === 'object') {
        return {
            ...state,
            carts: [...state.carts, action.payload],
        };
    } else {
        // Handle the case where action.payload is not a valid item object
        console.error("Payload is not a valid item object.");
        return state; // Return the current state
    }

          
    default:
      return state;
  }
};