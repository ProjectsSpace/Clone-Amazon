export const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

// Getting total price of the cart
export const cartPriceTotal = (cart) =>
  cart?.reduce((total, item) => total + item.price, 0);

const reducer = (state, action) => {
  console.log(action, state);
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      const index = state.cart.findIndex((item) => item.id === action.payload);

      let tempCart = [...state.cart];

      if (index >= 0) {
        tempCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in cart!`
        );
      }

      localStorage.setItem("cart", JSON.stringify(tempCart));

      return {
        ...state,
        cart: tempCart,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default reducer;
