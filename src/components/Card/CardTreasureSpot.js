import styled from "styled-components";
import { Box } from "@mui/material";
import { GiLockedChest, GiOpenChest } from "react-icons/gi";
import { Shake } from "reshake";
import disableScroll from "disable-scroll";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ImRadioUnchecked, ImRadioChecked } from "react-icons/im";
import ConfettiExplosion from "react-confetti-explosion";
import MovingText from "react-moving-text";
import {
  callMintTreasure,
  getStateTreasure,
  setTreasureBoxOpened,
  updateStateTreasure,
} from "../../actions/treasure";
import {
  dataWardrobeBackgrounds,
  dataWardrobeEye,
  dataWardrobeMouth,
} from "../../data/Wardrobe";
import { randomInt } from "../../lib/Functions/Operations";
import { dataTreasureSpots } from "../../data/Treasure";

const CardTreasureSpot = ({
  data,
  preserveLink,
  flagOpenedBox,
  flagOpenedOnce,
  setStateTreasure,
}) => {
  const numberMint = 70;
  const [flagOpenPass, setFlagOpenPass] = useState(false);
  const [passcode, setPasscode] = useState();
  const [flagOpenQuiz, setFlagOpenQuiz] = useState(false);
  const [flagShakeModal, setFlagShakeModal] = useState(false);
  const [flagCheckedQuiz, setFlagCheckedQuiz] = useState(0);
  const [flagQuizResponse, setFlagQuizResponse] = useState(false);
  const [flagOpenQuizResponse, setFlagOpenQuizResponse] = useState(false);
  const [textQuizResponse, setTextQuizResponse] = useState();
  const [dataTreasureRandom, setDataTreasureRandom] = useState();
  const [flagClickedMint, setFlagClickedMint] = useState(false);
  const [progressMint, setProgressMint] = useState(0);
  const [flagSuccessMint, setFlagSuccessMint] = useState(false);

  const handleSpot = (flagLock) => {
    if (flagOpenedOnce) {
      return NotificationManager.warning(
        "The time has expired, please wait for next week.",
        "",
        2000
      );
    } else {
      if (flagLock) {
        return NotificationManager.warning("Already unlocked.", "", 2000);
      }
      if (!flagLock) {
        disableScroll.on();
        setFlagOpenPass(true);
      }
    }
  };

  const handleOpenBox = () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }
    handleSpot(flagOpenedBox);
  };

  const handleCheckPasscode = () => {
    if (passcode === null || passcode === "") {
      setFlagShakeModal(true);
      NotificationManager.error("Type your passcode!", "", 1000);
      setTimeout(() => {
        setFlagShakeModal(false);
      }, 500);
      return;
    }
    if (passcode !== data.passcode) {
      setFlagShakeModal(true);
      NotificationManager.error("Wrong passcode!", "", 1000);
      setTimeout(() => {
        setFlagShakeModal(false);
      }, 500);
      return;
    } else {
      setFlagOpenQuiz(true);
    }
  };

  const handleCheckAnswer = () => {
    if (flagCheckedQuiz === 0) {
      return NotificationManager.error(
        "You should select correct answer.",
        "",
        2000
      );
    }
    setTreasureBoxOpened(preserveLink.account.address).then((res) => {
      if (res.success === true) {
        setFlagOpenQuizResponse(true);
        setFlagOpenQuiz(false);
        if (flagCheckedQuiz === data.quiz.numberAnswer) {
          setFlagQuizResponse(true);
          handleCreateRandomTreasureImage();
        } else {
          setFlagCheckedQuiz(false);
        }
      } else {
        return NotificationManager.error(`${res.error}`, "Error!", 2000);
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

  const handleMintTreasure = async () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }

    setFlagClickedMint(true);
    if (flagClickedMint === true) {
      return NotificationManager.warning(
        "Please wait for a second.",
        "Processing!",
        3000
      );
    }

    const intervalRandomImages = setInterval(() => {
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
    }, 700);

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
        const intervalProgressHundred = setInterval(() => {
          setProgressMint((oldProgress) => {
            if (oldProgress >= 100) {
              return 100;
            }
            return parseInt(Math.min(oldProgress + 7, 100));
          });
        }, 200);

        const stateTreasure = {
          nameBox: data.name,
          // addressWallet: "thomas0114",
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
            clearInterval(intervalProgressHundred);
            clearInterval(intervalRandomImages);
            updateStateTreasure(stateTreasure).then((res) => {
              if (res.success === true) {
                // window.location.reload();
                getStateTreasure(
                  dataTreasureSpots,
                  preserveLink.account.address
                ).then((res) => {
                  setStateTreasure(res);
                });
              }
              setPasscode("");
              setFlagOpenPass(false);
              setFlagOpenQuiz(false);
              setFlagCheckedQuiz(0);
              setFlagQuizResponse(false);
              setFlagOpenQuizResponse(false);
              setTextQuizResponse("");
              setFlagSuccessMint(false);

              disableScroll.off();
            });
          }, 4000);
        }, 2000);
      } else {
        clearInterval(intervalProgress);
        clearInterval(intervalRandomImages);
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
    // let gasPrice = 100000;
    // let gasLimit = 9999999;
    // let funcName = "mintTreasure";
    // let addressTo = preserveLink.account.address;
    // const ContractName = process.env.REACT_APP_CONTRACT;
    // let expiration = 5; //This is in miniutes
    // let getTime = new Date();
    // let date = new Date(getTime.getTime() + expiration * 60000);
    // let sb = new PhantasmaTS.ScriptBuilder();
    // const payload = PhantasmaTS.Base16.encode("This is Sandy");
    // console.log("Began calculating script");
    // let script = sb
    //   .BeginScript()
    //   .AllowGas(addressTo, sb.NullAddress, gasPrice, gasLimit)
    //   .CallContract(ContractName, funcName, [
    //     addressTo,
    //     dataTreasureRandom.type + "s",
    //     dataTreasureRandom.name,
    //   ])
    //   .SpendGas(addressTo)
    //   .EndScript();

    // let privateKey = new PhantasmaPrivateKey(
    //   "21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    // "KxMn2TgXukYaNXx7tEdjh7qB2YaMgeuKy47j4rvKigHhBuZWeP3r"
    // );

    // const message = "This is Sandy.";
    // const signature = CryptoUtils.signMessage(message, privateKey);

    // let transaction = new PhantasmaTS.Transaction(
    //  process.env.REACT_APP_NETWORK,
    //   "main",
    //   script,
    //   date,
    //   payload
    // );

    // let key = getWifFromPrivateKey(
    //   "21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    // );
    // await transaction.signWithPrivateKey(
    //   "21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    // );
    // let txHash = await PhantasmaAPIClient.sendRawTransaction(
    //   transaction.toString(true)
    // );

    // preserveLink.signWithPrivateKey(
    //   "0x21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    // );
    // console.log(transaction);
    // await transaction
    //   .signWithPrivateKey(
    //     "0x21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    //   )
    // let txHash = await PhantasmaAPIClient.sendRawTransaction(
    //   transaction.toString(true)
    // );
    // console.log(txHash);
    // preserveLink.signTx(
    //   script,
    //   payload,
    //   function (tx) {
    //     tx.sign(
    //       "21fcaa2b0dcf1b63c0d9bc032fc678581e9e71d7675fb70c6388dbfd35c438a4"
    //     );
    //     console.log("This was Successful" + tx);
    //     clearInterval(intervalProgress);
    //     const intervalProgressHundred = setInterval(() => {
    //       setProgressMint((oldProgress) => {
    //         if (oldProgress >= 100) {
    //           return 100;
    //         }
    //         return parseInt(Math.min(oldProgress + 7, 100));
    //       });
    //     }, 200);

    //     const stateTreasure = {
    //       nameBox: data.name,
    //       addressWallet: "thomas0114",
    //       // addressWallet: preserveLink.account.address,
    //       itemType: dataTreasureRandom.type,
    //       itemName: dataTreasureRandom.name,
    //       timeOpened: new Date().toLocaleString("en-US", {
    //         timeZone: "America/New_York",
    //         timeZoneName: "short",
    //       }),
    //     };

    //     setTimeout(() => {
    //       NotificationManager.success(
    //         "Please check your wallet.",
    //         "Success!",
    //         3000
    //       );
    //       setFlagSuccessMint(true);
    //       setTimeout(() => {
    //         setFlagClickedMint(false);
    //         setProgressMint(0);
    //         clearInterval(intervalProgressHundred);
    //         setFlagSuccessMint(false);
    //         updateStateTreasure(stateTreasure).then((res) => {
    //           if (res.success === true) {
    //             window.location.reload();
    //           }
    //           setPasscode("");
    //           setFlagOpenPass(false);
    //           setFlagOpenQuiz(false);
    //           setFlagCheckedQuiz(0);
    //           setFlagQuizResponse(false);
    //           setFlagOpenQuizResponse(false);
    //           setTextQuizResponse("");
    //           disableScroll.off();
    //         });
    //       }, 4000);
    //     }, 1500);
    //   },
    //   function () {
    //     console.error("error could not send transaction");

    //     clearInterval(intervalProgress);
    //     setProgressMint(73);
    //     setTimeout(() => {
    //       NotificationManager.error(
    //         "Please try to mint again.",
    //         "Failed!",
    //         3000
    //       );
    //       setFlagSuccessMint(false);

    //       setTimeout(() => {
    //         setFlagClickedMint(false);
    //         setProgressMint(0);
    //       }, 1000);
    //     }, 1000);
    //   }
    // );
  };

  return (
    <>
      <SectionSpot
        onClick={() => {
          handleOpenBox();
        }}
      >
        <SectionChildEachImage>
          <SectionImage>
            <img
              src={`/assets/images/Treasure Chests/Treasure Chest 1/BackChests/${data.name}.jpg`}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </SectionImage>
        </SectionChildEachImage>
        <TextSpot>{data.name}</TextSpot>
        <SectionLock>
          {flagOpenedBox ? (
            <GiOpenChest></GiOpenChest>
          ) : (
            <GiLockedChest></GiLockedChest>
          )}
        </SectionLock>
      </SectionSpot>

      <SectionPasscode flagopen={flagOpenPass ? 1 : 0}>
        <SectionBackPass></SectionBackPass>
        <ModalPasscode>
          <Shake fixed={true} active={flagShakeModal}>
            <ModalBack>
              <TextSubject>Passcode</TextSubject>
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
                    disableScroll.off();
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

      {flagOpenQuiz ? (
        <SectionQuiz>
          <TextSubject01>{data.quiz.textQuiz}</TextSubject01>
          <SectionQuizList>
            {data.quiz.listAnswers.map((each, index) => {
              return (
                <SectionEachAnswer
                  key={index}
                  onClick={() => {
                    setFlagCheckedQuiz(index + 1);
                    setTextQuizResponse(each.textResponse);
                  }}
                >
                  <IconCheck>
                    {flagCheckedQuiz === index + 1 ? (
                      <ImRadioChecked />
                    ) : (
                      <ImRadioUnchecked />
                    )}
                  </IconCheck>
                  <TextEachAnswer>{each.textAnswer}</TextEachAnswer>
                </SectionEachAnswer>
              );
            })}
          </SectionQuizList>
          <SectionButtonGroup>
            <ButtonAnswer
              onClick={() => {
                setFlagCheckedQuiz(0);
                setFlagOpenQuiz(false);
              }}
            >
              Back
            </ButtonAnswer>
            <ButtonAnswer
              onClick={() => {
                handleCheckAnswer();
              }}
            >
              Answer
            </ButtonAnswer>
          </SectionButtonGroup>
        </SectionQuiz>
      ) : (
        <></>
      )}
      {flagOpenQuizResponse ? (
        <SecttionQuizResponse>
          <TextEachResponse>{textQuizResponse}</TextEachResponse>
          {flagQuizResponse ? (
            !flagSuccessMint ? (
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
            ) : (
              <SectionResult>
                <TextQuestion>?</TextQuestion>
              </SectionResult>
            )
          ) : (
            <SectionResult>
              <TextWrongAnswer>
                Sorry, you can't mint regarding with wrong answer.
                <br />
                Please wait for next week's round.
              </TextWrongAnswer>
            </SectionResult>
          )}
          {flagQuizResponse ? (
            <ButtonTreasure
              onClick={() => {
                handleMintTreasure();
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
          ) : (
            <ButtonTreasure
              onClick={() => {
                setPasscode("");
                setFlagOpenPass(false);
                setFlagOpenQuiz(false);
                setFlagCheckedQuiz(0);
                setFlagQuizResponse(false);
                setFlagOpenQuizResponse(false);
                setTextQuizResponse("");
                disableScroll.off();
              }}
            >
              Exit
            </ButtonTreasure>
          )}
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
    </>
  );
};

const SectionSpot = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;

  cursor: pointer;
  transition: 0.3s;
  &:hover {
    > div > div:nth-child(1) > img {
      transform: scale(1.2);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 10px white;
    }
  }
`;

const SectionImage = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;

  > img {
    border-radius: 20px;
    aspect-ratio: 1.4;
    object-fit: cover;
    transition: 0.3s;
  }
`;

const SectionChildEachImage = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
`;

const TextSpot = styled(Box)`
  display: flex;
  justify-content: center;
  width: 90%;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  text-shadow: 0px 0px 6px black;
  transition: 0.3s;

  @media (max-width: 1600px) {
    font-size: 20px;
  }
`;

const SectionLock = styled(Box)`
  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.8rem;
  color: white;
  filter: drop-shadow(0px 0px 3px black);

  transition: 0.3s;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
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

const SectionQuiz = styled(Box)`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  flex-direction: column;
  width: 600px;
  max-height: 700px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background: #ec8424;
  transition: 0.3s;
  padding: 30px 30px;
  box-sizing: border-box;
  animation: animationQuiz 0.2s 1;
  @keyframes animationQuiz {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }

  transition: 0.3s;
  @media (max-width: 700px) {
    padding: 20px 20px;
    width: 80%;
  }
  @media (max-width: 370px) {
    padding: 10px 10px;
    width: 94%;
  }
  z-index: 10003;
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

const TextSubject = styled(Box)`
  text-align: center;
  font-size: 32px;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0px 0px 6px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 26px;
  }
  @media (max-width: 1024px) {
    font-size: 24px;
  }
  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 30px;
  }
  @media (max-width: 390px) {
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

const TextSubject01 = styled(Box)`
  text-align: center;
  font-size: 16px;
  color: white;
  line-height: 130%;
  margin-bottom: 20px;
  text-shadow: 0px 0px 6px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    text-shadow: 0px 0px 4px black;
  }
  @media (max-width: 500px) {
    margin-bottom: 0px;
    font-size: 10px;
    text-shadow: 0px 0px 2px black;
  }
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

const SectionQuizList = styled(Box)`
  display: grid;
  overflow-y: auto;
  margin-top: 20px;
  width: 100%;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 5px;

    background-color: white;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(50, 35, 30);
    border-radius: 5px;
    /* border-radius: 3px; */
  }
`;

const SectionEachAnswer = styled(Box)`
  display: flex;
  width: 100%;
  cursor: pointer;
  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 3px white;
    }
  }
