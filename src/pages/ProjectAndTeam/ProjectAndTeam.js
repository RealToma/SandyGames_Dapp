import styled from "styled-components";
import { Box } from "@mui/material";
import imgMainBackground from "../../assets/images/background/backProjectAndTeam01.jpg";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import { dataRoadmap } from "../../data/Roadmap";
import { RiCheckDoubleFill } from "react-icons/ri";
import { MdMoreTime } from "react-icons/md";
import { VscTools } from "react-icons/vsc";
import { dataTeam } from "../../data/Team";
import { FaDiscord, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiTreasureMap } from "react-icons/gi";
import MovingText from "react-moving-text";
import { useContext } from "react";
import { RefContext } from "../../lib/RefContext";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  callMintTreasure,
  getStateTreasureOnce,
  setStateTreasureOnce,
} from "../../actions/treasure";
import ConfettiExplosion from "react-confetti-explosion";
import {
  dataWardrobeBackgrounds,
  dataWardrobeEye,
  dataWardrobeMouth,
} from "../../data/Wardrobe";
import { randomInt } from "../../lib/Functions/Operations";
import { Shake } from "reshake";

const ProjectAndTeam = () => {
  const { preserveLink } = useContext(RefContext);
  const [flagOpenPass, setFlagOpenPass] = useState(false);
  const [flagShakeModal, setFlagShakeModal] = useState(false);
  const [passcode, setPasscode] = useState();
  const [flagOpenTreasureOnce, setFlagOpenTreasureOnce] = useState(false);
  const [dataTreasureRandom, setDataTreasureRandom] = useState();
  const numberMint = 70;
  const [progressMint, setProgressMint] = useState(0);
  const [flagClickedMint, setFlagClickedMint] = useState(false);
  const [flagSuccessMint, setFlagSuccessMint] = useState(false);

  const handleCheckPasscode = () => {
    if (passcode === null || passcode === "") {
      setFlagShakeModal(true);
      NotificationManager.error("Type your passcode!", "", 1000);
      setTimeout(() => {
        setFlagShakeModal(false);
      }, 500);
      return;
    }
    if (passcode !== "GM") {
      setFlagShakeModal(true);
      NotificationManager.error("Wrong passcode!", "", 1000);
      setTimeout(() => {
        setFlagShakeModal(false);
      }, 500);
      return;
    } else {
      if (preserveLink === undefined || preserveLink === null) {
        return NotificationManager.error(
          "Please connect your wallet.",
          "",
          3000
        );
      }
      setFlagOpenTreasureOnce(true);
      handleCreateRandomTreasureImage();
    }
  };

  const handleModalOnceTreasure = () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.error("Please connect your wallet.", "", 3000);
    }
    getStateTreasureOnce(preserveLink.account.address).then((res) => {
      if (res.success) {
        if (res.flagOpened === false) {
          setFlagOpenPass(true);
        } else {
          return NotificationManager.warning("You already got one!", "", 3000);
        }
      }
    });
  };

  const handleCreateRandomTreasureImage = () => {
    let randomCountBack = randomInt(dataWardrobeBackgrounds.length);
    let randomCountEye = randomInt(dataWardrobeEye.length);
    let randomCountMouth = randomInt(dataWardrobeMouth.length);

    let randomType = randomInt(3);
    let type, name, imgUrl;
    if (randomType === 0) {
      type = "Backgrounds";
      name = dataWardrobeBackgrounds[randomCountBack].name;
      imgUrl =
        "/assets/images/Treasure Chests/Treasure Chest 1/Backgrounds vr1/" +
        name +
        ".png";
    } else if (randomType === 1) {
      type = "Eyes";
      name = dataWardrobeEye[randomCountEye].name;
      imgUrl =
        "/assets/images/Treasure Chests/Treasure Chest 1/Eyes/" + name + ".png";
    } else if (randomType === 2) {
      type = "Mouths";
      name = dataWardrobeMouth[randomCountMouth].name;
      imgUrl =
        "/assets/images/Treasure Chests/Treasure Chest 1/Mouths/" +
        name +
        ".png";
    }

    let tempImgTreasureRandom = {
      type: type,
      name: name,
      src: imgUrl,
    };

    setDataTreasureRandom(tempImgTreasureRandom);
  };

  const handleMintTreausreOnce = async () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.error("Please connect your wallet.", "", 3000);
    }
    setFlagClickedMint(true);
    if (flagClickedMint === true) {
      return NotificationManager.warning(
        "Please wait for a second.",
        "Processing!",
        3000
      );
    }

    const intervalRandom = setInterval(() => {
      let randomCountBack = randomInt(dataWardrobeBackgrounds.length);
      let randomCountEye = randomInt(dataWardrobeEye.length);
      let randomCountMouth = randomInt(dataWardrobeMouth.length);

      let randomType = randomInt(3);
      let type, name, imgUrl;
      if (randomType === 0) {
        type = "Backgrounds";
        name = dataWardrobeBackgrounds[randomCountBack].name;
        imgUrl =
          "/assets/images/Treasure Chests/Treasure Chest 1/Backgrounds vr1/" +
          name +
          ".png";
      } else if (randomType === 1) {
        type = "Eyes";
        name = dataWardrobeEye[randomCountEye].name;
        imgUrl =
          "/assets/images/Treasure Chests/Treasure Chest 1/Eyes/" +
          name +
          ".png";
      } else if (randomType === 2) {
        type = "Mouths";
        name = dataWardrobeMouth[randomCountMouth].name;
        imgUrl =
          "/assets/images/Treasure Chests/Treasure Chest 1/Mouths/" +
          name +
          ".png";
      }

      let tempImgTreasureRandom = {
        type: type,
        name: name,
        src: imgUrl,
      };

      setDataTreasureRandom(tempImgTreasureRandom);
    }, 500);

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
    callMintTreasure(
      addressTo,
      dataTreasureRandom.type,
      dataTreasureRandom.name
    ).then((res) => {
      if (res.flagSuccess === true) {
        clearInterval(intervalProgress);
        clearInterval(intervalRandom);
        const intervalProgressHundred = setInterval(() => {
          setProgressMint((oldProgress) => {
            if (oldProgress >= 100) {
              return 100;
            }
            return parseInt(Math.min(oldProgress + 7, 100));
          });
        }, 200);

        let stateTreasureOnce = {
          addressWallet: preserveLink.account.address,
          itemType: dataTreasureRandom.type,
          itemName: dataTreasureRandom.name,
          timeOpened: new Date().toLocaleString("en-US", {
            timeZone: "America/New_York",
            timeZoneName: "short",
          }),
        };

        setTimeout(() => {
          NotificationManager.success(
            "Please check your wallet.",
            "Success!",
            3000
          );
          setFlagSuccessMint(true);

          setTimeout(() => {
            setFlagClickedMint(false);
            setProgressMint(0);
            setFlagSuccessMint(false);

            clearInterval(intervalProgressHundred);
            setStateTreasureOnce(stateTreasureOnce).then((res) => {
              if (res.success === true || res.success === "true") {
                // window.location.reload();
                setPasscode("");
                setFlagOpenTreasureOnce(false);
                setFlagOpenPass(false);
              }
            });
          }, 4000);
        }, 2000);
      } else {
        clearInterval(intervalProgress);
        clearInterval(intervalRandom);
        setProgressMint(73);
        setTimeout(() => {
          NotificationManager.error(
            "Please try to mint again.",
            "Failed!",
            3000
          );
          setFlagSuccessMint(false);
          setTimeout(() => {
            setFlagClickedMint(false);
            setProgressMint(0);
          }, 1000);
        }, 1000);
      }
    });
  };

  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
      <SectionContent>
        <TextSubject>Our Project</TextSubject>
        <TextProjectContent>
          Welcome to SANDY Games, where we invite the new generation of
          passionate thinkers, gamers, and innovators to join an ecosystem that
          celebrates play and creativity. Our primary goals are to elevate the
          standards of utility for NFT ownership and, most importantly, make it
          FUN! Built on the Phantasma Blockchain, SANDY Games leverages this
          powerful partnership to overcome the technological barriers that have
          hindered growth in the NFT space. The Phantasma blockchain provides us
          with a comprehensive toolkit for innovation, enabling us to create
          interactive and adaptable assets that push the boundaries of what is
          possible. Through features like Infusion, Nesting, Timed release, and
          Smart NFTs, we deliver unique and engaging experiences that enhance
          the gameplay and overall user experience. The SANDY project is an NFT
          game designed to immerse players in a captivating world. As SANDY
          holders, you become valued members of our community, where we mint,
          treasure hunt, and trade wearable outfits essential for embarking on
          thrilling adventures. Rewards are earned through gameplay and active
          community participation, ensuring an inclusive and rewarding
          experience for all. Join us on this exciting journey as we redefine
          what it means to be in this evolving space and explore the endless
          possibilities of the NFT gaming landscape.
        </TextProjectContent>
        <TextSubjectBelow>Roadmap</TextSubjectBelow>
        <SectionRoadmap>
          <SectionEachMap>
            <TextHeadMap bgcolor={"rgb(76 175 80)"}>What happened</TextHeadMap>
            {dataRoadmap.map((each, index) => {
              const _key = index;

              if (each.state === 0) {
                return (
                  <EachRoadMap key={_key}>
                    <IconRoad color={"rgb(76 175 80)"}>
                      <RiCheckDoubleFill></RiCheckDoubleFill>
                    </IconRoad>
                    <TextRoad>{each.text}</TextRoad>
                  </EachRoadMap>
                );
              } else {
                return <span key={_key}></span>;
              }
            })}
          </SectionEachMap>
          <SectionEachMap>
            <TextHeadMap bgcolor={"rgb(53 111 239)"}>
              What we are doing
            </TextHeadMap>
            {dataRoadmap.map((each, index) => {
              const _key = index;
              if (each.state === 1) {
                return (
                  <EachRoadMap key={_key}>
                    <IconRoad color={"rgb(53 111 239)"}>
                      <VscTools></VscTools>
                    </IconRoad>
                    <TextRoad>{each.text}</TextRoad>
                  </EachRoadMap>
                );
              } else {
                return <span key={_key}></span>;
              }
            })}
          </SectionEachMap>
          <SectionEachMap>
            <TextHeadMap bgcolor={"rgb(254 191 56)"}>
              What we are planning
            </TextHeadMap>
            {dataRoadmap.map((each, index) => {
              const _key = index;
              if (each.state === 2) {
                return (
                  <EachRoadMap key={_key}>
                    <IconRoad color={"rgb(254 191 56)"}>
                      <MdMoreTime></MdMoreTime>
                    </IconRoad>
                    <TextRoad>{each.text}</TextRoad>
                  </EachRoadMap>
                );
              } else {
                return <span key={_key}></span>;
              }
            })}
          </SectionEachMap>
        </SectionRoadmap>
        <TextSubjectBelow>Our Team</TextSubjectBelow>
        <SectionTeam>
          {dataTeam.map((each, index) => {
            return (
              <SectionEachTeam key={index}>
                <SectionDetails>
                  <SectionAvatar>
                    <img src={each.imgAvatar} alt="" />
                  </SectionAvatar>
                  <SectionName>
                    <TextName>{each.name}</TextName>
                    <TextRole>{each.role}</TextRole>
                    <SectionLink>
                      {each.contact.twitter !== "example" ? (
                        <SectionEachLinkIcon>
                          <FaTwitter />
                        </SectionEachLinkIcon>
                      ) : (
                        <></>
                      )}
                
                      <SectionEachLinkIcon>
                        <FaLinkedin />
                      </SectionEachLinkIcon>
                      <SectionEachLinkIcon>
                        <FaDiscord />
                      </SectionEachLinkIcon>
                      {each.contact.treasure ? (
                        <SectionEachLinkIcon
                          onClick={() => {
                            handleModalOnceTreasure();
                          }}
                        >
                          <GiTreasureMap />
                        </SectionEachLinkIcon>
                      ) : (
                        <></>
                      )}
                    </SectionLink>
                  </SectionName>
                </SectionDetails>
              </SectionEachTeam>
            );
          })}
        </SectionTeam>
      </SectionContent>

      <SectionPasscode flagopen={flagOpenPass ? 1 : 0}>
        <SectionBackPass></SectionBackPass>
        <ModalPasscode>
          <Shake fixed={true} active={flagShakeModal}>
            <ModalBack>
              <TextSubjectPasscode>Passcode</TextSubjectPasscode>
              <SectionInputPass>
                <InputPass
                  component="input"
                  type="password"
                  placeholder="Type your passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                  }}
                ></InputPass>
              </SectionInputPass>
              <SectionButtonGroup>
                <ButtonCheck
                  onClick={() => {
                    setFlagOpenPass(false);
                    setPasscode("");
                  }}
                >
                  Back
                </ButtonCheck>
                <ButtonCheck
                  onClick={() => {
                    handleCheckPasscode();
                  }}
                >
                  GO TO QUIZ
                </ButtonCheck>
              </SectionButtonGroup>
            </ModalBack>
          </Shake>
        </ModalPasscode>
      </SectionPasscode>

      {flagOpenTreasureOnce ? (
        <SecttionQuizResponse>
          <TextEachResponse>Mint one treasure NFT</TextEachResponse>
          {flagSuccessMint ? (
            <SectionResult>
              <TextQuestion>?</TextQuestion>
            </SectionResult>
          ) : (
            <SectionResult>
              {dataTreasureRandom.type === "Backgrounds" ? (
                <ImageTreasure>
                  <ImageTreasureMintBackground>
                    <img
                      src={dataTreasureRandom.src}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageTreasureMintBackground>
                </ImageTreasure>
              ) : dataTreasureRandom.type === "Eyes" ? (
                <ImageTreasure>
                  <ImageTreasureMintEye>
                    <img
                      src={dataTreasureRandom.src}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageTreasureMintEye>
                </ImageTreasure>
              ) : (
                <ImageTreasure>
                  <ImageTreasureMintMouth>
                    <img
                      src={dataTreasureRandom.src}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageTreasureMintMouth>
                </ImageTreasure>
              )}
            </SectionResult>
          )}

          <ButtonTreasure
            onClick={() => {
              handleMintTreausreOnce();
            }}
            active={!flagClickedMint ? 1 : 0}
          >
            {!flagClickedMint ? (
              <TextMintButton>Mint</TextMintButton>
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
                        stroke: `#ec8424`,
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
                        stroke: "#d9d9d9",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "#ec8424",
                        // Text size
                        fontFamily: "Poppins",
                        fontSize: "28px",
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
        </SecttionQuizResponse>
      ) : (
        <></>
      )}
      {!flagSuccessMint ? (
        <></>
      ) : (
        <SectionCongrats>
          <SectionAnimation>
            <ConfettiExplosion
              duration={"4000"}
              particleCount={"200"}
              zIndex={"30002"}
            />
          </SectionAnimation>
          <SectionAnimation zIndex={"30003"}>
            <TextAnimationCongrats
              type="squeezeMix"
              duration="1000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none"
            >
              Congratulations!
            </TextAnimationCongrats>
          </SectionAnimation>
        </SectionCongrats>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
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

const SectionContent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  z-index: 31;
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

const TextSubject = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  color: white;
  margin-top: 80px;

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

const TextSubjectPasscode = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  color: white;

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

const TextSubjectBelow = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 32px;
  line-height: 150%;
  color: white;
  margin-top: 80px;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 26px;
  }

  transition: 0.3s;
  @media (max-width: 1023px) {
    font-size: 24px;
    margin-top: 50px;
  }
  @media (max-width: 390px) {
    font-size: 22px;
    margin-top: 30px;
  }
`;

const TextProjectContent = styled(Box)`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  line-height: 150%;
  color: white;
  margin-top: 50px;
  text-shadow: 0px 0px 6px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 14px;
  }
  @media (max-width: 1024px) {
    margin-top: 30px;
    font-size: 13px;
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 390px) {
    font-size: 11px;
    text-shadow: 0px 0px 2px black;
  }
`;

const SectionRoadmap = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  margin-top: 50px;

  transition: 0.3s;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 30px;
    grid-row-gap: 30px;
  }
  @media (max-width: 768px) {
    grid-column-gap: 30px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SectionEachMap = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TextHeadMap = styled(Box)`
  display: flex;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: white;
  margin-bottom: 30px;

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

const EachRoadMap = styled(Box)`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  transition: 0.3s;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
  @media (max-width: 390px) {
    margin-bottom: 10px;
  }
  /* align-items: center; */
`;

const IconRoad = styled(Box)`
  display: flex;
  font-size: 1.5rem;
  margin-right: 8px;
  padding-top: 3px;
  box-sizing: border-box;

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 390px) {
    font-size: 1rem;
  }
`;

const TextRoad = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: white;
  text-shadow: 0px 0px 3px black;

  cursor: pointer;
  transition: 0.3s;
  &:hover {
    text-shadow: 0px 0px 3px white;
  }

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

const SectionTeam = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 50px;
  margin-top: 50px;
  margin-bottom: 150px;

  transition: 0.3s;
  @media (max-width: 1600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0px 0px 0px 80px;
    box-sizing: border-box;
  }
  @media (max-width: 500px) {
    padding: 0px 0px 0px 60px;
    box-sizing: border-box;
  }
  @media (max-width: 450px) {
    padding: 0px 0px 0px 40px;
    box-sizing: border-box;
    grid-row-gap: 20px;
  }
  @media (max-width: 350px) {
    padding: 0px 0px 0px 0px;
    box-sizing: border-box;
  }
`;

const SectionEachTeam = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const SectionDetails = styled(Box)`
  display: flex;
`;

const SectionAvatar = styled(Box)`
  display: flex;
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  border-radius: 100%;
  border: 3px solid white;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  > img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 100%;
    /* object-fit: cover; */
    object-position: center;
  }

  transition: 0.3s;
  @media (max-width: 1440px) {
    width: 80px;
    min-width: 80px;
    height: 80px;
    min-height: 80px;
  }
  @media (max-width: 1023px) {
    width: 70px;
    min-width: 70px;
    height: 70px;
    min-height: 70px;
  }
  @media (max-width: 768px) {
    width: 60px;
    min-width: 60px;
    height: 60px;
    min-height: 60px;
    border: 2px solid white;
  }
`;

const SectionLink = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 12px;
  transition: 0.3s;
  @media (max-width: 390px) {
    margin-top: 7px;
  }
`;

const SectionName = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
`;

const TextName = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: white;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 20px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 390px) {
    font-weight: 500;
    font-size: 16px;
  }
`;

const TextRole = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: white;
  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 390px) {
    font-weight: 400;
    font-size: 12px;
  }
