import styled from "styled-components";
import { Box } from "@mui/material";
import imgMainBackground from "../../assets/images/background/backWardrobe01.png";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import {
  dataWardrobeBackgrounds,
  dataWardrobeEye,
  dataWardrobeMouth,
  dataWardrobeSandy,
} from "../../data/Wardrobe";
import { dataCollection } from "../../data/Collection";
import { useContext, useMemo, useState } from "react";
import { NotificationManager } from "react-notifications";
import { MdFiberNew } from "react-icons/md";
import { RefContext } from "../../lib/RefContext";
import { getBodyNft } from "../../lib/WalletToolKit/toolkit";
// import Cylinder from "../../components/Cylinder/Cylinder";

const Wardrobe = () => {
  const { preserveLink } = useContext(RefContext);
  const [sandyEquipped, setSandyEquipped] = useState([]);
  const [sandyNaked, setSandyNaked] = useState();
  const [sandyEye, setSandyEye] = useState();
  const [sandyMouth, setSandyMouth] = useState();
  const [sandyHead, setSandyHead] = useState();
  const [sandyBody, setSandyBody] = useState();
  const [sandyArms, setSandyArms] = useState();
  const [sandyLegs, setSandyLegs] = useState();
  const [sandyItem, setSandyItem] = useState();
  const [sandyBackground, setSandyBackground] = useState();
  const [layerSandyItem, setLayerSandyItem] = useState();

  const [flagSandySelected, setFlagSandySelected] = useState(0);
  const [flagTagTrait, setFlagTagTrait] = useState(0);

  const [flagSandyEyeSelected, setFlagSandyEyeSelected] = useState(0);
  const [flagSandyMouthSelected, setFlagSandyMouthSelected] = useState(0);
  const [flagSandyHeadSelected, setFlagSandyHeadSelected] = useState(0);
  const [flagSandyBodySelected, setFlagSandyBodySelected] = useState(0);
  const [flagSandyArmsSelected, setFlagSandyArmsSelected] = useState(0);
  const [flagSandyLegsSelected, setFlagSandyLegsSelected] = useState(0);
  const [flagSandyItemSelected, setFlagSandyItemSelected] = useState(0);
  const [flagSandyBackgroundSelected, setFlagSandyBackgroundSelected] =
    useState(0);

  const handleReset = () => {
    setSandyNaked();
    setSandyEye();
    setSandyMouth();
    setSandyHead();
    setSandyBody();
    setSandyArms();
    setSandyLegs();
    setSandyItem();
    setSandyBackground();
    setLayerSandyItem();
  };

  const submitSandy = () => {
    // if (!sandyHead) {
    //   return NotificationManager.error("Please select head!", "", 3000);
    // }
    // if (!sandyEye) {
    //   return NotificationManager.error("Please select eye!", "", 3000);
    // }
    // if (!sandyMouth) {
    //   return NotificationManager.error("Please select mouth!", "", 3000);
    // }
    // if (!sandyBody) {
    //   return NotificationManager.info("Please select body first.", "", 3000);
    // }
    // if (!sandyArms) {
    //   return NotificationManager.error("Please select arms!", "", 3000);
    // }
    // if (!sandyLegs) {
    //   return NotificationManager.error("Please select legs!", "", 3000);
    // }
    // if (!sandyItem) {
    //   return NotificationManager.error("Please select item!", "", 3000);
    // }
    // if (!sandyBackground) {
    //   return NotificationManager.error(
    //     "Please select background image!",
    //     "",
    //     3000
    //   );
    // }
    let tempSandyEquipped = [...sandyEquipped];
    let tempSandy = {
      naked: sandyNaked,
      head: sandyHead,
      eye: sandyEye,
      mouth: sandyMouth,
      body: sandyBody,
      arms: sandyArms,
      legs: sandyLegs,
      item: sandyItem,
      background: sandyBackground,
      flagLayerItem: layerSandyItem,
    };
    tempSandyEquipped.push(tempSandy);
    setSandyEquipped(tempSandyEquipped);
  };

  useMemo(async () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }
    let tempNFTs = await getBodyNft(preserveLink);
    console.log(tempNFTs);
    let arrayNFTs = [];

    for (let i = 0; i < tempNFTs.length; i++) {
      // arrayNFTs.push(tempNFTs[i]);
      if(tempNFTs[i].series===1){
        
      }
    }
    // setNFTsOwned(arrayNFTs);
  }, [preserveLink]);

  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
      <TextHeader>SANDY's Wardrobe</TextHeader>
      <SectionContent>
        <SectionLeft>
          <SectionWearableSandy>
            <SectionSandyNaked>
              <img src={sandyNaked} alt="" />
              <SectionSandyBackground>
                <SectionSandyOpacity></SectionSandyOpacity>
                <SectinSandyBackgroundImage>
                  <img
                    src={sandyBackground}
                    style={{ borderRadius: "12px" }}
                    alt=""
                  />
                </SectinSandyBackgroundImage>
              </SectionSandyBackground>
              <SectionSandyHead>
                <img src={sandyHead} alt="" />
              </SectionSandyHead>
              <SectionSandyEye>
                <img src={sandyEye} alt="" />
              </SectionSandyEye>
              <SectionSandyMouth>
                <img src={sandyMouth} alt="" />
              </SectionSandyMouth>
              <SectionSandyBody>
                <img src={sandyBody} alt="" />
              </SectionSandyBody>
              <SectionSandyArms>
                <img src={sandyArms} alt="" />
              </SectionSandyArms>

              <SectionSandyLegs>
                <img src={sandyLegs} alt="" />
              </SectionSandyLegs>
              <SectionSandyItem layer={layerSandyItem ? 1 : 0}>
                <img src={sandyItem} alt="" />
              </SectionSandyItem>
              {sandyNaked ? (
                <ButtonReset onClick={() => handleReset()}>
                  <MdFiberNew />
                </ButtonReset>
              ) : (
                <></>
              )}
            </SectionSandyNaked>
            {sandyNaked ? (
              <ButtonSubmit onClick={() => submitSandy()}>
                Equip SANDY
              </ButtonSubmit>
            ) : (
              <></>
            )}
          </SectionWearableSandy>
        </SectionLeft>
        <SectionRight>
          <SectionSelectSandy>
            <TextSubject>Choose SANDY</TextSubject>
            <SectionSelectScrollSandy>
              {dataWardrobeSandy.map((each, index) => {
                return (
                  <SectionEachSandy
                    key={index}
                    onClick={() => {
                      setSandyNaked(
                        "assets/images/SandyMaterials/" + each.name + ".png"
                      );
                      setFlagSandySelected(index + 1);
                    }}
                    active={flagSandySelected === index + 1 ? 1 : 0}
                  >
                    <img
                      src={"assets/images/SandyMaterials/" + each.name + ".png"}
                      alt=""
                    />
                  </SectionEachSandy>
                );
              })}
            </SectionSelectScrollSandy>
          </SectionSelectSandy>
          <SectionSelectItems>
            <SectionGroupButtons>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(0);
                }}
                active={flagTagTrait === 0 ? 1 : 0}
              >
                Head
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(1);
                }}
                active={flagTagTrait === 1 ? 1 : 0}
              >
                Eye
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(2);
                }}
                active={flagTagTrait === 2 ? 1 : 0}
              >
                Mouth
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(3);
                }}
                active={flagTagTrait === 3 ? 1 : 0}
              >
                Body
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(4);
                }}
                active={flagTagTrait === 4 ? 1 : 0}
              >
                Arms
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(5);
                }}
                active={flagTagTrait === 5 ? 1 : 0}
              >
                Legs
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(6);
                }}
                active={flagTagTrait === 6 ? 1 : 0}
              >
                Item
              </ButtonEachTag>
              <ButtonEachTag
                onClick={() => {
                  setFlagTagTrait(7);
                }}
                active={flagTagTrait === 7 ? 1 : 0}
              >
                Back
              </ButtonEachTag>
            </SectionGroupButtons>
            {flagTagTrait === 0 ? (
              <SectionEachTraits>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeSandy.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyHead(
                          `/assets/images/Wearables/Outfits/${each.name}/Head.png`
                        );
                        setFlagSandyHeadSelected(index + 1);
                      }}
                      active={flagSandyHeadSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Wearables/Outfits/${each.name}/Head.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 1 ? (
              <SectionEachTraits>
                {dataWardrobeEye.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={index !== dataWardrobeEye.length - 1 ? "10px" : "0px"}
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyEye(
                          `/assets/images/Treasure Chests/Treasure Chest 1/Eyes/${each.name}.png`
                        );
                        setFlagSandyEyeSelected(index + 1);
                      }}
                      active={flagSandyEyeSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Treasure Chests/Treasure Chest 1/Eyes/${each.name}.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 2 ? (
              <SectionEachTraits>
                {dataWardrobeMouth.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeMouth.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyMouth(
                          `/assets/images/Treasure Chests/Treasure Chest 1/Mouths/${each.name}.png`
                        );
                        setFlagSandyMouthSelected(index + 1);
                      }}
                      active={flagSandyMouthSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Treasure Chests/Treasure Chest 1/Mouths/${each.name}.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 3 ? (
              <SectionEachTraits>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeSandy.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyBody(
                          `/assets/images/Wearables/Outfits/${each.name}/Body.png`
                        );
                        setFlagSandyBodySelected(index + 1);
                      }}
                      active={flagSandyBodySelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Wearables/Outfits/${each.name}/Body.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 4 ? (
              <SectionEachTraits>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeSandy.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyArms(
                          `/assets/images/Wearables/Outfits/${each.name}/Arms.png`
                        );
                        setFlagSandyArmsSelected(index + 1);
                      }}
                      active={flagSandyArmsSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Wearables/Outfits/${each.name}/Arms.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 5 ? (
              <SectionEachTraits>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeSandy.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyLegs(
                          `/assets/images/Wearables/Outfits/${each.name}/Legs.png`
                        );
                        setFlagSandyLegsSelected(index + 1);
                      }}
                      active={flagSandyLegsSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Wearables/Outfits/${each.name}/Legs.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 6 ? (
              <SectionEachTraits>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionEachSandyItem
                      key={index}
                      mr={
                        index !== dataWardrobeSandy.length - 1 ? "10px" : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyItem(
                          `/assets/images/Wearables/Outfits/${each.name}/Item.png`
                        );
                        setLayerSandyItem(each.equipment.item.flagLayer);
                        setFlagSandyItemSelected(index + 1);
                      }}
                      active={flagSandyItemSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Wearables/Outfits/${each.name}/Item.png`}
                        alt=""
                      />
                    </SectionEachSandyItem>
                  );
                })}
              </SectionEachTraits>
            ) : flagTagTrait === 7 ? (
              <SectionEachTraits>
                {dataWardrobeBackgrounds.map((each, index) => {
                  return (
                    <SectionEachSandyBack
                      key={index}
                      mr={
                        "10px"
                        // index !== dataWardrobeBackgrounds.length - 1
                        //   ? "10px"
                        //   : "0px"
                      }
                      onClick={() => {
                        if (!sandyNaked) {
                          return NotificationManager.info(
                            "Please select sandy first.",
                            "",
                            3000
                          );
                        }
                        setSandyBackground(
                          `/assets/images/Treasure Chests/Treasure Chest 1/Backgrounds vr1/${each.name}.png`
                        );
                        setFlagSandyBackgroundSelected(index + 1);
                      }}
                      active={flagSandyBackgroundSelected === index + 1 ? 1 : 0}
                    >
                      <img
                        src={`/assets/images/Treasure Chests/Treasure Chest 1/Backgrounds vr1/${each.name}.png`}
                        // style={{ borderRadius: "12px" }}
                        alt=""
                      />
                    </SectionEachSandyBack>
                  );
                })}
              </SectionEachTraits>
            ) : (
              <></>
            )}
          </SectionSelectItems>
        </SectionRight>
      </SectionContent>
      {sandyEquipped.length !== 0 ? (
        <SectionEquipped>
          <TextSubject>Equipped SANDY</TextSubject>
          <SectionEquippeSelect>
            <SectionScrollEquippedSandy>
              {sandyEquipped?.map((each, index) => {
                return (
                  <SectionEquippedSandy key={index}>
                    <img src={each.naked} alt="" />
                    <SectionEquippedSandyBackground>
                      <img
                        src={each.background}
                        style={{ borderRadius: "12px" }}
                        alt=""
                      />
                    </SectionEquippedSandyBackground>
                    <SectionEquippedSandyArms>
                      <img src={each.arms} alt="" />
                    </SectionEquippedSandyArms>
                    <SectionEquippedSandyLegs>
                      <img src={each.legs} alt="" />
                    </SectionEquippedSandyLegs>
                    <SectionEquippedSandyBody>
                      <img src={each.body} alt="" />
                    </SectionEquippedSandyBody>
                    <SectionEquippedSandyEye>
                      <img src={each.eye} alt="" />
                    </SectionEquippedSandyEye>
                    <SectionEquippedSandyMouth>
                      <img src={each.mouth} alt="" />
                    </SectionEquippedSandyMouth>
                    <SectionEquippedSandyHead>
                      <img src={each.head} alt="" />
                    </SectionEquippedSandyHead>
                    <SectionEquippedSandyItem
                      layer={each.flagLayerItem ? 1 : 0}
                    >
                      <img src={each.item} alt="" />
                    </SectionEquippedSandyItem>
                  </SectionEquippedSandy>
                );
              })}
            </SectionScrollEquippedSandy>
          </SectionEquippeSelect>
        </SectionEquipped>
      ) : (
        <></>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 100px;
  margin-bottom: 100px;
  z-index: 31;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const SectionLeft = styled(Box)`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SectionRight = styled(Box)`
  display: flex;
  width: 300px;
  height: max-content;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  background-color: rgb(206, 160, 101);
  padding: 30px;
  box-sizing: border-box;
  border-radius: 20px;

  transition: 0.3s;
  @media (max-width: 1600px) {
    width: 250px;
    padding: 20px;
  }
  @media (max-width: 700px) {
    width: 150px;
    padding: 10px;
  }
  @media (max-width: 500px) {
    width: 100%;
    margin-top: 50px;
  }
  @media (max-width: 390px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const SectionEquipped = styled(Box)`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;

  border: 2px solid white;
  background-color: rgb(206, 160, 101);
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  transition: 0.3s;
  @media (max-width: 600px) {
    width: 100%;
    margin-bottom: 100px;
  }
  z-index: 31;
`;

const TextSubject = styled(Box)`
  display: flex;
  justify-content: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 27px;
  color: white;

  transition: 0.3s;
  @media (max-width: 700px) {
    font-size: 20px;
    text-align: center;
  }
`;

const SectionEquippeSelect = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* width: fit-content; */

  /* margin-top: 20px; */
  overflow-x: auto;

  /* align-items: center; */
  ::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 12px !important;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(50, 35, 30); // #ec8424
    border-radius: 12px !important;
  }
`;

const SectionSandyOpacity = styled(Box)`
  display: flex;
  width: 100%;
  aspect-ratio: 1;

  position: absolute;
  border-radius: 12px;
  opacity: 0.6;
  background-color: grey;
  border: 2px dashed white;

  transition: 0.5s;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const SectinSandyBackgroundImage = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
`;

const SectionSelectScrollSandy = styled(Box)`
  display: grid;
  width: 100%;
  height: 200px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  align-content: start;
  overflow-x: hidden;
  overflow-y: auto;

  transition: 0.3s;
  @media (max-width: 1600px) {
    height: 150px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 700px) {
    height: 100px;
    margin-top: 10px;
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 500px) {
    height: 80px;
    margin-top: 10px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 390px) {
    height: 110px;
    margin-top: 10px;
    grid-template-columns: repeat(2, 1fr);
  }

  ::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 12px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(50, 35, 30); // #ec8424
    border-radius: 12px;
  }
`;

const SectionEachSandy = styled(Box)`
  display: flex;
  /* width: 80px; */
  cursor: pointer;
  > img {
    transition: 0.3s;
    filter: ${({ active }) =>
      active ? "drop-shadow(0px 0px 6px black)" : "unset"};

    &:hover {
      filter: drop-shadow(0px 0px 6px black);
    }
    width: 100%;
  }
`;

const SectionEquippedSandy = styled(Box)`
  display: flex;
  position: relative;
  margin-right: 10px;

  /* width: 80px; */
  cursor: pointer;
  > img {
    width: 100px;
    z-index: 51;
  }
`;

const SectionSandyNaked = styled(Box)`
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    z-index: 41;
  }
`;
const SectionSandyBackground = styled(Box)`
  display: flex;
  width: 100%;
  position: absolute;
  transition: 0.5s;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }

  z-index: 39;
`;

const SectionSandyHead = styled(Box)`
  display: flex;
  position: absolute;

  transition: 0.5s;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }

  z-index: 47;
`;

const SectionSandyEye = styled(Box)`
  display: flex;
  position: absolute;

  transition: 0.5s;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }

  z-index: 42;
`;

const SectionSandyMouth = styled(Box)`
  display: flex;
  position: absolute;

  transition: 0.5s;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }

  z-index: 43;
`;

const SectionSandyBody = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }
  z-index: 46;
`;

const SectionSandyArms = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }
  z-index: 45;
`;

const SectionSandyLegs = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }
  z-index: 44;
`;
const SectionSandyItem = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);

  > img {
    width: 100%;
  }
  z-index: ${({ layer }) => (layer ? 48 : 40)};
`;

const ButtonSubmit = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: #ec8424;

  border-radius: 10px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 99;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  &:hover {
    text-shadow: 0px 0px 10px;
  }

  transition: 0.3s;
  @media (max-width: 1200px) {
    width: 150px;
    height: 40px;
    bottom: 10px;
    font-size: 16px;
  }
  @media (max-width: 1023px) {
    width: 200px;
    height: 40px;
    bottom: 10px;
    font-size: 18px;
  }
  @media (max-width: 600px) {
    width: 120px;
    height: 30px;
    bottom: 10px;
    font-size: 14px;
  }
  @media (max-width: 500px) {
    width: 180px;
    height: 40px;
    bottom: 10px;
    font-size: 16px;
  }
  @media (max-width: 390px) {
    width: 160px;
    height: 35px;
    bottom: 10px;
    font-size: 16px;
  }
`;

const SectionEquippedSandyHead = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 57;
`;

const SectionEquippedSandyEye = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 55;
`;

const SectionEquippedSandyMouth = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 56;
`;

const SectionEquippedSandyBackground = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 50;
`;

const SectionEquippedSandyBody = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 54;
`;

const SectionEquippedSandyArms = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 53;
`;

const SectionEquippedSandyLegs = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: 52;
`;

const SectionEquippedSandyItem = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  > img {
    width: 100%;
  }
  z-index: ${({ layer }) => (layer ? 58 : 51)};
`;

const SectionSelectSandy = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px dashed white;
`;

const SectionSelectItems = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 15px;
`;

const SectionGroupButtons = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  transition: 0.3s;
  @media (max-width: 1600px) {
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }
  @media (max-width: 700px) {
    grid-column-gap: 3px;
    grid-row-gap: 3px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-column-gap: 3px;
    grid-row-gap: 3px;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ButtonEachTag = styled(Box)`
  display: flex;
  flex: 1;
  height: 30px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ec8424;
  border-radius: 12px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: white;

  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  opacity: ${({ active }) => (active ? 1 : 0.3)};

  &:hover {
    opacity: 1;
  }

  @media (max-width: 1600px) {
    font-size: 12px;
    height: 25px;
  }
`;

const SectionEachTraits = styled(Box)`
  display: grid;
  width: 100%;
  height: 150px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
  align-content: start;
  overflow-x: hidden;
  overflow-y: auto;
  grid-column-gap: 5px;
  grid-row-gap: 5px;

  transition: 0.3s;
  @media (max-width: 1600px) {
    margin-top: 30px;
    grid-template-columns: repeat(2, 1fr);
    height: 150px;
  }
  @media (max-width: 700px) {
    margin-top: 10px;
    grid-template-columns: repeat(1, 1fr);
    height: 100px;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
    grid-template-columns: repeat(3, 1fr);
    height: 100px;
  }
  @media (max-width: 390px) {
    margin-top: 10px;
    grid-template-columns: repeat(3, 1fr);
    height: 70px;
  }

  ::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 12px;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(50, 35, 30); // #ec8424
    border-radius: 12px;
  }
`;

const SectionEachSandyItem = styled(Box)`
  display: flex;
  flex: 1;
  cursor: pointer;
  > img {
    transition: 0.3s;
    filter: ${({ active }) =>
      active ? "drop-shadow(0px 0px 6px black)" : "unset"};

    &:hover {
      filter: drop-shadow(0px 0px 6px black);
    }
    width: 100%;
  }
`;

const SectionEachSandyBack = styled(Box)`
  display: flex;
  flex: 1;
  cursor: pointer;
  > img {
    transition: 0.3s;
    filter: ${({ active }) =>
      active ? "drop-shadow(0px 0px 6px black)" : "unset"};

    &:hover {
      filter: drop-shadow(0px 0px 6px black);
    }
    width: 100%;
    aspect-ratio: 1;
  }
`;

const SectionWearableSandy = styled(Box)`
  display: flex;
  width: 70%;
  flex-direction: column;
  position: relative;
  aspect-ratio: 1;
  transition: 0.3s;
  @media (max-width: 1440px) {
    width: 95%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SectionScrollEquippedSandy = styled(Box)`
  display: flex;
  width: 90%;
  margin-top: 30px;
  align-items: center;
`;

const ButtonReset = styled(Box)`
  display: flex;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 2.5rem;
  color: #ec8424;
  cursor: pointer;
  user-select: none;

  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
    color: white;
  }
  &:active {
    transform: scale(1);
  }

  @media (max-width: 1440px) {
    font-size: 2.3rem;
  }
  @media (max-width: 1200px) {
    font-size: 2rem;
    right: 10px;
    top: 10px;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 500px) {
    font-size: 2.2rem;
  }
  @media (max-width: 390px) {
    font-size: 2rem;
  }
  z-index: 70;
`;

export default Wardrobe;
