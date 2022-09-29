import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

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
  return (
    <Wrapper>
      <ImageContainer>
        <Image src="https://cdn.shopify.com/s/files/1/0293/9277/products/07-16-20Studio1_RM_DJ_14-52-04_41_RC42044_DarkWash_4135_RA_468x.jpg?v=1594941813" />
      </ImageContainer>
      <InfoContainer>
        <div style={{ padding: "0 50px" }}>
          <Title>Denim Jumpsuit</Title>
          <Description>
            This chic Denim Jumpsuit will meet all your summer needs from
            parties to casual days in.
          </Description>
          <Price>$20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="blue" />
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
                <FilterSizeOption>XXL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove style={{ cursor: "pointer" }} />
              <Amount>1</Amount>
              <Add style={{ cursor: "pointer" }} />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </div>
      </InfoContainer>
    </Wrapper>
  );
};

export default SingleProduct;
