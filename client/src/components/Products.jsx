import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data/popularProductsData";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/", {
          params: { qCategory: cat },
        });
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    Object.keys(filters).length === 0
      ? setFilteredProducts(products)
      : setFilteredProducts(
          products.filter((item) => {
            const myFilters = Object.entries(filters);

            return myFilters.every(([key, value]) => {
              return item[key].includes(value);
            });
          })
        );
  }, [cat, products, filters]);

  return (
    <Container>
      {filteredProducts.map((item, index) => {
        return <Product item={item} key={index} />;
      })}
    </Container>
  );
};

export default Products;
