// import imgHome from "../assets/images/icon/sidebar/home.png";
// import imgMarketplace from "../assets/images/icon/sidebar/marketplace.png";
// import imgMint from "../assets/images/icon/sidebar/mint.png";
// import imgWardrobe from "../assets/images/icon/sidebar/wardrobe.png";
// import imgCatalog from "../assets/images/icon/sidebar/catalog.png";
// import imgResource from "../assets/images/icon/sidebar/resource.png";
// import imgTeam from "../assets/images/icon/sidebar/team.png";
import { BsShopWindow, BsCollection } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { ImMoveDown } from "react-icons/im";
import imgDiscord from "../assets/images/icon/social/discord.png";
import imgTwitter from "../assets/images/icon/social/twitter.png";
import imgGhostmarket from "../assets/images/icon/social/ghostmarket.png";
import { GiPodiumWinner, GiTreasureMap } from "react-icons/gi";

export const linkSidebar = [
  {
    name: "Home",
    link: "/",
    icon: <GoHome />,
    flagLocked: false,
  },
  {
    name: "Inventory",
    link: "/marketplace",
    icon: <BsShopWindow />,
    flagLocked: false,
  },
  {
    name: "Mint",
    link: "/mint",
    icon: <ImMoveDown />,
    flagLocked: false,
  },
  {
    name: "Wardrobe",
    link: "/wardrobe",
    icon: <MdOutlineSpaceDashboard />,
    flagLocked: false,
  },
  {
    name: "Collection",
    link: "/collection",
    icon: <BsCollection />,
    flagLocked: false,
  },
  {
    name: "Wall of SANDY",
    link: "/wallofsandy",
    icon: <GiPodiumWinner />,
    flagLocked: true,
  },
  {
    name: "Treasure Quests",
    link: "/treasure",
    icon: <GiTreasureMap />,
    flagLocked: false,
  },
  {
    name: "Phantasma Resources",
    link: "https://phantasma.io/",
    icon: <HiOutlineCurrencyDollar />,
    flagLocked: false,
  },
  {
    name: "Project and Team",
    link: "/projectandteam",
    icon: <RiTeamLine />,
    flagLocked: false,
  },
];

export const linkSocial = [
  {
    name: "Discord",
    link: "https://discord.gg/sandyonsoul",
    icon: imgDiscord,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/SANDY_on_SOUL",
    icon: imgTwitter,
  },
  {
    name: "Ghostmarket.io",
    link: "https://ghostmarket.io/",
    icon: imgGhostmarket,
  },
];
