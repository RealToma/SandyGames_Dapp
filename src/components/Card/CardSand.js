import styled from "styled-components";
import { Box } from "@mui/material";
import { NotificationManager } from "react-notifications";

const CardSand = ({
  data,
  setFlagStep,
  setSandyType,
  preserveLink,
  countsRemainingMint,
  countsTotalMint,
}) => {
  const isButtonClickAllowed = () => {
    // /* based on est time */
    // const currentDateTime = new Date();
    // const estOffset = -5; // Eastern Standard Time offset in hours
    // const estCurrentDateTime = new Date(
    //   currentDateTime.getTime() + estOffset * 60 * 60 * 1000
    // ); // Adjust current date and time based on EST offset

    // const currentDay = estCurrentDateTime.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    // const currentHour = estCurrentDateTime.getHours(); // Get current hour (0-23)

    // if (currentDay === 4 && currentHour >= 12) {
    //   // Thursday after 12pm EST
    //   return true;
    // } else if (currentDay === 5 || currentDay === 6) {
    //   // Friday or Saturday
    //   return true;
    // } else if (currentDay === 0 && currentHour < 12) {
    //   // Sunday before 12pm EST
    //   return true;
    // } else {
    //   return false;
    // }
    /*based on  local time */
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentHour = currentDateTime.getHours(); // Get current hour (0-23)

    if (currentDay === 4 && currentHour >= 12) {
      // Thursday after 12pm
      return true;
    } else if (currentDay === 5 || currentDay === 6) {
      // Friday or Saturday
      return true;
    } else if (currentDay === 0 && currentHour < 12) {
      // Sunday before 12pm
      return true;
    } else {
      return false;
    }
  };
  return (
    <StyledComponent
      onClick={() => {
        if (!isButtonClickAllowed()) {
          return NotificationManager.info(
            "You can mint Sandy between Thur 12PM and Sat 12PM.",
            "Hi!",
            3000
          );
        }
        if (countsRemainingMint <= 0) {
          return NotificationManager.warning(
            "Count is zero, please choose other one or wait.",
            "",
            3000
          );
        }
        if (preserveLink === undefined || preserveLink === null) {
          return NotificationManager.error(
            "Please connect your wallet.",
            "",
            3000
          );
        }
        setFlagStep(1);
        setSandyType(data.name);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <SectionTitle>{data.name}</SectionTitle>
      <TextCount>
        ({countsRemainingMint}/{countsTotalMint})
      </TextCount>
      <Box>
        <SectionImage>
          <img src={data.img} width={"100%"} alt="" />
        </SectionImage>
      </Box>

      <SectionDescription>{data.description}</SectionDescription>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  > div:nth-child(3) {
    transition: 0.3s;
  }
  &:hover {
    > div:nth-child(3) {
      filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
    }
    > div:nth-child(3) > div > img {
      transform: scale(1.2);
    }
    > div:nth-child(1) {
      text-shadow: 0px 0px 10px;
    }
    /* > div:nth-child(2) {
      text-shadow: 0px 0px 10px;
    } */
    > div:nth-child(4) {
      text-shadow: 0px 0px 6px;
    }
  }
`;

const SectionImage = styled(Box)`
  display: flex;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;

  > img {
    transition: 0.3s;
    border-radius: 12px;
  }
`;

const SectionTitle = styled(Box)`
  transition: 0.3s;
  font-size: 24px;
  font-weight: 600;
  line-height: 120%;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0px 0px 3px black;
  /* font-family: "Poppins"; */

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
  @media (max-width: 390px) {
    font-size: 16px;
  }
`;

const TextCount = styled(Box)`
  transition: 0.3s;
  font-size: 20px;
  font-weight: 500;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0px 0px 3px black;
  font-family: "Poppins";

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 18px;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
  @media (max-width: 390px) {
    font-size: 14px;
  }
`;

const SectionDescription = styled(Box)`
  display: flex;
  width: 80%;
  transition: 0.3s;
  margin-top: 20px;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  line-height: 120%;
  color: white;
  text-shadow: 0px 0px 3px black;
  /* font-family: "Poppins"; */

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 13px;
  }
  @media (max-width: 1200px) {
    font-size: 11px;
    margin-top: 10px;
  }
  @media (max-width: 1023px) {
    font-size: 13px;
  }
  @media (max-width: 768px) {
    font-size: 11px;
  }
  @media (max-width: 390px) {
    font-size: 10px;
  }
`;

export default CardSand;
