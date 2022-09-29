import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;
const Title = styled.h1`
  color: #222;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: #444;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ data }) => {
  return (
    <Link to={`/products/${data.cat}`}>
      <Container>
        <Image src={data.img} />
        <Info>
          <Title>{data.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Container>
    </Link>
  );
};

export default CategoryItem;
