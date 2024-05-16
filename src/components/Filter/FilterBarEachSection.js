import styled from "styled-components";
import { Box } from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const FilterBarEachSection = ({ children, textTitle, flagBorder }) => {
  const [flagCollapse, setFlagCollapse] = useState(true);

  return (
    <StyledComponent flagborder={flagBorder ? 1 : 0}>
      <TopTitle
        onClick={() => {
          setFlagCollapse(!flagCollapse);
        }}
      >
        <TextTitle>{textTitle}</TextTitle>
        <IconCollapseDown>
          {!flagCollapse ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </IconCollapseDown>
      </TopTitle>
      <Collapse in={flagCollapse}>{children}</Collapse>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: ${({ flagborder }) => (flagborder ? "1px solid" : "unset")};
  border-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.84),
      rgba(255, 255, 255, 0)
    )
    1;
`;

const TopTitle = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  &:hover {
    > div {
      text-shadow: 0px 0px 5px;
    }
  }
`;

const TextTitle = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;

  color: #ffffff;
  transition: 0.3s;
`;

const IconCollapseDown = styled(Box)`
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
`;

export default FilterBarEachSection;
