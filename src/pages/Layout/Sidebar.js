import styled from "styled-components";
import { Box } from "@mui/material";
import { linkSidebar, linkSocial } from "../../data/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdLockClock, MdSendToMobile } from "react-icons/md";
import { useEffect } from "react";
import { MdOutlineSendToMobile } from "react-icons/md";
import { Slide } from "@mui/material";
import { useOutsideDetector } from "../../hooks/useOutsideDetector";
import { useRef } from "react";
import { useContext } from "react";
import { RefContext } from "../../lib/RefContext";
import {
  shortAddress,
  showBalance,
} from "../../lib/WalletToolKit/WalletFunctions";
import iconPoltergeist from "../../assets/images/icon/wallet/poltergeist.png";
import iconKCAL from "../../assets/images/icon/wallet/KCAL.png";

const Sidebar = () => {
  const { preserveLink, setOpen } = useContext(RefContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [flagClicked, setFlagClicked] = useState(0);
  const [flagMobile, setFlagMobile] = useState(false);

  const refMoibleMenu = useRef(0);
  useOutsideDetector([refMoibleMenu], () => setFlagMobile(false));

  useEffect(() => {
    let pathName = location.pathname;
    for (let i = 0; i < linkSidebar.length - 1; i++) {
      if (linkSidebar[i].link === pathName) {
        setFlagClicked(i);
      }
    }
  }, [location]);

  return (
    <StyledComponent>
      <ButtonMobile
        onClick={() => {
          setFlagMobile(true);
        }}
      >
        <MdOutlineSendToMobile />
      </ButtonMobile>
      <DesktopSidebar>
        {linkSidebar.map((each, index) => {
          const _key = index;
          if (each.name === "Phantasma Resources") {
            return (
              <a
                href={each.link}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
                key={_key}
              >
                <LinkEach
                  key={index}
                  onClick={() => {
                    setFlagClicked(index);
                    localStorage.setItem("lockedSidebar", each.flagLocked);
                  }}
                  clicked={flagClicked === index ? 1 : 0}
                >
                  <SectionIcon>{each.icon}</SectionIcon>
                  <SectionText>{each.name}</SectionText>
                </LinkEach>
              </a>
            );
          } else {
            if (!each.flagLocked) {
              return (
                <LinkEach
                  key={_key}
                  onClick={() => {
                    navigate(each.link, { replace: false });
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    setFlagClicked(index);
                    localStorage.setItem("lockedSidebar", each.flagLocked);
                  }}
                  clicked={flagClicked === index ? 1 : 0}
                >
                  <SectionIcon>{each.icon}</SectionIcon>
                  <SectionText>{each.name}</SectionText>
                </LinkEach>
              );
            } else {
              return (
                <SectionLocked
                  key={_key}
                  onClick={() => {
                    navigate(each.link, { replace: false });
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    setFlagClicked(index);
                    localStorage.setItem("lockedSidebar", each.flagLocked);
                  }}
                >
                  <LinkEachLocked clicked={flagClicked === index ? 1 : 0}>
                    <SectionIcon>{each.icon}</SectionIcon>
                    <SectionText>{each.name}</SectionText>
                  </LinkEachLocked>
                  <LinkEachTopLocked>
                    <SectionIconLocked>
                      <MdLockClock />
                    </SectionIconLocked>
                    <SectionTextLocked>Locked</SectionTextLocked>
                  </LinkEachTopLocked>
                </SectionLocked>
              );
            }
          }
        })}
      </DesktopSidebar>
      <SectionBlur active={flagMobile ? 1 : 0}>
        <Slide in={flagMobile} direction={"right"}>
          <MobileSidebar ref={refMoibleMenu}>
            <SectionMobileConnect>
              <ButtonClose
                onClick={() => {
                  setFlagMobile(false);
                }}
              >
                <MdSendToMobile />
              </ButtonClose>
              <ButtonConnect
                onClick={() => {
                  setOpen(true);
                  setFlagMobile(false);
                }}
              >
                {preserveLink
                  ? shortAddress(preserveLink.account.address)
                  : "Connect Wallet"}
              </ButtonConnect>
            </SectionMobileConnect>
            {preserveLink && (
              <SectionWalletBalance>
                <SectionToken>
                  <ImageToken>
                    <img src={iconPoltergeist} width={"100%"} alt="" />
                  </ImageToken>
                  <TextTokenValue>
                    {preserveLink.account.balances
                      ? showBalance(preserveLink.account.balances[0])
                      : 0}{" "}
                    SOUL
                  </TextTokenValue>
                </SectionToken>
                <SectionToken>
                  <ImageToken>
                    <img src={iconKCAL} width={"100%"} alt="" />
                  </ImageToken>
                  <TextTokenValue>
                    {preserveLink.account.balances
                      ? showBalance(preserveLink.account.balances[1])
                      : 0}{" "}
                    KCAL
                  </TextTokenValue>
                </SectionToken>
              </SectionWalletBalance>
            )}
            {linkSidebar.map((each, index) => {
              if (each.name === "Phantasma Resources") {
                return (
                  <a
                    href={each.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <LinkMobileEach
                      key={index}
                      onClick={() => {
                        // setFlagClicked(index);
                        setFlagMobile(false);
                        localStorage.setItem("lockedSidebar", each.flagLocked);
                      }}
                      clicked={flagClicked === index ? 1 : 0}
                    >
                      <SectionIcon>{each.icon}</SectionIcon>
                      <SectionText>{each.name}</SectionText>
                    </LinkMobileEach>
                  </a>
                );
              } else {
                if (!each.flagLocked) {
                  return (
                    <LinkMobileEach
                      key={index}
                      onClick={() => {
                        navigate(each.link, { replace: false });
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                        setFlagClicked(index);
                        setFlagMobile(false);
                        localStorage.setItem("lockedSidebar", each.flagLocked);
                      }}
                      clicked={flagClicked === index ? 1 : 0}
                    >
                      <SectionIcon>{each.icon}</SectionIcon>
                      <SectionText>{each.name}</SectionText>
                    </LinkMobileEach>
                  );
                } else {
                  return (
                    <SectionLocked
                      key={index}
                      onClick={() => {
                        navigate(each.link, { replace: false });
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        });
                        setFlagClicked(index);
                        setFlagMobile(false);
                        localStorage.setItem("lockedSidebar", each.flagLocked);
                      }}
                    >
                      <LinkEachMobileLocked
                        clicked={flagClicked === index ? 1 : 0}
                      >
                        <SectionIcon>{each.icon}</SectionIcon>
                        <SectionText>{each.name}</SectionText>
                      </LinkEachMobileLocked>
                      <LinkEachTopLocked>
                        <SectionIconLocked>
                          <MdLockClock />
                        </SectionIconLocked>
                        <SectionTextLocked>Locked</SectionTextLocked>
                      </LinkEachTopLocked>
                    </SectionLocked>
                  );
                }
              }
            })}
            <SectionMobileSocial>
              {linkSocial.map((each, index) => {
                return (
                  <a
                    href={each.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    key={index}
                  >
                    <SectionEachSocial>
                      <SectionMobileIcon>
                        <img src={each.icon} alt="" />
                      </SectionMobileIcon>
                    </SectionEachSocial>
                  </a>
                );
              })}
            </SectionMobileSocial>
          </MobileSidebar>
        </Slide>
      </SectionBlur>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  /* border-radius: 0px 8px 8px 0px; */
  /* border-top: 3px solid rgb(50, 35, 30);
  border-right: 3px solid rgb(50, 35, 30);
  border-bottom: 3px solid rgb(50, 35, 30); */

  /* box-shadow: 0 0 10px 0 #000; */
  /* backdrop-filter: blur(5px); */
`;

const SectionBlur = styled(Box)`
  display: ${({ active }) => (active ? "flex" : "none")};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  filter: blur(6);
  transition: 0.3s;
  z-index: 499;
`;

const ButtonMobile = styled(Box)`
  display: none;
  position: fixed;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 60px;
  height: 100px;
  padding-left: 5px;
  box-sizing: border-box;
  align-items: center;
  border-radius: 0px 20px 20px 0px;
  background: rgb(219 105 0);
  z-index: 110;
  box-shadow: rgba(0, 0, 0, 0.5) 3px 0px 5px;

  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  user-select: none;

  transition: 0.3s;
  @media (max-width: 1023px) {
    display: flex;
  }
  @media (max-width: 390px) {
    width: 40px;
    height: 90px;
    font-size: 2rem;
    padding-left: 0px;
  }
`;

const DesktopSidebar = styled(Box)`
  display: flex;
  position: fixed;
  flex-direction: column;

  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  transition: 0.3s;
  @media (max-width: 1023px) {
    display: none;
  }
  z-index: 90;
`;

const MobileSidebar = styled(Box)`
  display: flex;
  position: fixed;
  top: 70px;

  left: 0px;
  flex-direction: column;
  padding: 30px 0px;
  box-sizing: border-box;
  border-radius: 0px 30px 30px 0px;
  background: rgb(219 105 0);
  box-shadow: rgba(0, 0, 0, 0.7) 3px 0px 10px;
  z-index: 500;
`;

const LinkEach = styled(Box)`
  display: flex;
  height: 50px;
  width: fit-content;
  align-items: center;

  margin-top: 3px;
  margin-bottom: 3px;
  padding-left: 12px;
  padding-right: 30px;
  box-sizing: border-box;

  transition: 0.3s;
  cursor: pointer;
  user-select: none;

  background: ${({ clicked }) => (clicked ? "#ec8424" : "unset")};
  box-shadow: ${({ clicked }) =>
    clicked ? "2px 2px 5px rgba(0, 0, 0, 0.25)" : "unset"};
  border-radius: ${({ clicked }) =>
    clicked ? "0px 100000px 100000px 0px" : "unset"};
  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 6px;
    }
  }
`;

const LinkMobileEach = styled(Box)`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;

  margin-top: 3px;
  margin-bottom: 3px;
  padding: 0px 15px 0px 10px;
  box-sizing: border-box;

  transition: 0.3s;
  cursor: pointer;
  user-select: none;

  background: ${({ clicked }) => (clicked ? "#ec8424" : "unset")};

  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 6px;
    }
  }
