import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { useLocation, Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url(https://wallpaperset.com/w/full/5/4/d/395676.jpg);
  background-size: cover;
  background-repeat: no-repeat;
`;

const MessageDiv = styled.div`
  width: 50%;
  border: solid 1px gray;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 20px 10px #999999;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  color: #333;
`;

const ThankHeader = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  background-color: teal;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 30px;
  color: white;
`;

const SecondHeader = styled.h2`
  margin-top: 40px;
  width: 100%;
  font-weight: 500;
`;

const ReceiptPar = styled.p`
  margin: 40px 0px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.button`
  height: 30px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0d9494;
  }
`;

function PaymentSuccess() {
  const location = useLocation();
  const [checkoutSession, setCheckoutSession] = useState();

  const checkoutSessionID = location.search.split("=")[1];
  console.log(checkoutSessionID);
  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await userRequest.get("/payment/success", {
          params: { session_id: checkoutSessionID },
        });
        console.log(res);
        setCheckoutSession(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReceipt();
  }, [checkoutSessionID]);

  return (
    <Container>
      <MessageDiv>
        <ThankHeader>
          Thankyou {checkoutSession && checkoutSession.customer_details.name}{" "}
        </ThankHeader>
        <SecondHeader>We really appreciate your custom!</SecondHeader>
        <ReceiptPar>
          You will receive a confirmation email from Stripe shortly
        </ReceiptPar>
        <ButtonDiv>
          <Link to="/">
            <Button>Homepage</Button>
          </Link>
        </ButtonDiv>
      </MessageDiv>
    </Container>
  );
}

export default PaymentSuccess;
