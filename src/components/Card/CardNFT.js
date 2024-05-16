import styled from "styled-components";
import { Box } from "@mui/material";
import imgBack01 from "../../assets/images/background/Card/cardBack01.png";
import imgBack02 from "../../assets/images/background/Card/cardBack02.png";
// import imgSoul from "../../assets/images/icon/coin/soul.png";
import ButtonLike from "../Button/ButtonLike";
import { shortAddress } from "../../lib/WalletToolKit/WalletFunctions";
// import imgAvatar from "../../assets/images/icon/avatar/avatar02.jpg";
import { useContext } from "react";
import { RefContext } from "../../lib/RefContext";
import { NotificationManager } from "react-notifications";
import { PhantasmaTS } from "phantasma-ts";
import { CircularProgressbar } from "react-circular-progressbar";
import { useState } from "react";
import { getBodyNft } from "../../lib/WalletToolKit/toolkit";

const CardNFT = ({ data, setNFTsOwned }) => {
  const { preserveLink } = useContext(RefContext);
  const [flagClickedReveal, setFlagClickedReveal] = useState(false);
  const numberMint = 70;
  const [progressMint, setProgressMint] = useState(0);

  const getObjectValue = (objectArray) => {
    if (objectArray === null || objectArray === undefined) {
      return false;
    }
    if (objectArray.find((obj) => obj.key === "Revealed").value === "true") {
      return true;
    } else {
      return false;
    }
  };

  const handleTimeSandy = () => {
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentHour = currentDateTime.getHours(); // Get current hour (0-23)

    if (currentDay === 6 && currentHour >= 13) {
      // Saturday after 1PM
      return true;
    } else if (currentDay > 6) {
      // Next week
      return true;
    } else {
      return false;
    }
  };

  const handleReveal = async (data) => {
    const nowTime = new Date();
    const offset = 7 - nowTime.getDay();

    nowTime.setMilliseconds(0);
    nowTime.setSeconds(0);
    nowTime.setHours(0);
    nowTime.setDate(nowTime.getDate() + offset);

    console.log("now:", nowTime.getTime() / 1000);
    console.log("sat:", nowTime.getTime() / 1000 / (24 * 60 * 60));
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }

    let gasPrice = 100000;
    let gasLimit = 9999999;

    let funcName;

    if (data.series === "1") {
      funcName = "revealBodyNFT";
      // let timeCreated = parseInt(
      //   data.properties.find((obj) => obj.key === "Created").value
      // );
      // const currentTime = new Date().toLocaleString("en-US", {
      //   timeZone: "America/New_York",
      // });
      // const milisecondsNow = new Date(currentTime).getTime();
      // if (1000 * 60 * 60 * 24 * 2 > milisecondsNow - timeCreated * 1000) {
      //   var milisecsRemain = 1000 * 60 * 60 * 24 * 2 + timeCreated * 1000;
      //   var dateRemain = new Date(milisecsRemain).toLocaleString("en-US", {
      //     timeZone: "America/New_York",
      //   });
      //   return NotificationManager.info(
      //     `Please wait until ${dateRemain} to reveal your naked Sandy.`,
      //     "Hi!",
      //     3000
      //   );
      // }
      if (!handleTimeSandy()) {
        return NotificationManager.info(
          `Please wait until Sat 1PM to reveal your Sandy.`,
          "Hi!",
          3000
        );
      }
    } else if (data.series === "2") {
      funcName = "revealTreasure";
    } else if (data.series === "3") {
      const estTimezone = "America/New_York";

      // Create a new date object with the current date and time in EST
      const now = new Date().toLocaleString("en-US", { timeZone: estTimezone });

      // Get the day of the week (0-6, where 0 is Sunday)
      const currentDay = new Date(now).getDay();

      // Calculate the number of days until Saturday (weekday number 6)
      const daysUntilSaturday = (6 - currentDay + 7) % 7;

      // Calculate the number of milliseconds until Saturday
      const startTimeHours = 0;
      const startTimeMinutes = 0;
      const startTimeSeconds = 0;

      // Create a new date object for this week's Saturday start time
      const startTime = new Date(now);
      startTime.setDate(startTime.getDate() + daysUntilSaturday);
      startTime.setHours(startTimeHours, startTimeMinutes, startTimeSeconds, 0);

      // Calculate the difference in milliseconds between now and the start time of Saturday
      const differenceInMilliseconds = startTime - new Date(now);
      const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (differenceInMilliseconds % (1000 * 60)) / 1000
      );

      if (differenceInMilliseconds > 0) {
        return NotificationManager.info(
          `Please wait ${hours}h ${minutes}m ${seconds}s to reveal your outfit.`,
          "Hi!",
          5000
        );
      }

      funcName = "revealOutfit";
    }
    console.log("funcname:", funcName);

    NotificationManager.info("Please check your poltergeist wallet.", "", 3000);
    setFlagClickedReveal(true);
    if (flagClickedReveal) {
      return NotificationManager.warning(
        "Please wait for a second.",
        "Processing!",
        3000
      );
    }

    const intervalProgress = setInterval(() => {
      setProgressMint((oldProgress) => {
        if (oldProgress >= 70) {
          return 70;
        }
        let diff;
        if (100 % numberMint === 0) {
          diff = 100 / numberMint;
        } else {
          diff = 100 / (numberMint - 0.3);
        }

        return parseInt(Math.min(oldProgress + diff, 70));
      });
    }, 50);

    let addressTo = preserveLink.account.address;
    const ContractName = process.env.REACT_APP_CONTRACT;

    let sb = new PhantasmaTS.ScriptBuilder();
    const payload = PhantasmaTS.Base16.encode("Mint Sandy");
    let script = sb
      .BeginScript()
      .AllowGas(addressTo, sb.NullAddress, gasPrice, gasLimit)
      .CallContract(ContractName, funcName, [addressTo, data.id])
      .SpendGas(addressTo)
      .EndScript();
    preserveLink.signTx(
      script,
      payload,
      function (tx) {
        console.log("This was Successful" + tx);
        clearInterval(intervalProgress);
        const intervalProgressHundred = setInterval(() => {
          setProgressMint((oldProgress) => {
            if (oldProgress >= 100) {
              return 100;
            }
            return parseInt(Math.min(oldProgress + 7, 100));
          });
        }, 200);

        setTimeout(async () => {
          NotificationManager.success(
            "Please check your inventory.",
            "Success!",
            3000
          );
          let tempNFTs = await getBodyNft(preserveLink);
          console.log(tempNFTs);
          let arrayNFTs = [];

          for (let i = 0; i < tempNFTs.length; i++) {
            arrayNFTs.push(tempNFTs[i]);
          }
          setNFTsOwned(arrayNFTs);
          // window.location.reload();
          setProgressMint(0);
          setFlagClickedReveal(false);
          clearInterval(intervalProgressHundred);
        }, 2000);
      },
      function () {
        NotificationManager.error("Try it again!", "Failed!", 3000);
        clearInterval(intervalProgress);
        setProgressMint(0);
        setFlagClickedReveal(false);
      }
    );
  };

  return (
    <StyledComponent>
      <SectionTitle>
        <TextTitle>{data && data.properties[0].value}</TextTitle>
        <ButtonLike />
      </SectionTitle>
      <SectionCreator>
        {/* <ImgAvatar>
          <img
            src={imgAvatar}
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "100%" }}
            alt=""
          />
        </ImgAvatar> */}
        <SectionTextCreator>
          <TextCreator01>Creator :</TextCreator01>
          <TextCreator02>{shortAddress(data.creatorAddress)}</TextCreator02>
        </SectionTextCreator>
      </SectionCreator>
      <SectionCreator>
        <SectionTextCreator>
          <TextCreator01>Owner :</TextCreator01>
          <TextCreator02>{shortAddress(data.ownerAddress)}</TextCreator02>
        </SectionTextCreator>
      </SectionCreator>
      <SectionImage>
        {getObjectValue(data.properties) ? (
          <SectionImgNFTImage>
            <img
              src={data.properties.find((obj) => obj.key === "ImageURL").value}
              width={"100%"}
              alt=""
            />
          </SectionImgNFTImage>
        ) : (
          <SectionImgNFTVideo>
            <video
              autoPlay
              loop
              controls
              muted
              src={data.properties.find((obj) => obj.key === "ImageURL").value}
              width={"100%"}
              alt=""
            />
          </SectionImgNFTVideo>
        )}
        {getObjectValue(data.properties) ? (
          <ImgBackStar01>
            <img src={imgBack01} alt="" />
          </ImgBackStar01>
        ) : (
          <></>
        )}
        {getObjectValue(data.properties) ? (
          <ImgBackStar02>
            <img src={imgBack02} alt="" />
          </ImgBackStar02>
        ) : (
          <></>
        )}
      </SectionImage>

      <SectionFooter>
        {getObjectValue(data.properties) ? (
          <SectionTextReveal>
            This NFT is already revealed.
            {/* Description:{" "}
            {data.properties.find((obj) => obj.key === "Description").value} */}
          </SectionTextReveal>
        ) : (
          <SectionTextReveal>
            Please click to reveal this NFT.
          </SectionTextReveal>
        )}

        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* <SectionPrice>
            <ImgChain>
              <img src={imgSoul} width={"100%"} height={"100%"} alt="" />
            </ImgChain>
            <SectionTextPrice>
              <TextPrice02>100</TextPrice02>
              <TextPrice01 ml={"2px"}>SOUL</TextPrice01>
            </SectionTextPrice>
          </SectionPrice> */}

          {getObjectValue(data.properties) ? (
            <SectionProperties>
              <SectionGenre>
                <TextSubjectProperties>Genre</TextSubjectProperties>
                <TextContentProperties>
                  {data.properties&& data.properties.find((obj) => obj.key === "Genre")?.value}
                </TextContentProperties>
              </SectionGenre>
              <SectionType>
                <TextSubjectProperties>Type</TextSubjectProperties>
                <TextContentProperties>
                  {
                    data.properties&&data.properties.find((obj) => obj.key === "TreasureType")?.value
                  }
                </TextContentProperties>
              </SectionType>
            </SectionProperties>
          ) : (
            <ButtonTreasure
              onClick={() => {
                handleReveal(data);
              }}
              active={!flagClickedReveal ? 1 : 0}
            >
              {!flagClickedReveal ? (
                <TextMintButton>Reveal</TextMintButton>
              ) : (
                <SectionProgressMint>
                  <TextMintButton>Processing</TextMintButton>
                  <SectionCircleProgress>
                    <CircularProgressbar
                      value={progressMint}
                      text={`${progressMint}%`}
                      styles={{
                        // Customize the path, i.e. the "completed progress"
                        path: {
                          // Path color
                          stroke: `white`,
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Customize transition animation
                          transition: "stroke-dashoffset 0.5s ease 0s",
                          // Rotate the path
                          transformOrigin: "center center",
                        },
                        // Customize the circle behind the path, i.e. the "total progress"
                        trail: {
                          // Trail color
                          stroke: "rgba(255,255,255,0.3)",
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",
                          // Rotate the trail
                          transformOrigin: "center center",
                        },
                        // Customize the text
                        text: {
                          // Text color
                          fill: "white",
                          // Text size
                          fontFamily: "Poppins",
                          fontSize: "30px",
                          fontWeight: "600",
                        },
                        // Customize background - only used when the `background` prop is true
                        background: {
                          fill: "white",
                        },
                      }}
                    />
                  </SectionCircleProgress>
                </SectionProgressMint>
              )}
            </ButtonTreasure>
          )}
        </Box>
      </SectionFooter>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  /* background: linear-gradient(
    205deg,
    rgba(112, 112, 114, 0.3) 0.07%,
    rgb(74 38 0 / 15%) 99.07%
  ); */
  background: #cea065;
  /* background: linear-gradient(
    95.3deg,
    rgba(236, 132, 36, 0.62) 0.6%,
    rgba(255, 122, 0, 0.43) 99.8%
  ); */
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 51;

  cursor: pointer;
  &:hover {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.5);
  }

  transition: 0.3s;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TextTitle = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height, or 130% */

  /* White */

  color: #ffffff;

  transition: 0.3s;
  @media (max-width: 1600px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SectionCreator = styled(Box)`
  display: flex;
  align-items: center;
`;

// const ImgAvatar = styled(Box)`
//   width: 40px;
//   height: 40px;
//   margin-right: 14px;

//   transition: 0.3s;
//   @media (max-width: 768px) {
//     width: 30px;
//     height: 30px;
//     margin-right: 10px;
//   }
// `;

const SectionTextCreator = styled(Box)`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  /* justify-content: space-between; */
`;

const TextCreator01 = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  /* identical to box height, or 157% */
  color: white;
  text-transform: capitalize;
  margin-right: 5px;
  /* White */

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const TextCreator02 = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  /* identical to box height, or 129% */

  /* White */

  color: #e16c00;
  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const SectionImage = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  border-radius: 15px;
  margin-top: 16px;

  transition: 0.3s;
  @media (max-width: 768px) {
    margin-top: 12px;
    border-radius: 12px;
  }
`;

const ImgBackStar01 = styled(Box)`
  position: absolute;
  left: 15px;
  top: 15px;
  transition: 0.3s;
  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
  }
