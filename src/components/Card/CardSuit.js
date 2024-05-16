import { Box } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import disableScroll from "disable-scroll";
import { MdClose } from "react-icons/md";

const CardSuit = ({ each, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openBackstory, setOpenBackstory] = useState(false);
  const [textDescription, setTextDescription] = useState(each.description);

  return (
    <>
      <SectionEachSuit
        onClick={() => {
          setOpenModal(true);
          disableScroll.on();
        }}
      >
        <SectionChildEachImage>
          <SectionEachImage>
            <img
              src={`/assets/images/suits/${each.name}.jpg`}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </SectionEachImage>
        </SectionChildEachImage>

        {index % 2 === 0 ? (
          <TextNameLeft>{each.name}</TextNameLeft>
        ) : (
          <TextNameRight>{each.name}</TextNameRight>
        )}
      </SectionEachSuit>
      {!openModal ? (
        <></>
      ) : (
        <ModalBox>
          <TextSubject>{each.name}</TextSubject>
          <SectionContent>
            <SectionSuitCenter>
              <SectionChildSuitCenter
                onClick={() => {
                  // setOpenBackstory(true);
                  setTextDescription(each.description);
                }}
              >
                <SectionSuitCenterImage>
                  <img
                    src={`/assets/images/suits/${each.name}.jpg`}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </SectionSuitCenterImage>
              </SectionChildSuitCenter>
              <SectionSuitHead>
                <SectionEachChildSuit>
                  <img
                    src={`/assets/images/Wearables/Outfits/${each.name}/Head.png`}
                    width={"70%"}
                    alt=""
                  />
                </SectionEachChildSuit>
              </SectionSuitHead>
              <SectionSuitBody>
                <SectionEachChildSuit>
                  <img
                    src={`/assets/images/Wearables/Outfits/${each.name}/Body.png`}
                    width={"70%"}
                    alt=""
                  />
                </SectionEachChildSuit>
              </SectionSuitBody>
              <SectionSuitArm>
                <SectionEachChildSuit>
                  <img
                    src={`/assets/images/Wearables/Outfits/${each.name}/Arm.png`}
                    width={"70%"}
                    alt=""
                  />
                </SectionEachChildSuit>
              </SectionSuitArm>
              <SectionSuitLeg>
                <SectionEachChildSuit>
                  <img
                    src={`/assets/images/Wearables/Outfits/${each.name}/Leg.png`}
                    width={"70%"}
                    alt=""
                  />
                </SectionEachChildSuit>
              </SectionSuitLeg>
              <SectionSuitItem>
                <SectionEachChildSuit>
                  <img
                    src={`/assets/images/Wearables/Outfits/${each.name}/Item.png`}
                    width={"70%"}
                    alt=""
                  />
                </SectionEachChildSuit>
              </SectionSuitItem>
            </SectionSuitCenter>
          </SectionContent>
          {/* <TextDescription>{textDescription}</TextDescription> */}
          <ButtonClose
            onClick={() => {
              disableScroll.off();
              setOpenModal(false);
            }}
          >
            <MdClose />
          </ButtonClose>
        </ModalBox>
      )}
      {openBackstory ? (
        <SectionDescription
          onClick={() => {
            setOpenBackstory(false);
          }}
        >
          <SectionModalText>
            <TextHead>Backstory of {each.name}</TextHead>
            <TextDescription>{textDescription}</TextDescription>
          </SectionModalText>
        </SectionDescription>
      ) : (
        <></>
      )}
    </>
  );
};

const SectionEachSuit = styled(Box)`
  display: flex;
  position: relative;
  transform: translateX(25%);
  margin-top: -25%;
  padding: 3px;
  &:nth-of-type(4n + 1),
  &:nth-of-type(4n + 2) {
    transform: translateX(-25%);
  }
  cursor: pointer;
  user-select: none;
  transition: 0.3s;

  &:hover {
    > div:nth-of-type(1) {
      transition: 0.3s;
      filter: drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.5));
    }

    > div:nth-of-type(2) {
      text-shadow: 0px 0px 10px white;
    }
    > div:nth-of-type(1) > div > img {
      transform: scale(1.2);
    }
  }
`;

const SectionChildEachImage = styled(Box)`
  display: flex;
`;

const SectionEachImage = styled(Box)`
  display: flex;
  width: 200px;
  transition: 0.5s;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  > img {
    transition: 0.3s;
    object-fit: cover;
  }
  aspect-ratio: 0.9;

  @media (max-width: 1440px) {
    width: 150px;
  }
  @media (max-width: 700px) {
    width: 100px;
  }
  @media (max-width: 500px) {
    width: 70px;
  }
`;

const TextNameLeft = styled(Box)`
  display: flex;
  transition: 0.3s;
  position: absolute;
  right: 103%;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.5rem;
  line-height: 130%;
  text-shadow: 0px 0px 3px black;
  z-index: 41;

  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }

  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.9rem;
    text-shadow: unset;
  }
  @media (max-width: 350px) {
    font-size: 0.7rem;
  }
`;