`;

const SectionEachLinkIcon = styled(Box)`
  font-size: 1.5rem;
  color: white;
  margin-right: 12px;
  cursor: pointer;

  transition: 0.3s;
  &:hover {
    color: #ec8424;
  }

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SecttionQuizResponse = styled(Box)`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  flex-direction: column;
  width: 300px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background: #ec8424;
  transition: 0.3s;
  padding: 30px 30px;
  box-sizing: border-box;
  animation: animationQuizResponse 0.2s 1;
  @keyframes animationQuizResponse {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
  transition: 0.3s;
  @media (max-width: 768px) {
  }
  @media (max-width: 390px) {
  }
  z-index: 10005;
`;

const SectionResult = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ImageTreasure = styled(Box)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  border: 2px solid white;
  overflow: hidden;
`;

const ImageTreasureMintBackground = styled(Box)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  > img {
    border-radius: 12px;
  }
`;

const ImageTreasureMintEye = styled(Box)`
  display: flex;
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400%;
  height: 400%;
  > img {
    border-radius: 12px;
  }
`;

const ImageTreasureMintMouth = styled(Box)`
  display: flex;
  position: absolute;
  top: 130%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500%;
  height: 500%;
  > img {
    border-radius: 12px;
  }
`;

const ButtonTreasure = styled(Box)`
  display: flex;
  width: 150px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  height: 40px;

  background: white;

  border-radius: 10px;

  cursor: ${({ active }) => (active ? "pointer" : "wait")};
  user-select: none;
  transition: 0.3s;
  &:hover {
    > div:nth-child(1) {
      text-shadow: ${({ active }) => (active ? "0px 0px 10px" : "unset")};
    }
    > div:nth-child(2) {
      box-shadow: ${({ active }) =>
        active ? "6px 6px 6px rgba(0, 0, 0, 0.5)" : "unset"};
    }
  }
`;

