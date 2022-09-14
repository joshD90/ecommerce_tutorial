import React from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categoryData } from "../data/categoryData";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
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
