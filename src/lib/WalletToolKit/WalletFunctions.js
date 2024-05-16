import { NotificationManager } from "react-notifications";

export const shortAddress = (address) => {
  return address.slice(0, 5) + "..." + address.slice(-5);
};

export const shortAddressIPFS = (address) => {
  return address.slice(7, address.length);
};

export const checkFloat = (value) => {
  if (Number.isInteger(value)) {
    return value;
  } else {
    return parseFloat(value).toFixed(2);
  }
};

export const showBalance = (address) => {
  if (
    address === null ||
    address === undefined ||
    address === " " ||
    address === 0
  ) {
    return 0;
  } else {
    return checkFloat(address.value / Math.pow(10, address.decimals));
    //+" "+ address.symbol
  }
};

export const checkWalletState = (link) => {
  if (link === undefined || link === null) {
    NotificationManager.error("Please connect your wallet.", "", 3000);
    return;
  }
};
