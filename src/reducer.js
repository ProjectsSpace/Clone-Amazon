export const initialState = {
  cart: [],
};

const reducer = (state, action) => {
  console.log(action, state);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
