import styled from "styled-components";
import { Box } from "@mui/material";
import {
  dataFilterExploreLeftBarRecent,
  dataFilterbar,
} from "../../data/Filter";
import ButtonDropDown from "../../components/Button/ButtonDropDown";
import { BsFillGridFill, BsGrid3X3GapFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { HiFilter } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import CardNFT from "../../components/Card/CardNFT";
// import StickyBox from "react-sticky-box";
import FilterBarEachSection from "../../components/Filter/FilterBarEachSection";
import CustomCheckBox from "../../components/Button/CustomCheckBox";
import { Slide } from "@mui/material";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import imgMainBackground from "../../assets/images/background/backMarketplace01.jpg";
// import imgFilterBackground from "../../assets/images/background/filterBackground.png";
import { useRef } from "react";
import { useOutsideDetector } from "../../hooks/useOutsideDetector";
import { getBodyNft } from "../../lib/WalletToolKit/toolkit";
import { RefContext } from "../../lib/RefContext";
import { useContext } from "react";
import { NotificationManager } from "react-notifications";
import { useMemo } from "react";

const Marketplace = () => {
  const { preserveLink } = useContext(RefContext);
  const [flagClickedFilter, setFlagClickedFilter] = useState(false);

  const [valuePrice, setValuePrice] = useState([10, 73]);
  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };

  const [nftsOwned, setNFTsOwned] = useState();

  const refFilterBar = useRef(0);
  useOutsideDetector([refFilterBar], () => setFlagClickedFilter(false));

  useMemo(async () => {
    if (preserveLink === undefined || preserveLink === null) {
      return NotificationManager.warning(
        "Please connect your wallet.",
        "",
        3000
      );
    }
    let tempNFTs = await getBodyNft(preserveLink);
    console.log("OwnedNFTs:", tempNFTs);
    let arrayNFTs = [];

    for (let i = 0; i < tempNFTs.length; i++) {
      arrayNFTs.push(tempNFTs[i]);
    }
    setNFTsOwned(arrayNFTs);
  }, [preserveLink]);

  return (
    <StyledComponent>
      <BackgroundMain></BackgroundMain>
      {/* <BackgroundFilter></BackgroundFilter> */}
      {/* <StickyBox
        offsetTop={0}
        style={{
          zIndex: "100",
          // background: "rgb(188, 156, 123)",
          width: "100%",
          boxSizing: "border-box",
        }}
      > */}
      <SectionFilterbar>
        <SectionInputSearch>
          <InputSearch
            component={"input"}
            type={"text"}
            placeholder={"Search by ID, name or attribute"}
          ></InputSearch>
          <IconSeacrh>
            <FaSearch />
          </IconSeacrh>
        </SectionInputSearch>
        <GroupFilter>
          {/* <SectionEachFilter>
              <ButtonDropDown data={dataFilterExploreLeftBarItems} />
            </SectionEachFilter> */}
          <SectionEachFilter>
            <ButtonDropDown data={dataFilterExploreLeftBarRecent} />
          </SectionEachFilter>
          <SectionEachFilter>
            <IconFilterGrid>
              <BsFillGridFill />
            </IconFilterGrid>
          </SectionEachFilter>
          <SectionEachFilter>
            <IconFilterGrid>
              <BsGrid3X3GapFill />
            </IconFilterGrid>
          </SectionEachFilter>
          <SectionEachFilter>
            <ButtonFilter
              onClick={() => {
                setFlagClickedFilter(!flagClickedFilter);
              }}
            >
              <IconFilter>
                <HiFilter />
              </IconFilter>
              <TextFilter>Filter</TextFilter>
            </ButtonFilter>
          </SectionEachFilter>
        </GroupFilter>
      </SectionFilterbar>
      {/* </StickyBox> */}
      <SectionExpoloreItems>
        <SectionItems>
          {nftsOwned &&
            nftsOwned?.map((each, index) => {
              return (
                <CardNFT
                  key={index}
                  data={each}
                  setNFTsOwned={setNFTsOwned}
                  // avatar={preserveLink.account.avatar}
                />
              );
            })}
        </SectionItems>
        {/* <ButLoadMore>Load more</ButLoadMore> */}
      </SectionExpoloreItems>
      <Slide in={flagClickedFilter} direction={"left"}>
        <SectionFilter ref={refFilterBar}>
          <SectionSubjectFilter>
            <Box display={"flex"} alignItems={"center"}>
              <IconSubjectFilter>
                <HiFilter />
              </IconSubjectFilter>
              <TextSubjectFilter>Filter</TextSubjectFilter>
            </Box>
            <ButtonCloseFilter
              onClick={() => {
                setFlagClickedFilter(false);
              }}
            >
              <MdClose />
            </ButtonCloseFilter>
          </SectionSubjectFilter>

          <SectionFilterContent>
            {dataFilterbar.map((each, index) => {
              return (
                <FilterBarEachSection
                  textTitle={each.name}
                  flagBorder={true}
                  key={index}
                >
                  <GroupCheckBoxStatus>
                    {each.content.map((each01, index01) => {
                      return (
                        <CustomCheckBox key={index01} data={each01.text} />
                      );
                    })}
                  </GroupCheckBoxStatus>
                </FilterBarEachSection>
              );
            })}
            <FilterBarEachSection textTitle={"Price"} flagBorder={false}>
              <SectionPrice>
                <Slider
                  getAriaLabel={() => "Temperature range"}
                  value={valuePrice}
                  onChange={handleChangePrice}
                  valueLabelDisplay="auto"
                />
              </SectionPrice>
            </FilterBarEachSection>
          </SectionFilterContent>
        </SectionFilter>
      </Slide>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

// const ButLoadMore = styled(Box)`
//   display: flex;
//   margin-top: 40px;
//   width: 120px;
//   height: 42px;
//   justify-content: center;
//   align-items: center;
//   font-family: "DM Sans";
//   font-style: normal;
//   font-weight: 700;
//   font-size: 14px;
//   line-height: 22px;
//   /* identical to box height, or 157% */

//   text-align: center;

//   /* White */

//   color: #ffffff;
//   border: 2px solid #3749e9;
//   border-radius: 50px;
//   cursor: pointer;
//   transition: 0.3s;
//   user-select: none;
//   &:hover {
//     background: #3749e9;
//   }
// `;

const SectionExpoloreItems = styled(Box)`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 100px;

  transition: 0.5s;
  @media (max-width: 768px) {
    margin-bottom: 70px;
  }
  @media (max-width: 390px) {
    margin-bottom: 100px;
  }
`;

const SectionFilterbar = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 80px;
  margin-bottom: 20px;
  z-index: 100;

  transition: 0.5s;
  @media (max-width: 1440px) {
    flex-direction: column;
    align-items: unset;
  }
  @media (max-width: 1023px) {
    margin-top: 150px;
  }
`;

const GroupFilter = styled(Box)`
  display: flex;
  align-items: center;

  transition: 0.5s;
  @media (max-width: 1440px) {
    flex-wrap: wrap;
    margin-top: 20px;
  }
`;

const SectionEachFilter = styled(Box)`
  margin-left: 10px;

  transition: 0.3s;
  @media (max-width: 1440px) {
    margin-left: 0px;
    margin-right: 20px;
  }
  @media (max-width: 1200px) {
    margin-left: 0px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 1023px) {
    margin-left: 0px;
    margin-right: 10px;
  }
`;

const IconFilterGrid = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: #ec8424;

  /* Secondary */

  border-radius: 20px;
  font-size: 1.3rem;
  color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);

  cursor: pointer;
  transition: 0.3s;
  &:hover {
    > svg {
      transition: 0.3s;
      filter: drop-shadow(0px 0px 3px white);
    }
  }
`;

const SectionItems = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-top: 20px;

  transition: 0.3s;
  @media (max-width: 1850px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1440px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 1023px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    margin-top: 0px;
  }
`;

const SectionInputSearch = styled(Box)`
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #ec8424;
  border-radius: 20px;
  padding: 0px 15px 0px 15px;
  box-sizing: border-box;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);

  input::placeholder {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 27px;
    color: white;
  }
  transition: 0.5s;
  @media (max-width: 768px) {
    input::placeholder {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 27px;
      color: white;
    }
  }
  @media (max-width: 768px) {
    input::placeholder {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 27px;
      color: white;
    }
  }
`;

const InputSearch = styled(Box)`
  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0);
  display: flex;
  width: 100%;
  margin-right: 10px;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;
