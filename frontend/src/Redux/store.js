import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { oneProductsApi, productsApi } from "./productsApi";
import cartReducer from "../Redux/cartSlice";

export const store = configureStore({
  reducer: {
    carttt: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneProductsApi.reducerPath]: oneProductsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(oneProductsApi.middleware),
});

setupListeners(store.dispatch);
