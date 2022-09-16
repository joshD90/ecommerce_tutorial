import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import styled from "styled-components";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

const Container = styled.div``;

const Layout = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Outlet />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Layout;
