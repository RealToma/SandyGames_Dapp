import styled from "styled-components";
import { Box } from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState, useRef } from "react";
import { useOutsideDetector } from "../../hooks/useOutsideDetector";
import Collapse from "@mui/material/Collapse";

const ButtonDropDownFilter = ({ data }) => {
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
      <SectionHead>
        <TextDropHead>{textDropHead}</TextDropHead>
        <IconDown>
          {!flagClickDown ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </IconDown>
      </SectionHead>
      <Collapse in={flagClickDown}>
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
      </Collapse>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 100;
`;

const SectionHead = styled(Box)`
  display: flex;
  width: 100%;
  height: 40px;
  /* Secondary */
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
`;

const TextDropHead = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;
  margin-right: 20px;
`;

const IconDown = styled(Box)`
  font-size: 1.5rem;
  color: white;
`;

const SectionDropDown = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;

const EachRowText = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;

  transition: 0.3s;
  &:hover {
    text-shadow: 0px 0px 10px;
  }
  margin-top: 10px;
`;

export default ButtonDropDownFilter;
