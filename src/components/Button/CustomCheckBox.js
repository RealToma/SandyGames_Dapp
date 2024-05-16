import styled from "styled-components";
import { Box } from "@mui/material";
import { BsCheck } from "react-icons/bs";
import { useState } from "react";

const CustomCheckBox = ({ data }) => {
  const [flagCheck, setFlagCheck] = useState(false);

  return (
    <StyledComponent
      onClick={() => {
        setFlagCheck(!flagCheck);
      }}
    >
      {!flagCheck ? (
        <IconUnChecked></IconUnChecked>
      ) : (
        <IconChecked>
          <BsCheck />
        </IconChecked>
      )}

      <Text>{data}</Text>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-bottom: 5px;

  transition: 0.3s;
  &:hover {
    > div {
      text-shadow: 0px 0px 5px;
    }
  }
`;

const IconUnChecked = styled(Box)`
  display: flex;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 4px;
`;

const IconChecked = styled(Box)`
  display: flex;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #ec8424;
`;

const Text = styled(Box)`
  display: flex;
  margin-left: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;

  color: #ffffff;
  transition: 0.3s;
`;

export default CustomCheckBox;
