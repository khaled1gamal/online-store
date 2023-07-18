import { Box, Button } from "@mui/material";
import "./Cart.css";
import React from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../../Redux/cartSlice";

const Cart = () => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.carttt);
  const dispatch = useDispatch();
  let subTotal = 0;

  return (
    <Box sx={{}} >
      <Box className="master-container">
        <div className="card cart">
          <label className="title">Your cart</label>
          <div className="products">
            {selectedProducts.map((item, i) => {
              subTotal += item.price * item.quantity;
              return (
                <Box key={i} sx={{ m: 0.7, }} className="product">
                  <img height={"70px"} src={item.imageLink[0]} alt="" />
                  <div>
                    <span>{item.productName}</span>
                  </div>
                  <Box className="quantity">
                    <Button
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Remove />
                    </Button>
                    <label>{item.quantity}</label>
                    <Button
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Add />
                    </Button>
                  </Box>
                  <label className="price small">
                    ${item.price * item.quantity}
                  </label>
                  <Button
                    onClick={(state) => {
                      dispatch(deleteProduct(item));
                    }}
                    sx={{ minWidth: 0 }}
                  >
                    <Delete />
                  </Button>
                </Box>
              );
            })}
          </div>
        </div>

        <div className="card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Your cart sub total:</span>
            <span>${subTotal}</span>
          </div>
          <div className="checkout--footer">
            <label className="price">${subTotal}</label>
            <Button className="checkout-btn">Checkout</Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Cart;
