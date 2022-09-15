import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div``;

const ProductList = () => {
  return (
    <Container>
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>Filter 1</Filter>
        <Filter>Filter 2</Filter>
        <Filter>Filter 3</Filter>
      </FilterContainer>
    </Container>
  );
};

export default ProductList;
