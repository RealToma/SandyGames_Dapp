import axios from "axios";

export const callMintOutfit = (addressTo) => {
  return axios
    .post("/api/mint/mint_outfit", {
      address: addressTo,
    })
    .then((res) => {
      return res.data.flagSuccess;
    });
};

export const getCounts = () => {
  return axios.get("/api/mint/get_counts").then((res) => {
    return res.data;
  });
};

export const updateCountsMint = (sandyType, sandyMaterial) => {
  return axios
    .post("/api/mint/update_counts", {
      sandyType: sandyType,
      sandyMaterial: sandyMaterial,
    })
    .then((res) => {
      return res.data;
    });
};

export const setUpfront = (address) => {
  return axios
    .post("/api/mint/set_upfront", {
      addressWallet: address,
    })
    .then((res) => {
      return res.data;
    });
};

export const callUpfront = () => {
  return axios.post("/api/admin/upfront-minting", {}).then((res) => {
    return res.data;
  });
};

export const getUpfront = (address) => {
  return axios
    .post("/api/mint/get_upfront", {
      addressWallet: address,
    })
    .then((res) => {
      return res.data;
    });
};
