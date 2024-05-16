import styled from "styled-components";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgMainBackground from "../../assets/images/background/mainBackground.png";
import imgMainBackgroundMobile from "../../assets/images/background/mainBackground_mobile.png";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";

const Landing = () => {
  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const BackgroundMain = styled(Box)`
  display: flex;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background-image: url(${imgMainBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.3s;
  @media (max-width: 768px) {
    background-size: 120% 120%;
  }
  @media (max-width:500px) {
    background-size: cover;
    background-image: url(${imgMainBackgroundMobile});
  }
`;

// const BackgroundFilter = styled(Box)`
//   display: flex;
//   position: fixed;
//   left: 0px;
//   top: 0px;
//   width: 100%;
//   height: 100vh;
//   background-image: url(${imgFilterBackground});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

export default Landing;
