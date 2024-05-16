import styled from "styled-components";
import { Box, Modal } from "@mui/material";
import { linkSocial } from "../../data/Link";
// import { useNavigate } from "react-router-dom";
import { MdAccountBalanceWallet, MdClose, MdHelpOutline } from "react-icons/md";
import iconPoltergeist from "../../assets/images/icon/wallet/poltergeist.png";
import iconEcto from "../../assets/images/icon/wallet/ecto.png";
import iconKCAL from "../../assets/images/icon/wallet/KCAL.png";
import { PhantasmaLink } from "phantasma-ts";
import { NotificationManager } from "react-notifications";
import {
  shortAddress,
  showBalance,
} from "../../lib/WalletToolKit/WalletFunctions";
import { RefContext } from "../../lib/RefContext";
import { useContext } from "react";

const Header = () => {
  const { preserveLink, setLinkWallet, open, setOpen } = useContext(RefContext);
  // const navigate = useNavigate();
  const handleModalClose = () => setOpen(false);
  const handleModalOpen = () => setOpen(true);

  let nexus = process.env.REACT_APP_NETWORK;
  let link = new PhantasmaLink("SANDY", true);

  const handleConnectPoltergeist = (ProviderHint = "poltergeist") => {
    link.nexus = nexus;
    let flagConnected = false;
    link.login(
      (success) => {
        flagConnected = success;
        if (flagConnected === true) {
          NotificationManager.success("Connected successfully!", "", 3000);
          handleModalClose();
          setLinkWallet(link);
        }
      },
      (message) => {
        NotificationManager.error(message, "", 3000);
      },
      2,
      "phantasma",
      ProviderHint
    );
  };

  const handleConnectEctoWallet = (ProviderHint = "ecto") => {
    // link.nexus = nexus;
    // let flagConnected = false;
    // link.login(
    //   (success) => {
    //     flagConnected = success;
    //     if (flagConnected === true) {
    //       NotificationManager.success("Connected successfully!", "", 3000);
    //       handleModalClose();
    //       setLinkWallet(link);
    //       console.log(link);
    //     }
    //   },
    //   (message) => {
    //     NotificationManager.error(message, "", 3000);
    //   },
    //   1,
    //   "ecto",
    //   ProviderHint
    // );
    return NotificationManager.warning("Coming soon", "", 3000);
  };

  return (
    <StyledComponent>
      <SectionLogo>
        <TextLogoMark
        // onClick={() => {
        //   navigate("/");
        // }}
        >
          SANDY
        </TextLogoMark>
      </SectionLogo>

      <SectionWalletConnect>
        <ButtonWalletConnect onClick={handleModalOpen}>
          <IconWallet>
            <MdAccountBalanceWallet></MdAccountBalanceWallet>
          </IconWallet>
          <TextWalletConnect>
            {preserveLink
              ? shortAddress(preserveLink.account.address)
              : "Connect Wallet"}
          </TextWalletConnect>
        </ButtonWalletConnect>
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
        <SectionLinkGroup flagheight={preserveLink ? 1 : 0}>
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
                  <SectionIcon>
                    <img src={each.icon} alt="" />
                  </SectionIcon>
                  <TextLink>{each.name}</TextLink>
                </SectionEachSocial>
              </a>
            );
          })}
        </SectionLinkGroup>
      </SectionWalletConnect>
      <Modal
        open={open}
        // onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <TextSubjectModal>Connect Wallet</TextSubjectModal>
          <TextDescriptionModal>
            Connect with one of our available wallet providers or create a new
            one.
          </TextDescriptionModal>
          <ButtonSelectWallet>
            <ButtonEachWallet onClick={() => handleConnectPoltergeist()}>
              <ImageEachIcon>
                <img src={iconPoltergeist} width={"100%"} alt="" />
              </ImageEachIcon>
              <TextWalelt>Poltergeist Wallet</TextWalelt>
            </ButtonEachWallet>
            <ButtonEachWallet onClick={() => handleConnectEctoWallet()}>
              <ImageEachIcon>
                <img src={iconEcto} width={"100%"} alt="" />
              </ImageEachIcon>
              <TextWalelt>Ecto Wallet</TextWalelt>
            </ButtonEachWallet>
          </ButtonSelectWallet>
          <a
            href="https://phantasma.io/wallets/"
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
          >
            <SectionContact>
              <IconHelp>
                <MdHelpOutline />
              </IconHelp>
              <TextHelpContact>
                Contact the team for help on how to use your wallet.
              </TextHelpContact>
            </SectionContact>
          </a>
          <ButtonModalClose
            onClick={() => {
              handleModalClose();
            }}
          >
            <MdClose />
          </ButtonModalClose>
        </ModalBox>
      </Modal>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`;

const SectionWalletConnect = styled(Box)`
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  right: 60px;
  top: 100px;
  transform: translateY(-50%);
  z-index: 102;

  transition: 0.3s;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const ButtonWalletConnect = styled(Box)`
  display: flex;
  width: 220px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background: #ec8424;

  border-radius: 10px;

  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);

  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  &:hover {
    > div:nth-child(1) {
      filter: drop-shadow(0px 0px 6px white);
    }
    > div:nth-child(2) {
      text-shadow: 0px 0px 10px;
    }
  }
`;