`;

const IconSeacrh = styled(Box)`
  font-size: 1.3rem;
  color: white;
  user-select: none;
  cursor: pointer;
`;

const ButtonFilter = styled(Box)`
  display: flex;
  width: fit-content;
  height: 46px;
  padding: 0px 16px;
  background: #ec8424;
  justify-content: center;
  border-radius: 100px;
  align-items: center;
  cursor: pointer;
  user-select: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);

  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div {
      text-shadow: 0px 0px 5px white;
    }
  }
`;

const IconFilter = styled(Box)`
  display: flex;
  font-size: 1.3rem;
  color: white;
  transition: 0.3s;
  margin-right: 5px;
`;

const TextFilter = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: white;
  transition: 0.3s;
`;

const SectionFilter = styled(Box)`
  display: flex;
  position: fixed;
  flex-direction: column;
  right: 0px;
  top: 65px;
  /* transform: translateY(-50%) !important; */
  padding: 25px;
  box-sizing: border-box;
  width: 310px;
  height: 85vh;
  border-radius: 30px 0px 0px 30px;
  background: rgb(219 105 0);
  z-index: 110;
  box-shadow: rgba(0, 0, 0, 0.25) -4px 0px 3px;
`;

const SectionSubjectFilter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s;
`;

const IconSubjectFilter = styled(Box)`
  display: flex;
  font-size: 1.5rem;
  color: white;
  margin-right: 5px;
`;

const TextSubjectFilter = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 27px;
  color: white;
  transition: 0.3s;
`;

const SectionFilterContent = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
`;

const GroupCheckBoxStatus = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 5px;
`;

const ButtonCloseFilter = styled(Box)`
  display: flex;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  user-select: none;
  transition: 0.3s;
  &:hover {
    transform: rotate(90deg);
  }
`;

const SectionPrice = styled(Box)`
  display: flex;
  width: 100%;
  margin-top: 12px;
  .css-14pt78w-MuiSlider-rail {
    background: white;
    border-radius: 4px;
  }
  .css-1gv0vcd-MuiSlider-track {
    background: white;
    border-radius: 3px;
  }
  .css-eg0mwd-MuiSlider-thumb {
    background: white;
  }
  .css-187mznn-MuiSlider-root {
    color: white;
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

export default Marketplace;
