import * as ActionType from "./user_types";


const initialState = {
  user: null,
  isAuth: false,
  loading: false,
  carts: [
    // {
    //   id:1,
    //   image: 'https://www.orionlifes.com/wp-content/uploads/2021/01/Nimerion-P-tab-5.jpeg',
    //   name: 'Paracetamal',
    //   seller: "Apollo Farmacy",
    //   price: '29',
    // },
    // { id:2,
    //   image: 'https://www.netmeds.com/images/product-v1/600x600/854095/ventryl_ls_expectorant_60ml_2_0.jpg',
    //   name: 'Ventryl',
    //   seller: "Apollo Farmacy",
    //   price: '118',
    // },
  ]
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOGIN_USER:
      return {
          ...state,
          // user: action.payload,
          isAuth: true,
          };
          case ActionType.LOGOUT_USER:
            return {
                ...state,
                // user: action.payload,
                isAuth: false,
                };
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

    case ActionType.REMOVE_CART:
      console.log(action.payload);
      const updatedCarts = state.carts.filter(item => item.id !== action.payload);
      return {
        ...state,
        carts: updatedCarts,
      };
    

          
    default:
      return state;
  }
};