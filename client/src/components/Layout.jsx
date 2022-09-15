import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import styled from "styled-components";

const Container = styled.div``;

const Layout = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default Layout;