`;

const ImgBackStar02 = styled(Box)`
  position: absolute;
  right: 15px;
  bottom: 15px;
  transition: 0.3s;
  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
  }
`;

const SectionFooter = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* transition: 0.3s;
  @media (max-width: 1600px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 390px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  } */
`;

// const SectionPrice = styled(Box)`
//   display: flex;
//   align-items: center;
//   margin-right: 10px;

//   /* transition: 0.3s;
//   @media (max-width: 768px) {
//     margin-right: unset;
//   } */
// `;
// const ImgChain = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 25px;
//   min-width: 25px;
//   aspect-ratio: 1;
//   margin-right: 10px;
//   > img {
//   }

//   transition: 0.3s;
//   @media (max-width: 768px) {
//     min-width: 25px;
//   }
// `;

// const SectionTextPrice = styled(Box)`
//   display: flex;
//   align-items: center;
// `;

// const TextPrice01 = styled(Box)`
//   font-family: "Poppins";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   /* identical to box height, or 157% */

//   text-transform: capitalize;

//   /* White */

//   color: #ffffff;
//   transition: 0.3s;
//   @media (max-width: 768px) {
//     font-size: 12px;
//   }
// `;

// const TextPrice02 = styled(Box)`
//   font-family: "Poppins";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 14px;
//   /* identical to box height, or 129% */