`;

const SectionLocked = styled(Box)`
  display: flex;
  height: 50px;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const LinkEachLocked = styled(Box)`
  display: flex;
  opacity: 1;
  height: 100%;
  position: absolute;
  width: fit-content;
  align-items: center;

  margin-top: 3px;
  margin-bottom: 3px;
  padding-left: 12px;
  padding-right: 30px;
  box-sizing: border-box;

  transition: 0.3s;

  background: ${({ clicked }) => (clicked ? "#ec8424" : "unset")};
  box-shadow: ${({ clicked }) =>
    clicked ? "2px 2px 5px rgba(0, 0, 0, 0.25)" : "unset"};
  border-radius: ${({ clicked }) =>
    clicked ? "0px 100000px 100000px 0px" : "unset"};
  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 10px;
    }
  }
`;

const LinkEachMobileLocked = styled(Box)`
  display: flex;
  opacity: 1;
  height: 100%;
  position: absolute;
  width: 100%;
  align-items: center;

  margin-top: 3px;
  margin-bottom: 3px;
  padding: 0px 15px 0px 10px;
  box-sizing: border-box;

  transition: 0.3s;

  background: ${({ clicked }) => (clicked ? "#ec8424" : "unset")};
  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 10px;
    }
  }
`;

const SectionIcon = styled(Box)`
  display: flex;
  /* width: 26px;
  height: 26px; */
  color: white;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  transition: 0.3s;
`;