const TextMintButton = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ec8424;
`;

const SectionProgressMint = styled(Box)`
  display: flex;
  align-items: center;
`;

const SectionCircleProgress = styled(Box)`
  display: flex;
  margin-left: 10px;
  width: 30px;
`;

const SectionCongrats = styled(Box)`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30001;
`;

const TextAnimationCongrats = styled(MovingText)`
  font-size: 100px;
  font-weight: 600;
  color: #fdfc70;

  transition: 0.3s;
  @media (max-width: 1024px) {
    font-size: 70px;
  }
  @media (max-width: 768px) {
    font-size: 60px;
  }
  @media (max-width: 390px) {
    font-size: 40px;
  }
`;

const SectionAnimation = styled(Box)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextEachResponse = styled(Box)`
  color: white;
  font-size: 18px;
  font-weight: 400;
  line-height: 130%;
  text-align: center;
  text-shadow: 0px 0px 2px black;

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SectionPasscode = styled(Box)`
  display: ${({ flagopen }) => (flagopen ? "flex" : "none")};
  transition: 0.3s;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 10001;
`;

const SectionBackPass = styled(Box)`
  display: flex;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) !important;
  animation: back_animation1 0.2s 1;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const ModalPasscode = styled(Box)`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
`;

const ModalBack = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background: #ec8424;
  transition: 0.3s;
  padding: 30px 30px;
  box-sizing: border-box;
`;

const SectionInputPass = styled(Box)`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid white;
`;

const InputPass = styled(Box)`
  display: flex;
  width: 100%;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
  color: white;
`;

const ButtonCheck = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 40px;

  background: white;
  color: #ec8424;

  border-radius: 10px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;

  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.5);
  }
`;

const SectionButtonGroup = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  margin-top: 30px;
`;

const TextQuestion = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  border: 2px solid white;
  overflow: hidden;
  font-weight: 600;
  font-size: 72px;
  color: white;
  text-shadow: 0px 3px 3px black;
`;

export default ProjectAndTeam;
