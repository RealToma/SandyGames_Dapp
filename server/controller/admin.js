const express = require("express");
const router = express.Router();

const outfitListSchema = require("../schema/outfit");
const outfitMintingStatusSchema = require("../schema/outfitMintingStatus");
const { modalUsersUpfront: usersUpfrontModel } = require("../schema/users");

const { mintOutfit } = require("../controller/mint");
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i].unique_no;
    [array[i], array[j]] = [array[j], array[i]];
    array[j].unique_no = array[i].unique_no;
    array[i].unique_no = temp;
  }
  return array;
}

router.post("/shuffle-outfit", async (req, res) => {
  console.log("Here's the Shuffle Outfit Endpoint!");

  outfitListSchema.find({}, async (err, entries) => {
    let responseArray = entries;

    shuffleArray(responseArray);

    const updatePromises = responseArray.map(async (entry, key) => {
      console.log("Updating index: " + key);
      await outfitListSchema.updateOne(
        { unique_no: entry.unique_no },
        {
          unique_no: entry.unique_no,
          genre: entry.genre,
          category_name: entry.category_name,
          week_number: entry.week_number,
        }
      );
    });

    await Promise.all(updatePromises);
  });

  return res.status(200).json({
    status: 200,
    message: "success",
  });
});

router.post("/set-current-weekly-outfit-minting", async (req, res) => {
  outfitMintingStatusSchema
    .findByIdAndUpdate(
      "64dde8439c3284d963ac06cb",
      {
        active_week: req.body.active_week,
      },
      { new: true }
    )
    .then((data) => {
      res.status(200).json(data);
    });
});

router.post("/stop-current-weekly-outfit-minting", (req, res) => {
  outfitMintingStatusSchema
    .findByIdAndUpdate(
      "64dde8439c3284d963ac06cb",
      {
        active_week: -1,
      },
      { new: true }
    )
    .then((data) => {
      res.status(200).json(data);
    });
});

router.post("/upfront-minting", async (req, res) => {
  try {
    const upfrontList = await usersUpfrontModel.find({});
    const newMintedList = [];

    upfrontList.map(async (item, key) => {
      try {
        const entry = await outfitMintingStatusSchema.findById(
          "64dde8439c3284d963ac06cb"
        );

        const entryList = await outfitListSchema.find({
          week_number: entry.active_week,
        });

        const mintingPayload = entryList.at(
          getRandomNumber(0, entryList.length)
        );

        let tempHash = await mintOutfit(
          item.addressWallet,
          mintingPayload.genre,
          mintingPayload.category_name
        );

        if (tempHash !== null || tempHash !== undefined) {
          outfitListSchema.findByIdAndUpdate(mintingPayload._id, {
            week_number: -1 * mintingPayload.week_number,
          });

          newMintedList.push({
            status: "sucess",
            tempHash,
            mintingPayload,
          });
        } else {
          newMintedList.push({
            status: "sucess",
            tempHash,
            mintingPayload,
          });
        }
      } catch (err) {
        return res.status(500).json({
          data: err,
        });
      }
    });

    return res.status(200).json(newMintedList);
  } catch (err) {
    return res.status(500).json({
      data: err,
    });
  }
});

module.exports = router;
