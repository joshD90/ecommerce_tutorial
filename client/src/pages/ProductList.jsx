import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState(
    `${cat.slice(0, 1).toUpperCase()}${cat.slice(1, cat.length)}`
  );

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

  return (
    <Container>
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="size" defaultValue="Size" onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
          <Select defaultValue="Colors" name="color" onChange={handleFilter}>
            <Option disabled>Colors</Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select
            defaultValue="Newest"
            onChange={(e) => setSort(e.target.value)}
          >
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
