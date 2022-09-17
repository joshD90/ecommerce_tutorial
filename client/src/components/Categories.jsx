import React from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categoryData } from "../data/categoryData";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding: 0 })}
`;

const Categories = () => {
  return (
    <Container>
      {categoryData.map((category) => {
        return <CategoryItem data={category} key={category.id} />;
      })}
    </Container>
  );
};

export default Categories;
