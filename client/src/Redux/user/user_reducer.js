import * as ActionType from "./user_types";


const initialState = {
  user: null,
  isAuth: false,
  loading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_USER:
        return {
            ...state,
            user: action.payload,
            isAuth: true,
            };
    default:
      return state;
  }
};