const SectionLinkGroup = styled(Box)`
  display: flex;
  position: fixed;
  right: 30px;
  top: ${({ flagheight }) => (flagheight ? "120px" : "70px")};
  flex-direction: column;
  align-items: flex-start;
`;

const TextLink = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: white;

  transition: 0.3s;
`;

const SectionLogo = styled(Box)`
  display: flex;
  position: fixed;
  left: 100px;
  top: 100px;
  transform: translateY(-50%);
  z-index: 101;

  transition: 0.3s;
  @media (max-width: 1023px) {
    position: unset;
    margin-top: 50px;
  }
`;

const TextLogoMark = styled(Box)`
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 93px;
  color: white;
  text-shadow: 0px 0px 5px rgb(50, 35, 30);
  cursor: pointer;
  user-select: none;
`;

const SectionIcon = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;

  background: linear-gradient(
    95.3deg,
    rgba(236, 132, 36, 0.62) 0.6%,
    rgba(255, 122, 0, 0.43) 99.8%
  );
  border-radius: 100%;
  margin-right: 9px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: 0.3s;
`;

const SectionEachSocial = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 15px;

  cursor: pointer;
  transition: 0.3s;
  &:hover {
    > div:nth-child(1) {
      /* background: #ec8424; */
      transition: 0.3s;
      background: linear-gradient(
        95.3deg,
        rgba(236, 132, 36, 1) 100%,
        rgba(255, 122, 0, 1) 99.8%
      );
    }
    > div:nth-child(2) {
      transition: 0.3s;
      text-shadow: 0px 0px 5px;
    }
  }
`;

const ModalBox = styled(Box)`
  display: flex;
  width: 400px;
  flex-direction: column;
  background-color: #ec8424;
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 #000;
  border-radius: 20px;
  padding: 30px;
  box-sizing: border-box;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
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
  /* @media (max-width: 600px) {
    transition: 0.5s !important;
    width: 300px;
  }*/
  @media (max-width: 450px) {
    width: 300px;
    padding: 20px 15px;
  }
`;

const TextSubjectModal = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 24px;
  color: white;

  @media (max-width: 450px) {
    font-size: 20px;
  }
`;

const TextDescriptionModal = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-size: 16px;
  line-height: 16px;
  color: white;
  margin-top: 20px;

  @media (max-width: 450px) {
    font-size: 12px;
    margin-top: 10px;
  }
`;

const ButtonModalClose = styled(Box)`
  display: flex;
  position: absolute;
  top: 25px;
  right: 20px;
  color: white;
  font-size: 2rem;

  cursor: pointer;
  user-select: none;

  transition: 0.2s;
  &:hover {
    transform: rotate(90deg);
  }

  @media (max-width: 450px) {
    font-size: 1.7rem;
    top: 20px;
  }
`;

const ButtonSelectWallet = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  width: 100%;
  margin-top: 30px;
  @media (max-width: 450px) {
    margin-top: 20px;
    grid-row-gap: 10px;
  }
`;

const ButtonEachWallet = styled(Box)`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 0px 10px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 12px;
  user-select: none;
  cursor: pointer;

  transition: 0.3s;
  &:hover {
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 450px) {
    height: 40px;
  }
`;

const ImageEachIcon = styled(Box)`
  display: flex;
  margin-right: 10px;
  width: 30px;
  @media (max-width: 450px) {
    width: 20px;
    margin-right: 10px;
  }
`;

const TextWalelt = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ec8424;

  @media (max-width: 450px) {
    font-size: 14px;
  }
`;

const SectionContact = styled(Box)`
  display: flex;
  width: 100%;
  align-items: center;
  margin-top: 30px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    > div:nth-child(2) {
      text-decoration: underline;
      text-decoration-color: white;
    }
  }

  @media (max-width: 450px) {
    margin-top: 20px;
  }
`;

const IconHelp = styled(Box)`
  display: flex;
  font-size: 1rem;
  color: white;
  margin-right: 3px;

  @media (max-width: 450px) {
    font-size: 0.9rem;
  }
`;

const TextHelpContact = styled(Box)`
  font-family: "Poppins";
  font-style: normal;
  font-size: 12px;
  color: white;
  transition: 0.3s;
  @media (max-width: 450px) {
    font-size: 9px;
  }
`;

const IconWallet = styled(Box)`
  display: flex;
  color: white;
  font-size: 26px;
  margin-right: 5px;
  transition: 0.3s;
`;

const TextWalletConnect = styled(Box)`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: white;
  transition: 0.3s;
`;

const SectionWalletBalance = styled(Box)`
  display: flex;
  width: 100%;
  position: fixed;
  flex-direction: column;
  left: 10px;
  top: 70px;
`;

const SectionToken = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ImageToken = styled(Box)`
  display: flex;
  width: 18px;
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

export default Header;
