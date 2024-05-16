const mongoose = require("mongoose");

const schemaStateTreasure = new mongoose.Schema({
  addressUser: {
    type: String,
    require: true,
  },
  flagLocked: {
    type: Boolean,
    require: true,
    default: false,
  },
  flagOpened: {
    type: [
      {
        nameBox: String,
        itemType: String,
        itemName: String,
        flagOpenedBox: Boolean,
        timeOpened: String,
      },
    ],
    require: true,
  },
});

const schemaDataTreasure = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  passcode: {
    type: String,
    require: true,
  },
});

const schemaStateTreasureOnce = new mongoose.Schema({
  addressUser: {
    type: String,
    require: true,
  },
  flagOpened: {
    type: Boolean,
    require: true,
    default: false,
  },
  itemType: {
    type: String,
    require: true,
  },
  itemName: {
    type: String,
    require: true,
  },
  timeOpened: {
    type: String,
    require: true,
  },
});

const schemaUsersCommunity = new mongoose.Schema({
  idDiscord: {
    type: String,
    require: true,
  },
  addressWallet: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
    default: 0,
  },
  dataMinted: {
    type: [
      {
        genre: String,
        name: String,
        flagSuccess: Boolean,
        hashProcessed: String,
        dateProcessed: String,
      },
    ],
    require: true,
  },
});

const stateTreasure = mongoose.model("state_treasures", schemaStateTreasure);
const dataTreasure = mongoose.model("data_treasures", schemaDataTreasure);
const stateTreasureOnce = mongoose.model(
  "state_once_treasures",
  schemaStateTreasureOnce
);

const usersCommunity = mongoose.model("state_treasure_airdrop_communitys", schemaUsersCommunity);

module.exports = {
  modalDataTreasure: dataTreasure,
  modalStateTreasure: stateTreasure,
  modalStateTreasureOnce: stateTreasureOnce,
  modalUserCommunity: usersCommunity,
};
