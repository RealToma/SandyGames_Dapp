import styled from "styled-components";
import { Box } from "@mui/material";
import imgMainBackground from "../../assets/images/background/backMint01.png";
import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { NotificationManager } from "react-notifications";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ConfettiExplosion from "react-confetti-explosion";
import MovingText from "react-moving-text";
import {
  dataChooseMaterial,
  dataChooseSand,
  // dataRandomizedSandy,
} from "../../data/Mint";
import CardSand from "../../components/Card/CardSand";
import CardMaterial from "../../components/Card/CardMaterial";
// import { mintBody } from "../../lib/WalletToolKit/toolkit";
import { useContext } from "react";
import { RefContext } from "../../lib/RefContext";
import { PhantasmaTS } from "phantasma-ts";
import videoBornSandy from "../../assets/video/mint/BornSandy.mp4";
import { useMemo } from "react";
import {
  FormatData,
  PhantasmaAPIClient,
} from "../../lib/WalletToolKit/toolkit";
import { dataCollection } from "../../data/Collection";
import { uppercaseFirstText } from "../../lib/Functions/Operations";
import {
  callMintOutfit,
  callUpfront,
  getUpfront,
  setUpfront,
  updateCountsMint,
} from "../../actions/mint";
import { getCounts } from "../../actions/mint";

// const images = [
//   "assets/images/Naked_SANDY/ash sandy.jpg",
//   "assets/images/Naked_SANDY/brown sandy.jpg",
//   "assets/images/Naked_SANDY/Diamond sandy.jpg",
//   "assets/images/Naked_SANDY/fur sandy.jpg",
//   "assets/images/Naked_SANDY/gold sandy.jpg",
//   "assets/images/Naked_SANDY/grey sandy.jpg",
//   "assets/images/Naked_SANDY/lightning sandy.jpg",
//   "assets/images/Naked_SANDY/metal sandy.jpg",
//   "assets/images/Naked_SANDY/red sandy.jpg",
//   "assets/images/Naked_SANDY/sandstorm sandy.jpg",
//   "assets/images/Naked_SANDY/silver sandy.jpg",
//   "assets/images/Naked_SANDY/white sand sandy.jpg",
//   "assets/images/Naked_SANDY/white sandy.jpg",
// ];

