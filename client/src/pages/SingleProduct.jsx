import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../responsive";
import { userRequest, publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  width: 100vw;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;
const ImageContainer = styled.div`
  flex: 1;
  width: 50%;
  ${mobile({ width: "100%", border: "solid 1px black", height: "100px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "50vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  width: 50%;
  ${mobile({ width: "100%", flexDirection: "column" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0;
  ${mobile({ flexDirection: "column", margin: "20px 0px" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  ${mobile({ marginBottom: "10px" })}
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;

  ${mobile({
    flexDirection: "column",
    margin: "10px",
    width: "60%",
    margin: "auto",
    alignSelf: "center",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.span`
  font-weight: 700;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid teal;
  font-size: 20px;
  margin: 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f0f0;
  }
`;

const SingleProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeQuantity = (direction) => {
    setQuantity((prev) => (prev + direction !== 0 ? prev + direction : 1));
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    requestData();
  }, [productId]);

  const addToCart = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Wrapper>
      <ImageContainer>
        <Image src={product && product.img} />
      </ImageContainer>
      <InfoContainer>
        <div style={{ padding: "0 50px" }}>
          <Title>{product && product.title}</Title>
          <Description>{product && product.desc}</Description>
          <Price>{product && `€ ${product.price}`}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product &&
                product.color.map((elem) => (
                  <FilterColor
                    color={elem}
                    key={elem}
                    onClick={(e) => setColor(e.target.getAttribute("color"))}
                  />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product &&
                  product.size.map((elem) => (
                    <FilterSizeOption key={elem}>{elem}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ cursor: "pointer" }}
                onClick={() => changeQuantity(-1)}
              />
              <Amount>{quantity}</Amount>
              <Add
                style={{ cursor: "pointer" }}
                onClick={() => changeQuantity(1)}
              />
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </div>
      </InfoContainer>
    </Wrapper>
  );
};

export default SingleProduct;
