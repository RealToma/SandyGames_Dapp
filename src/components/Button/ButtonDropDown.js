import styled from "styled-components";
import { Box } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState, useRef } from "react";
import { useOutsideDetector } from "../../hooks/useOutsideDetector";

const ButtonDropDown = ({ data }) => {
  const [flagClickDown, setFlagClickDown] = useState(false);
  const refDropDown = useRef(0);
  const [textDropHead, setTextDropHead] = useState(data[0].name);
  useOutsideDetector([refDropDown], () => setFlagClickDown(false));

  return (
    <StyledComponent
      onClick={() => {
        setFlagClickDown(!flagClickDown);
      }}
      ref={refDropDown}
    >
      <TextDropHead>{textDropHead}</TextDropHead>
      <IconDown>{!flagClickDown ? <FaAngleDown /> : <FaAngleUp />}</IconDown>
      {!flagClickDown ? (
        <></>
      ) : (
        <SectionDropDown length={data.length}>
          {data.map((each, index) => {
            return (
              <EachRowText
                key={index}
                onClick={() => {
                  setTextDropHead(each.name);
                }}
              >
                {each.name}
              </EachRowText>
            );
          })}
        </SectionDropDown>
      )}
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: fit-content;
  height: 46px;
  padding: 0px 16px;
  background: #ec8424;

  /* Secondary */

  border-radius: 100px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  z-index: 100;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);

  transition: 0.3s;
  &:hover {
  }
`;

const TextDropHead = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;
  margin-right: 20px;

  transition: 0.3s;
  @media (max-width: 1200px) {
    margin-right: 10px;
  }
`;

const IconDown = styled(Box)`
  display: flex;
  font-size: 1.5rem;
  color: white;
`;

const SectionDropDown = styled(Box)`
  display: flex;
  flex-direction: column;
  width: max-content;
  height: fit-content;
  position: absolute;
  bottom: ${({ length }) => length * -30 - 40 - 10 + "px"};
  right: 0px;
  padding: 20px 50px 20px 20px;
  /* box-sizing: border-box; */
  background: #ec8424;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

const EachRowText = styled(Box)`
  height: 30px;
  width: fit-content;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;
  transition: 0.3s;
  &:hover {
    text-shadow: 0px 0px 5px;
  }
`;

export default ButtonDropDown;
