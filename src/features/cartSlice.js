import { createSlice } from "@reduxjs/toolkit";

const defaultValue = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  // orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify(defaultValue));
    return defaultValue;
  }

  return JSON.parse(cart);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartId == product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      // state.orderTotal = state.cartTotal;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartId == cartId);

      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItem: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultValue));
      return defaultValue;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const item = state.cartItems.find((i) => i.cartId == cartId);

      state.cartItems = state.cartItems.filter((i) => i.cartId !== cartId);
      state.numItemsInCart -= item.amount;
      state.cartTotal -= item.price * item.amount;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, editItem, removeItem, clearCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