const TextNameRight = styled(Box)`
  display: flex;
  transition: 0.3s;
  position: absolute;
  left: 103%;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 1.5rem;
  text-shadow: 0px 0px 3px black;
  line-height: 130%;
  z-index: 41;

  @media (max-width: 1440px) {
    font-size: 1.3rem;
  }

  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
  @media (max-width: 500px) {
    font-size: 0.9rem;
    font-weight: 400;
    text-shadow: unset;
  }
  @media (max-width: 350px) {
    font-size: 0.7rem;
  }
`;

const ModalBox = styled.span`
  display: flex;
  position: fixed;
  z-index: 10001;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  background-color: rgba(0, 0, 0, 0.3);

  top: 0px;
  left: 0px;
  backdrop-filter: blur(10px) !important;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const TextSubject = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 56px;
  color: white;
  margin-top: 50px;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 40px;
  }
  @media (max-width: 1024px) {
    margin-top: 80px;
  }
  @media (max-width: 768px) {
    font-size: 30px;
    margin-top: 100px;
  }
  @media (max-width: 390px) {
    margin-top: 120px;
    font-size: 25px;
  }
`;

const SectionContent = styled(Box)`
  display: flex;
  margin-top: 200px;

  @media (max-width: 1440px) {
    margin-top: 180px;
    transform: scale(0.9);
  }
  @media (max-width: 1024px) {
    margin-top: 160px;
    transform: scale(0.8);
  }
  @media (max-width: 768px) {
    margin-top: 140px;
    transform: scale(0.7);
  }
  @media (max-width: 600px) {
    margin-top: 130px;
    transform: scale(0.5);
  }
  @media (max-width: 390px) {
    margin-top: 150px;
    transform: scale(0.4);
  }
`;

const SectionSuitCenter = styled(Box)`
  display: flex;
  position: relative;
`;

const SectionChildSuitCenter = styled(Box)`
  display: flex;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));

    > div {
      transition: 0.3s;
    }
    > div > img {
      /* transform: scale(1.2); */
    }
  }
`;

const SectionSuitCenterImage = styled(Box)`
  display: flex;
  width: 260px;
  height: 260px;
  transition: 0.5s;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  > img {
    transition: 0.3s;
    object-position: center;
    object-fit: contain;
  }
  aspect-ratio: 0.9;
`;

const SectionSuitHead = styled(Box)`
  display: flex;
  position: absolute;
  right: 85%;
  bottom: 60%;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
  }
`;

const SectionSuitBody = styled(Box)`
  display: flex;
  position: absolute;
  left: 85%;
  bottom: 60%;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
  }
`;

const SectionSuitArm = styled(Box)`
  display: flex;
  position: absolute;
  right: 85%;
  top: 60%;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
  }
`;

const SectionSuitLeg = styled(Box)`
  display: flex;
  position: absolute;
  left: 85%;
  top: 60%;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
  }
`;

const SectionSuitItem = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -90%;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 1));
  }
`;

const SectionEachChildSuit = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 220px;
  background: #ec8424;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
`;

const ButtonClose = styled(Box)`
  display: flex;
  position: absolute;
  top: 50px;
  right: 150px;
  color: white;
  font-size: 3rem;

  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  &:hover {
    transform: rotate(90deg);
  }

  @media (max-width: 1440px) {
    font-size: 2.5rem;
  }
  @media (max-width: 1023px) {
    top: 80px;
  }

  @media (max-width: 768px) {
    font-size: 2.3rem;
    top: 100px;
    right: 100px;
  }
  @media (max-width: 600px) {
    right: 50px;
  }
  @media (max-width: 390px) {
    right: 30px;
    top: 120px;
    font-size: 2.1rem;
  }
`;

const SectionDescription = styled.span`
  display: flex;
  position: fixed;
  z-index: 10003;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  /* justify-content: center; */
  background-color: rgba(0, 0, 0, 0.5);

  top: 0px;
  left: 0px;
  backdrop-filter: blur(10px) !important;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const SectionModalText = styled(Box)`
  display: flex;
  position: relative;
  width: 900px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #ec8424;
  border: 3px solid white;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0px 0px 10px white);

  transition: 0.3s;
  @media (max-width: 1024px) {
    width: 700px;
    padding: 25px;
  }
  @media (max-width: 768px) {
    width: 500px;
    padding: 20px;
  }
  @media (max-width: 600px) {
    width: 400px;
    padding: 20px;
  }
  @media (max-width: 450px) {
    width: 350px;
    padding: 15px;
  }
  @media (max-width: 390px) {
    width: 320px;
    padding: 15px;
  }
  @media (max-width: 350px) {
    width: 300px;
    padding: 12px;
  }
`;

const TextDescription = styled(Box)`
  display: flex;
  text-align: center;
  font-size: 18px;
  line-height: 130%;
  color: white;
  text-shadow: 0px 0px 3px black;

  transition: 0.3s;
  @media (max-width: 1440px) {
    font-size: 17px;
  }
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

const TextHead = styled(Box)`
  text-align: center;
  font-size: 32px;
  color: white;
  margin-bottom: 50px;
  text-shadow: 0px 0px 6px black;
  margin-top: 20px;

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

export default CardSuit;