//   /* White */

//   color: #ffffff;
//   transition: 0.3s;
//   @media (max-width: 768px) {
//     font-size: 12px;
//   }
// `;

// const ButtonPurchase = styled(Box)`
//   display: flex;
//   flex: 1;
//   width: 100%;
//   height: 40px;
//   justify-content: center;
//   align-items: center;
//   /* background-color: white; */
//   color: white;
//   border: 2px solid white;
//   border-radius: 50px;
//   font-family: "Poppins";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 27px;
//   /* identical to box height, or 150% */
//   user-select: none;
//   cursor: pointer;
//   transition: 0.3s;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//   &:hover {
//     text-shadow: 0px 0px 5px;
//   }

//   /* transition: 0.3s;
//   @media (max-width: 1600px) {
//     margin-top: 10px;
//   } */

//   @media (max-width: 768px) {
//     height: 30px;
//     font-size: 14px;
//   }
// `;

const SectionImgNFTImage = styled(Box)`
  display: flex;
  /* position: absolute; */
  width: 100%;
  border-radius: 13px;
  border: 1.8px dashed white;
  > img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
  }
`;

const SectionImgNFTVideo = styled(Box)`
  display: flex;
  /* position: absolute; */
  width: 100%;
  border-radius: 13px;
  border: 1.8px dashed white;
  > video {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
  }
`;