const SectionText = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  /* identical to box height */

  /* color: white;
  font-size: 1.2rem; */
  color: #ffffff;
  transition: 0.3s;
`;

const SectionIconLocked = styled(Box)`
  display: flex;
  /* width: 26px;
  height: 26px; */
  color: #d12323;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  transition: 0.3s;
`;

const SectionTextLocked = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 27px;
  /* identical to box height */

  /* color: white;
  font-size: 1.2rem; */
  color: #d12323;
  transition: 0.3s;
`;

const LinkEachTopLocked = styled(Box)`
  display: flex;
  opacity: 0.8;
  height: 100%;
  align-items: center;
  position: absolute;
  left: 30px;
  top: 0%;
  transform: translateY(-50%);
  transform: rotate(-8deg);
  transition: 0.3s;

  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 3px #d12323);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 6px;
    }
  }
`;

const SectionMobileConnect = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 10px 5px;
  box-sizing: border-box;
`;

const ButtonClose = styled(Box)`
  display: flex;
  transform: rotate(-180deg);
  cursor: pointer;
  user-select: none;
  font-size: 2rem;
  color: white;
`;

const ButtonConnect = styled(Box)`
  display: flex;
  width: 150px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #ec8424;

  border-radius: 10px;

  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: white;

  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  &:hover {
    text-shadow: 0px 0px 10px;
  }
`;

const SectionMobileSocial = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  justify-content: space-between;
  margin-top: 20px;
`;

const SectionEachSocial = styled(Box)`
  display: flex;
  align-items: center;

  cursor: pointer;
  transition: 0.3s;
`;

const SectionMobileIcon = styled(Box)`
  display: flex;
  /* width: 40px;
  height: 30px;
  background: #ec8424;

  border-radius: 100%; */

  color: white;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const SectionWalletBalance = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 0px 10px 15px;
`;

const SectionToken = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ImageToken = styled(Box)`
  display: flex;
  width: 16px;
  margin-right: 10px;
`;

const TextTokenValue = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: white;
`;

export default Sidebar;
