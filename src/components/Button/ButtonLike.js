import styled from "styled-components";
import { Box } from "@mui/material";
import { RiHeart3Fill } from "react-icons/ri";
import { useState } from "react";

const ButtonLike = () => {
  const [flagClicked, setFlagClicked] = useState(false);

  return (
    <IconLike
      onClick={() => {
        setFlagClicked(!flagClicked);
      }}
      clicked={flagClicked ? 1 : 0}
    >
      <RiHeart3Fill />
    </IconLike>
  );
};

const IconLike = styled(Box)`
  display: flex;
  width: 35px;
  height: 35px;
  border: ${({ clicked }) =>
    clicked ? "2px solid #e33b3b" : "2px solid white"};
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background: ${({ clicked }) => (clicked ? "#e33b3b" : "unset")};
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    /* color: white;
    background: #e33b3b;
    border: 2px solid #e33b3b; */
  }

  transition: 0.3s;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1.1rem;
  }
`;

export default ButtonLike;
