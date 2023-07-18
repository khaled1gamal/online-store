
import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, CircularProgress, Stack, useTheme } from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../Redux/cartSlice";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedProductsId, selectedProducts } = useSelector(
    // @ts-ignore
    (state) => state.carttt
  );

  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemU) => {
      return itemU.id === itemAPI.id;
    });
    return myProduct.quantity;
  };

  if (error) {
    return (
      <Box>
        <Typography variant="h1" color="error">
          Error! Something went wrong... Please try again later..
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, i) => {
          return (
            <Card key={i} sx={{ maxWidth: 250, m: 0.7 }}>
              <CardMedia
                component="img"
                height="250"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`details-product/${item.id}`);
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {selectedProductsId.includes(item.id) ? (
                  <Box className="quantity">
                    <Button
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Remove />
                    </Button>
                    <label>{productQuantity(item)}</label>
                    <Button
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                      sx={{ minWidth: 0 }}
                    >
                      <Add />
                    </Button>
                  </Box>
                ) : (
                  <Button
                    onClick={(eo) => {
                      dispatch(addToCart(item));
                    }}
                    sx={{ textTransform: "capitalize", lineHeight: 1.2 }}
                    variant="contained"
                    color="primary"
                  >
                    add to cart
                  </Button>
                )}

                <Typography variant="body1" color={theme.palette.error.light}>
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
