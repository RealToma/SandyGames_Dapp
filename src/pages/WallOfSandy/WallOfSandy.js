import styled from "styled-components";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { useState } from "react";
import imgMainBackground from "../../assets/images/background/backWallOfSandy01.png";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import imgBubbleBack01 from "../../assets/images/background/bubbleBack01.png";
import imgBubbleBack02 from "../../assets/images/background/bubbleBack02.png";
import imgWinnerFrame from "../../assets/images/background/WinnerFame01.png";
import imgMask01 from "../../assets/images/background/mask01.png";
import imgMask02 from "../../assets/images/background/mask02.png";
import imgNFT01 from "../../assets/images/nfts/suits/Ninja.jpg";
import imgNFT02 from "../../assets/images/nfts/suits/Phantasma.jpg";
import { dataCollection } from "../../data/Collection";

const WallOfSandy = () => {
  const [urlImageNFT, setURLImageNFT] = useState(
    "/assets/images/suits/Astronaut.jpg"
  );

  const [nameWinner, setNameWinner] = useState("Astronaut");

  const flagLocked = localStorage.getItem("lockedSidebar");
  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <SliderArrowRightBox onClick={onClick}>
        <BsFillCaretRightFill />
      </SliderArrowRightBox>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <SliderArrowLeftBox onClick={onClick}>
        <BsFillCaretLeftFill />
      </SliderArrowLeftBox>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 899,
        settings: {
          slidesToShow: 4,
          speed: 500,
          slidesToScroll: 1,
          centerPadding: "20px",
          centerMode: true,
          variableWidth: false,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box display={"flex"} width={"100%"}>
      {!flagLocked ? (
        <StyledComponent>
          <BackgroundMain></BackgroundMain>
          {/* <BackgroundFilter></BackgroundFilter> */}

          <SectionWinner>
            <SectionWinnerNFT>
              <img src={urlImageNFT} width={"100%"} alt="" />
            </SectionWinnerNFT>
            <SectionWinnerFrame>
              <img src={imgWinnerFrame} width={"100%"} alt="" />
            </SectionWinnerFrame>
            <TextWinnerName>{nameWinner}</TextWinnerName>
          </SectionWinner>

          <SectionBubble01>
            <SectionBubbleBackLine01>
              <img src={imgBubbleBack01} width={"100%"} alt="" />
            </SectionBubbleBackLine01>
            <SectionBubbleVideo01>
              <img src={imgNFT01} width={"100%"} alt="" />
            </SectionBubbleVideo01>
          </SectionBubble01>
          <SectionBubble02>
            <SectionBubbleBackLine02>
              <img src={imgBubbleBack02} width={"100%"} alt="" />
            </SectionBubbleBackLine02>
            <SectionBubbleVideo02>
              <img src={imgNFT02} width={"100%"} alt="" />
            </SectionBubbleVideo02>
          </SectionBubble02>

          <SectionSelectingVideo>
            <SectionSelectVideo>
              <Slider {...settings}>
                {dataCollection.map((each, index) => {
                  return (
                    <SectionSelectEach
                      key={index}
                      onClick={() => {
                        setURLImageNFT(`/assets/images/suits/${each.name}.jpg`);
                        setNameWinner(each.name);
                      }}
                    >
                      <img
                        src={`/assets/images/suits/${each.name}.jpg`}
                        width={"100%"}
                        alt=""
                      />
                    </SectionSelectEach>
                  );
                })}
              </Slider>
            </SectionSelectVideo>
          </SectionSelectingVideo>
        </StyledComponent>
      ) : (
        <StyledComponent>
          <BackgroundMain></BackgroundMain>
          {/* <BackgroundFilter></BackgroundFilter> */}
          <SectionLockPlayVideo>
            <video
              autoPlay
              // muted
              loop
              controls
              src={"assets/videos/Key.mp4"}
              width={"100%"}
              type="video/mp4"
            ></video>
          </SectionLockPlayVideo>
        </StyledComponent>
      )}
    </Box>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const SectionSelectVideo = styled(Box)`
  display: block;
  width: 625px;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  box-sizing: border-box;
  /* border-radius: 12px; */

  /* border: 2px solid #ec8424; */
  /* box-shadow: 0 0 10px 0 black; */
  backdrop-filter: blur(5px);
  background: #ffffff;
  border-radius: 12px;
  margin-bottom: 100px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;

const SectionSelectEach = styled(Box)`
  display: flex;
  width: 100%;
  cursor: pointer;
  user-select: none;
  margin-right: 20px;
  outline: none;
  &:hover {
    > img {
      transition: 0.3s;
    }
  }
  > img {
    width: 100px;
    height: 100px;
    /* object-fit: cover; */
    border-radius: 8px;
  }
`;

const SliderArrowRightBox = styled(Box)`
  display: flex;
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 33px;
  height: 33px;
  justify-content: center;
  align-items: center;
  background-color: #ec8424;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  z-index: 200;
  cursor: pointer;
  user-select: none;
  > svg {
    font-size: 1.6rem;
  }
  &:active {
    > svg {
      font-size: 1.3rem;
    }
  }
`;
const SliderArrowLeftBox = styled(Box)`
  display: flex;
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 33px;
  height: 33px;
  justify-content: center;
  align-items: center;
  background-color: #ec8424;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  z-index: 200;
  cursor: pointer;
  user-select: none;

  > svg {
    font-size: 1.6rem;
  }
  &:active {
    > svg {
      font-size: 1.3rem;
    }
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

const SectionBubble01 = styled(Box)`
  display: flex;
  position: absolute;
  left: 0px;
  width: 310px;
  height: 310px;

  user-select: none;
  animation: move-up01 5s ease-out forwards;
  animation-iteration-count: infinite;
  @keyframes move-up01 {
    0% {
      top: 400px;
    }
    50% {
      top: 480px;
    }
    100% {
      top: 400px;
    }
  }
`;

const SectionBubbleVideo01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* overflow: hidden; */

  > img {
    object-fit: cover;

    -webkit-mask-image: url(${imgMask01});
    -webkit-mask-position: center center;
    -webkit-mask-repeat: no-repeat;

    mask-position: center center;
    mask-repeat: no-repeat;
    mask-image: url(${imgMask01});
  }
`;

const SectionBubbleBackLine01 = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const SectionBubbleBackLine02 = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
`;

const SectionBubble02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 360px;
  height: 360px;
  user-select: none;
  animation: move-up02 5s;
  animation-iteration-count: infinite;
  @keyframes move-up02 {
    0% {
      right: -200px;
      top: 500px;
    }
    50% {
      right: -100px;
      top: 550px;
    }
    100% {
      right: -200px;
      top: 500px;
    }
  }
`;

const SectionBubbleVideo02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  > img {
    width: 100%;
    object-fit: cover;

    -webkit-mask-image: url(${imgMask02});
    -webkit-mask-position: center center;
    -webkit-mask-repeat: no-repeat;

    mask-position: center center;
    mask-repeat: no-repeat;
    mask-image: url(${imgMask02});
  }
`;

const SectionSelectingVideo = styled(Box)`
  display: flex;
  /* left: 50%;
  transform: translateX(-50%); */
  margin-top: 50px;
`;

const SectionWinner = styled(Box)`
  display: flex;
  position: relative;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  z-index: 301;
`;

const SectionWinnerNFT = styled(Box)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  > img {
    border-radius: 100%;
  }
`;

const SectionWinnerFrame = styled(Box)`
  display: flex;
  /* position: absolute; */
  width: 600px;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  > img {
    filter: blur(0.7px);
  }
`;

const TextWinnerName = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 80px;
  transform: translateX(-50%);
  font-size: 24px;
  color: white;
`;

const SectionLockPlayVideo = styled(Box)`
  display: flex;
  width: 60%;
  color: red;
  margin-top: 80px;
  margin-bottom: 80px;
  >video{
    border-radius: 20px;
  }
  z-index: 13;
`;

export default WallOfSandy;
