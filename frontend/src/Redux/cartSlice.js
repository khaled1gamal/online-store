import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts")
    ? JSON.parse(localStorage.getItem("selectedProducts"))
    : [],
  selectedProductsId: localStorage.getItem("selectedProductsId")
    ? JSON.parse(localStorage.getItem("selectedProductsId"))
    : [],
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productWithQuantity = { ...action.payload, quantity: 1 };
      state.selectedProducts.push(productWithQuantity);
      state.selectedProductsId.push(action.payload.id);
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      localStorage.setItem(
        "selectedProductsId",
        JSON.stringify(state.selectedProductsId)
      );
    },

    increaseQuantity: (state, action) => {
      const increaseQuantity = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increaseQuantity.quantity += 1;
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
      //increaseQuantity.quantity = JSON.parse(localStorage.getItem("quantity"))
      //increaseQuantity.quantity = localStorage.getItem(JSON.parse("quantity"))
    },

    decreaseQuantity: (state, action) => {
      const decreaseQuantity = state.selectedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      decreaseQuantity.quantity -= 1;
      if (decreaseQuantity.quantity === 0) {
        const newArray = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        const newArray2 = state.selectedProductsId.filter((item) => {
          return item !== action.payload.id;
        });
        state.selectedProductsId = newArray2;
        state.selectedProducts = newArray;
        localStorage.setItem(
          "selectedProductsId",
          JSON.stringify(state.selectedProductsId)
        );
      }
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
    deleteProduct: (state, action) => {
      const newArray = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newArray2 = state.selectedProductsId.filter((item) => {
        return item !== action.payload.id;
      });
      state.selectedProductsId = newArray2;
      state.selectedProducts = newArray;
      localStorage.setItem(
        "selectedProductsId",
        JSON.stringify(state.selectedProductsId)
      );
      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(state.selectedProducts)
      );
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