const SectionTextReveal = styled(Box)`
  display: flex;
  width: 100%;
  margin: 20px 0px 0px 0px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  /* height: 26px; */
  margin-bottom: 5px;
`;

const ButtonTreasure = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 40px;

  background: #ec8424;

  border-radius: 12px;

  cursor: ${({ active }) => (active ? "pointer" : "wait")};
  user-select: none;
  transition: 0.3s;
  &:hover {
    > div:nth-child(1) {
      text-shadow: ${({ active }) => (active ? "0px 0px 10px" : "unset")};
    }

    box-shadow: ${({ active }) =>
      active ? "2px 2px 2px rgba(0, 0, 0, 0.5)" : "unset"};
  }
`;

const SectionProperties = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  transition: 0.3s;
`;

const TextMintButton = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: white;
  transition: 0.3s;
`;

const SectionProgressMint = styled(Box)`
  display: flex;
  align-items: center;
`;

const SectionCircleProgress = styled(Box)`
  display: flex;
  margin-left: 10px;
  width: 25px;
`;

const SectionGenre = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  border: 1px solid #ec8424;
  border-radius: 8px;
  padding: 0px 0px 0px 5px;
  box-sizing: border-box;
  flex-direction: column;
`;

const SectionType = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  border: 1px solid #ec8424;
  border-radius: 8px;
  padding: 0px 0px 0px 5px;
  box-sizing: border-box;
  flex-direction: column;
`;

const TextSubjectProperties = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-size: 10px;
  color: white;
  transition: 0.3s;
  cursor: pointer;
`;

const TextContentProperties = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-size: 12px;
  color: #e16c00;
  transition: 0.3s;
  cursor: pointer;
`;

export default CardNFT;
