import styled from "styled-components";
import { Box } from "@mui/material";
import { dataCollection, dataCollectionLimited } from "../../data/Collection";
import CardSuit from "../../components/Card/CardSuit";
import imgMainBackground from "../../assets/images/background/backCollection01.png";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import CardLimitedSuit from "../../components/Card/CardLimitedSuit";

const Collection = () => {
  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
      <TextHeader>SANDY's Collcection</TextHeader>
      <SectionSuit>
        {dataCollection.map((each, index) => {
          return <CardSuit key={index} index={index} each={each} />;
        })}
      </SectionSuit>

      <TextHeaderLimited>Limited SANDY's Collection</TextHeaderLimited>
      <SectionSuitLimited>
        {dataCollectionLimited.map((each, index) => {
          return <CardLimitedSuit key={index} index={index} each={each} />;
        })}
      </SectionSuitLimited>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const TextHeader = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  color: white;
  margin-top: 80px;
  z-index: 13;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 26px;
  }
  @media (max-width: 1023px) {
    margin-top: 150px;
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

const TextHeaderLimited = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  color: white;
  z-index: 13;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 26px;
  }
  @media (max-width: 1023px) {
    font-size: 24px;
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  @media (max-width: 390px) {
    font-size: 20px;
  }
`;

const SectionSuit = styled(Box)`
  display: grid;
  margin-top: 100px;
  margin-bottom: 100px;
  grid-template-columns: 1fr 1fr;

  transition: 0.3s;
  @media (max-width: 1024px) {
    margin-top: 70px;
    margin-bottom: 80px;
  }
  @media (max-width: 700px) {
    margin-top: 70px;
    margin-bottom: 60px;
  }
  @media (max-width: 500px) {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  @media (max-width: 390px) {
    margin-top: 40px;
    margin-bottom: 50px;
  }
`;

const SectionSuitLimited = styled(Box)`
  display: grid;
  margin-top: 100px;
  margin-bottom: 150px;
  grid-template-columns: 1fr 1fr;

  transition: 0.3s;
  @media (max-width: 1024px) {
    margin-top: 70px;
    margin-bottom: 120px;
  }
  @media (max-width: 700px) {
    margin-top: 70px;
    margin-bottom: 100px;
  }
  @media (max-width: 500px) {
    margin-top: 50px;
    margin-bottom: 120px;
  }
  @media (max-width: 390px) {
    margin-top: 40px;
  }
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

export default Collection;
