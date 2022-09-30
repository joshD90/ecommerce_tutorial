import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";

const Container = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTextDiv = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;

  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", alignItems: "center" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ width: "100%" })}
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColorDiv = styled.div`
  display: flex;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductAmountDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 20px" })}
`;

const ProductPrice = styled.div`
  margin-top: 20px;
  font-weight: 200;
  font-size: 30px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #bbb;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const SummaryItemText = styled.span`
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const submitCheckout = async () => {
    try {
      const res = await userRequest.post("/payment/", {
        items: cart.products.map((product) => {
          return { id: product._id, quantity: product.quantity };
        }),
      });
      window.location = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cart);
  return (
    <Container>
      <Title>YOUR BAG</Title>
      <Top>
        <TopButton>CONTINUE SHOPPING</TopButton>

        <TopTextDiv>
          <TopText>Shopping Bag (2)</TopText>
          <TopText>Your Wishlist</TopText>
        </TopTextDiv>
        <TopButton type="filled">CHECKOUT NOW</TopButton>
      </Top>
      <Bottom>
        <Info>
          {cart.products.map((product, index) => (
            <Product key={index}>
              <Image src={product.img} />
              <ProductDetail>
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColorDiv>
                    <ProductColor color={product.color} />
                  </ProductColorDiv>
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountDiv>
                  <Remove style={{ cursor: "pointer" }} />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Add style={{ cursor: "pointer" }} />
                </ProductAmountDiv>
                <ProductPrice>
                  € {product.price * product.quantity}
                </ProductPrice>
              </PriceDetail>
              <Hr></Hr>
            </Product>
          ))}
        </Info>

        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemText>${cart.total}</SummaryItemText>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping</SummaryItemText>
            <SummaryItemText>$6.00</SummaryItemText>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping Discount</SummaryItemText>
            <SummaryItemText>€-5.90</SummaryItemText>
          </SummaryItem>

          <SummaryItem>
            <SummaryItemText type="total">Total</SummaryItemText>
            <SummaryItemText>${cart.total + 6 - 5.9}</SummaryItemText>
          </SummaryItem>
          <SummaryButton onClick={submitCheckout}>
            PROCEED TO PAYMENT
          </SummaryButton>
        </Summary>
      </Bottom>
    </Container>
  );
};

export default Cart;
