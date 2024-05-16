const express = require("express");
const router = express.Router();
const {
  modalStateTreasure,
  modalStateTreasureOnce,
} = require("../schema/treasure");
const modalTime = require("../schema/time");
const { mintTreasure } = require("../function/treasure");

router.post("/get_state_treasure", async (req, res) => {
  const dataTreasure = req.body.dataTreasure;
  let tempTreasure = await modalStateTreasure.find({
    addressUser: req.body.addressWallet,
  });

  // // set local time to EST date without time. e.g: 07/12/2023
  // const now = new Date();
  // const options = { timeZone: "America/New_York", timeZoneName: "short" };
  // const estDateTime = now.toLocaleString("en-US", options);
  // const estDate = estDateTime.split(",");

  // console.log(estDate[0]);
  // const newTime = new modalTime({
  //   timeLockTreasure: estDate[0],
  //   timeLockMintOutfit: estDate[0],
  // });
  // try {
  //   await newTime.save();
  // } catch (error) {
  //   console.log("errorTime:", error);
  // }

  let timeLockTreasure = await modalTime.find();
  const dateNow = new Date().toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    timeZoneName: "short",
  });
  const miliSecondsNow = new Date(dateNow).getTime();
  const miliSecondsLock = new Date(
    timeLockTreasure[0].timeLockTreasure
  ).getTime();

  if (tempTreasure.length === 0) {
    let arrayFlagOpened = [];
    for (let i = 0; i < dataTreasure.length; i++) {
      let tempFlagOpened = {
        nameBox: dataTreasure[i].name,
        itemType: "",
        itemName: "",
        flagOpenedBox: false,
        timeOpened: "",
      };
      arrayFlagOpened.push(tempFlagOpened);
    }
    const newTreasure = new modalStateTreasure({
      addressUser: req.body.addressWallet,
      flagLocked: miliSecondsLock > miliSecondsNow ? true : false,
      flagOpened: arrayFlagOpened,
    });
    try {
      newTreasure.save();
    } catch (error) {
      console.log("save treasure:", error);
    }
  } else {
    return res.send({
      stateTreasure: tempTreasure,
    });
  }
});

router.post("/update_state_treasure", async (req, res) => {
  try {
    let tempState = await modalStateTreasure.find({
      addressUser: req.body.addressWallet,
    });

    let tempArrayState = [];
    for (let i = 0; i < tempState[0].flagOpened?.length; i++) {
      if (tempState[0].flagOpened[i]?.nameBox === req.body.nameBox) {
        let tempOpened = {
          nameBox: req.body.nameBox,
          itemType: req.body.itemType,
          itemName: req.body.itemName,
          flagOpenedBox: true,
          timeOpened: req.body.timeOpened,
        };
        tempArrayState.push(tempOpened);
        // modalStateTreasure.findOneAndUpdate({addressUser: req.body.addressWallet},
        //     {$set: {flagOpened:}})
      } else {
        tempArrayState.push(tempState[0].flagOpened[i]);
      }
    }
    // console.log(tempArrayState)
    await modalStateTreasure.updateOne(
      { addressUser: req.body.addressWallet },
      { $set: { flagLocked: true, flagOpened: tempArrayState } }
    );
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
});

router.post("/get_state_treasure_once", async (req, res) => {
  try {
    let tempState = await modalStateTreasureOnce.findOne({
      addressUser: req.body.addressWallet,
    });
    console.log(tempState);
    if (tempState !== null) {
      return res.json({ success: true, flagOpened: tempState.flagOpened });
    } else {
      return res.json({ success: true, flagOpened: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
});

router.post("/set_state_treasure_once", async (req, res) => {
  console.log(req.body);
  try {
    const tempTreasureOnce = new modalStateTreasureOnce({
      addressUser: req.body.addressWallet,
      flagOpened: true,
      itemType: req.body.itemType,
      itemName: req.body.itemName,
      timeOpened: req.body.timeOpened,
    });
    tempTreasureOnce.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
});

router.post("/mint_treasure", async (req, res) => {
  try {
    let tempHash = await mintTreasure(
      req.body.address,
      req.body.type,
      req.body.name
    );
    if (tempHash !== null || tempHash !== undefined) {
      return res.json({
        flagSuccess: true,
      });
    } else {
      return res.json({
        flagSuccess: false,
      });
    }
  } catch (error) {
    console.log("error:", error);
    return res.json({
      flagSuccess: false,
      msgError: error,
    });
  }
});

router.post("/set_treasure_box_opened", async (req, res) => {
  console.log(req.body.address);
  try {
    await modalStateTreasure.updateOne(
      { addressUser: req.body.address },
      { $set: { flagLocked: true } }
    );
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error: error });
  }
});

module.exports = router;
