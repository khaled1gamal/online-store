import React, { useState } from "react";
import "./ProDetails.css";
import { useGetOneProductsApiQuery } from "Redux/productsApi";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DetailsThumb from "./DetailsThumb";
import { useRef } from "react";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";

const ProDetails = () => {
  const { selectedProductsId, selectedProducts } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );
  const dispatch = useDispatch();
  
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneProductsApiQuery(id);
  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    //this.setState({index: index})
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };
  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemU) => {
      return itemU.id === itemAPI.id;
    });
    return myProduct.quantity;
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h1" color="error">
          Error! Something went wrong... Please try again later..
        </Typography>
      </Box>
    );
  }

  if (data) {
    return (
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={data.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {selectedProductsId.includes(data.id) ? (
                  <Box className="quantity">
                    <Button
                      onClick={() => {
                        dispatch(decreaseQuantity(data));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Remove />
                    </Button>
                    <label>
                      {productQuantity(data)}
                      </label>
                    <Button
                      onClick={() => {
                        dispatch(increaseQuantity(data));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Add />
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={(eo) => {
                      dispatch(addToCart(data));
                    }}
                    sx={{ textTransform: "capitalize", lineHeight: 1.2 }}
                    variant="contained"
                    color="primary"
                  >
                    add to cart
                  </Button>
                )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProDetails;