`;

const IconCheck = styled(Box)`
  font-size: 1.6rem;
  color: white;
  transition: 0.3s;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const TextEachAnswer = styled(Box)`
  margin-left: 15px;
  font-family: "Poppins";
  color: white;
  font-size: 16px;
  font-weight: 400;
  text-shadow: 0px 0px 3px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 500px) {
    text-shadow: 0px 0px 2px black;
    font-size: 10px;
  }
`;

const ButtonAnswer = styled(Box)`
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

const SecttionQuizResponse = styled(Box)`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  flex-direction: column;
  width: 600px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background: #ec8424;
  transition: 0.3s;
  padding: 30px 50px;
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
  @media (max-width: 700px) {
    padding: 30px 20px;
    width: 80%;
  }
  @media (max-width: 370px) {
    padding: 20px 10px;
    width: 94%;
  }
  z-index: 10005;
`;

const SectionButtonGroup = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  margin-top: 30px;
`;

const TextEachResponse = styled(Box)`
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
  text-align: center;
  text-shadow: 0px 0px 2px black;

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 500px) {
    font-size: 12px;
  }
  @media (max-width: 390px) {
    font-size: 11px;
  }
`;

const SectionResult = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const TextWrongAnswer = styled(Box)`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 150%;
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

export default CardTreasureSpot;
