import styled from "styled-components";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
// import { useState } from "react";

const Layout = ({ children }) => {
  return (
    <StyledComponent>
      <Header />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
`;

const Content = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 350px;
  box-sizing: border-box;

  transition: 0.3s;
  @media (max-width: 1440px) {
    padding: 0px 300px;
  }
  @media (max-width: 1023px) {
    padding: 0px 100px;
  }
  @media (max-width: 768px) {
    padding: 0px 80px;
  }
  @media (max-width: 450px) {
    padding: 0px 70px;
  }
  @media (max-width: 390px) {
    padding: 0px 50px;
  }
`;

export default Layout;
