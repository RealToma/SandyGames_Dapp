import styled from "styled-components";
import { Box } from "@mui/material";
import imgMainBackground from "../../assets/images/background/backTreasure01.jpg";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import { dataTreasureSpots } from "../../data/Treasure";
import { useState } from "react";
import CardTreasureSpot from "../../components/Card/CardTreasureSpot";
import { useEffect } from "react";
import { getStateTreasure } from "../../actions/treasure";
import { useContext } from "react";
import { RefContext } from "../../lib/RefContext";
import { NotificationManager } from "react-notifications";

const Treasure = () => {
  const { preserveLink } = useContext(RefContext);
  const [stateTreasure, setStateTreasure] = useState();

  useEffect(() => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }
    let address = preserveLink.account.address;
    getStateTreasure(dataTreasureSpots, address).then((res) => {
      setStateTreasure(res);
    });
  }, [preserveLink]);

  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
      <TextHeader>Treasure Quests</TextHeader>
      <SectionContent>
        {dataTreasureSpots.map((each, index) => {
          let flagOpenedBox;
          if (
            stateTreasure &&
            stateTreasure[0].flagOpened[index].nameBox === each.name
          ) {
            flagOpenedBox = stateTreasure[0].flagOpened[index].flagOpenedBox;
          }

          return (
            <CardTreasureSpot
              data={each}
              key={index}
              preserveLink={preserveLink}
              flagOpenedBox={flagOpenedBox}
              flagOpenedOnce={stateTreasure && stateTreasure[0].flagLocked}
              setStateTreasure={setStateTreasure}
            />
          );
        })}
      </SectionContent>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
  background-size: 100% 100%;
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
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  @media (max-width: 350px) {
    font-size: 20px;
  }
`;

const SectionContent = styled(Box)`
  display: grid;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  transition: 0.3s;
  @media (max-width: 1440px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 700px) {
    margin-top: 70px;
  }
  @media (max-width: 500px) {
    margin-top: 50px;
  }
`;

export default Treasure;