const Mint = () => {
  const { preserveLink } = useContext(RefContext);
  // const [imageBackground, setImageBackground] = useState(
  //   dataRandomizedSandy.background[0]
  // );
  // const [imageEye, setImageEye] = useState(dataRandomizedSandy.eye[0]);
  // const [imageMaterialSandy, setImageMaterialSandy] = useState(
  //   dataRandomizedSandy.material[0]
  // );

  const numberMint = 70;
  // const [numberMint, setNumberMint] = useState(5);
  const [flagClickedMint, setFlagClickedMint] = useState(false);
  const [progressMint, setProgressMint] = useState(0);
  const [flagSuccessMint, setFlagSuccessMint] = useState(false);
  const [flagStep, setFlagStep] = useState(0);
  const [sandyType, setSandyType] = useState();
  const [sandyMaterial, setSandyMaterial] = useState();
  const [flagOwnedSandy, setFlagOwnedSandy] = useState(0);
  const [imgOutfit, setImgOutfit] = useState("");
  const [typeOutfit, setTypeOutfit] = useState("");
  const [dataCountsMint, setDataCountsMint] = useState({});
  const [flagOpenUpfront, setFlagOpenUpfront] = useState(false);
  const [flagRegisteredUpfront, setFlagRegisteredUpfront] = useState(false);

  const handleMintSandy = async () => {
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

    const videoPlayerMint = document.getElementById("idMintVideo");
    videoPlayerMint.play();
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

    let gasPrice = 100000;
    let gasLimit = 9999999;
    let funcName = "mintBody";
    let addressTo = preserveLink.account.address;
    const ContractName = process.env.REACT_APP_CONTRACT;

    let sb = new PhantasmaTS.ScriptBuilder();
    const payload = PhantasmaTS.Base16.encode("Mint Sandy");
    NotificationManager.info(
      "Confirm transaction to mint Naked Sandy.",
      "Check your wallet!",
      3000
    );

    let script = sb
      .BeginScript()
      .AllowGas(addressTo, sb.NullAddress, gasPrice, gasLimit)
      .CallContract(ContractName, funcName, [
        addressTo,
        "SANDY",
        "This is the main NFT in the SANDY collection. It's utility is boundless and will grow within the SANDY ecosystem.",
        sandyType,
        sandyMaterial,
      ])
      .SpendGas(addressTo)
      .EndScript();

    preserveLink.signTx(
      script,
      payload,
      function (tx) {
        console.log("This was Successful:", tx);
        // setProgressMint(100);
        clearInterval(intervalProgress);
        const intervalProgressHundred = setInterval(() => {
          setProgressMint((oldProgress) => {
            if (oldProgress >= 100) {
              return 100;
            }
            return parseInt(Math.min(oldProgress + 7, 100));
          });
        }, 200);

        updateCountsMint(sandyType, sandyMaterial).then((res) => {
          if (res.flagSuccess) {
            setTimeout(() => {
              NotificationManager.success(
                "Please check your wallet.",
                "Success!",
                3000
              );
              setFlagSuccessMint(true);
              // clearInterval(intervalRandom);
              setTimeout(() => {
                setFlagClickedMint(false);
                setProgressMint(0);
                clearInterval(intervalProgressHundred);
                setFlagSuccessMint(false);
                setFlagStep(0);
              }, 4000);
            }, 1500); // numberMint * 1000 = total executed time
          } else {
            NotificationManager.error(res.msgError, "", 3000);
            clearInterval(intervalProgress);
            setProgressMint(73);
            setTimeout(() => {
              NotificationManager.error(
                "Please try to mint again.",
                "Failed!",
                3000
              );
              setFlagSuccessMint(false);
              // clearInterval(intervalRandom);
              setTimeout(() => {
                setFlagClickedMint(false);
                setProgressMint(0);

                setFlagSuccessMint(false);
                setFlagStep(0);
              }, 1000);
            }, 1000);
          }
        });
      },
      function () {
        console.error("error could not send transaction");
        clearInterval(intervalProgress);
        setProgressMint(73);
        setTimeout(() => {
          NotificationManager.error(
            "Please try to mint again.",
            "Failed!",
            3000
          );
          setFlagSuccessMint(false);
          // clearInterval(intervalRandom);
          setTimeout(() => {
            setFlagClickedMint(false);
            setProgressMint(0);

            setFlagSuccessMint(false);
            setFlagStep(0);
          }, 1000);
        }, 1000); // numberMint * 1000 = total executed time
      }
    );
  };

  const handleMintOutfit = async () => {
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
      let randomIndexOutfit = Math.floor(Math.random() * dataCollection.length);
      let randomTypeOutfit = Math.floor(Math.random() * 5);
      let tempType;
      switch (randomTypeOutfit) {
        case 0:
          tempType = "arms";
          break;
        case 1:
          tempType = "body";
          break;
        case 2:
          tempType = "head";
          break;
        case 3:
          tempType = "legs";
          break;
        case 4:
          tempType = "item";
          break;
        default:
          break;
      }
      setTypeOutfit(tempType);
      setImgOutfit(dataCollection[randomIndexOutfit].name);
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
    callMintOutfit(addressTo).then((res) => {
      if (res === true) {
        setProgressMint(100);
        clearInterval(intervalProgress);
        const intervalProgressHundred = setInterval(() => {
          setProgressMint((oldProgress) => {
            if (oldProgress >= 100) {
              return 100;
            }
            return parseInt(Math.min(oldProgress + 7, 100));
          });
        }, 200);
        setTimeout(() => {
          NotificationManager.success(
            "Please check your wallet.",
            "Success!",
            3000
          );
          setFlagSuccessMint(true);
          clearInterval(intervalRandom);
          setTimeout(() => {
            setFlagClickedMint(false);
            setProgressMint(0);
            clearInterval(intervalProgressHundred);
            setFlagSuccessMint(false);
            setFlagStep(0);
          }, 4000);
        }, 1500); // numberMint * 1000 = total executed time
      } else {
        clearInterval(intervalProgress);
        setProgressMint(73);
        setTimeout(() => {
          NotificationManager.error(
            "Please try to mint again.",
            "Failed!",
            3000
          );
          setFlagSuccessMint(false);
          clearInterval(intervalRandom);
          setTimeout(() => {
            setFlagClickedMint(false);
            setProgressMint(0);
            setFlagSuccessMint(false);
            setFlagStep(0);
          }, 1000);
        }, 1000); // numberMint * 1000 = total executed time
      }
    });
  };

  const handleUpfront = () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.error("Please connect your wallet.", "", 3000);
    }
    setFlagOpenUpfront(true);
  };

  const handlePurchase = () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.error("Please connect your wallet.", "", 3000);
    }
    let addressTo = preserveLink.account.address;

    setUpfront(addressTo).then((res) => {
      if (res.flagSuccess) {
        NotificationManager.success(
          "Registered in upfront option.",
          "Success!",
          3000
        );
        callMintOutfit(addressTo);
        callUpfront();
        setFlagOpenUpfront(false);
        getUpfront(addressTo).then((res) => {
          if (res.flagSuccess) {
            setFlagRegisteredUpfront(true);
          } else {
            setFlagRegisteredUpfront(false);
          }
        });
      } else {
        NotificationManager.error(res.msgError, "Error!", 3000);
      }
    });
  };

  useMemo(async () => {
    let randomIndexOutfit = Math.floor(Math.random() * dataCollection.length);
    let randomTypeOutfit = Math.floor(Math.random() * 5);
    let tempType;
    switch (randomTypeOutfit) {
      case 0:
        tempType = "arms";
        break;
      case 1:
        tempType = "body";
        break;
      case 2:
        tempType = "head";
        break;
      case 3:
        tempType = "legs";
        break;
      case 4:
        tempType = "item";
        break;
      default:
        break;
    }
    setTypeOutfit(tempType);
    setImgOutfit(dataCollection[randomIndexOutfit].name);
    if (preserveLink === null || preserveLink === undefined) {
      return;
    }
    let addressTo = preserveLink.account.address;
    const ContractName = process.env.REACT_APP_CONTRACT;

    let sb = new PhantasmaTS.ScriptBuilder();
    let script = sb
      .BeginScript()
      .CallContract(ContractName, "hasSandyBody", [addressTo])
      .EndScript();

    let sR = await PhantasmaAPIClient.invokeRawScript("main", script).then(
      (scriptResults) => {
        const bytes = PhantasmaTS.Base16.decodeUint8Array(scriptResults.result);
        const vm = new PhantasmaTS.VMObject();
        const readerVM = new PhantasmaTS.PBinaryReader(bytes);
        vm.UnserializeData(readerVM);
        return vm;
      }
    );

    console.log("owned naked sandy:", FormatData(sR)); // return value after calling contract's function
    if (FormatData(sR) === "false") {
      setFlagOwnedSandy(0);
    } else {
      setFlagOwnedSandy(1);
    }
  }, [preserveLink]);

  useMemo(async () => {
    if (preserveLink === null || preserveLink === undefined) {
      return;
    }
    getUpfront(preserveLink.account.address).then((res) => {
      if (res.flagSuccess) {
        setFlagRegisteredUpfront(true);
      } else {
        setFlagRegisteredUpfront(false);
      }
    });
  }, [preserveLink]);

  useMemo(async () => {
    getCounts().then((res) => {
      if (res.flagSuccess) {
        let tempData = {
          Moon: res.data[0]["Moon"],
          Sun: res.data[0]["Sun"],
          Pearl: res.data[0]["Pearl"],
        };
        setDataCountsMint(tempData);
      }
    });
  }, []);

  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      <BackgroundFilter></BackgroundFilter>
      {flagOwnedSandy === 0 ? (
        <SectionMintSandy>
          {flagStep === 0 ? (
            <SectionChooseSand>
              <TextHeader>Choose your sand</TextHeader>
              <TextDescription>
                Each of these sands are extremely rare in SANDY's world. Only
                the bravest explorers have been clever enough to find it, and
                lucky enough to return. You have been granted just enough to
                fill your new SANDY. This will give your SANDY their strength
                and power. Be thoughtful in which of these you select and
                convicted in your choice. There is no wrong path, only the
                unwritten adventure ahead. Which sand do you choose?
              </TextDescription>
              <SectionSandImage>
                {dataChooseSand.map((each, index) => {
                  return (
                    <CardSand
                      data={each}
                      key={index}
                      setFlagStep={setFlagStep}
                      setSandyType={setSandyType}
                      preserveLink={preserveLink}
                      countsTotalMint={
                        dataCountsMint !== null
                          ? dataCountsMint[each.name]?.Organic?.Total +
                            dataCountsMint[each.name]?.Precious?.Total +
                            dataCountsMint[each.name]?.Energy?.Total
                          : 0
                      }
                      countsRemainingMint={
                        dataCountsMint !== null
                          ? dataCountsMint[each.name]?.Organic?.Remaining +
                            dataCountsMint[each.name]?.Precious?.Remaining +
                            dataCountsMint[each.name]?.Energy?.Remaining
                          : 0
                      }
                    />
                  );
                })}
              </SectionSandImage>
            </SectionChooseSand>
          ) : flagStep === 1 ? (
            <SectionChooseMaterial>
              <TextHeader>Choose your material</TextHeader>
              <TextDescription>
                The material that wraps your SANDY can be chosen from one of the
                three elements; Organic, Precious, or Energy. Each one holds
                exciting and fun possibilities.
              </TextDescription>
              <SectionSandImage>
                {dataChooseMaterial.map((each, index) => {
                  return (
                    <CardMaterial
                      data={each}
                      key={index}
                      setFlagStep={setFlagStep}
                      setSandyMaterial={setSandyMaterial}
                      preserveLink={preserveLink}
                      countsTotalMint={
                        dataCountsMint !== null
                          ? dataCountsMint[sandyType][each.name]?.Total
                          : 0
                      }
                      countsRemainingMint={
                        dataCountsMint !== null
                          ? dataCountsMint[sandyType][each.name]?.Remaining
                          : 0
                      }
                    />
                  );
                })}
              </SectionSandImage>
              <SectionButton>
                <ButtonBBack
                  onClick={() => {
                    setFlagStep(0);
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  <IconBack>
                    <FaAngleDoubleLeft />
                  </IconBack>
                  <TextButtonBack>BACK</TextButtonBack>
                </ButtonBBack>
              </SectionButton>
            </SectionChooseMaterial>
          ) : (
            <SectionMint>
              <SectionImageSelect>
                <SectionImage>
                  {/* <img
                  src={imageBackground}
                  width={"100%"}
                  height={"100%"}
                  alt=""
                /> */}
                  <SectionInsideImage>
                    <video
                      id="idMintVideo"
                      controls
                      src={videoBornSandy}
                      width={"100%"}
                      type="video/mp4"
                    ></video>
                    {/* <img
                    src={imageMaterialSandy}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  /> */}
                  </SectionInsideImage>
                  {/* <SectionInsideImage>
                  <img src={imageEye} width={"100%"} height={"100%"} alt="" />
                </SectionInsideImage> */}
                </SectionImage>

                {/* <SectionButtonGroup>
                <ButtonSelect
                  borderRadius={"0px 0px 0px 18px"}
                  onClick={() => {
                    let numberTemp = numberMint;
                    numberTemp--;
                    if (numberTemp <= 0) {
                      return NotificationManager.error(
                        "It must be greater than zero!",
                        "",
                        3000
                      );
                    }
                    setNumberMint(numberTemp);
                  }}
                >
                  <FaMinus />
                </ButtonSelect>
                <SectionInputMintNumber>
                  <InputMintNumnber
                    component="input"
                    type="text"
                    value={numberMint}
                    onChange={(e) => {
                      if (!isNaN(e.target.value)) {
                        setNumberMint(e.target.value);
                      } else {
                        return NotificationManager.error(
                          "It must be number!",
                          "",
                          3000
                        );
                      }
                    }}
                  ></InputMintNumnber>
                </SectionInputMintNumber>
                <ButtonSelect
                  borderRadius={"0px 0px 18px 0px"}
                  onClick={() => {
                    let numberTemp = numberMint;
                    numberTemp++;
                    // if (numberTemp <= 0) {
                    //   return;
                    // }
                    setNumberMint(numberTemp);
                  }}
                >
                  <FaPlus />
                </ButtonSelect>
              </SectionButtonGroup> */}
              </SectionImageSelect>
              <MintButton
                onClick={() => handleMintSandy()}
                active={!flagClickedMint ? 1 : 0}
              >
                {!flagClickedMint ? (
                  <TextMintButton>Bring your SANDY to life</TextMintButton>
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
              </MintButton>
            </SectionMint>
          )}
        </SectionMintSandy>
      ) : flagOwnedSandy === 1 ? (
        <SectionMintOutfit>
          <SectionChooseSand>
            <TextHeader>
              {flagRegisteredUpfront
                ? "You're already registered in upfront"
                : "Mint your outfit"}
            </TextHeader>
            <TextDescription>
              {flagRegisteredUpfront
                ? "You will get 10 wearables for 10 weeks. Please wait to get one outfit every thursday."
                : "You already own a SANDY, right? Please mint an outfit NFT to put on your SANDY!"}
            </TextDescription>
            {flagRegisteredUpfront ? (
              <SectionUpfrontVideo>
                <video
                  autoPlay
                  loop
                  controls
                  src={"assets/videos/Key.mp4"}
                  width={"100%"}
                  type="video/mp4"
                ></video>
              </SectionUpfrontVideo>
            ) : !flagSuccessMint ? (
              <SectionOutfitImage>
                {typeOutfit === "head" ? (
                  <ImageOutfitImageHead>
                    <img
                      src={`/assets/images/Wearables/Outfits/${imgOutfit}/${uppercaseFirstText(
                        typeOutfit
                      )}.png`}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageOutfitImageHead>
                ) : typeOutfit === "arms" ? (
                  <ImageOutfitImageArm>
                    <img
                      src={`/assets/images/Wearables/Outfits/${imgOutfit}/${uppercaseFirstText(
                        typeOutfit
                      )}.png`}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageOutfitImageArm>
                ) : typeOutfit === "body" ? (
                  <ImageOutfitImageBody>
                    <img
                      src={`/assets/images/Wearables/Outfits/${imgOutfit}/${uppercaseFirstText(
                        typeOutfit
                      )}.png`}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageOutfitImageBody>
                ) : typeOutfit === "legs" ? (
                  <ImageOutfitImageLeg>
                    <img
                      src={`/assets/images/Wearables/Outfits/${imgOutfit}/${uppercaseFirstText(
                        typeOutfit
                      )}.png`}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageOutfitImageLeg>
                ) : typeOutfit === "item" ? (
                  <ImageOutfitImageItem>
                    <img
                      src={`/assets/images/Wearables/Outfits/${imgOutfit}/${uppercaseFirstText(
                        typeOutfit
                      )}.png`}
                      width={"100%"}
                      height={"100%"}
                      alt=""
                    />
                  </ImageOutfitImageItem>
                ) : (
                  <></>
                )}
              </SectionOutfitImage>
            ) : (
              <SectionOutfitImageRandom>?</SectionOutfitImageRandom>
            )}
            {flagRegisteredUpfront ? (
              <></>
            ) : (
              <ButtonGroup>
                <ButtonUpfront
                  onClick={() => {
                    handleUpfront();
                  }}
                  active={!flagOpenUpfront ? 1 : 0}
                >
                  <TextMintButton>
                    Mint All 10 Pieces
                    <br />
                    (2500 SOUL)
                  </TextMintButton>
                </ButtonUpfront>
                <ButtonUpfront
                  onClick={() => handleMintOutfit()}
                  active={!flagClickedMint ? 1 : 0}
                >
                  {!flagClickedMint ? (
                    <TextMintButton>
                      One Piece
                      <br />
                      (250 SOUL)
                    </TextMintButton>
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
                </ButtonUpfront>
              </ButtonGroup>
            )}
          </SectionChooseSand>
        </SectionMintOutfit>
      ) : (
        <></>
      )}

      {!flagSuccessMint ? (
        <></>
      ) : (
        <SectionCongrats>
          <SectionAnimation zIndex={"3002"}>
            <ConfettiExplosion
              duration={"4000"}
              particleCount={"200"}
              zIndex={"3002"}
            />
          </SectionAnimation>
          <SectionAnimation zIndex={"3003"}>
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

      <SectionPasscode flagopen={flagOpenUpfront ? 1 : 0}>
        <SectionBackPass></SectionBackPass>
        <ModalPasscode>
          <ModalBack>
            <TextSubjectPasscode>Upfront</TextSubjectPasscode>
            <TextDescription>
              Are you sure you pay 2500 SOUL to purchase 10 wearables?
            </TextDescription>
            <SectionButtonGroup>
              <ButtonCheck
                onClick={() => {
                  setFlagOpenUpfront(false);
                }}
              >
                Back
              </ButtonCheck>
              <ButtonCheck
                onClick={() => {
                  handlePurchase();
                }}
              >
                Purchase
              </ButtonCheck>
            </SectionButtonGroup>
          </ModalBack>
        </ModalPasscode>
      </SectionPasscode>
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
  background-color: #636363;
  /* background-image: url(${imgMainBackground}); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SectionMintSandy = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 100px;
  z-index: 31;
`;

const SectionImage = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px 20px;
  background-color: grey;
  margin-top: 200px;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 1);

  > img {
    border-radius: 18px 18px;
    background-position: center;
    background-size: cover;
  }

  animation: aniShadow01 5s ease-out forwards;
  animation-iteration-count: infinite;
  @keyframes aniShadow01 {
    0% {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
    }
    50% {
      box-shadow: 0px 0px 50px rgba(255, 255, 255, 1);
    }
    100% {
      box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
    }
  }
`;

const SectionInsideImage = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px 20px;
  border: 3px dashed white;
  background: white;
  > img {
    border-radius: 18px 18px;
    background-position: center;
    background-size: cover;
  }
  > video {
    border-radius: 18px 18px;
  }
`;

// const SectionButtonGroup = styled(Box)`
//   display: flex;
//   width: 100%;
//   align-items: center;
//   height: 50px;
//   border-left: 3px solid white;
//   border-right: 3px solid white;
//   border-bottom: 3px solid white;
//   border-radius: 0px 0px 20px 20px;
//   box-shadow: 0px 0px 20px rgba(255, 255, 255, 1);

//   animation: move-up01 5s ease-out forwards;
//   animation-iteration-count: infinite;
//   @keyframes move-up01 {
//     0% {
//       box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
//     }
//     50% {
//       box-shadow: 0px 0px 50px rgba(255, 255, 255, 1);
//     }
//     100% {
//       box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
//     }
//   }
// `;

const SectionImageSelect = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 500px;

  transition: 0.3s;
  @media (max-width: 768px) {
    width: 400px;
  }
  @media (max-width: 500px) {
    width: 320px;
  }
  @media (max-width: 390px) {
    width: 250px;
  }
`;

// const ButtonSelect = styled(Box)`
//   display: flex;
//   flex: 1;
//   height: 100%;
//   justify-content: center;
//   align-items: center;
//   background: #ec8424;
//   color: white;
//   font-size: 1.5rem;

//   transition: 0.2s;
//   cursor: pointer;
//   user-select: none;
//   &:active {
//     font-size: 1.1rem;
//   }

//   &:hover {
//     background-color: #f87614;
//   }
// `;

// const SectionInputMintNumber = styled(Box)`
//   display: flex;
//   flex: 1;
//   height: 100%;
//   border-right: 3px solid white;
//   border-left: 3px solid white;
// `;

// const InputMintNumnber = styled(Box)`
//   display: flex;
//   width: 100%;
//   padding: 0px 10px;
//   text-align: center;
//   color: white;
//   /* height: 100%; */
//   outline: none;
//   border: none;

//   font-family: "Poppins";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 24px;
//   line-height: 24px;
//   color: white;

//   background: #ba7f48;
// `;

const MintButton = styled(Box)`
  display: flex;
  width: 300px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background: #ec8424;
  margin-top: 50px;
  border-radius: 10px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: 0.3s;
  cursor: ${({ active }) => (active ? "pointer" : "wait")};
  user-select: none;
  &:hover {
    > div:nth-child(1) {
      text-shadow: ${({ active }) => (active ? "0px 0px 10px" : "unset")};
    }
  }

  /* margin-bottom: 50px; */

  transition: 0.3s;
  @media (max-width: 500px) {
    width: 280px;
    height: 50px;
  }
  @media (max-width: 390px) {
    width: 250px;
    height: 40px;
  }
`;

const ButtonUpfront = styled(Box)`
  display: flex;
  width: 200px;
  height: 75px;
  justify-content: center;
  align-items: center;
  background: #ec8424;

  border-radius: 10px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: 0.3s;
  cursor: ${({ active }) => (active ? "pointer" : "wait")};
  user-select: none;
  &:hover {
    > div:nth-child(1) {
      text-shadow: ${({ active }) => (active ? "0px 0px 10px" : "unset")};
    }
  }

  /* margin-bottom: 50px; */

  transition: 0.3s;
  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    height: 60px;
  }
  @media (max-width: 500px) {
    flex: 1;
    width: 100%;
    height: 66px;
  }
  @media (max-width: 390px) {
    flex: 1;
    width: 100%;
    height: 60px;
  }
`;

const TextMintButton = styled(Box)`
  display: flex;
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: white;

  transition: 0.3s;
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 500px) {
    font-size: 16px;
    font-weight: 500;
  }
  @media (max-width: 390px) {
    font-size: 14px;
    font-weight: 500;
  }
`;

const SectionProgressMint = styled(Box)`
  display: flex;
  align-items: center;
`;

const SectionCircleProgress = styled(Box)`
  display: flex;
  margin-left: 10px;
  width: 35px;
`;

const SectionCongrats = styled(Box)`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3001;
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

const BackgroundFilter = styled(Box)`
  display: flex;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background-image: url(${imgFilterBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SectionChooseSand = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  transition: all 0.5s;
  animation: backAnimationTrait 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes backAnimationTrait {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
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

  transition: 0.3s;
  @media (max-width: 1023px) {
    margin-top: 150px;
  }
  @media (max-width: 390px) {
    font-size: 22px;
  }
`;

const TextDescription = styled(Box)`
  margin-top: 30px;
  text-align: center;
  /* font-family: "Poppins"; */
  font-style: normal;
  font-size: 16px;
  line-height: 120%;
  color: white;
  text-shadow: 0px 0px 3px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 390px) {
    text-shadow: 0px 0px 2px black;
    font-size: 10px;
  }
`;

const SectionSandImage = styled(Box)`
  display: grid;
  width: 100%;
  margin-top: 100px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 100px;
  grid-row-gap: 30px;

  transition: 0.3s;
  @media (max-width: 1600px) {
    margin-top: 80px;
    grid-column-gap: 50px;
  }
  transition: 0.3s;
  @media (max-width: 1440px) {
    margin-top: 60px;
    grid-column-gap: 30px;
  }
  @media (max-width: 1200px) {
    margin-top: 50px;
    grid-column-gap: 15px;
  }
  @media (max-width: 1024px) {
    margin-top: 100px;
  }
  @media (max-width: 768px) {
    margin-top: 80px;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-row-gap: 50px;
  }
  @media (max-width: 390px) {
    margin-top: 50px;
    grid-column-gap: 10px;
  }
`;

const SectionChooseMaterial = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  transition: all 0.5s;
  animation: backAnimationTrait 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes backAnimationTrait {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const SectionButton = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 100px;
`;

const ButtonBBack = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: 0.1s;
  &:hover {
    transform: scale(1.15);
  }
  &:active {
    transform: scale(1);
  }
`;

const IconBack = styled(Box)`
  display: flex;
  font-size: 2rem;
  color: white;
`;
const TextButtonBack = styled(Box)`
  display: flex;
  font-size: 24px;
  color: white;
  margin-left: 10px;
`;

const SectionMint = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  animation: backAnimationTrait 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes backAnimationTrait {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const SectionMintOutfit = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 100px;
  z-index: 31;
`;

const SectionOutfitImage = styled(Box)`
  display: flex;
  position: relative;
  margin-top: 100px;
  width: 400px;
  height: 400px;
  border-radius: 18px;
  border: 3px dashed white;
  background: #ec8424;
  overflow: hidden;

  transition: 0.3s;
  @media (max-width: 768px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 70px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 50px;
  }
`;

const SectionOutfitImageRandom = styled(Box)`
  display: flex;
  position: relative;
  margin-top: 100px;
  width: 400px;
  height: 400px;
  justify-content: center;
  align-items: center;
  color: white;
  /* font-family: "Poppins"; */
  font-size: 200px;
  font-weight: 600;
  border-radius: 18px;
  border: 3px dashed white;
  background: #ec8424;
  overflow: hidden;

  transition: 0.3s;
  @media (max-width: 768px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 70px;
    font-size: 200px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 50px;
    font-size: 120px;
  }
`;

const SectionUpfrontVideo = styled(Box)`
  display: flex;
  position: relative;
  margin-top: 100px;
  width: 400px;
  height: 400px;
  border-radius: 18px;
  border: 3px dashed white;
  background: white;
  overflow: hidden;

  transition: 0.3s;
  @media (max-width: 768px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 70px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: unset;
    aspect-ratio: 1;
    margin-top: 50px;
  }
`;

const ImageOutfitImageHead = styled(Box)`
  display: flex;
  position: absolute;

  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  > img {
    border-radius: 18px;
  }
`;

const ImageOutfitImageArm = styled(Box)`
  display: flex;
  position: absolute;

  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  > img {
    border-radius: 18px;
  }
`;

const ImageOutfitImageBody = styled(Box)`
  display: flex;
  position: absolute;

  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  > img {
    border-radius: 18px;
  }
`;

const ImageOutfitImageLeg = styled(Box)`
  display: flex;
  position: absolute;

  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  > img {
    border-radius: 18px;
  }
`;

const ImageOutfitImageItem = styled(Box)`
  display: flex;
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  > img {
    border-radius: 18px;
  }
`;

const ButtonGroup = styled(Box)`
  display: grid;
  /* width: 100%; */
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  transition: 0.3s;
  @media (max-width: 768px) {
    margin-top: 40px;
    width: 100%;
  }
  @media (max-width: 490px) {
    margin-top: 30px;
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

// const SectionInputPass = styled(Box)`
//   display: flex;
//   width: 100%;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
//   border-bottom: 2px solid white;
// `;

// const InputPass = styled(Box)`
//   display: flex;
//   width: 100%;
//   border: none;
//   outline: none;
//   background-color: rgba(0, 0, 0, 0);
//   font-size: 20px;
//   color: white;
// `;

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

export default Mint;
