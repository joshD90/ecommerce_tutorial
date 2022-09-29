import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

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
          <Product>
            <Image src="https://pagesix.com/wp-content/uploads/sites/3/2022/01/new-blanace.png?w=640" />
            <ProductDetail>
              <Details>
                <ProductName>
                  <b>Product:</b> JESSIE THUNDER SHOES
                </ProductName>
                <ProductId>
                  <b>ID:</b> 123432432
                </ProductId>
                <ProductColorDiv>
                  <ProductColor color="#DDAA36" />
                </ProductColorDiv>
                <ProductSize>
                  <b>Size:</b> 6
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountDiv>
                <Remove style={{ cursor: "pointer" }} />
                <ProductAmount>2</ProductAmount>
                <Add style={{ cursor: "pointer" }} />
              </ProductAmountDiv>
              <ProductPrice>€35.00</ProductPrice>
            </PriceDetail>
          </Product>
          <Hr></Hr>
          <Product>
            <Image src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/dd6a0013-43bc-4e31-9ca5-c787ecba66aa/air-max-pre-day-se-shoes-0ZVbw2.png" />
            <ProductDetail>
              <Details>
                <ProductName>
                  <b>Product:</b> NIKE AIR MAX
                </ProductName>
                <ProductId>
                  <b>ID:</b> 54320754398
                </ProductId>
                <ProductColorDiv>
                  <ProductColor color="Yellow" />
                  <ProductColor color="red" />
                  <ProductColor color="teal" />
                </ProductColorDiv>

                <ProductSize>
                  <b>Size:</b> 6
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountDiv>
                <Remove style={{ cursor: "pointer" }} />
                <ProductAmount>2</ProductAmount>
                <Add style={{ cursor: "pointer" }} />
              </ProductAmountDiv>
              <ProductPrice>€70.00</ProductPrice>
            </PriceDetail>
          </Product>
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemText>$105.00</SummaryItemText>
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
            <SummaryItemText>$105</SummaryItemText>
          </SummaryItem>
          <SummaryButton>PROCEED TO PAYMENT</SummaryButton>
        </Summary>
      </Bottom>
    </Container>
  );
};

export default Cart;
