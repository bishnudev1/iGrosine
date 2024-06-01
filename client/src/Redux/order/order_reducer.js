import * as ActionType from "./order_types";


const initialState = {
  myOrders:[],
  userLocation: {},
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOADING_START:
      return {
          ...state,
          loading: true
      };

  case ActionType.LOADING_END:
      return {
          ...state,
          loading: false
      };

    case ActionType.ONLINE_ORDER:
      return {
          ...state,
        data: ""
          };
          case ActionType.ONLINE_ORDER_MULTIPLE:
            return {
                ...state,
              data: ""
                };
                case ActionType.ONLINE_ORDER_COD:
                  return {
                      ...state,
                    data: ""
                      };
                      case ActionType.ONLINE_ORDER_MULTIPLE_COD:
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
                      case ActionType.GET_LOCATION:
                        console.log("action.payload",action.payload);
                        return {
                            ...state,
                          userLocation: action.payload
                            };
    default:
      return state;
  }
};