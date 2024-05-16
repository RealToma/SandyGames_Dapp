import styled from "styled-components";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <StyledComponent>
      SANDY
      <span style={{ fontFamily: "Poppins" }}>
        , a product on Phantasma, © 2023. | All Right Reserved.
      </span>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: fixed;
  bottom: 0px;
  height: 60px;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* font-family: "Poppins"; */
  font-size: 0.8rem;
  color: white;
  background: #ec8424;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 300;

  transition: 0.3s;
  @media (max-width: 500px) {
    font-size: 0.7rem;
  }
  @media (max-width: 390px) {
    position: fixed;
    bottom: 0px;
  }
  @media (max-width: 360px) {
    font-size: 0.6rem;
  }
`;

export default Footer;
