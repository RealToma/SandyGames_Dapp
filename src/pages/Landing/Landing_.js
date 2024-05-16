import styled from "styled-components";
import { Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { dataLandingVideos } from "../../data/Landing";
import { useState } from "react";
import imgMainBackground from "../../assets/images/background/mainBackground.png";
import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import imgBubbleBack01 from "../../assets/images/background/bubbleBack01.png";
import imgBubbleBack02 from "../../assets/images/background/bubbleBack02.png";
import imgBubbleBack03 from "../../assets/images/background/bubbleBack03.png";
import imgBubbleBack04 from "../../assets/images/background/bubbleBack04.png";

import imgMask01 from "../../assets/images/background/mask01.png";
import imgMask02 from "../../assets/images/background/mask02.png";
import imgMask03 from "../../assets/images/background/mask03.png";
import imgMask04 from "../../assets/images/background/mask04.png";

import imgNFT01 from "../../assets/images/nfts/samurai/1.png";
import imgNFT02 from "../../assets/images/nfts/samurai/2.png";
// import imgNFT03 from "../../assets/images/nfts/samurai/3.png";
import imgNFT04 from "../../assets/images/nfts/samurai/4.png";

const Landing = () => {
  const [urlVideo, setUrlVideo] = useState("assets/videos/1.mp4");

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
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      <BackgroundFilter></BackgroundFilter>
      <SectionBubble01>
        <SectionBubbleBackLine01>
          <img src={imgBubbleBack01} width={"100%"} alt="" />
        </SectionBubbleBackLine01>
        <SectionBubbleVideo01>
          <img src={imgNFT01} width={"100%"} alt="" />
          {/* <video
            autoPlay
            muted
            loop
            src={"assets/videos/1.mp4"}
            width={"100%"}
            type="video/mp4"
          ></video> */}
        </SectionBubbleVideo01>
      </SectionBubble01>
      <SectionBubble02>
        <SectionBubbleBackLine02>
          <img src={imgBubbleBack02} width={"100%"} alt="" />
        </SectionBubbleBackLine02>
        <SectionBubbleVideo02>
          <img src={imgNFT02} width={"100%"} alt="" />
          {/* <video
            autoPlay
            muted
            loop
            src={"assets/videos/2.mp4"}
            width={"100%"}
            type="video/mp4"
          ></video> */}
        </SectionBubbleVideo02>
      </SectionBubble02>
      <SectionBubble03>
        <SectionBubbleBackLine03>
          <img src={imgBubbleBack03} width={"100%"} alt="" />
        </SectionBubbleBackLine03>
        <SectionBubbleVideo03>
          <video
            autoPlay
            muted
            loop
            controls
            src={urlVideo}
            width={"100%"}
            type="video/mp4"
          ></video>
        </SectionBubbleVideo03>
      </SectionBubble03>
      <SectionBubble04>
        <SectionBubbleBackLine04>
          <img src={imgBubbleBack04} width={"100%"} alt="" />
        </SectionBubbleBackLine04>
        <SectionBubbleVideo04>
          <img src={imgNFT04} width={"100%"} alt="" />
          {/* <video
            autoPlay
            muted
            loop
            controls
            src={"assets/videos/1.mp4"}
            width={"100%"}
            type="video/mp4"
          ></video> */}
        </SectionBubbleVideo04>
      </SectionBubble04>
      <SectionSelectingVideo>
        <SectionSelectVideo>
          <Slider {...settings}>
            {dataLandingVideos.map((each, index) => {
              return (
                <EachVideo
                  key={index}
                  onClick={() => {
                    setUrlVideo(each.src);
                  }}
                >
                  <video>
                    <source src={each.src} width={"100%"} type="video/mp4" />
                  </video>
                </EachVideo>
              );
            })}
          </Slider>
        </SectionSelectVideo>
      </SectionSelectingVideo>
      {/* <SectionPlayVideo>
        <video
          autoPlay
          muted
          loop
          controls
          src={urlVideo}
          width={"100%"}
          type="video/mp4"
        ></video>
      </SectionPlayVideo> */}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

// const SectionPlayVideo = styled(Box)`
//   display: flex;
//   z-index: 3;
//   > video {
//     width: 650px;
//     object-fit: cover;
//     border-radius: 12px;
//     /* border: 5px solid rgb(50, 35, 30); */
//     box-shadow: 0px 0px 20px 0px;
//   }
// `;

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

const EachVideo = styled(Box)`
  display: flex;
  width: 100%;
  cursor: pointer;
  user-select: none;
  margin-right: 20px;

  &:hover {
    > video {
      transition: 0.3s;
    }
  }
  > video {
    width: 100px;
    height: 100px;
    object-fit: cover;
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
      top: 100px;
    }
    50% {
      top: 180px;
    }
    100% {
      top: 100px;
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

const SectionBubbleBackLine03 = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const SectionBubbleBackLine04 = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 105%;
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
      right: 0px;
      top: 200px;
    }
    50% {
      right: 70px;
      top: 150px;
    }
    100% {
      right: 0px;
      top: 200px;
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

const SectionBubble03 = styled(Box)`
  display: flex;
  position: relative;
  /* position: absolute; */
  margin-top: 700px;
  /* position: absolute;
  left: 50%;
  top: 500px;
  transform: translateX(-50%); */
  width: 660px;
`;

const SectionBubbleVideo03 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-49%, -50%);
  > video {
    width: 98%;
    object-fit: cover;

    -webkit-mask-image: url(${imgMask03});
    -webkit-mask-position: center center;
    -webkit-mask-repeat: no-repeat;

    mask-position: center center;
    mask-repeat: no-repeat;
    mask-image: url(${imgMask03});
    /* -webkit-clip-path: polygon(
      0 0,
      9% 0,
      9% 14%,
      18% 14%,
      18% 0,
      32% 0,
      32% 13%,
      41% 13%,
      41% 0,
      57% 0,
      57% 14%,
      66% 14%,
      66% 0,
      80% 0,
      80% 14%,
      90% 14%,
      90% 0,
      100% 0,
      100% 100%,
      0 100%
    );
    clip-path: polygon(
      0 0,
      9% 0,
      9% 14%,
      18% 14%,
      18% 0,
      32% 0,
      32% 13%,
      41% 13%,
      41% 0,
      57% 0,
      57% 14%,
      66% 14%,
      66% 0,
      80% 0,
      80% 14%,
      90% 14%,
      90% 0,
      100% 0,
      100% 100%,
      0 100%
    ); */
  }
`;

const SectionBubble04 = styled(Box)`
  display: flex;
  position: absolute;
  width: 410px;
  height: 410px;
  user-select: none;
  animation: move-up04 6s ease-out forwards;
  animation-iteration-count: infinite;
  @keyframes move-up04 {
    0% {
      right: -250px;
      top: 700px;
    }
    30% {
      right: -250px;
      top: 650px;
    }
    70% {
      right: -250px;
      top: 730px;
    }
    100% {
      right: -250px;
      top: 700px;
    }
  }
`;

const SectionBubbleVideo04 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -51%);
  overflow: hidden;

  > img {
    object-fit: cover;
    -webkit-mask-image: url(${imgMask04});
    -webkit-mask-position: center center;
    -webkit-mask-repeat: no-repeat;

    mask-position: center center;
    mask-repeat: no-repeat;
    mask-image: url(${imgMask04});
  }
`;

const SectionSelectingVideo = styled(Box)`
  display: flex;
  /* left: 50%;
  transform: translateX(-50%); */
  margin-top: 230px;
`;

export default Landing;
